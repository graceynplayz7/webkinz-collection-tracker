(function () {
  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function cleanWikiText(value) {
    return value
      .replace(/<ref[^>]*>.*?<\/ref>/g, "")
      .replace(/<ref[^>]*\/>/g, "")
      .replace(/<ref[^>]*><\/ref>/g, "")
      .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\[https?:\/\/[^\s]+\s+([^\]]+)\]/g, "$1")
      .replace(/<br>/g, " - ")
      .replace(/'''+/g, "")
      .replace(/''/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseCoinTable(rawTable) {
    const seenIds = new Map();

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

        const [, fileName, rawItemName] = imageMatch;
        const name = cleanWikiText(rawItemName);
        const baseId = slugify(name);
        const count = seenIds.get(baseId) || 0;
        seenIds.set(baseId, count + 1);

        return {
          id: count ? `${baseId}-${count + 1}` : baseId,
          name,
          owned: false,
          notes: "",
          availability: cleanWikiText((lines[1] || "").replace(/^\|/, "")),
          tradeable: cleanWikiText((lines[2] || "").replace(/^\|/, "")) || "Unknown",
          image: fileName.trim()
        };
      })
      .filter(Boolean);
  }

  window.extraCollections = window.extraCollections || [];
  window.extraCollections.push({
    id: "kinzcash-coins",
    name: "KinzCash Coin Collection",
    description: "KinzCash coins imported from the Webkinz Guide collection page.",
    category: "Currency",
    items: parseCoinTable(`{| class="goldtable sortable" width="70%"
|- align="left"
!Item
!Availability
!Tradeable
|-
|[[File:2020alyssakinzcashcoin.png]]<br>2020 Alyssa KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2020
|Yes
|-
|[[File:2020dexdangerouskinzcashcoin.png]]<br>2020 Dex Dangerous KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2020
|Yes
|-
|[[File:2020drquackkinzcashcoin.png]]<br>2020 Dr Quack KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2020
|Yes
|-
|[[File:2020sophiestockwellkinzcashcoin.png]]<br>2020 Sophie Stockwell KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2020
|Yes
|-
|[[File:20kinzcashcoin.png]]<br>20 KinzCash Coin
|Misc Items
|Yes
|-
|[[File:2022drquackkinzcashcoin.png]]<br>2022 Dr Quack KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2022
|Yes
|-
|[[File:2022gooberkinzcashcoin.png]]<br>2022 Goober KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2022
|Yes
|-
|[[File:2022nibbleskinzcashcoin.png]]<br>2022 Nibbles KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2022
|Yes
|-
|[[File:2022pjcolliekinzcashcoin.png]]<br>2022 PJ Collie KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2022
|Yes
|-
|[[File:25kinzcashcoin.png]]<br>25 KinzCash Coin
|Challenges<br>Current - Your New Pet
|Yes
|-
|[[File:50kinzcashcoin.png]]<br>50 KinzCash Coin
|Challenges<br>Current - Meet New Friends
|Yes
|-
|[[File:100kinzcashcoin.png]]<br>100 KinzCash Coin
|[[(Picture Guide) Family Score|KinzCash Machine]], [[(Archive) Current Challenges|Challenges (multiple)]]
|Yes
|-
|[[File:100kinzcashcoin.png]]<br>100 KinzCash Coin<ref name=sep>Separate item in game files</ref>
|[[Helping Paws Club]]
|Yes
|-
|[[File:150kinzcashcoin.png]]<br>150 KinzCash Coin
|Misc Items
|Yes
|-
|[[File:200kinzcashcoin.png]]<br>200 KinzCash Coin
|Challenges<br>Current - Plumpy's Great Advice
|Yes
|-
|[[File:250kinzcashcoin.png]]<br>250 KinzCash Coin
|[[(Archive) Movie Theater |Movie Theater Prize]], [[(Picture Guide) Map Events & Items#Gingerbread Puppy|Gingerbread Puppy Promotion]], [[(Picture Guide) Map Events & Items#Queen Vexa|Queen Vexa Promotion]]
|Yes
|-
|[[File:300kinzcashcoin.png]]<br>300 KinzCash Coin
|Misc Items
|Yes
|-
|[[File:350kinzcashcoin.png]]<br>350 KinzCash Coin
|Misc Items
|Yes
|-
|[[File:400kinzcashcoin.png]]<br>400 KinzCash Coin
|Misc Items
|Yes
|-
|[[File:500kinzcashcoin.png]]<br>500 KinzCash Coin
|[[(Archive) Arcade Game Challenges#Stack .27Em Solitaire|Stack 'Em Solitaire Challenge]]
|Yes
|-
|[[File:500kinzcashcoin2.png]]<br>500 KinzCash Coin<ref name= sep></ref>
|[[Helping Paws Club]]
|Yes
|-
|[[File:1000kinzcashcoin.png]]<br>1,000 KinzCash Coin
|Exclusives<br>Adoption Exclusives - Current
|Yes
|-
|[[File:2000kinzcashcoin.png]]<br>2,000 KinzCash Coin
|[[Helping Paws Club]]
|Yes
|-
|[[File:10000kinzcashcoin.png]]<br>10,000 KinzCash Coin
|[https://webkinznewz.ganzworld.com/carousel/onewebkinzworld-play-days-day-one/ One Webkinz World Promotion]
|Yes
|-
|[[File:Dicekinzcollectablecoin.png]]<br>DiceKinz Collectable Coin
|Retired WShop<br>DiceKinz Packs
|Yes
|-
|[[File:Luckychocolatekinzcashcoin.png]]<br>Lucky Chocolate KinzCash Coin
|Click-to-Win: Non-Annual<br>St. Patrick's Day Celebration
|Yes
|-
|[[File:Luckyemeraldkinzcashcoin.png]]<br>Lucky Emerald KinzCash Coin
|Click-to-Win: Non-Annual<br>St. Patrick's Day Celebration
|Yes
|-
|[[File:Luckygoldkinzcashcoin.png]]<br>Lucky Gold KinzCash Coin
|Click-to-Win: Non-Annual<br>St. Patrick's Day Celebration
|Yes
|-
|[[File:Luckyrainbowcoin.png]]<br>Lucky Rainbow Coin
|Kinzville Park<br>Leprechaun Chase - 2023
|Yes
|-
|[[File:Luckysilverkinzcashcoin.png]]<br>Lucky Silver KinzCash Coin
|Click-to-Win: Non-Annual<br>St. Patrick's Day Celebration
|Yes
|-
|[[File:Mandywebkinzkinzcashcoin.png]]<br>Mandy Webkinz KinzCash Coin
|Webkinz Newz Week 2018
|Yes
|-
|[[File:Mayorgooberkinzcashcoin.png]]<br>Mayor Goober KinzCash Coin
|Kinzville Park - Meet the Mayor - Goober
|Yes
|-
|[[File:Mayorquackkinzcashcoin.png]]<br>Mayor Quack KinzCash Coin
|Kinzville Park - Meet the Mayor - Dr. Quack
|Yes
|-
|[[File:Mayorstockwellkinzcashcoin.png]]<br>Mayor Stockwell Kinzcash Coin
|Kinzville Park - Meet the Mayor - Sophie
|Yes
|-
|[[File:Michaelwebkinzkinzcashcoin.png]]<br>Michael Webkinz KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2018
|Yes
|-
|[[File:Sallywebkinzkinzcashcoin.png]]<br>Sally Webkinz KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2018
|Yes
|-
|[[File:Stevewebkinzkinzcashcoin.png]]<br>Steve Webkinz KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2018
|Yes
|-
|[[File:Wackykinzcashcoin.png]]<br>Wacky KinzCash Coin
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Webkinznewzkinzcashcoin.png]]<br>Webkinz Newz KinzCash Coin
|Clubhouse Event<br>Webkinz Newz Week - 2018
|Yes
|-
|[[File:Webkinzyear15coin.png]]<br>Webkinz Year 15 Coin
|Clubhouse Event<br>Webkinz Newz Week - 2019
|Yes
|-
|[[File:Webkinzyear20coin.png]]<br>Webkinz Year 20 Coin
|Kinzville Park<br>Meet the Mayor - Arte
|Yes
|}`)
  });
}());
