const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST =
  process.env.HOST || (process.env.RAILWAY_ENVIRONMENT ? "0.0.0.0" : "127.0.0.1");
const ROOT = __dirname;
const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(ROOT, "data");
const ACCOUNTS_FILE = path.join(DATA_DIR, "accounts.json");
const sessions = new Map();

const ROUTES = {
  "/": "index.html",
  "/collections": "collections.html",
  "/login": "login.html",
  "/profile": "profile.html"
};

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function ensureDataStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(ACCOUNTS_FILE)) {
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({ users: {} }, null, 2));
  }
}

function loadAccounts() {
  ensureDataStore();

  try {
    return JSON.parse(fs.readFileSync(ACCOUNTS_FILE, "utf8"));
  } catch {
    return { users: {} };
  }
}

function saveAccounts(accounts) {
  ensureDataStore();
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  response.end(JSON.stringify(payload));
}

function sendFile(response, filePath, statusCode = 200) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(statusCode, {
      "Content-Type": contentType,
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600"
    });
    response.end(content);
  });
}

function resolveRequestPath(urlPath) {
  if (ROUTES[urlPath]) {
    return path.join(ROOT, ROUTES[urlPath]);
  }

  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const fullPath = path.join(ROOT, safePath);

  if (!fullPath.startsWith(ROOT)) {
    return null;
  }

  return fullPath;
}

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((cookies, entry) => {
      const [key, ...rest] = entry.split("=");
      cookies[key] = decodeURIComponent(rest.join("="));
      return cookies;
    }, {});
}

function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Request too large"));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

function normalizeUsername(value = "") {
  return value.trim().toLowerCase();
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash = "") {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const comparisonHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(comparisonHash, "hex"));
}

function createSession(usernameKey) {
  const sessionId = crypto.randomBytes(24).toString("hex");
  sessions.set(sessionId, usernameKey);
  return sessionId;
}

function clearSession(request) {
  const cookies = parseCookies(request.headers.cookie);

  if (cookies.sessionId) {
    sessions.delete(cookies.sessionId);
  }
}

function getSessionUser(request, accounts) {
  const cookies = parseCookies(request.headers.cookie);
  const usernameKey = cookies.sessionId ? sessions.get(cookies.sessionId) : null;

  if (!usernameKey) {
    return null;
  }

  return accounts.users[usernameKey] ? { usernameKey, user: accounts.users[usernameKey] } : null;
}

async function handleApi(request, response, requestUrl) {
  const accounts = loadAccounts();

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      storagePath: DATA_DIR
    });
    return true;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/session") {
    const sessionUser = getSessionUser(request, accounts);

    if (!sessionUser) {
      sendJson(response, 200, { authenticated: false });
      return true;
    }

    sendJson(response, 200, {
      authenticated: true,
      user: { username: sessionUser.user.username }
    });
    return true;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/auth/signup") {
    const body = await getRequestBody(request);
    const username = (body.username || "").trim();
    const password = body.password || "";
    const usernameKey = normalizeUsername(username);

    if (username.length < 3 || password.length < 4) {
      sendJson(response, 400, {
        error: "Use a username with at least 3 characters and a password with at least 4."
      });
      return true;
    }

    if (accounts.users[usernameKey]) {
      sendJson(response, 409, { error: "That username already exists." });
      return true;
    }

    accounts.users[usernameKey] = {
      username,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      data: {
        owned: {},
        wanted: {},
        profile: {}
      }
    };
    saveAccounts(accounts);

    const sessionId = createSession(usernameKey);
    sendJson(
      response,
      201,
      { authenticated: true, user: { username } },
      { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax` }
    );
    return true;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/auth/login") {
    const body = await getRequestBody(request);
    const usernameKey = normalizeUsername(body.username || "");
    const password = body.password || "";
    const account = accounts.users[usernameKey];

    if (!account || !verifyPassword(password, account.passwordHash)) {
      sendJson(response, 401, { error: "Wrong username or password." });
      return true;
    }

    const sessionId = createSession(usernameKey);
    sendJson(
      response,
      200,
      { authenticated: true, user: { username: account.username } },
      { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax` }
    );
    return true;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/auth/logout") {
    clearSession(request);
    sendJson(
      response,
      200,
      { ok: true },
      { "Set-Cookie": "sessionId=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax" }
    );
    return true;
  }

  if (requestUrl.pathname === "/api/data") {
    const sessionUser = getSessionUser(request, accounts);

    if (!sessionUser) {
      sendJson(response, 401, { error: "Sign in required." });
      return true;
    }

    if (request.method === "GET") {
      sendJson(response, 200, sessionUser.user.data || { owned: {}, wanted: {}, profile: {} });
      return true;
    }

    if (request.method === "PUT") {
      const body = await getRequestBody(request);
      sessionUser.user.data = {
        owned: body.owned && typeof body.owned === "object" ? body.owned : {},
        wanted: body.wanted && typeof body.wanted === "object" ? body.wanted : {},
        profile: body.profile && typeof body.profile === "object" ? body.profile : {}
      };
      accounts.users[sessionUser.usernameKey] = sessionUser.user;
      saveAccounts(accounts);
      sendJson(response, 200, { ok: true });
      return true;
    }
  }

  return false;
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (requestUrl.pathname.startsWith("/api/")) {
      const handled = await handleApi(request, response, requestUrl);

      if (!handled) {
        sendJson(response, 404, { error: "Not found" });
      }

      return;
    }

    const filePath = resolveRequestPath(requestUrl.pathname);

    if (!filePath) {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Bad request");
      return;
    }

    fs.stat(filePath, (error, stats) => {
      if (error) {
        sendFile(response, path.join(ROOT, "index.html"), 404);
        return;
      }

      if (stats.isDirectory()) {
        sendFile(response, path.join(filePath, "index.html"));
        return;
      }

      sendFile(response, filePath);
    });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Server error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Webkinz Collection Tracker running at http://${HOST}:${PORT}`);
});
