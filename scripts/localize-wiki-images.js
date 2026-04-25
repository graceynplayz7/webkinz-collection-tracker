const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "assets", "wiki-images");
const SOURCE_FILES = fs
  .readdirSync(PROJECT_ROOT)
  .filter((file) => file.endsWith(".js"))
  .map((file) => path.join(PROJECT_ROOT, file));

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function extractImageNames(text) {
  const names = new Set();

  for (const match of text.matchAll(/(?:\"(?:image|foodImage|sampleImage)\"|(?:image|foodImage|sampleImage)):\s*\"([^\"]+)\"/g)) {
    const value = match[1];

    if (!value) {
      continue;
    }

    const fileName = decodeURIComponent(value.split("/").pop().split("?")[0]);

    if (/\.(png|jpg|jpeg|webp|gif)$/i.test(fileName)) {
      names.add(fileName);
    }
  }

  for (const match of text.matchAll(/\[\[File:([^\]\|]+?\.(?:png|jpg|jpeg|webp|gif))(?=[\]\|])/gi)) {
    names.add(match[1].trim());
  }

  return names;
}

function getAllImageNames() {
  const allNames = new Set();

  for (const filePath of SOURCE_FILES) {
    const text = fs.readFileSync(filePath, "utf8");

    for (const name of extractImageNames(text)) {
      allNames.add(name);
    }
  }

  return [...allNames].sort((a, b) => a.localeCompare(b));
}

async function downloadImage(fileName) {
  const remoteUrl = `https://webkinzguide.com/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
  const outputPath = path.join(OUTPUT_DIR, fileName);

  if (fs.existsSync(outputPath)) {
    return { status: "skipped", fileName };
  }

  const response = await fetch(remoteUrl, {
    redirect: "follow",
    headers: {
      "User-Agent": "webkinz-collection-tracker-image-localizer"
    }
  });

  if (!response.ok) {
    return { status: "failed", fileName, reason: `HTTP ${response.status}` };
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  ensureDirectory(path.dirname(outputPath));
  fs.writeFileSync(outputPath, bytes);
  return { status: "downloaded", fileName };
}

async function run() {
  ensureDirectory(OUTPUT_DIR);
  const imageNames = getAllImageNames();
  const concurrency = 8;
  const results = [];
  let index = 0;

  async function worker() {
    while (index < imageNames.length) {
      const currentIndex = index;
      index += 1;
      const fileName = imageNames[currentIndex];
      const result = await downloadImage(fileName);
      results.push(result);

      if ((currentIndex + 1) % 100 === 0 || currentIndex === imageNames.length - 1) {
        console.log(`Processed ${currentIndex + 1}/${imageNames.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const summary = results.reduce(
    (acc, result) => {
      acc[result.status] = (acc[result.status] || 0) + 1;
      return acc;
    },
    { total: imageNames.length }
  );

  const failures = results.filter((result) => result.status === "failed");

  console.log(JSON.stringify({ summary, failures: failures.slice(0, 25) }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
