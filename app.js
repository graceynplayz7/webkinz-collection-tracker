const OWNED_STORAGE_KEY = "webkinz-collection-tracker-owned";
const WANTED_STORAGE_KEY = "webkinz-collection-tracker-wanted";
const PROFILE_STORAGE_KEY = "webkinz-collection-tracker-profile";

function parseWikiRawTable(rawTable) {
  return rawTable
    .split("|-\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry.startsWith("|[[File:"))
    .map((entry) => {
      const lines = entry.split("\n");
      const imageMatch = lines[0].match(/^\|\[\[File:(.+?)\]\]<br>(.+)$/);

      if (!imageMatch) {
        return null;
      }

      const [, fileName, itemName] = imageMatch;
      const availability = (lines[1] || "").replace(/^\|/, "").replace(/<br>/g, " - ").trim();
      const tradeable = (lines[2] || "").replace(/^\|/, "").trim() || "Unknown";

      return {
        id: itemName
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        name: itemName.trim(),
        owned: false,
        notes: "",
        availability,
        tradeable,
        image: fileName.trim()
      };
    })
    .filter(Boolean);
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const starterCollections = [
  {
    id: "action-figures",
    name: "Action Figure Collection",
    description: "Webkinz Guide action figure set with availability, tradeability, and image links pulled from the collection page.",
    category: "Figures",
    items: [
      {
        id: "blue-leprechaun-action-figure",
        name: "Blue Leprechaun Action Figure",
        owned: false,
        notes: "Add your own notes or trade info here.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/d/d6/Blueleprechaunactionfigure.png"
      },
      {
        id: "dex-dangerous-action-figure",
        name: "Dex Dangerous Action Figure",
        owned: false,
        notes: "eStore release.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/b/be/Dexdangerousactionfigure.png"
      },
      {
        id: "ella-mcwoof-action-figure",
        name: "Ella McWoof Action Figure",
        owned: false,
        notes: "Webkinz Newz Week 2024 prize.",
        availability: "Clubhouse Events - Webkinz Newz Week (2024)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/d/d9/Ellamcwoofactionfigure.png"
      },
      {
        id: "green-leprechaun-action-figure",
        name: "Green Leprechaun Action Figure",
        owned: false,
        notes: "Leprechaun Chase color variant.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/b/bc/Greenleprechaunactionfigure.png"
      },
      {
        id: "inukshuk-action-figure",
        name: "Inukshuk Action Figure",
        owned: false,
        notes: "Winterfest annual click-to-win prize.",
        availability: "Click-to-Win: Annual - Winterfest (introduced 2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e5/Inukshukactionfigure.png"
      },
      {
        id: "mandy-webkinz-action-figure",
        name: "Mandy Webkinz Action Figure",
        owned: false,
        notes: "Webkinz Newz Week 2023 prize.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/3/32/Mandywebkinzactionfigure.png"
      },
      {
        id: "mayor-arte-action-figure",
        name: "Mayor Arte Action Figure",
        owned: false,
        notes: "Meet the Mayor reward.",
        availability: "Kinzville Park - Meet the Mayor: Arte",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/a/a6/Mayorarteactionfigure.png"
      },
      {
        id: "mayor-dr-quack-action-figure",
        name: "Mayor Dr. Quack Action Figure",
        owned: false,
        notes: "Meet the Mayor reward.",
        availability: "Kinzville Park - Meet the Mayor: Mayor Dr. Quack",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/c/c0/Mayordrquackactionfigure.png"
      },
      {
        id: "michael-webkinz-action-figure",
        name: "Michael Webkinz Action Figure",
        owned: false,
        notes: "Webkinz Newz Week 2023 prize.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f5/Michaelwebkinzactionfigure.png"
      },
      {
        id: "orange-leprechaun-action-figure",
        name: "Orange Leprechaun Action Figure",
        owned: false,
        notes: "Leprechaun Chase color variant.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/2/21/Orangeleprechaunactionfigure.png"
      },
      {
        id: "red-leprechaun-action-figure",
        name: "Red Leprechaun Action Figure",
        owned: false,
        notes: "Leprechaun Chase color variant.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/b/b5/Redleprechaunactionfigure.png"
      },
      {
        id: "sally-webkinz-action-figure",
        name: "Sally Webkinz Action Figure",
        owned: false,
        notes: "Webkinz Newz Week 2023 prize.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/7/76/Sallywebkinzactionfigure.png"
      },
      {
        id: "signed-ella-mcwoof-action-figure",
        name: "Signed Ella McWoof Action Figure",
        owned: false,
        notes: "Signed version from Webkinz Newz Week 2024.",
        availability: "Clubhouse Events - Webkinz Newz Week (2024)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/d/d5/Signedellamcwoofactionfigure.png"
      },
      {
        id: "signed-mandy-webkinz-action-figure",
        name: "Signed Mandy Webkinz Action Figure",
        owned: false,
        notes: "Signed version from Webkinz Newz Week 2023.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e6/Signedmandywebkinzactionfigure.png"
      },
      {
        id: "signed-mayor-dr-quack-action-figure",
        name: "Signed Mayor Dr Quack Action Figure",
        owned: false,
        notes: "Signed Meet the Mayor reward.",
        availability: "Kinzville Park - Meet the Mayor: Mayor Dr. Quack",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/8/84/Signedmayordrquackactionfigure.png"
      },
      {
        id: "signed-michael-webkinz-action-figure",
        name: "Signed Michael Webkinz Action Figure",
        owned: false,
        notes: "Signed version from Webkinz Newz Week 2023.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/3/38/Signedmichaelwebkinzactionfigure.png"
      },
      {
        id: "signed-sally-webkinz-action-figure",
        name: "Signed Sally Webkinz Action Figure",
        owned: false,
        notes: "Signed version from Webkinz Newz Week 2023.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/1/1e/Signedsallywebkinzactionfigure.png"
      },
      {
        id: "signed-steve-webkinz-action-figure",
        name: "Signed Steve Webkinz Action Figure",
        owned: false,
        notes: "Signed version from Webkinz Newz Week 2023.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/5/51/Signedstevewebkinzactionfigure.png"
      },
      {
        id: "steve-webkinz-action-figure",
        name: "Steve Webkinz Action Figure",
        owned: false,
        notes: "Webkinz Newz Week 2023 prize.",
        availability: "Clubhouse Events - Webkinz Newz Week (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/6/6c/Stevewebkinzactionfigure.png"
      },
      {
        id: "violet-leprechaun-action-figure",
        name: "Violet Leprechaun Action Figure",
        owned: false,
        notes: "Leprechaun Chase color variant.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/6/6c/Violetleprechaunactionfigure.png"
      },
      {
        id: "wacky-action-figure",
        name: "Wacky Action Figure",
        owned: false,
        notes: "WackyER Zingoz prize.",
        availability: "Wheels & Games - WackyER Zingoz",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/8/81/Wackyactionfigure.png"
      },
      {
        id: "yellow-leprechaun-action-figure",
        name: "Yellow Leprechaun Action Figure",
        owned: false,
        notes: "Leprechaun Chase color variant.",
        availability: "Kinzville Park - Leprechaun Chase (2026)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/c/c7/Yellowleprechaunactionfigure.png"
      },
      {
        id: "yeti-action-figure",
        name: "Yeti Action Figure",
        owned: false,
        notes: "Holiday gift release.",
        availability: "Holiday Gifts - Christmas (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/0e/Yetiactionfigure.png"
      },
      {
        id: "zangoz-action-figure",
        name: "Zangoz Action Figure",
        owned: false,
        notes: "WackyER Zingoz prize.",
        availability: "Wheels & Games - WackyER Zingoz",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/4/45/Zangozactionfigure.png"
      }
    ]
  },
  {
    id: "ball-pits",
    name: "Ball Pit Collection",
    description: "Ball pits and ball pool items imported from the Webkinz Guide collection page.",
    category: "Play",
    items: [
      {
        id: "ball-pit-slide",
        name: "Ball Pit Slide",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Maltese Puppy",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/4/49/Ballpitslide.png"
      },
      {
        id: "balls-of-yarn-peek-and-find",
        name: "Balls of Yarn Peek and Find",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/c/c1/Ballsofyarnpeekandfind.png"
      },
      {
        id: "chocolate-playground-ball-pit",
        name: "Chocolate Playground Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/4/4f/Chocolateplaygroundballpit.png"
      },
      {
        id: "goo-goo-berry-ball-pit",
        name: "Goo Goo Berry Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f7/Googooberryballpit.png"
      },
      {
        id: "gumball-pit",
        name: "Gumball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Bubblegum Cheeky Cat",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/b/b1/Gumballpit.png"
      },
      {
        id: "holiday-ball-pit",
        name: "Holiday Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Festive Mouse",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/3/3d/Holidayballpit.png"
      },
      {
        id: "mini-egg-play-pit",
        name: "Mini Egg Play Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e9/Minieggplaypit.png"
      },
      {
        id: "mosh-ball-pit",
        name: "Mosh Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Mohawk Chihuahua",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/00/Moshballpit.png"
      },
      {
        id: "playful-pup-ball-pit",
        name: "Playful Pup Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Pitbull Puppy",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/3/39/Playfulpupballpit.png"
      },
      {
        id: "playland-ball-pool",
        name: "Playland Ball Pool",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/8/86/Playlandballpool.png"
      },
      {
        id: "quilted-christmas-ball-pool",
        name: "Quilted Christmas Ball Pool",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/a/aa/Quiltedchristmasballpool.png"
      },
      {
        id: "the-zingoz-zangoz-bouncer",
        name: "The Zingoz Zangoz Bouncer!",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore Promo - Gift With Purchase",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/c/c1/Thezingozzangozbouncer.png"
      },
      {
        id: "winter-raccoon-ball-pit",
        name: "Winter Raccoon Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Pet Specific Item - Baby Raccoon",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/01/Winterraccoonballpit.png"
      },
      {
        id: "zummies-ball-pit",
        name: "Zummies Ball Pit",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Zumwhere - Z-Shop",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/8/86/Zummiesballpit.png"
      }
    ]
  },
  {
    id: "balloons",
    name: "Balloon Collection",
    description: "Balloon-themed items imported from the Webkinz Guide collection page.",
    category: "Decor",
    items: [
      {
        id: "bee-balloons",
        name: "Bee Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Click-to-Win: Annual - Spring Celebration Milk Chocolate Egg 2025",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/1/1d/Beeballoons.png"
      },
      {
        id: "blue-orange-yellow-party-balloons",
        name: "Blue, Orange Yellow Party Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Webkinz Newz",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/07/Blueorangeyellowpartyballoons.png"
      },
      {
        id: "blue-welcome-balloon",
        name: "Blue Welcome Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Misc. Items - Adoption Balloons",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/7/7b/Bluewelcomeballoon.png"
      },
      {
        id: "bouquet-of-balloons",
        name: "Bouquet of Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Party Packs - Party Loot Bag Prizes",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/9/91/Bouquetofballoons.png"
      },
      {
        id: "candy-cane-balloon-column",
        name: "Candy Cane Balloon Column",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Collection Event - Candy Cane (2015)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/1/17/Candycaneballooncolumn.png"
      },
      {
        id: "celebration-balloon-bouquet",
        name: "Celebration Balloon Bouquet",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore Promo - Gift With Purchase",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/fe/Celebrationballoonbouquet.png"
      },
      {
        id: "celebration-balloon-column",
        name: "Celebration Balloon Column",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore Promo Themed ?? Boxes - Celebration",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e0/Celebrationballooncolumn.png"
      },
      {
        id: "celebration-bunch-of-balloons",
        name: "Celebration Bunch of Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore Promo Themed ?? Boxes - Celebration",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/a/ac/Celebrationbunchofballoons.png"
      },
      {
        id: "christmas-balloons",
        name: "Christmas Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Collection Event - Candy Cane (2015)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f4/Christmasballoons.png"
      },
      {
        id: "circus-dining-chair",
        name: "Circus Dining Chair",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/3/35/Circusdiningchair.png"
      },
      {
        id: "deluxe-balloon",
        name: "Deluxe Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Deluxe Membership - Deluxe Prize Machine",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/5/57/Deluxeballoon.png"
      },
      {
        id: "fall-fest-balloons",
        name: "Fall Fest Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Click-to-Win: Annual - Fall Fest (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/fd/Fallfestballoons.png"
      },
      {
        id: "floating-school-desk",
        name: "Floating School Desk",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/8/8c/Floatingschooldesk.png"
      },
      {
        id: "goo-goo-berry-balloons",
        name: "Goo-Goo Berry Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Click-to-Win: Annual - Berry Fest (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/4/47/Googooberryballoons.png"
      },
      {
        id: "green-welcome-balloon",
        name: "Green Welcome Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Misc. Items - Adoption Balloons",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/2/2d/Greenwelcomeballoon.png"
      },
      {
        id: "happy-birthday-balloons",
        name: "Happy Birthday Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Wheels & Games - Wheel of WOW",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/5/57/Happybirthdayballoons.png"
      },
      {
        id: "happy-birthday-bouquet",
        name: "Happy Birthday Bouquet",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/e/eb/Happybirthdaybouquet.png"
      },
      {
        id: "hover-swing",
        name: "Hover Swing",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/1/1f/Hoverswing.png"
      },
      {
        id: "kiwi-balloons",
        name: "Kiwi Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Clubhouse Events - Kiwi Bird Room",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e6/Kiwiballoons.png"
      },
      {
        id: "light-blue-balloon-darts-balloon",
        name: "Light Blue Balloon Darts Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Wheels & Games - Balloon Darts",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/03/Lightblueballoondartsballoon.png"
      },
      {
        id: "mayoral-balloons",
        name: "Mayoral Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Kinzville Park - Meet the Mayor: Mayor Sophie",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e8/Mayoralballoons.png"
      },
      {
        id: "monkey-and-monkey-balloons",
        name: "Monkey and Monkey Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Trading Cards - Series 3",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/7/71/Monkeyandmonkeyballoons.png"
      },
      {
        id: "orange-balloon-darts-balloon",
        name: "Orange Balloon Darts Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Wheels & Games - Balloon Darts",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/5/58/Orangeballoondartsballoon.png"
      },
      {
        id: "party-time-banner",
        name: "Party Time Banner",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "WShop",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f5/Partytimebanner.png"
      },
      {
        id: "pixie-pod-balloons",
        name: "Pixie Pod Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Magical Forest - Forest Key Prizes",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/b/b5/Pixiepodballoons.png"
      },
      {
        id: "polarberry-balloons",
        name: "Polarberry Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Click-to-Win: Annual - Berry Fest (2023)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e6/Polarberryballoons.png"
      },
      {
        id: "purple-balloon-darts-balloon",
        name: "Purple Balloon Darts Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Wheels & Games - Balloon Darts",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/1/11/Purpleballoondartsballoon.png"
      },
      {
        id: "red-welcome-balloon",
        name: "Red Welcome Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Misc. Items - Adoption Balloons",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/6/6a/Redwelcomeballoon.png"
      },
      {
        id: "sea-creature-balloons",
        name: "Sea Creature Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Vacation Island - Sheldon's Souvenir Shop (Current)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f9/Seacreatureballoons.png"
      },
      {
        id: "shiny-party-balloons",
        name: "Shiny Party Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Party Packs - Party Loot Bag Prizes",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/b/b9/Shinypartyballoons.png"
      },
      {
        id: "spooky-bunch-of-balloons",
        name: "Spooky Bunch of Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Challenges - Seasonal Challenges Halloween 2018",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/2/26/Spookybunchofballoons.png"
      },
      {
        id: "spotted-frog-pattern-balloon",
        name: "Spotted Frog Pattern Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Wheels & Games - Wheel of Wishes",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/9/92/Spottedfrogpatternballoon.png"
      },
      {
        id: "spring-fling-balloons",
        name: "Spring Fling Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Challenges - Seasonal Challenges Spring Fling Challenge 2014",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e6/Springflingballoons.png"
      },
      {
        id: "sweetheart-balloons",
        name: "Sweetheart Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Collection Events - Valentines (2020)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/8/80/Sweetheartballoons.png"
      },
      {
        id: "wacky-bunch-of-balloons",
        name: "Wacky Bunch of Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Challenges - Seasonal Challenges Wacky Zingoz Celebration 2014",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/4/44/Wackybunchofballoons.png"
      },
      {
        id: "webkinz-cares-balloon",
        name: "Webkinz Cares Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Webkinz Cares",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/3/3b/Webkinzcaresballoon.png"
      },
      {
        id: "webkinz-day-celebration-tree",
        name: "Webkinz Day Celebration Tree",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f8/Webkinzdaycelebrationtree.png"
      },
      {
        id: "winterfest-balloons",
        name: "Winterfest Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Click-to-Win: Annual - Winterfest (2024)",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/6/65/Winterfestballoons.png"
      },
      {
        id: "yard-sale-table",
        name: "Yard Sale Table",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "eStore",
        tradeable: "No",
        image: "https://static.wikitide.net/webkinzguidewiki/5/5c/Yardsaletable.png"
      },
      {
        id: "year-20-balloons",
        name: "Year 20 Balloons",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Kinzville Park - Webkinz Newz Week",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/2/22/Year20balloons.png"
      },
      {
        id: "year-20-column",
        name: "Year 20 Column",
        owned: false,
        notes: "Listed on the Balloon Collection page.",
        availability: "Retired WShop",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/0/08/Year20column.png"
      },
      {
        id: "yellow-welcome-balloon",
        name: "Yellow Welcome Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Misc. Items - Adoption Balloons",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/e/e3/Yellowwelcomeballoon.png"
      },
      {
        id: "zum-balloon",
        name: "Zum Balloon",
        owned: false,
        notes: "Imported from Webkinz Guide.",
        availability: "Party Packs - Party Loot Bag Prizes",
        tradeable: "Yes",
        image: "https://static.wikitide.net/webkinzguidewiki/f/f5/Zumballoon.png"
      }
    ]
  },
  {
    id: "plush-toys",
    name: "Plush Toy Collection",
    description: "Full plush toy collection imported from the Webkinz Guide collection page.",
    category: "Plush",
    items: parseWikiRawTable(`{| class="greentable sortable" width="70%"
|- align="left"
!Item
!Availability
!Tradeable
|-
|[[File:2018dexdangerouscampaignplush.png]]<br>2018 Dex Dangerous Campaign Plush
|Kinzville Park<br>Webkinz Votes - 2018
|Yes
|-
|[[File:2018drquackcampaignplush.png]]<br>2018 Dr. Quack Campaign Plush
|Kinzville Park<br>Webkinz Votes - 2018
|Yes
|-
|[[File:2020alyssacampaignplushy.png]]<br>2020 Alyssa Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2020 
|Yes
|-
|[[File:2020dexdangerouscampaignplushy.png]]<br>2020 Dex Dangerous Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2020 
|Yes
|-
|[[File:2020drquackcampaignplushy.png]]<br>2020 Dr. Quack Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2020
|Yes
|-
|[[File:2020sophiestockwellcampaignplushy.png]]<br>2020 Sophie Stockwell Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2020
|Yes
|-
|[[File:2022drquackcampaignplushy.png]]<br>2022 Dr. Quack Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2022
|Yes
|-
|[[File:2022goobercampaignplushy.png]]<br>2022 Goober Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2022
|Yes
|-
|[[File:2022nibblescampaignplushy.png]]<br>2022 Nibbles Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2022
|Yes
|-
|[[File:2022pjcolliecampaignplushy.png]]<br>2022 PJ Collie Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2022
|Yes
|-
|[[File:2024artefactcampaignplushy.png]]<br>2024 Arte Fact Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2024
|Yes
|-
|[[File:2024debbiedragoncampaignplushy.png]]<br>2024 Debbie Dragon Campaign Plushy
|Kinzville Park<br>Webkinz Votes – 2024
|Yes
|-
|[[File:2024goobercampaignplushy.png]]<br>2024 Goober Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2024
|Yes
|-
|[[File:2024sophiasoufflecampaignplushy.png]]<br>2024 Sophia Souffle Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2024
|Yes
|-
|[[File:Alexkinzplushy.png]]<br>Alex 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Alyssafairyplushy.png]]<br>Alyssa Fairy Plushy
|Host Gifts<br>Alyssa Fairy 
|Yes
|-
|[[File:Alyssaholidayplushy.png]]<br>Alyssa Holiday Plushy
|Holiday Gift<br>Christmas - 2024
|Yes
|-
|[[File:Alyssaplush.png]]<br>Alyssa Plush
|Magical Forest<br>Magic Mire  
|Yes
|-
|[[File:Amandapandacampaignplushy.png]]<br>Amanda Panda Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2016
|Yes
|-
|[[File:Amandapandaholidayplush.png]]<br>Amanda Panda Holiday Plush
|Christmas Countdown<br>2013
|Yes
|-
|[[File:Amandapandaplush.png]]<br>Amanda Panda Plush
|Christmas Countdown<br>2009
|Yes
|-
|[[File:Arcticfoxbluesplushy.png]]<br>Arctic Fox Blues Plushy
|Click-to-Win: Annual<br>Winterfest - 2025
|Yes
|-
|[[File:Arcticfoxcubplushy.png]]<br>Arctic Fox Cub Plushy
|Click-to-Win: Annual<br>Winterfest Cookie 2018
|Yes
|-
|[[File:Artefactplushtoy.png]]<br>Arte Fact Plush Toy
|Curio Shop
|Yes
|-
|[[File:Artehalloweenplushy.png]]<br>Arte Halloween Plushy
|Holiday Gift<br>Halloween - 2025
|Yes
|-
|[[File:Arteholidayplush.png]]<br>Arte Holiday Plush
|Holiday Gift<br>Christmas - 2008
|Yes
|-
|[[File:Artethanksgivingplushy.png]]<br>Arte Thanksgiving Plushy
|Holiday Gift<br>Thanksgiving - 2025
|Yes
|-
|[[File:Babybunnyplushy.png]]<br>Baby Bunny Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2022
|Yes
|-
|[[File:Babypenguinplushy.png]]<br>Baby Penguin Plushy
|Media Promotions<br>Penguins of Madagascar
|Yes
|-
|[[File:Babyskunkplushy.png]]<br>Baby Skunk Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2019
|Yes
|-
|[[File:Babyswanplushy.png]]<br>Baby Swan Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2017
|Yes
|-
|[[File:Barnowlplushy.png]]<br>Barn Owl Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2019
|Yes
|-
|[[File:Baseballplushy.png]]<br>Baseball Plushy
|Click-to-Win: Non-Annual<br>Kinzville Hot Dog Event - 2025
|Yes
|-
|[[File:Beeplushy.png]]<br>Bee Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2025
|Yes
|-
|[[File:Berryplushy.png]]<br>Berry Plushy
|Challenge<br>Seasonal - Pizza Party
|Yes
|-
|[[File:Bffplushies.png]]<br>BFF Plushies
|Webkinz Newz<br>GanzWorld Rewards  
|Yes
|-
|[[File:Bigloveplushie.png]]<br>Big Love Plushie
|Community Code
|Yes
|-
|[[File:Blackbearcubplushy.png]]<br>Black Bear Cub Plushy
|Webkinz Newz<br>Video Challenge Prizes - Kinectimals
|Yes
|-
|[[File:Blancheplushy.png]]<br>Blanche Plushy
|Party Packs<br>Party Loot Bag Prize
|Yes
|-
|[[File:Bluebirdplushy.png]]<br>Bluebird Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2026
|Yes
|-
|[[File:Bluechipmunkplushy.png]]<br>Blue Chipmunk Plushy
|Click-to-Win: Non-Annual<br>Peanut Floaty
|Yes
|-
|[[File:Blueleprechaunplushtoy.png]]<br>Blue Leprechaun Plush Toy
|Kinzville Park<br>Leprechaun Chase - 2024
|Yes
|-
|[[File:Bluespringkiwiplushy.png]]<br>Blue Spring Kiwi Plushy
|Community Code 
|Yes
|-
|[[File:Boltsplushy.png]]<br>Bolts Plushy
|SPREE!<br>Kinzville Mall Prize  
|Yes
|-
|[[File:Boogerplushy.png]]<br>Booger Plushy
|Kinzville Academy<br>Buried Treasure - Retired
|Yes
|-
|[[File:Borisplushtoy.png]]<br>Boris Plush Toy
|Adventure Park<br>Quests - Journey to the Crystal Caves (Mud Hippo)
|Yes
|-
|[[File:Brownbearcubplushy.png]]<br>Brown Bear Cub Plushy
|Wheels & Games<br>Balloon Darts
|Yes
|-
|[[File:Bunnyclown.png]]<br>Bunny Clown
|Curio Shop Only
|Yes
|-
|[[File:Bunnyplushy.png]]<br>Bunny Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2016
|Yes
|-
|[[File:Bunnyzangozplush.png]]<br>Bunny Zangoz Plush
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2015
|Yes
|-
|[[File:Bunnyzingozplushy.png]]<br>Bunny Zingoz Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2016
|Yes
|-
|[[File:Canadagooseplushy.png]]<br>Canada Goose Plushy
|Kinzville Park<br>Webkinz Newz Week
|Yes
|-
|[[File:Candycornwackyplushy.png]]<br>Candy Corn Wacky Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2023
|Yes
|-
|[[File:Captaindogbeardplushy.png]]<br>Captain Dogbeard Plushy
|Vacation Island<br>Vacation Island Wheel  
|Yes
|-
|[[File:Carrotplushy.png]]<br>Carrot Plushy
|Things to Do Menu<br>Featured Pet Prize - White Bunny
|Yes
|-
|[[File:Cavecreatureplushy.png]]<br>Cave Creature Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Arte
|Yes
|-
|[[File:Cavecritterplushy.png]]<br>Cave Critter Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Arte
|Yes
|-
|[[File:Chefgazpachoplushy.png]]<br>Chef Gazpacho Plushy
|Daily KinzCare<br>Current
|Yes
|-
|[[File:Chickadeeplushy.png]]<br>Chickadee Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2025
|Yes
|-
|[[File:chocolatebunnyplushy.png]]<br>Chocolate Bunny Plushy
|Holiday Gifts<br>Spring Celebration Gifts - 2020
|Yes
|-
|[[File:Christmastreeplushy.png]]<br>Christmas Tree Plushy
|Christmas Countdown<br>2024
|Yes
|-
|[[File:Cinderplushy.png]]<br>Cinder Plushy
|SPREE!<br>Kinzville Mall Prize  
|Yes
|-
|[[File:Cinnamonplushy.png]]<br>Cinnamon Plushy
|Holiday Gifts<br>Valentine's Day Gifts - 2018
|Yes
|-
|[[File:Cornhuskbear.png]]<br>Corn Husk Bear
|Click-to-Win: Annual<br>Fall Fest - 2021
|Yes
|-
|[[File:Cornhuskdog.png]]<br>Corn Husk Dog
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2022
|Yes
|-
|[[File:Cornhuskdoll.png]]<br>Corn Husk Doll
|Click-to-Win: Annual<br>Fall Fest - 2007
|Yes
|-
|[[File:Cornhuskgoogles.png]]<br>Corn Husk Googles
|Click-to-Win: Annual<br>Fall Fest - 2025
|Yes
|-
|[[File:Cornhuskhorse.png]]<br>Corn Husk Horse
|Click-to-Win: Annual<br>Fall Fest - 2022
|Yes
|-
|[[File:Cornhuskpig.png]]<br>Corn Husk Pig
|Click-to-Win: Annual<br>Fall Fest - 2023
|Yes
|-
|[[File:Cornhuskturkey.png]]<br>Corn Husk Turkey
|Click-to-Win: Annual<br>Fall Fest - 2024
|Yes
|-
|[[File:Cornhuskwackydoll.png]]<br>Corn Husk Wacky Doll
|Click-to-Win: Annual<br>Fall Fest - 2015
|Yes
|-
|[[File:Cornonthecobplushy.png]]<br>Corn on the Cob Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2024
|Yes
|-
|[[File:Cowabellekinzplushy.png]]<br>Cowabelle 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Cuddlybearplush.png]]<br>Cuddly Bear Plush
|Media Promotions<br>Lorax Movie
|Yes
|-
|[[File:Cutewerewolfplushie.png]]<br>Cute Werewolf Plushie
|Webkinz Next
|No
|-
|[[File:Daisydoeholidayplushy.png]]<br>Daisy Doe Holiday Plushy
|Christmas Countdown<br>2016 
|Yes
|-
|[[File:Daisydoeplushy.png]]<br>Daisy Doe Plushy
|Login Events<br>Veggie Fest  
|Yes
|-
|[[File:Daisydoethanksgivingplushy.png]]<br>Daisy Doe Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2020
|Yes
|-
|[[File:Dexdangerouscampaignplushy.png]]<br>Dex Dangerous Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2016 
|Yes
|-
|[[File:Dexdangerousplushy.png]]<br>Dex Dangerous Plushy
|Daily Kinzcare  
|Yes
|-
|[[File:Diycommonrainbowplushy.png]]<br>DIY Common Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Diycommonretrorainbowplushy.png]]<br>DIY Common Retro Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Diyplushy.png]]<br>DIY Plushy
|WShop
|Yes
|-
|[[File:Diyrarerainbowplushy.png]]<br>DIY Rare Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Diyrareretrorainbowplushy.png]]<br>DIY Rare Retro Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Diyuncommonrainbowplushy.png]]<br>DIY Uncommon Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Diyuncommonretrorainbowplushy.png]]<br>DIY Uncommon Retro Rainbow Plushy
|Click-to-Win: Non-Annual<br>DIY Design - November 2025
|Yes
|-
|[[File:Dougholidayplush.png]]<br>Doug Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2013  
|Yes
|-
|[[File:Dougthedogplushy.png]]<br>Doug the Dog Plushy
|Challenges<br>Current Challenges - An Air of Mystery Challenge  
|Yes
|-
|[[File:Drquackcampaignplushy.png]]<br>Dr. Quack Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2016
|Yes
|-
|[[File:Drquackhalloweenplushy.png]]<br>Dr. Quack Halloween Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Dr. Quack
|Yes
|-
|[[File:Drquackholidayplush.png]]<br>Dr. Quack Holiday Plush
|Christmas Countdown<br>2012
|Yes
|-
|[[File:Drquackplushtoy.png]]<br>Dr. Quack Plush Toy
|Retired WShop Items
|Yes
|-
|[[File:Drquackthanksgivingplushy.png]]<br>Dr. Quack Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2017
|Yes
|-
|[[File:Ducklingplushy.png]]<br>Duckling Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2017
|Yes
|-
|[[File:Eggplushy.png]]<br>Egg Plushy
|Community Code
|Yes
|-
|[[File:Ellamcwoofholidayplushy.png]]<br>Ella McWoof Holiday Plushy
|Christmas Countdown<br>2015
|Yes
|-
|[[File:Ellamcwoofplushy.png]]<br>Ella McWoof Plushy
|Challenges<br>Seasonal Challenges - Webkinz Newz Week Challenge 2021
|Yes
|-
|[[File:Fieldmouseplushy.png]]<br>Field Mouse Plushy
|Click-to-Win: Annual<br>Fall Fest - 2017
|Yes
|-
|[[File:Fionafeathersholidayplushy.png]]<br>Fiona Feathers Holiday Plushy
|Christmas Countdown<br>2017
|Yes
|-
|[[File:Fionafeathersplushy.png]]<br>Fiona Feathers Plushy
|SPREE!<br>Kinzville Mall Prize
|Yes
|-
|[[File:Fionafeathersvalentinesplushy.png]]<br>Fiona Feathers Valentines Plushy
|Holiday Gift<br>Valentine's Day Gift - 2022
|Yes
|-
|[[File:Fionaplushy.png]]<br>Fiona Plushy
|Holiday Gift<br>Spring Celebration Gift - 2024
|Yes
|-
|[[File:Fishkingfloppyplush.png]]<br>Fish King Floppy Plush
|Adventure Park<br>Quests - Deep Water Dilemma (Chimpanzee)
|Yes
|-
|[[File:Foxcubplushy.png]]<br>Fox Cub Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2018
|Yes
|-
|[[File:Fredroverplushy.png]]<br>Fred Rover Plushy
|Daily KinzCare  
|Yes
|-
|[[File:Fredroverholidayplush.png]]<br>Fred Rover Holiday Plush
|Christmas Countdown<br>2020
|Yes
|-
|[[File:Friendlyfroggyplushy.png]]<br>Friendly Froggy Plushy
|Community Code
|Yes
|-
|[[File:frogprinceplushy.png]]<br>Frog Prince Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2020
|Yes
|-
|[[File:Gartersnaketoy.png]]<br>Garter Snake Toy
|Click-to-Win: Annual<br>Fall Fest - 2019  
|Yes
|-
|[[File:Ghostpirateplush.png]]<br>Ghost Pirate Plush
|Adventure Park<br>Quests - Ghost Pirate Princess Rescue (Pink and White Cat)
|Yes
|-
|[[File:Giantzangozplushy.png]]<br>Giant Zangoz Plushy
|Challenges<br>Seasonal Challenges - Wacky Zingoz Celebration Challenge 2015 
|Yes
|-
|[[File:Giantzingozplushy.png]]<br>Giant Zingoz Plushy
|SPREE!<br>Kinzville Mall Prize  
|Yes
|-
|[[File:Gigglyzumplushy.png]]<br>Giggly Zum Plushy
|Holiday Gifts<br>Christmas Gifts - 2020
|Yes
|-
|[[File:Gingerbreadfloppyplush.png]]<br>Gingerbread Floppy Plush
|Christmas Countdown<br>2023
|Yes
|-
|[[File:Glampiredoll.png]]<br>Glampire Doll
|Webkinz Next<br>Wheel of WOW
|No
|-
|[[File:Gooberhalloweenplushy.png]]<br>Goober Halloween Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Goober
|Yes
|-
|[[File:Gooberholidayplush.png]]<br>Goober Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2012 
|Yes
|-
|[[File:Gooberplush.png]]<br>Goober Plush
|Family Score  
|Yes
|-
|[[File:Gooberthanksgivingplushy.png]]<br>Goober Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2024
|Yes 
|-
|[[File:Goobervalentinesplushy.png]]<br>Goober Valentines Plushy
|Holiday Gift<br>Valentines - 2024
|Yes
|-
|[[File:Googooberrybear.png]]<br>Goo-Goo Berry Bear
|Click-to-Win: Annual<br>Berry Fest - 2021
|Yes
|-
|[[File:Googooberryplushy.png]]<br>Goo-Goo Berry Plushy
|Click-to-Win: Annual<br>Berry Fest - 2022
|Yes
|-
|[[File:Gophertoy.png]]<br>Gopher Toy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2017
|Yes
|-
|[[File:Greengoblinplushy.png]]<br>Green Goblin Plushy
|Click-to-Win: Non-Annual<br>Lil Goblins
|Yes
|-
|[[File:Greysquirrelplushy.png]]<br>Grey Squirrel Plushy
|Click-to-Win: Annual<br>Fall Fest - 2016
|Yes
|-
|[[File:Hangingbatplushy.png]]<br>Hanging Bat Plushy
|Click-to-Win: Non-Annual<br>Flying Bat
|Yes
|-
|[[File:Hatchingchickplushy.png]]<br>Hatching Chick Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2023
|Yes
|-
|[[File:holidayelfplushy.png]]<br>Holiday Elf Plushy
|Community Code
|Yes
|-
|[[File:Holidaymouseplushy.png]]<br>Holiday Mouse Plushy
|Christmas Countdown<br>2025
|Yes
|-
|[[File:Holidaytubbytummiesbear.png]]<br>Holiday Tubby Tummies Bear
|Holiday Gift<br>Christmas - 2005 
|Yes
|-
|[[File:Hollyhopperholidayplushy.png]]<br>Holly Hopper Holiday Plushy
|Holiday Gift<br>Christmas - 2025
|Yes
|-
|[[File:Hollyhopperplushy.png]]<br>Holly Hopper Plushy
|Community Code
|Yes
|-
|[[File:Hollyhopperthanksgivingplushy.png]]<br>Holly Hopper Thanksgiving Plushy
|Holiday Gift<br>Thanksgiving - 2021
|Yes
|-
|[[File:Hopeplush.png]]<br>Hope Plush
|Wheels & Games<br>Token Balloon Darts
|Yes
|-
|[[File:Hotdogplushy.png]]<br>Hot Dog Plushy
|Click-to-Win: Non-Annual<br>Kinzville Hot Dog Event - 2023
|Yes
|-
|[[File:Hummingbirdplushy.png]]<br>Hummingbird Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2026
|Yes
|-
|[[File:Huskybluesplushy.png]]<br>Husky Blues Plushy
|Click-to-Win: Annual<br>Winterfest Cookie 2025
|Yes
|-
|[[File:Icemanbluesplushy.png]]<br>Iceman Blues Plushy
|Click-to-Win: Annual<br>Winterfest - 2024
|Yes
|-
|[[File:Inukshukplushy.png]]<br>Inukshuk Plushy
|Challenges<br>Seasonal - Winterfest 2016
|Yes
|-
|[[File:Jumbleberrybear.png]]<br>Jumbleberry Bear
|Jumbleberry Fields<br>Jumbleberry Prizes
|Yes
|-
|[[File:Ketchupplushy.png]]<br>Ketchup Plushy
|Click-to-Win: Non-Annual<br>Kinzville Hot Dog Event - 2024
|Yes
|-
|[[File:Kiwibirdplushy.png]]<br>Kiwi Bird Plushy
|SPREE!<br>Kinzville Mall Prize  
|Yes
|-
|[[File:Lazyzumplushy.png]]<br>Lazy Zum Plushy
|Holiday Gifts<br>Christmas Gifts - 2021
|Yes
|-
|[[File:Leprechaunplushtoy.png]]<br>Leprechaun Plush Toy
|Webkinz Friends<br>Seasonal Quest Prizes
|Yes
|-
|[[File:Littlelambplushy.png]]<br>Little Lamb Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2021
|Yes
|-
|[[File:Malefairyplush.png]]<br>Male Fairy Plush
|Magical Forest<br>Woodland Wonders  
|Yes
|-
|[[File:Mandywebkinzplushy.png]]<br>Mandy Webkinz Plushy
|Clubhouse Events<br>Webkinz Newz Week 2021
|Yes
|-
|[[File:Mayorcowabelleplushy.png]]<br>Mayor Cowabelle Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Cowabelle 
|Yes
|-
|[[File:Mayordrquackholidayplush.png]]<br>Mayor Dr. Quack Holiday Plush
|Christmas Countdown<br>2021
|Yes
|-
|[[File:Mayordrquackplushy.png]]<br>Mayor Dr. Quack Plushy
|Host Gifts<br>Dr. Quack
|Yes
|-
|[[File:Mayorgooberplushy.png]]<br>Mayor Goober Plushy 
|Kinzville Park<br>Meet the Mayor - Mayor Goober
|Yes
|-
|[[File:Mayorsophiestockwellplushy.png]]<br>Mayor Sophie Stockwell Plushy
|Kinzville Park<br>Meet the Mayor - Mayor Sophie
|Yes
|-
|[[File:Michaelwebkinzplushy.png]]<br>Michael Webkinz Plushy
|Clubhouse Events<br>Webkinz Newz Week - 2021
|Yes
|-
|[[File:Msbiscuitsplush.png]]<br>Ms Biscuits Plush
|Challenges<br>Current Challenges - One World Two Games
|Yes
|-
|[[File:Mollykinzplushy.png]]<br>Molly 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Monkeyandmonkeydummy.png]]<br>Monkey and Monkey Dummy
|Wheel & Games<br>Wheel of Yum  
|Yes
|-
|[[File:Monkeyandmonkeyplushy.png]]<br>Monkey and Monkey Plushy
|Daily KinzCare
|Yes
|-
|[[File:Moonberrybear.png]]<br>Moonberry Bear
|Jumbleberry Fields<br>Moonberry Prizes
|Yes
|-
|[[File:Mrmooplushy.png]]<br>Mr. Moo Plushy
|Party Packs<br>Party Loot Bag Prizes
|Yes
|-
|[[File:Msbirdyholidayplush.png]]<br>Ms. Birdy Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2009
|Yes
|-
|[[File:Msbirdyholidayplushy.png]]<br>Ms. Birdy Holiday Plushy
|Christmas Countdown<br>2014
|Yes
|-
|[[File:Msbirdypinkplushy.png]]<br>Ms. Birdy Pink Plushy
|Host Gifts<br>Ms. Birdy 
|Yes
|-
|[[File:Msbirdyplushtoy.png]]<br>Ms. Birdy Plush Toy
|WShop  
|Yes
|-
|[[File:Msbirdythanksgivingplushy.png]]<br>Ms. Birdy Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2016
|Yes
|-
|[[File:Msbirdyvalentinesplushy.png]]<br>Ms. Birdy Valentine's Plushy
|Holiday Gifts<br>Valentine's Day Gift - 2019
|Yes
|-
|[[File:Mscowolineholidayplush.png]]<br>Ms. Cowoline Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2010
|Yes
|-
|[[File:Mscowolineplush.png]]<br>Ms. Cowoline Plush
|Kinzville Academy<br>Buried Treasure - Retired
|Yes
|-
|[[File:Mscowolinethanksgivingplushy.png]]<br>Ms Cowoline Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2023
|Yes
|-
|[[File:Nafariaplush.png]]<br>Nafaria Plush
|Magical Forest<br>Magic Mire  
|Yes
|-
|[[File:Nibbleskinzplushy.png]]<br>Nibbles 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Nutsplushy.png]]<br>Nuts Plushy
|SPREE!<br>Kinzville Mall Prize
|Yes
|-
|[[File:Orangechipmunkplushy.png]]<br>Orange Chipmunk Plushy
|Click-to-Win: Non-Annual<br>Peanut Floaty
|Yes
|-
|[[File:Orangegoblinplushy.png]]<br>Orange Goblin Plushy
|Click-to-Win: Non-Annual<br>Lil Goblins
|Yes
|-
|[[File:Orangeleprechaunplushtoy.png]]<br>Orange Leprechaun Plush Toy
|Kinzville Park<br>Leprechaun Chase - 2024
|Yes
|-
|[[File:Orangetoadplushy.png]]<br>Orange Toad Plushy
|Kinzville Park<br>Lil Toads
|Yes
|-
|[[File:Peachplushy.png]]<br>Peach Plushy
|Community Code
|Yes
|-
|[[File:Persephoneholidayplush.png]]<br>Persephone Holiday Plush
|Christmas Countdown<br>2018 
|Yes
|-
|[[File:Persephoneplushdoll.png]]<br>Persephone Plush Doll
|Trading Cards<br>Series 4  
|Yes
|-
|[[File:Petalplushy.png]]<br>Petal Plushy
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2023
|Yes
|-
|[[File:Pickleberrybear.png]]<br>Pickleberry Bear
|Jumbleberry Fields<br>Pickleberry Prizes
|Yes
|-
|[[File:Pineappleplushy.png]]<br>Pineapple Plushy
|Community Code  
|Yes
|-
|[[File:Pinkgooglesplushy.png]]<br>Pink Googles Plushy
|Deluxe Membership<br>Subscription Bonus - 2024
|Yes
|-
|[[File:Pjcolliecampaignplush.png]]<br>PJ Collie Campaign Plush
|Kinzville Park<br>Webkinz Votes - 2018
|Yes
|-
|[[File:Pjcollieholidayplush.png]]<br>PJ Collie Holiday Plush
|Christmas Countdown<br>2011 
|Yes
|-
|[[File:Pjcollieplush.png]]<br>PJ Collie Plush
|Wheels & Games<br>Token Balloon Darts  
|Yes
|-
|[[File:Plumpyholidayplush.png]]<br>Plumpy Holiday Plush
|Christmas Countdown<br>2010
|Yes
|-
|[[File:Plumpyplushdoll.png]]<br>Plumpy Plush Doll
|Trading Cards<br>Series 3  
|Yes
|-
|[[File:Plushbesties.png]]<br>Plush Besties
|Webkinz Newz<br>Video Challenge Prizes - Looney Tunes
|Yes
|-
|[[File:Polarbearcubplushy.png]]<br>Polar Bear Cub Plushy
|Webkinz Newz<br>Video Challenge Prizes - Kinectimals
|Yes
|-
|[[File:Polarberrybear.png]]<br>Polarberry Bear
|Click-to-Win: Annual<br>Berry Fest - 2021
|Yes
|-
|[[File:Polarberryplushy.png]]<br>Polarberry Plushy
|Click-to-Win: Annual<br>Berry Fest - 2022
|Yes
|-
|[[File:Ponchofloppyplush.png]]<br>Poncho Floppy Plush
|Wheels & Games<br>Prize Klaw  
|Yes
|-
|[[File:Prestoplush.png]]<br>Presto Plush
|Wheels & Games<br>Token Balloon Darts
|Yes
|-
|[[File:Purplechipmunkplushy.png]]<br>Purple Chipmunk Plushy
|Click-to-Win: Non-Annual<br>Peanut Floaty
|Yes
|-
|[[File:Purplegoblinplushy.png]]<br>Purple Goblin Plushy
|Click-to-Win: Non-Annual<br>Lil Goblins
|Yes
|-
|[[File:Purplespringkiwiplushy.png]]<br>Purple Spring Kiwi Plushy
|Community Code
|Yes
|-
|[[File:Purpletoadplushy.png]]<br>Purple Toad Plushy
|Kinzville Park<br>Lil Toads
|Yes
|-
|[[File:Quizzyholidayplush.png]]<br>Quizzy Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2011 
|Yes
|-
|[[File:Quizzyplushtoy.png]]<br>Quizzy Plush Toy
|WShop  
|Yes
|-
|[[File:Rainbowpandaplushy.png]]<br>Rainbow Panda Plushy
|Community Code
|Yes
|-
|[[File:Rafiplushtoy.png]]<br>Rafi Plush Toy
|Adventure Park<br>Quests - Weather Worries (Spotted Leopard)
|Yes
|-
|[[File:Razielplushtoy.png]]<br>Raziel Plush Toy
|Adventure Park<br>Quests - Dragon's Den (Spotted Frog)
|Yes
|-
|[[File:Redleprechaunplushtoy.png]]<br>Red Leprechaun Plush Toy
|Kinzville Park<br>Leprechaun Chase - 2024
|Yes
|-
|[[File:Redsquirrelplushy.png]]<br>Red Squirrel Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2016
|Yes
|-
|[[File:Reindeerfloppyplush.png]]<br>Reindeer Floppy Plush
|Christmas Countdown<br>2022
|Yes
|-
|[[File:Robertakinzplushy.png]]<br>Roberta 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Robinplushy.png]]<br>Robin Plushy
|Click-to-Win: Non-Annual<br>Tulip Bulb Floaty
|Yes
|-
|[[File:Salleycatcampaignplushy.png]]<br>Salley Cat Campaign Plushy
|Kinzville Park<br>Webkinz Votes - 2016 
|Yes
|-
|[[File:Salleycatkinzplushy.png]]<br>Salley Cat 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Sallywebkinzplushy.png]]<br>Sally Webkinz Plushy
|Clubhouse Events<br>Webkinz Newz Week 2021
|Yes
|-
|[[File:Santakinzplushy.png]]<br>SantaKinz Plushy
|Holiday Gifts<br>Christmas Gifts - 2015
|Yes
|-
|[[File:Scarecrowplushy.png]]<br>Scarecrow Plushy
|Collection Events<br>Acorn Collection - 2019
|Yes
|-
|[[File:Seacreatureplushy.png]]<br>Sea Creature Plushy
|Vacation Island<br>Sheldon's Souvenir Stand - Current
|Yes
|-
|[[File:Seraplushtoy.png]]<br>Sera Plush Toy
|Adventure Park<br>Quests - The Lost Pirate Treasure (Koala) 
|Yes
|-
|[[File:Shamrockplushy.png]]<br>Shamrock Plushy
|Community Code
|Yes
|-
|[[File:Sheldonplushy.png]]<br>Sheldon Plushy
|Vacation Island<br>Sheldon's Souvenir Stand - Current
|Yes
|-
|[[File:Sillyscoopsplush.png]]<br>Silly Scoops Plush
|Media Promotions<br>Silly Scoops
|Yes
|-
|[[File:Sleepycatplushy.png]]<br>Sleepy Cat Plushy
|Wheels & Games<br>Wheel of the Month  
|Yes
|-
|[[File:Snowbearplushy.png]]<br>Snow Bear Plushy
|Community Code
|Yes
|-
|[[File:Snowdogplushy.png]]<br>Snow Dog Plushy
|Click-to-Win: Annual<br>Winterfest - 2026
|Yes
|-
|[[File:Snowmanplushy.png]]<br>Snowman Plushy
|Holiday Gifts<br>Christmas Gift - 2018 
|Yes
|-
|[[File:Snowshoehareplushy.png]]<br>Snowshoe Hare Plushy
|Click-to-Win: Annual<br>Winterfest - 2018
|Yes
|-
|[[File:snowyretrieverpuppyplushy.png]]<br>Snowy Retriever Puppy Plushy
|Holiday Gifts<br>Christmas Gift - 2019 
|Yes
|-
|[[File:Sophiestockwellcampaignplush.png]]<br>Sophie Stockwell Campaign Plush
|Kinzville Park<br>Webkinz Votes - 2018
|Yes
|-
|[[File:sophiestockwellholidayplush.png]]<br>Sophie Stockwell Holiday Plush
|Christmas Countdown<br>2019
|Yes
|-
|[[File:Sophiethanksgivingplushy.png]]<br>Sophie Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2019
|Yes
|-
|[[File:Sparkykinzplushy.png]]<br>Sparky 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Spectaclescatplushy.png]]<br>Spectacles Cat Plushy
|Webkinz Next<br>Challenge Prizes
|Yes
|-
|[[File:Spookyghostplushy.png]]<br>Spooky Ghost Plushy
|Challenges<br>Seasonal Challenges - Halloween Challenge 2018  
|Yes
|-
|[[File:Springchickplushy.png]]<br>Spring Chick Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2018
|Yes
|-
|[[File:Stevewebkinzplushy.png]]<br>Steve Webkinz Plushy
|Clubhouse Events<br>Webkinz Newz Week 2021
|Yes
|-
|[[File:Stoogleskinzplushy.png]]<br>Stoogles 'Kinz Plushy
|Webkinz Newz
|Yes
|-
|[[File:Sugarberrybear.png]]<br>Sugarberry Bear
|Jumbleberry Fields<br>Sugarberry Prizes
|Yes
|-
|[[File:Sunflowerplushy.png]]<br>Sunflower Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2025
|Yes
|-
|[[File:Sweetheartplushy.png]]<br>Sweetheart Plushy
|Collection Events<br>Valentines Collection - 2019
|Yes
|-
|[[File:Sweetheartwhaleplushy.png]]<br>Sweetheart Whale Plushy
|Community Code  
|Yes
|-
|[[File:Tabbyholidayplush.png]]<br>Tabby Holiday Plush
|Holiday Gifts<br>Christmas Gifts - 2014  
|Yes
|-
|[[File:Tabbyvonmeowplushtoy.png]]<br>Tabby Von Meow Plush Toy
|WShop
|Yes
|-
|[[File:Tabbyvonmeowthanksgivingplushy.png]]<br>Tabby Von Meow Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2022
|Yes
|-
|[[File:Thornplushy.png]]<br>Thorn Plushy
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2023
|Yes
|-
|[[File:Toylizard.png]]<br>Toy Lizard
|Clubhouse Events<br>Jessie TV Show Promotion
|Yes
|-
|[[File:Tubbytummiesbrownbear.png]]<br>Tubby Tummies Brown Bear
|WShop
|Yes
|-
|[[File:Tubbytummiestanbear.png]]<br>Tubby Tummies Tan Bear
|WShop
|Yes
|-
|[[File:Turkeyplushy.png]]<br>Turkey Plushy
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2021
|Yes
|-
|[[File:Twentyyeartigerplushy.png]]<br>Twenty Year Tiger Plushy
|Wheels & Games<br>Wheel of WOW
|Yes
|-
|[[File:Valentinestubbytummiesbear.png]]<br>Valentine's Tubby Tummies Bear
|Holiday Gifts<br>Valentine's Day Gifts - 2009 
|Yes
|-
|[[File:Vintageteddybear.png]]<br>Vintage Teddy Bear
|Collection Events<br>Pumpkin Pie Collection - 2023
|Yes
|-
|[[File:Violetleprechaunplushtoy.png]]<br>Violet Leprechaun Plush Toy
|Kinzville Park<br>Leprechaun Chase - 2024
|Yes
|-
|[[File:Wackystudentplush.png]]<br>Wacky Student Plush
|Kinzville Academy<br>Recess - Buried Treasure - Retired
|Yes
|-
|[[File:Wackythanksgivingplushy.png]]<br>Wacky Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2015
|Yes
|-
|[[File:Wackyzingozplush.png]]<br>Wacky Zingoz Plush
|Media Promotions<br>Smurf Movie
|Yes
|-
|[[File:Webkinzfoundationplushbear.png]]<br>Webkinz Foundation<br>Plush Bear
|Webkinz Cares<br>Webkinz Cares Prizes
|Yes
|-
|[[File:Webkinzrockerzcatplushtoy.png]]<br>Webkinz Rockerz Cat<br>Plush Toy
|Wheels & Games<br>Wheel of WOW
|Yes
|-
|[[File:Webkinzrockerzcowplushtoy.png]]<br>Webkinz Rockerz Cow<br>Plush Toy
|Holiday Gifts<br>Christmas - 2023
|Yes
|-
|[[File:Webkinzrockerzlionplushtoy.png]]<br>Webkinz Rockerz Lion<br>Plush Toy
|Webkinz Friends<br>Quest Prizes
|Yes
|-
|[[File:Whitegooglesplushy.png]]<br>White Googles Plushy
|Community Code
|Yes
|-
|[[File:Whitemouseplushy.png]]<br>White Mouse Plushy
|Click-to-Win: Annual<br>Fall Fest - 2018
|Yes
|-
|[[File:Whitetigercubplushy.png]]<br>White Tiger Cub Plushy
|Webkinz Newz<br>Video Challenge Prizes - Kinectimals 
|Yes
|-
|[[File:Winterreindeerplushy.png]]<br>Winter Reindeer Plushy
|Christmas & Hanukkah WShop<br>Introduced in 2024
|Yes
|-
|[[File:Winterfestplushy.png]]<br>Winterfest Plushy
|Click-to-Win: Annual<br>Winterfest - 2021
|Yes
|-
|[[File:Winterfestraccoonplushy.png]]<br>Winterfest Raccoon Plushy
|Click-to-Win: Annual<br>Winterfest - 2023
|Yes
|-
|[[File:Winterfestwackyplushy.png]]<br>Winterfest Wacky Plushy
|Click-to-Win: Annual<br>Winterfest Cookie - 2017 
|Yes
|-
|[[File:Yellowchickplushy.png]]<br>Yellow Chick Plushy
|Media Promotions<br>HOP Movie
|Yes
|-
|[[File:Yellowleprechaunplushtoy.png]]<br>Yellow Leprechaun Plush Toy
|Kinzville Park<br>Leprechaun Chase - 2024
|Yes
|-
|[[File:Yellowspringkiwiplushy.png]]<br>Yellow Spring Kiwi Plushy
|Community Code
|Yes
|-
|[[File:Yetiplushy.png]]<br>Yeti Plushy
|Click-to-Win: Annual<br>Winterfest - 2016 
|Yes
|-
|[[File:Zangozholidayplushy.png]]<br>Zangoz Holiday Plushy
|Holiday Gifts<br>Christmas Gift - 2017
|Yes
|-
|[[File:Zangozplushtoy.png]]<br>Zangoz Plush Toy
|WShop  
|Yes
|-
|[[File:Zangozthanksgivingplushy.png]]<br>Zangoz Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts - 2014
|Yes
|-
|[[File:Zingozholidayplushy.png]]<br>Zingoz Holiday Plushy
|Holiday Gifts<br>Christmas Gifts - 2016 
|Yes
|-
|[[File:Zingozplushy.png]]<br>Zingoz Plushy
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2008
|Yes
|-
|[[File:Zippyzumplushy.png]]<br>Zippy Zum Plushy
|Holiday Gifts<br>Christmas Gifts - 2022
|Yes
|-
|[[File:Zumplush.png]]<br>Zum Plush
|Zumwhere<br>Zum Catalog Prizes
|Yes
|}`) 
  },
  {
    id: "trophies",
    name: "Trophy Collection",
    description: "Trophies imported from the Webkinz Guide collection page.",
    category: "Awards",
    items: parseWikiRawTable(`{{Top Link|[[Item Collections|>> Click here to return to the Item Collections Index.]]}}
''This page shows all the trophies in Webkinz World. You may be looking for [[(Item Guide) Trophies]].''

A '''Trophy''' is a displayable item awarded to players who achieve a certain goal. Trophies can be won in the [[Arcade]], contests, as login prizes, or in other ways. 

To read more on the mechanism for awarding any of the below trophies, see its corresponding [[Webkinz Item Guide]] page.

{| class="goldtable" width="70%"
|- align="left"
!Item
!Availability
!Tradeable
|-
|[[File:Antmaniatrophy.png]]<br>Ant Mania Trophy
|Trophy Challenge
|Yes
|-
|[[File:Atlantilestrophy.png]]<br>Atlantiles Trophy
|Arcade Game
|No
|-
|[[File:Bamboobreaktrophy.png]]<br>Bamboo Break Trophy
|Arcade Game
|No
|-
|[[File:Bananzatrophy.png]]<br>Bananza Trophy
|Trophy Challenge
|Yes
|-
|[[File:Bannerblitztrophy.png]]<br>Banner Blitz Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Bannersaboundtrophy.png]]<br>Banners Abound Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Boogergetsanatrophy.png]]<br>Booger Gets an A Trophy
|Arcade Game
|Yes
|-
|[[File:Bouncenbursttrophy.png]]<br>Bounce 'N Burst Trophy
|Arcade Game
|Yes
|-
|[[File:Bowlingtrophy.png]]<br>Bowling Trophy
|Webkinz Friends - Quest Prize
|Yes
|-
|[[File:Bronzeamateurcompetitiontrophy.png]]<br>Bronze Amateur Competition Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzebeautypageanttrophy.png]]<br>Bronze Beauty Pageant Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzecookingcompetitiontrophy.png]]<br>Bronze Cooking Competition Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzedeluxebeautytrophy.png]]<br>Bronze Deluxe Beauty Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzedeluxecookingtrophy.png]]<br>Bronze Deluxe Cooking Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzedeluxerunningtrophy.png]]<br>Bronze Deluxe Running Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Bronzepolarplungetrophy.png]]<br>Bronze Polar Plunge Trophy
|Arcade Game
|No
|-
|[[File:Bronzerunningracetrophy.png]]<br>Bronze Running Race Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Candybash2trophy.png]]<br>Candy Bash 2 Trophy
|Arcade Game
|Yes
|-
|[[File:Candybashtrophy.png]]<br>Candy Bash Trophy
|Arcade Game
|Yes
|-
|[[File:Cashcow2trophy.png]]<br>Cash Cow 2 Trophy
|Trophy Challenge
|Yes
|-
|[[File:Cashcowtrophy.png]]<br>Cash Cow Trophy
|Arcade Game
|Yes
|-
|[[File:Checkerstrophy.png]]<br>Checkers Trophy
|Trophy Challenge
|Yes
|-
|[[File:Chocolatewackytrophy.png]]<br>Chocolate Wacky Trophy
|Wacky Zingoz Celebration - Webkinz World Click-to-Win
|Yes
|-
|[[File:Clothingdesigntrophy.png]]<br>Clothing Design Trophy
|Contest Trophy
|No
|-
|[[File:Clubhousetrophy.png]]<br>Clubhouse Trophy
|Unreleased
|
|-
|[[File:Colorstormtrophy.png]]<br>Color Storm Trophy
|Trophy Challenge
|Yes
|-
|[[File:Craftycritterztrophy.png]]<br>Crafty Critterz Trophy
|Contest Trophy
|Yes 
|-
|[[File:Dashingdolphintrophy.png]]<br>Dashing Dolphin Trophy
|Trophy Challenge
|Yes
|-
|[[File:Deadenddangerstrophy.png]]<br>Dead End Dangers Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Dexdangeroustrophy.png]]<br>Dex Dangerous Trophy
|Trophy Challenge
|Yes
|-
|[[File:Dicekinztrophy.png]]<br>Dicekinz Trophy
|Login Gift 
|Yes
|-
|[[File:Dogbeardsbathtubbattlestrophy.png]]<br>Dogbeard's Bathtub Battles Trophy
|Trophy Challenge
|Yes
|-
|[[File:Eagerbeaveradventureparktrophy.png]]<br>Eager Beaver Adventure Park Trophy
|Arcade Game
|No
|-
|[[File:Fantasticfirstflagstrophy.png]]<br>Fantastic First Flags Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Firstwebkinzdaytrophy.png]]<br>First Webkinz Day Trophy
|Webkinz Day Gift
|Yes
|-
|[[File:Fishingderbytrophy.png]]<br>Fishing Derby Trophy
|Webkinz Newz
|Yes
|-
|[[File:Flagfinderfurytrophy.png]]<br>Flag Finder Fury Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Flagfortunetrophy.png]]<br>Flag Fortune Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Flagorderforagetrophy.png]]<br>Flag Order Forage Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
| [[File:Floorflagfolliestrophy.png]]<br>Floor Flag Follies Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Flutterbuggedtrophy.png]]<br>Flutterbugged Trophy
|Arcade Game
|No
|-
|[[File:Friendsoftheearthtrophy.png]]<br>Friends of the Earth Trophy
|Webkinz Newz
|Yes
|-
|[[File:Frostyfinishtrophy.png]]<br>Frosty Finish Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Gallopinggardentrophy.png]]<br>Galloping Garden Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Getelevensolitairetrophy.png]]<br>Get Eleven Solitaire Trophy
|Trophy Challenge 
|Yes
|-
|[[File:Gogogooglestrophy.png]]<br>Go-Go Googles Trophy
|Arcade Game
|Yes
|-
|[[File:Goldamateurcompetitiontrophy.png]]<br>Gold Amateur Competition Trophy
|Webkinz Stadium Trophy
|Yes 
|-
|[[File:Goldbeautypageanttrophy.png]]<br>Gold Beauty Pageant Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Goldcardcollectortrophy.png]]<br>Gold Card Collector Trophy
|Trading Cards - Series 1
|Yes
|-
|[[File:Goldcookingcompetitiontrophy.png]]<br>Gold Cooking Competition Trophy
|Webkinz Stadium Trophy
| Yes 
|-
|[[File:Golddeluxebeautytrophy.png]]<br>Gold Deluxe Beauty Competition Trophy
|Webkinz Stadium Trophy
|Yes 
|-
|[[File:Golddeluxecookingtrophy.png]]<br>Gold Deluxe Cooking Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Golddeluxerunningtrophy.png]]<br>Gold Deluxe Running Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Goldentennistrophy.png]]<br>Golden Tennis Trophy
|Figure Specific Item for eStore Center Court Collie Figure
|Yes
|-
|[[File:Goldentrumpettrophy.png]]<br>Golden Trumpet Trophy
|Figure Specific Item for Series 1 Trumpet Playing Googles Figure
|Yes
|-
|[[File:Goldpolarplungetrophy.png]]<br>Gold Polar Plunge Trophy
|Arcade Game 
|No
|-
|[[File:Goldrunningracetrophy.png]]<br>Gold Running Race Trophy
|Webkinz Stadium Trophy
|Yes 
|-
|[[File:Goldzingozpoptrophy.png]]<br>Gold Zingoz Pop Trophy
|Arcade Game
|Yes
|-
|[[File:Goobersatomiclabtrophy.png]]<br>Goober's Atomic Lab Trophy
|Arcade Game
|No
|-
|[[File:Goobersclassroomlabtrophy.png]]<br>Goober's Classroom Lab Trophy
|Arcade Game
|No
|-
|[[File:Gooberscompanylabtrophy.png]]<br>Goober's Company Lab Trophy
|Arcade Game
|No
|-
|[[File:Goobershomelabtrophy.png]]<br>Goober's Home Lab Trophy
|Arcade Game
|No
|-
|[[File:Gooberslabtrophy.png]]<br>Goober's Lab Trophy
|Arcade Game
|Yes
|-
|[[File:Gooberssecretlabtrophy.png]]<br>Goober's Secret Lab Trophy
|Arcade Game
|No
|-
|[[File:Goobersuniversitylabtrophy.png]]<br>Goober's University Lab Trophy
|Arcade Game
|No
|-
|[[File:Goodygumdropstrophy.png]]<br>Goody Gumdrops Trophy 
|Arcade Game
|No
|-
|[[File:Grandgrottotrophy.png]]<br>Grand Grotto Trophy
|Arcade Game
|No
|-
|[[File:Halloweenhunttrophy.png]]<br>Halloween Hunt Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Hatchthedragontrophy.png]]<br>Hatch the Dragon Trophy
|Arcade Game
|Yes
|-
|[[File:Hedgemazemaniatrophy.png]]<br>Hedge Maze Mania Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Holidayhustletrophy.png]]<br>Holiday Hustle Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Homebeforedarktrophy.png]]<br>Home Before Dark Trophy
|Trophy Challenge
|Yes
|-
|[[File:Hoppylittlerocketshiptrophy.png]]<br>Hoppy Little Rocketship Trophy
|Arcade Game
|No
|-
|[[File:Hungryhogtrophy.png]]<br>Hungry Hog Trophy
|Trophy Challenge
|Yes
|-
|[[File:Inventingtrophy1stplace.png]]<br>Inventing Trophy 1st Place
|Unreleased
|Yes
|-
|[[File:Inventingtrophy2ndplace.png]]<br>Inventing Trophy 2nd Place
|Unreleased
|Yes
|-
|[[File:Inventingtrophy3rdplace.png]]<br>Inventing Trophy 3rd Place 
|Unreleased
|Yes
|-
|[[File:Itemdesigntrophy.png]]<br>Item Design Trophy
|Contest Trophy
|No 
|-
|[[File:Jazzmonsterstrophy.png]]<br>Jazz Monsters Trophy
|Trophy Challenge
|Yes
|-
|[[File:Jeweljaunttrophy.png]]<br>Jewel Jaunt Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Jumbleberryblasttrophy.png]]<br>Jumbleberry Blast Trophy
|Arcade Game
|No
|-
|[[File:Jumbleberryfieldstrophy.png]]<br>Jumbleberry Fields Trophy 
|Trophy Challenge
|Yes
|-
|[[File:Kinzvilleacademyairhockeytrophy.png]]<br>Kinzville Academy Air Hockey Trophy
|Kinzville Academy<br>Super School Giveaway
|Yes
|-
|[[File:Kinzvilleacademybowlingtrophy.png]]<br>Kinzville Academy Bowling Trophy
|Kinzville Academy<br>Super School Giveaway
|Yes
|-
|[[File:Kinzvilleacademycheckersclubtrophy.png]]<br>Kinzville Academy Checkers Club Trophy
|Kinzville Academy<br>Super School Giveaway
|Yes
|-
|[[File:Kinzvilleacademypooltrophy.png]]<br>Kinzville Academy Pool Trophy
|Kinzville Academy<br>Super School Giveaway
|Yes
|-
|[[File:Kinzvilleacademyskiingtrophy.png]]<br>Kinzville Academy Skiing Trophy
|Click-to-Win: Annual<br>Winterfest - Winterfest Cookie 2025
|Yes
|-
|[[File:Kinzvilleacademysnowboardtrophy.png]]<br>Kinzville Academy Snowboard Trophy
|Click-to-Win: Annual<br>Winterfest Cookie 2026
|Yes
|-
|[[File:Kinzvilleacademyspellingbeetrophy.png]]<br>Kinzville Academy Spelling Bee Trophy
|Kinzville Academy<br>Super School Giveaway
|Yes
|-
|[[File:Kinzvillebaseballtrophy.png]]<br>Kinzville Baseball Trophy
|Click-to-Win: Non-Annual<br>Kinzville Hot Dog Event - 2025
|Yes
|-
|[[File:Kinzvillesciencefairtrophy.png]]<br>Kinzville Science Fair Trophy
|Kinzville Park<br>Meet the Mayor - Mayor Goober
|Yes
|-
|[[File:Largegemfindertrophy.png]]<br>Large Gem Finder Trophy
|Doug the Dog prize
|Yes
|-
|[[File:Leagueofchampionstrophy.png]]<br>League of Champions Trophy 
|Retired W-shop - Beautiful Game Theme
|Yes
|-
|[[File:Leapoffaithflagstrophy.png]]<br>Leap of Faith Flags Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Lilypadz2trophy.png]]<br>Lilypadz 2 Trophy
|Arcade Game
|No
|-
|[[File:Lilypadztrophy.png]]<br>Lilypadz Trophy
|Trophy Challenge
|Yes
|-
|[[File:Linkdtrophy.png]]<br>Link'D Trophy
|Trophy Challenge
|Yes
|-
|[[File:Loopinglapstrophy.png]]<br>Looping Laps Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Lunchletterstrophy.png]]<br>Lunch Letters Trophy
|Trophy Challenge
|Yes
|-
|[[File:Masterblaster600trophy.png]]<br>Master Blaster 600 Trophy
|Arcade Game
|Yes
|-
|[[File:Mastercheftrophy.png]]<br>Master Chef Trophy
|Contest Trophy
|Yes
|-
|[[File:Mediumgemfindertrophy.png]]<br>Medium Gem Finder Trophy
|Doug the Dog prize
|Yes
|-
|[[File:Memberofthedaytrophy.png]]<br>Member of the Day Trophy
|Contest Trophy
|Yes
|-
|[[File:Mermonkeyartifacttrophy.png]]<br>Mermonkey Artifact Trophy
|Vacation Island - Don't Rock the Boat
|Yes
|-
|[[File:Mscowolinesrollcalltrophy.png]]<br>Ms.Cowoline's Roll Call Trophy
|Trophy Challenge
|Yes
|-
|[[File:Mvptrophyhat.png]]<br>MVP Trophy Hat 
|eStore Promo
|Yes
|-
|[[File:Operationgumballtrophy.png]]<br>Operation Gumball Trophy
|Arcade Game
|Yes
|-
|[[File:Pennantplungetrophy.png]]<br>Pennant Plunge Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Petalpursuittrophy.png]]<br>Petal Pursuit Trophy 
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Petdesigntrophy.png]]<br>Pet Design Trophy
|Contest Trophy 
|Yes 
|-
|[[File:Petpartyparadetrophy.png]]<br>Pet Party Parade Trophy
|Arcade Game 
|No
|-
|[[File:Picnictrophy.png]]<br>Picnic Trophy
|Trophy Challenge
|Yes
|-
|[[File:Pinkysbigadventuretrophy.png]]<br>Pinkys Big Adventure Trophy
|Trophy Challenge
|Yes
|-
|[[File:Pizzapalacetrophy.png]]<br>Pizza Palace Trophy
|Trophy Challenge
|Yes
|-
|[[File:Polarberryjamtrophy.png]]<br>Polarberry Jam Trophy
|Arcade Game
|No
|-
|[[File:Polarplungetrophy.png]]<br>Polar Plunge Trophy
|Arcade Game
|Yes
|-
|[[File:Pumpkinpatchprotectortrophy.png]]<br>Pumpkin Patch Protector Trophy
|Trophy Challenge
|Yes
|-
|[[File:Quizzystrophypiece.png]]<br>Quizzy's Trophy Piece
|eStore
|No
|-
|[[File:Riperounduptrophy.png]]<br>Ripe Roundup Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Rockerzbackstageruntrophy.png]]<br>Rockerz Backstage Run Trophy
|Arcade Game
|No
|-
|[[File:Roomdesigntrophy.png]]<br>Room Design Trophy
|Contest Trophy
|Yes
|-
|[[File:Roomdesigntrophy2.png]]<br>Room Design Trophy 2
|Contest Trophy
|Yes
|-
|[[File:Roomrummageflagstrophy.png]]<br>Room Rummage Flags Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Scrambledtrophy.png]]<br>Scrambled Trophy
|Arcade Game
|No 
|-
|[[File:Secondwebkinzdaytrophy.png]]<br>Second Webkinz Day Trophy
|Webkinz Day Gift
| Yes
|-
|[[File:Secretcheftrophy.png]]<br>Secret Chef Trophy
|Contest Trophy
|No
|-
|[[File:Series2collectortrophy.png]]<br>Series 2 Collector Trophy
|Trading Cards - Series 2
|Yes 
|-
|[[File:Shrewdsearcherstrophy.png]]<br>Shrewd Searchers Trophy
|Mazin' Hamsters - Maze Trophy 
|Yes
|-
|[[File:Silveramateurcompetitiontrophy.png]]<br>Silver Amateur Competition Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Silverbeautypageanttrophy.png]]<br>Silver Beauty Pageant Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Silvercookingcompetitiontrophy.png]]<br>Silver Cooking Competition Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Silverdeluxebeautytrophy.png]]<br>Silver Deluxe Beauty Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Silverdeluxecookingtrophy.png]]<br>Silver Deluxe Cooking Trophy
|Webkinz Stadium Trophy
|Yes
|-
|[[File:Silverdeluxerunningtrophy.png]]<br>Silver Deluxe Running Trophy
|Webkinz Stadium Trophy
|Yes 
|-
|[[File:Silvermicrophonetrophy.png]]<br>Silver Microphone Trophy
|Wheels & Games - Prize Klaw - Green Capsule 
|Yes
|-
|[[File:Silverpolarplungetrophy.png]]<br>Silver Polar Plunge Trophy
|Arcade Game
|No
|-
|[[File:Silverrunningracetrophy.png]]<br>Silver Running Race Trophy
|Webkinz Stadium Trophy 
|Yes
|-
|[[File:Silverzingozpoptrophy.png]]<br>Silver Zingoz Pop Trophy
|Arcade Game
|Yes
|-
|[[File:Smallgemfindertrophy.png]]<br>Small Gem Finder Trophy
|Doug the Dog prize
|Yes
|-
|[[File:Smoothiemovestrophy.png]]<br>Smoothie Moves Trophy
|Arcade Game (Only on Mobile)
|Yes
|-
|[[File:Socialmediasuperstartrophy.png]]<br>Social Media Superstar Trophy
|Contest Trophy
|No
|-
|[[File:Speedyscurrytrophy.png]]<br>Speedy Scurry Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Speedyslalomslopestrophy.png]]<br>Speedy Slalom Slopes Trophy
|Mazin' Hamsters - Maze Trophy 
|Yes
|-
|[[File:Spreetrophy.png]]<br>Spree Trophy
|Trophy Challenge
|Yes
|-
|[[File:Stackemupsolitairetrophy.png]]<br>Stack 'em Up Solitaire Trophy
|Trophy Challenge
|Yes
|-
|[[File:Stardropstrophy.png]]<br>Stardrops Trophy
|Arcade Game
|No
|-
|[[File:Startingspeedwaystrophy.png]]<br>Starting Speedways Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Streakystandardstrophy.png]]<br>Streaky Standards Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Supermodelztrophy.png]]<br>Supermodelz Trophy
|Trophy Challenge
|Yes
|-
|[[File:Superslugger600trophy.png]]<br>Super Slugger 600 Trophy
|Arcade Game - Wacky Zingoz Celebration
|Yes
|-
|[[File:Tiletowerstrophy.png]]<br>Tile Towers Trophy
|Trophy Challenge
|Yes
|-
|[[File:Tokencollectortrophy.png]]<br>Token Collector Trophy
|Contest Trophy
|Yes
|-
|[[File:Topstorytrophy.png]]<br>Top Story Trophy
|Clubhouse Events<br>Webkinz Newz Week - 2024
|Yes
|-
|[[File:Tourdeflagstrophy.png]]<br>Tour de Flags Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Treasuresofthecrystalseatrophy.png]]<br>Treasures of the Crystal Sea Trophy
|Vacation Island - Treasures of the Crystal Sea Game
|No
|-
|[[File:Trickytreasuretrophy.png]]<br>Tricky Treasure Trophy
| Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Triplestrikesolitairetrophy.png]]<br>Triple Strike Solitaire Trophy
|Trophy Challenge
|Yes 
|-
|[[File:Tropicaltroublestrophy.png]]<br>Tropical Troubles Trophy
|Trophy Challenge
|Yes
|-
|[[File:Tuliptroubletrophy.png]]<br>Tulip Trouble Trophy
|Trophy Challenge
|Yes
|-
|[[File:Tunnelingtwigzytrophy.png]]<br>Tunneling Twigzy Trophy
|Arcade Game
|No
|-
|[[File:Vexedveggiessearchtrophy.png]]<br>Vexed Veggies Search Trophy
|Mazin' Hamsters - Maze Trophy
|Yes
|-
|[[File:Wackyerzingoztrophy.png]]<br>WackyER Zingoz Trophy
|Arcade Game
|No
|-
|[[File:Wackyclub600trophy.png]]<br>Wacky Club 600 Trophy
|Arcade Game - Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackysbullseyebattertrophy.png]]<br>Wacky's Bullseye Batter Trophy
|Trophy Challenge
|Yes
|-
|[[File:Wackywizard600trophy.png]]<br>Wacky Wizard 600 Trophy
|Arcade Game - Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyzingoz600trophy.png]]<br>Wacky Zingoz 600 Trophy
|Arcade Game - Wacky Zingoz Celebration
|Yes 
|-
|[[File:Waddellsicecapadventuretrophy.png]]<br>Waddell's Icecap Adventure Trophy
|Trophy Challenge
|Yes
|-
|[[File:Webkinzdayyear10trophy.png]]<br>Webkinz Day Year 10 Trophy
|Holiday Gift<br>Webkinz Day - 2015
|Yes
|-
|[[File:Webkinzdayyear11trophy.png]]<br>Webkinz Day Year 11 Trophy
|Holiday Gift<br>Webkinz Day - 2016
|Yes
|-
|[[File:Webkinzdayyear12trophy.png]]<br>Webkinz Day Year 12 Trophy
|Holiday Gift<br>Webkinz Day - 2017
|Yes
|-
|[[File:Webkinzdayyear13trophy.png]]<br>Webkinz Day Year 13 Trophy
|Holiday Gift<br>Webkinz Day - 2018
|Yes
|-
|[[File:Webkinzdayyear14trophy.png]]<br>Webkinz Day Year 14 Trophy
|Holiday Gift<br>Webkinz Day - 2019
|Yes
|-
|[[File:Webkinzdayyear15trophy.png]]<br>Webkinz Day Year 15 Trophy
|Holiday Gift<br>Webkinz Day - 2020
|Yes
|-
|[[File:Webkinzdayyear16trophy.png]]<br>Webkinz Day Year 16 Trophy
|Holiday Gift<br>Webkinz Day - 2021
|Yes
|-
|[[File:Webkinzdayyear17trophy.png]]<br>Webkinz Day Year 17 Trophy
|Holiday Gift<br>Webkinz Day - 2022
|Yes
|-
|[[File:Webkinzdayyear18trophy.png]]<br>Webkinz Day Year 18 Trophy
|Holiday Gift<br>Webkinz Day - 2023
|Yes
|-
|[[File:Webkinzdayyear19trophy.png]]<br>Webkinz Day Year 19 Trophy
|Holiday Gift<br>Webkinz Day - 2024
|Yes
|-
|[[File:Webkinzdayyear20trophy.png]]<br>Webkinz Day Year 20 Trophy
|Holiday Gift<br>Webkinz Day - 2025
|Yes
|-
|[[File:Webkinzdayyear21trophy.png]]<br>Webkinz Day Year 21 Trophy
|Holiday Gift<br>Webkinz Day - 2026
|Yes
|-
|[[File:Webkinzdayyear3trophy.png]]<br>Webkinz Day Year 3 Trophy
|Holiday Gift<br>Webkinz Day - 2008
|Yes
|-
|[[File:Webkinzdayyear4trophy.png]]<br>Webkinz Day Year 4 Trophy
|Holiday Gift<br>Webkinz Day - 2009
|Yes
|-
|[[File:Webkinzdayyear5trophy.png]]<br>Webkinz Day Year 5 Trophy
|Holiday Gift<br>Webkinz Day - 2010
|Yes
|-
|[[File:Webkinzdayyear6trophy.png]]<br>Webkinz Day Year 6 Trophy
|Holiday Gift<br>Webkinz Day - 2011
|Yes
|-
|[[File:Webkinzdayyear7trophy.png]]<br>Webkinz Day Year 7 Trophy
|Holiday Gift<br>Webkinz Day - 2012
|Yes
|-
|[[File:Webkinzdayyear8trophy.png]]<br>Webkinz Day Year 8 Trophy
|Holiday Gift<br>Webkinz Day - 2013
|Yes
|-
|[[File:Webkinzdayyear9trophy.png]]<br>Webkinz Day Year 9 Trophy
|Holiday Gift<br>Webkinz Day - 2014
|Yes
|-
|[[File:Webkinzelitetrophy.png]]<br>Webkinz Elite Trophy
|Family Score Prizes
|Yes
|-
|[[File:Webkinzmobilecrystaltrophy.png]]<br>Webkinz Mobile Crystal Trophy
|Login Events - Time Capsules
|Yes
|-
|[[File:Webkinzplayertrophy.png]]<br>Webkinz Player Trophy
|Family Score Prizes
|Yes
|-
|[[File:Webkinzrallytrophy.png]]<br>Webkinz Rally Trophy
|Arcade Game
|No
|-
|[[File:Webkinzwisdomtrophy.png]]<br>Webkinz Wisdom Trophy
|Family Score Prizes
|Yes 
|-
|[[File:Wheelofwowtrophy.png]]<br>Wheel of WOW Trophy
|Trophy Challenge
|Yes
|-
|[[File:Whereswackytrophy.png]]<br>Where's Wacky Trophy
|Trophy Challenge
|Yes
|-
|[[File:Whimsyskiestrophy.png]]<br>Whimsy Skies Trophy
|Arcade Game
|No
|-
|[[File:Wishingwell2trophy.png]]<br>Wishing Well 2 Trophy
|Trophy Challenge
|Yes
|-
|[[File:Writingtrophy.png]]<br>Writing Trophy
|Contest Trophy
|Yes
|-
|[[File:Writingtrophy2.png]]<br>Writing Trophy 2
|Contest Trophy
|Yes
|-
|[[File:Writingtrophy3.png]]<br>Writing Trophy 3
|Contest Trophy
|Yes
|-
|[[File:Writingtrophy4.png]]<br>Writing Trophy 4
|Contest Trophy
|Yes
|-
|[[File:Zackysqueststatue.png]]<br>Zacky's Quest Statue
|Arcade Game
|Yes
|-
|[[File:Zingozbouncetrophy.png]]<br>Zingoz Bounce Trophy
|Arcade Game
|Yes
|-
|[[File:Zingozdunktrophy.png]]<br>Zingoz Dunk Trophy
|Dunk the Zingoz
|Yes 
|-
|[[File:Zingozpiethrowtrophy.png]]<br>Zingoz Pie Throw Trophy
|Trophy Challenge
|Yes
|-
|[[File:Zingozswitcherooztrophy.png]]<br>Zingoz Switcherooz Trophy
|Trophy Challenge
|Yes
|-
|[[File:Zingozzangoztrophy.png]]<br>Zingoz Zangoz Trophy
|Arcade Game
|No 
|-
|[[File:Zumtrophy.png]]<br>Zum Trophy
|Zum Collection Prize
|No
|}`)
  }
];

if (window.extraCollections?.length) {
  starterCollections.push(...window.extraCollections);
}

function buildRemoteWikiImageUrl(imageSource) {
  if (!imageSource) {
    return "";
  }

  if (
    /^https?:\/\//i.test(imageSource) &&
    !imageSource.includes("webkinzguide.com") &&
    !imageSource.includes("webkinzguidewiki")
  ) {
    return imageSource;
  }

  if (imageSource.includes("Special:Redirect/file/")) {
    return imageSource;
  }

  const fileName = decodeURIComponent(imageSource.split("/").pop().split("?")[0]);
  return `https://webkinzguide.com/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
}

function buildLocalWikiImageUrl(imageSource) {
  if (!imageSource) {
    return "";
  }

  if (
    /^https?:\/\//i.test(imageSource) &&
    !imageSource.includes("webkinzguide.com") &&
    !imageSource.includes("webkinzguidewiki")
  ) {
    return imageSource;
  }

  const fileName = decodeURIComponent(imageSource.split("/").pop().split("?")[0]);
  return `/assets/wiki-images/${encodeURIComponent(fileName)}`;
}

function buildWikiImageUrl(imageSource) {
  return buildLocalWikiImageUrl(imageSource) || buildRemoteWikiImageUrl(imageSource);
}

function deriveWallpaperSampleImage(imageSource) {
  if (!imageSource) {
    return "";
  }

  const fileName = decodeURIComponent(imageSource.split("/").pop().split("?")[0]);
  const extensionMatch = fileName.match(/(\.[a-z0-9]+)$/i);

  if (!extensionMatch || /small\.[a-z0-9]+$/i.test(fileName)) {
    return "";
  }

  const extension = extensionMatch[1];
  const baseName = fileName.slice(0, -extension.length);
  return `${baseName}small${extension}`;
}

function renderImageTag(src, fallbackSrc, alt, className) {
  if (!src) {
    return "";
  }

  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt || "");
  const safeClassName = escapeHtml(className);
  const safeFallback =
    fallbackSrc && fallbackSrc !== src ? ` onerror="this.onerror=null;this.src='${escapeHtml(fallbackSrc)}'"` : "";

  return `<img class="${safeClassName}" src="${safeSrc}" alt="${safeAlt}" loading="lazy" referrerpolicy="no-referrer"${safeFallback} />`;
}

function normalizeCollections(collections) {
  return collections.map((collection) => ({
    ...collection,
    items: collection.items.map((item) => ({
      ...item,
      notes:
        item.notes === "Imported from Webkinz Guide." || item.notes?.startsWith("Listed on the")
          ? ""
          : item.notes,
      food: item.food || "",
      foodImage: buildWikiImageUrl(item.foodImage),
      foodImageFallback: buildRemoteWikiImageUrl(item.foodImage),
      sampleImage: buildWikiImageUrl(
        item.sampleImage || (collection.category === "Wallpaper" ? deriveWallpaperSampleImage(item.image) : "")
      ),
      sampleImageFallback: buildRemoteWikiImageUrl(
        item.sampleImage || (collection.category === "Wallpaper" ? deriveWallpaperSampleImage(item.image) : "")
      ),
      image: buildWikiImageUrl(item.image),
      imageFallback: buildRemoteWikiImageUrl(item.image)
    }))
  }));
}

function loadOwnedState() {
  try {
    return JSON.parse(localStorage.getItem(OWNED_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadWantedState() {
  try {
    return JSON.parse(localStorage.getItem(WANTED_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadProfileState() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOwnedState(collections) {
  const ownedState = {};

  collections.forEach((collection) => {
    collection.items.forEach((item) => {
      ownedState[`${collection.id}:${item.id}`] = item.owned;
    });
  });

  try {
    localStorage.setItem(OWNED_STORAGE_KEY, JSON.stringify(ownedState));
  } catch {
    // Ignore storage failures so the checklist still works during the session.
  }
}

function saveWantedState(collections) {
  const wantedState = {};

  collections.forEach((collection) => {
    collection.items.forEach((item) => {
      wantedState[`${collection.id}:${item.id}`] = item.wanted;
    });
  });

  try {
    localStorage.setItem(WANTED_STORAGE_KEY, JSON.stringify(wantedState));
  } catch {
    // Ignore storage failures so the checklist still works during the session.
  }
}

function saveProfileState(profile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage failures so the profile still works during the session.
  }
}

function clearLegacyLocalState() {
  try {
    localStorage.removeItem(OWNED_STORAGE_KEY);
    localStorage.removeItem(WANTED_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }
}

function createCollectionsState(savedData = {}) {
  const savedOwnedState = savedData.owned || {};
  const savedWantedState = savedData.wanted || {};
  return normalizeCollections(starterCollections).map((collection) => ({
    ...collection,
    items: collection.items.map((item) => ({
      ...item,
      owned: savedOwnedState[`${collection.id}:${item.id}`] ?? item.owned,
      wanted: savedWantedState[`${collection.id}:${item.id}`] ?? Boolean(item.wanted)
    }))
  }));
}

const currentPage = document.body.dataset.page;
let sessionState = null;
let accountData = { owned: {}, wanted: {}, profile: {} };
let collectionsState = createCollectionsState();

function computeCollectionStats(collection) {
  const total = collection.items.length;
  const owned = collection.items.filter((item) => item.owned).length;
  const percent = total === 0 ? 0 : Math.round((owned / total) * 100);
  return { total, owned, percent };
}

function computeGlobalStats(collections) {
  const totalCollections = collections.length;
  const startedCollections = collections.filter((collection) =>
    collection.items.some((item) => item.owned || item.wanted)
  ).length;
  const totalItems = collections.reduce((sum, collection) => sum + collection.items.length, 0);
  const ownedItems = collections.reduce(
    (sum, collection) => sum + collection.items.filter((item) => item.owned).length,
    0
  );
  const completionRate = totalItems === 0 ? 0 : Math.round((ownedItems / totalItems) * 100);
  return { totalCollections, startedCollections, totalItems, ownedItems, completionRate };
}

function getOwnedStateFromCollections(collections) {
  const ownedState = {};

  collections.forEach((collection) => {
    collection.items.forEach((item) => {
      ownedState[`${collection.id}:${item.id}`] = item.owned;
    });
  });

  return ownedState;
}

function getWantedStateFromCollections(collections) {
  const wantedState = {};

  collections.forEach((collection) => {
    collection.items.forEach((item) => {
      wantedState[`${collection.id}:${item.id}`] = Boolean(item.wanted);
    });
  });

  return wantedState;
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.error || "Request failed.");
  }

  return payload;
}

async function fetchSessionState() {
  const payload = await apiFetch("/api/session", { method: "GET" });
  return payload.authenticated ? payload.user : null;
}

async function fetchAccountData() {
  return apiFetch("/api/data", { method: "GET" });
}

async function persistAccountData() {
  accountData = {
    ...accountData,
    owned: getOwnedStateFromCollections(collectionsState),
    wanted: getWantedStateFromCollections(collectionsState)
  };

  await apiFetch("/api/data", {
    method: "PUT",
    body: JSON.stringify(accountData)
  });
}

async function migrateLegacyLocalStateIfNeeded() {
  const legacyData = {
    owned: loadOwnedState(),
    wanted: loadWantedState(),
    profile: loadProfileState()
  };

  const hasLegacyData =
    Object.keys(legacyData.owned).length ||
    Object.keys(legacyData.wanted).length ||
    Object.keys(legacyData.profile).length;
  const accountHasData =
    Object.keys(accountData.owned || {}).length ||
    Object.keys(accountData.wanted || {}).length ||
    Object.keys(accountData.profile || {}).length;

  if (!hasLegacyData || accountHasData) {
    return;
  }

  accountData = legacyData;
  collectionsState = createCollectionsState(accountData);
  await persistAccountData();
  clearLegacyLocalState();
}

async function toggleOwnedStatus(collectionId, itemId) {
  const collection = collectionsState.find((entry) => entry.id === collectionId);

  if (!collection) {
    return;
  }

  const item = collection.items.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  item.owned = !item.owned;
  await persistAccountData();
}

async function toggleWantedStatus(collectionId, itemId) {
  const collection = collectionsState.find((entry) => entry.id === collectionId);

  if (!collection) {
    return;
  }

  const item = collection.items.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  item.wanted = !item.wanted;
  await persistAccountData();
}

function createCollectionCard(collection, compact = false) {
  const stats = computeCollectionStats(collection);
  const article = document.createElement("article");
  article.className = compact ? "feature-card" : "collection-card";

  if (compact) {
    article.innerHTML = `
      <p class="card-label">${collection.category}</p>
      <h2>${collection.name}</h2>
      <p>${collection.description}</p>
      <p><strong>${stats.owned}/${stats.total}</strong> collected</p>
    `;
    return article;
  }

  const itemRows = collection.items
    .map(
      (item) => `
        <article class="item-row">
          <div class="item-main">
            ${
              item.image || item.foodImage || item.sampleImage
                ? `<div class="item-visuals">
                    ${
                      item.image
                        ? renderImageTag(item.image, item.imageFallback, item.name, "item-thumb")
                        : ""
                    }
                    ${
                      item.foodImage
                        ? `${item.image ? `<div class="item-thumb-link" aria-hidden="true">→</div>` : ""}${renderImageTag(
                            item.foodImage,
                            item.foodImageFallback,
                            item.food || "Food result",
                            "item-thumb item-thumb-secondary"
                          )}`
                        : item.sampleImage
                          ? `${item.image ? `<div class="item-thumb-link" aria-hidden="true">→</div>` : ""}<div class="item-thumb-preview">${renderImageTag(
                              item.sampleImage,
                              item.sampleImageFallback,
                              `${item.name} small preview`,
                              "item-thumb item-thumb-secondary"
                            )}<span>Small</span></div>`
                        : ""
                    }
                  </div>`
                : ""
            }
            <div>
            <strong>${item.name}</strong>
              ${item.food ? `<div class="item-output"><b>Plants:</b> ${item.food}</div>` : ""}
              <div class="item-meta-grid">
                <span><b>Availability:</b> ${item.availability || "Unknown"}</span>
                <span><b>Tradeable:</b> ${item.tradeable || "Unknown"}</span>
              </div>
              ${item.notes ? `<div class="collection-meta">${item.notes}</div>` : ""}
            </div>
          </div>
          <div class="item-controls">
            <button
              class="want-toggle"
              type="button"
              data-wanted="${item.wanted}"
              data-collection-id="${collection.id}"
              data-item-id="${item.id}"
              aria-pressed="${item.wanted}"
              aria-label="${item.wanted ? `Remove ${item.name} from wanted` : `Mark ${item.name} as wanted`}"
            >
              <span class="want-toggle-star" aria-hidden="true">${item.wanted ? "★" : "☆"}</span>
              <span class="want-toggle-text">${item.wanted ? "Wanted" : "Want"}</span>
            </button>
            <span class="pill">${item.owned ? "Owned" : "Missing"}</span>
            <button
              class="status-toggle"
              type="button"
              role="switch"
              data-owned="${item.owned}"
              data-collection-id="${collection.id}"
              data-item-id="${item.id}"
              aria-checked="${item.owned}"
              aria-label="${item.owned ? `Mark ${item.name} as needed` : `Mark ${item.name} as owned`}"
            >
              <span class="status-toggle-track">
                <span class="status-toggle-thumb"></span>
              </span>
              <span class="status-toggle-text">${item.owned ? "Owned" : "Need"}</span>
            </button>
          </div>
        </article>
      `
    )
    .join("");

  article.innerHTML = `
    <div class="collection-summary">
      <div class="collection-title-group">
        <div class="collection-title-row">
          <h2>${collection.name}</h2>
          <span class="pill">${collection.category}</span>
        </div>
        <p class="collection-meta">${collection.description}</p>
      </div>

      <div class="progress-block">
        <span class="progress-value">${stats.percent}%</span>
        <span class="collection-meta">${stats.owned} of ${stats.total} items owned</span>
        <div class="progress-bar" aria-hidden="true">
          <span style="width: ${stats.percent}%"></span>
        </div>
      </div>
    </div>
    <div class="item-list">${itemRows}</div>
  `;

  return article;
}

function filterCollectionItems(collection, searchValue, filterValue) {
  const filteredItems = collection.items.filter((item) => {
    const matchesSearch =
      !searchValue ||
      collection.name.toLowerCase().includes(searchValue) ||
      item.name.toLowerCase().includes(searchValue);
    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "owned" && item.owned) ||
      (filterValue === "unowned" && !item.owned);
    return matchesSearch && matchesFilter;
  });

  return { ...collection, items: filteredItems };
}

function renderHomePage() {
  const stats = computeGlobalStats(collectionsState);
  document.getElementById("home-total-collections").textContent = stats.totalCollections;
  document.getElementById("home-total-items").textContent = stats.totalItems;
  document.getElementById("home-owned-items").textContent = stats.ownedItems;
  document.getElementById("home-completion-rate").textContent = `${stats.completionRate}%`;

  const featured = document.getElementById("featured-collections");
  featured.innerHTML = "";

  collectionsState.slice(0, 3).forEach((collection) => {
    featured.appendChild(createCollectionCard(collection, true));
  });
}

function renderCollectionsPage() {
  const list = document.getElementById("collection-list");
  const searchInput = document.getElementById("collection-search");
  const filterSelect = document.getElementById("collection-filter");
  const collectionSelect = document.getElementById("collection-select");
  const authBanner = document.getElementById("auth-banner");

  if (authBanner && sessionState) {
    authBanner.textContent = `Signed in as ${sessionState.username}. Your checkmarks save to your account.`;
  }

  function renderCollectionOptions(selectedId) {
    collectionSelect.innerHTML = collectionsState
      .map((collection) => {
        const stats = computeCollectionStats(collection);
        const isSelected = collection.id === selectedId ? ' selected' : "";
        return `<option value="${collection.id}"${isSelected}>${collection.name} (${stats.owned}/${stats.total})</option>`;
      })
      .join("");
  }

  const initialCollectionId = collectionsState[0]?.id || "";
  renderCollectionOptions(initialCollectionId);

  function draw() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const filterValue = filterSelect.value;
    const selectedCollection = collectionSelect.value;

    list.innerHTML = "";

    const visibleCollections = collectionsState
      .filter((collection) => collection.id === selectedCollection)
      .map((collection) => filterCollectionItems(collection, searchValue, filterValue))
      .filter((collection) => collection.items.length > 0);

    if (visibleCollections.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          No items in this collection match that search/filter yet.
        </div>
      `;
      return;
    }

    visibleCollections.forEach((collection) => {
      list.appendChild(createCollectionCard(collection));
    });
  }

  searchInput.addEventListener("input", draw);
  filterSelect.addEventListener("change", draw);
  collectionSelect.addEventListener("change", draw);
  list.addEventListener("click", async (event) => {
    const wantButton = event.target.closest(".want-toggle");
    const button = event.target.closest(".status-toggle");

    if (wantButton) {
      await toggleWantedStatus(wantButton.dataset.collectionId, wantButton.dataset.itemId);
      draw();
      return;
    }

    if (!button) {
      return;
    }

    await toggleOwnedStatus(button.dataset.collectionId, button.dataset.itemId);
    renderCollectionOptions(collectionSelect.value);
    draw();
  });
  draw();
}

function renderProfilePage() {
  const stats = computeGlobalStats(collectionsState);
  const collectorCard = document.getElementById("collector-card");
  const profileStats = document.getElementById("profile-stats");
  const wishlistList = document.getElementById("wishlist-list");
  const profileName = sessionState?.username || "Collector";
  const profileInitial = (profileName[0] || "W").toUpperCase();
  const safeProfileName = escapeHtml(profileName);

  collectorCard.innerHTML = `
    <p class="card-label">Account</p>
    <div class="collector-profile">
      <div class="collector-avatar collector-avatar-fallback" aria-hidden="true">${profileInitial}</div>
      <div>
        <h2>${safeProfileName}</h2>
        <p class="muted">This tracker is saving to your account now.</p>
      </div>
    </div>
    <div class="profile-actions">
      <a class="button button-secondary" href="/collections">Keep tracking</a>
      <button class="button button-primary" type="button" id="logout-button">Log out</button>
    </div>
  `;

  profileStats.innerHTML = `
    <article>
      <strong>${stats.startedCollections}</strong>
      <span>collections started</span>
    </article>
    <article>
      <strong>${stats.ownedItems}</strong>
      <span>items owned</span>
    </article>
    <article>
      <strong>${stats.totalItems - stats.ownedItems}</strong>
      <span>items missing</span>
    </article>
    <article>
      <strong>${stats.completionRate}%</strong>
      <span>overall completion</span>
    </article>
  `;

  const wishlistItems = collectionsState.flatMap((collection) =>
    collection.items
      .filter((item) => item.wanted)
      .map((item) => ({ ...item, collectionName: collection.name }))
  );

  if (wishlistItems.length === 0) {
    wishlistList.innerHTML = `<div class="empty-state">No wanted items yet.</div>`;
    return;
  }

  wishlistList.innerHTML = wishlistItems
    .map(
      (item) => `
        <article class="wishlist-item">
          <div class="wishlist-main">
            ${
              item.image || item.foodImage
                ? renderImageTag(
                    item.image || item.foodImage,
                    item.image ? item.imageFallback : item.foodImageFallback,
                    item.name,
                    "wishlist-thumb"
                  )
                : ""
            }
            <div>
            <h3>${item.name}</h3>
            <p class="collection-meta">${item.collectionName}</p>
            ${item.food ? `<p class="collection-meta">Plants: ${item.food}</p>` : ""}
            <p class="collection-meta">${item.availability || "Unknown source"} • Tradeable: ${item.tradeable || "Unknown"}</p>
            </div>
          </div>
          <div class="pill">Wishlist</div>
        </article>
      `
    )
    .join("");
}

function renderLoginPage() {
  const form = document.getElementById("auth-form");
  const usernameInput = document.getElementById("auth-username");
  const passwordInput = document.getElementById("auth-password");
  const submitButton = document.getElementById("auth-submit");
  const message = document.getElementById("auth-message");
  const tabs = [...document.querySelectorAll(".auth-tab")];
  let mode = "login";

  function updateTabs(nextMode) {
    mode = nextMode;
    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.authMode === nextMode);
    });
    submitButton.textContent = nextMode === "login" ? "Log in" : "Create account";
    passwordInput.autocomplete = nextMode === "login" ? "current-password" : "new-password";
    message.textContent = "";
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => updateTabs(tab.dataset.authMode));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = mode === "login" ? "Signing you in..." : "Creating your account...";

    try {
      await apiFetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: usernameInput.value.trim(),
          password: passwordInput.value
        })
      });
      window.location.href = "/collections";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}

async function initializeApp() {
  try {
    sessionState = await fetchSessionState();
  } catch {
    sessionState = null;
  }

  if (currentPage === "login") {
    if (sessionState) {
      window.location.href = "/collections";
      return;
    }

    renderLoginPage();
    return;
  }

  if ((currentPage === "collections" || currentPage === "profile") && !sessionState) {
    window.location.href = "/login";
    return;
  }

  if (sessionState) {
    accountData = await fetchAccountData();
    await migrateLegacyLocalStateIfNeeded();
    collectionsState = createCollectionsState(accountData);
  } else {
    collectionsState = createCollectionsState();
  }

  if (currentPage === "home") {
    renderHomePage();
  }

  if (currentPage === "collections") {
    renderCollectionsPage();
  }

  if (currentPage === "profile") {
    renderProfilePage();
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        await apiFetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
      });
    }
  }
}

initializeApp();
