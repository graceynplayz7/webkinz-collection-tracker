(function () {
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

  window.extraCollections = window.extraCollections || [];
  window.extraCollections.push({
    id: "wacky-zingoz-and-zangoz",
    name: "Wacky Zingoz & Zangoz Collection",
    description: "Wacky, Zingoz, and Zangoz items imported from the Webkinz Guide collection page.",
    category: "Wacky",
    items: parseWikiRawTable(`{| class="greentable sortable" width="70%"
|- align="left"
!Item
!Availability
!Tradeable
|-
|[[File:Alldeckedoutzangoz.png]]<br>All Decked Out Zangoz
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Artesazurezingozphoto.png]]<br>Arte's Azure Zingoz Photo
|Trading Cards<br>Series 3
|Yes
|-
|[[File:Autumnwackydispenser.png]]<br>Autumn Wacky Dispenser
|eStore Promo Themed ?? Boxes<br>Autumn Patio
|Yes
|-
|[[File:Avantebookshelf.png]]<br>Avante Bookshelf
|eStore
|No
|-
|[[File:Azurezingozthrone.png]]<br>Azure Zingoz Throne
|Webkinz Friends<br>Quest Prizes
|Yes
|-
|[[File:Azurezingozthronereplica.png]]<br>Azure Zingoz Throne Replica
|eStore
|No
|-
|[[File:Bluecelebrationpopdispenser.png]]<br>Blue Celebration Pop Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Bluedolphingummydispenser.png]]<br>Blue Dolphin Gummy Dispenser
|2021 Planter Mystery Box<br>Series 4
|Yes
|-
|[[File:Bluepoinsettiagnomelamp.png]]<br>Blue Poinsettia Gnome Lamp
|eStore
|No
|-
|[[File:Bluestarcookiedispenser.png]]<br>Blue Star Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Bluewackychristmasgnome.png]]<br>Blue Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Bunnyzangozgumballmachine.png]]<br>Bunny Zangoz Gumball Machine
|eStore
|No
|-
|[[File:Bunnyzangozplush.png]]<br>Bunny Zangoz Plush
|Click-to-Win: Annual<br>Spring Celebration
|Yes
|-
|[[File:Bunnyzingozcandymachine.png]]<br>Bunny Zingoz Candy Machine
|eStore
|No
|-
|[[File:Bunnyzingozdonutdispenser.png]]<br>Bunny Zingoz Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Bunnyzingozplushy.png]]<br>Bunny Zingoz Plushy
|Click-to-Win: Annual<br>Spring Celebration
|Yes
|-
|[[File:Buttercupwackylantern.png]]<br>Buttercup Wacky Lantern
|eStore Promo Themed ?? Boxes<br>Buttercup
|Yes
|-
|[[File:Candycanecookiedispenser.png]]<br>Candy Cane Cookie Dispenser
|eStore
|No
|-
|[[File:Candycornwackyfence.png]]<br>Candy Corn Wacky Fence
|eStore
|No
|-
|[[File:Candycornwackylantern.png]]<br>Candy Corn Wacky Lantern
|eStore
|No
|-
|[[File:Candycornzangozdispenser.png]]<br>Candy Corn Zangoz Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Carolingzingoz.png]]<br>Caroling Zingoz
|eStore
|No
|-
|[[File:Celebrationwackydispenser.png]]<br>Celebration Wacky Dispenser
|eStore Promo Themed ?? Boxes<br>Celebration
|Yes
|-
|[[File:Charmedchamberwackylamp.png]]<br>Charmed Chamber Wacky Lamp
|eStore Promo Themed ?? Boxes<br>Charmed Chamber
|Yes
|-
|[[File:Chocolatewacky.png]]<br>Chocolate Wacky
|Holiday Gifts<br>Spring Celebration
|Yes
|-
|[[File:Chocolatewackydecoration.png]]<br>Chocolate Wacky Decoration
|Holiday Gifts<br>Spring Celebration
|Yes
|-
|[[File:Chocolatewackytrophy.png]]<br>Chocolate Wacky Trophy
|Wacky Zingoz Celebration<br>Webkinz World Click-to-Win
|Yes
|-
|[[File:Chocolatezingoz.png]]<br>Chocolate Zingoz
|Party Packs<br>Party Loot Bag
|Yes
|-
|[[File:Classicvillafountain.png]]<br>Classic Villa Fountain
|eStore
|No
|-
|[[File:Cloverunicorncupcakedispenser.png]]<br>Clover Unicorn Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Conerun.png]]<br>Cone Run
|eStore Promo
|Yes
|-
|[[File:Coolmovesicesculpture.png]]<br>Cool Moves Ice Sculpture
|eStore
|No
|-
|[[File:Cornhuskwackydoll.png]]<br>Corn Husk Wacky Doll
|Click-to-Win: Annual<br>Fall Fest
|Yes
|-
|[[File:Cupidwackygummydispenser.png]]<br>Cupid Wacky Gummy Dispenser
|eStore
|No
|-
|[[File:Cupidzingozstatue.png]]<br>Cupid Zingoz Statue
|eStore
|No
|-
|[[File:Cyanwackychristmasgnome.png]]<br>Cyan Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Dancingzingoz.png]]<br>Dancing Zingoz
|Exclusive<br>Adoption Exclusive - Retired
|Yes
|-
|[[File:Dicekinzzingozpack.png]]<br>Dicekinz Zingoz Pack
|Trading Cards<br>Series 1
|No
|-
|[[File:Dragonfruitlemonadedispenser.png]]<br>Dragonfruit Lemonade Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Dunkazingozpracticebooth.png]]<br>Dunk-a-Zingoz Practice Booth
|eStore
|No
|-
|[[File:Eerietruffledispenser.png]]<br>Eerie Truffle Dispenser
|eStore Promo Themed ?? Boxes<br>Eerie Woods
|Yes
|-
|[[File:Fallharvestcookiedispenser.png]]<br>Fall Harvest Cookie Dispenser
|eStore
|No
|-
|[[File:Festivewackygumballdispenser.png]]<br>Festive Wacky Gumball Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Flamingozingozicepopdispenser.png]]<br>Flamingo Zingoz Ice Pop Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Flappyzingoz.png]]<br>Flappy Zingoz
|Wacky Gumballs
|No
|-
|[[File:Flutterzingoz.png]]<br>Flutter Zingoz
|Wacky Gumballs
|No
|-
|[[File:Fly90swackylantern.png]]<br>Fly 90s Wacky Lantern
|eStore
|No
|-
|[[File:Framedbat.png]]<br>Framed Bat
|Challenges<br>Arcade Game Challenges
|Yes
|-
|[[File:Framedteamwackyjersey.png]]<br>Framed Team Wacky Jersey
|Challenges<br>Arcade Game Challenges
|Yes
|-
|[[File:Freeridezingozhat.png]]<br>Free Ride Zingoz Hat
|Wacky Zingoz Celebration
|Yes
|-
|[[File:Fuzzylambcookiedispenser.png]]<br>Fuzzy Lamb Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Gardengnomefortuneteller.png]]<br>Garden Gnome Fortune Teller
|eStore
|No
|-
|[[File:Gardenpartywindchime.png]]<br>Garden Party Windchime
|eStore
|No
|-
|[[File:Gardenzangoz.png]]<br>Garden Zangoz
|WShop
|Yes
|-
|[[File:Gardenzingoz.png]]<br>Garden Zingoz
|WShop
|Yes
|-
|[[File:Giantzangozplushy.png]]<br>Giant Zangoz Plushy
|SPREE!<br>Kinzville Mall - Retired
|Yes
|-
|[[File:Giantzingozplushy.png]]<br>Giant Zingoz Plushy
|SPREE!<br>Kinzville Mall - Retired
|Yes
|-
|[[File:Goldenhoneycombdispenser.png]]<br>Golden Honeycomb Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Goldzingozpoptrophy.png]]<br>Gold Zingoz Pop Trophy
|Challenge<br>Arcade Game Challenge
|Yes
|-
|[[File:Greenbakedappledispenser.png]]<br>Green Baked Apple Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Greenbatcupcakedispenser.png]]<br>Green Bat Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Greenornamentcupcakedispenser.png]]<br>Green Ornament Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Greenwackychristmasgnome.png]]<br>Green Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Greenwitchcocoadispenser.png]]<br>Green Witch Cocoa Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Gummyicecreamdispenser.png]]<br>Gummy Ice Cream Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Halloweenwackyfence.png]]<br>Halloween Wacky Fence
|eStore
|No
|-
|[[File:Handmadezingozclock.png]]<br>Handmade Zingoz Clock
|Daily Kinzcare
|Yes
|-
|[[File:Harvestwackycandydispenser.png]]<br>Harvest Wacky Candy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Harvestzingozmusicalfountain.png]]<br>Harvest Zingoz Musical Fountain
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Hauntedpainting.png]]<br>Haunted Painting
|Exclusive<br>Adoption Exclusive - Retired
|Yes
|-
|[[File:Haveawackychristmaszingoz.png]]<br>Have A Wacky Christmas Zingoz
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Holidayornamentwacky.png]]<br>Holiday Ornament Wacky
|eStore Stockings & Crackers<br>2022 Stocking Prizes
|Yes
|-
|[[File:Holidaypoinsettiawacky.png]]<br>Holiday Poinsettia Wacky
|eStore Stockings & Crackers<br>2022 Stocking Prizes
|Yes
|-
|[[File:Holidaypresentwacky.png]]<br>Holiday Present Wacky
|eStore
|No
|-
|[[File:Holidaywackycandydispenser.png]]<br>Holiday Wacky Candy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Holidaywackycookies.png]]<br>Holiday Wacky Cookies
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Holidaywackyfence.png]]<br>Holiday Wacky Fence
|eStore
|No
|-
|[[File:Holidayzangozgumballmachine.png]]<br>Holiday Zangoz Gumball Machine
|eStore Stockings & Crackers<br>2013 Lots of Presents Stocking
|Yes
|-
|[[File:Holidayzingozhotairballoon.png]]<br>Holiday Zingoz Hot Air Balloon
|eStore Stockings & Crackers<br>2020 Stocking Prizes
|Yes
|-
|[[File:Holidayzingozmusicalfountain.png]]<br>Holiday Zingoz Musical Fountain
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Icesculpturefridge.png]]<br>Ice Sculpture Fridge
|WShop
|Yes
|-
|[[File:Inflatablezangoz.png]]<br>Inflatable Zangoz
|eStore
|No
|-
|[[File:Inflatedzingozpool.png]]<br>Inflated Zingoz Pool
|eStore
|No
|-
|[[File:Jollygiant.png]]<br>Jolly Giant
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Jollyzangoz.png]]<br>Jolly Zangoz
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Jollyzingoz.png]]<br>Jolly Zingoz
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Juicypeachlamp.png]]<br>Juicy Peach Lamp
|eStore
|No
|-
|[[File:Juicywatermelonwackylamp.png]]<br>Juicy Watermelon Wacky Lamp
|eStore Promo Themed ?? Boxes<br>Juicy Watermelon
|Yes
|-
|[[File:Keylimecupcakedispenser.png]]<br>Key Lime Cupcake Dispenser
|eStore Promo<br>Seeds & Planter Boxes<br>2023 Planter Mystery Box Series 2
|Yes
|-
|[[File:Kungfuzangozbopper.png]]<br>Kung Fu Zangoz Bopper
|eStore
|No
|-
|[[File:Lavendercupcakedispenser.png]]<br>Lavender Cupcake Dispenser
|eStore Promo<br>Seeds & Planter Boxes<br>2023 Planter Mystery Box Series 3
|Yes
|-
|[[File:Lemondroplamp.png]]<br>Lemon Drop Lamp
|eStore Promo Themed ?? Boxes<br>Lemon Drop
|Yes
|-
|[[File:Limewackychristmasgnome.png]]<br>Lime Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Lovelypatiogardenlantern.png]]<br>Lovely Patio Garden Lantern
|eStore Promo Themed ?? Boxes<br>Lovely Patio
|Yes
|-
|[[File:Luckyleprechauncookiedispenser.png]]<br>Lucky Leprechaun Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Luckyzangozgumballmachine.png]]<br>Lucky Zangoz Gumball Machine
|eStore
|No
|-
|[[File:Luckyzingozdonutdispenser.png]]<br>Lucky Zingoz Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Luckyzingozleprechaun.png]]<br>Lucky Zingoz Leprechaun
|eStore
|No
|-
|[[File:Mangozangozgardenlantern.png]]<br>Mango Zangoz Garden Lantern
|eStore
|No
|-
|[[File:Marigoldwackygardenlantern.png]]<br>Marigold Wacky Garden Lantern
|eStore Promo Themed ?? Boxes<br>Marigold
|Yes
|-
|[[File:Masterblaster600trophy.png]]<br>Master Blaster 600 Trophy
|Wacky Zingoz Celebration/Arcade Game
|Yes
|-
|[[File:Mermaidzangozgumballdispenser.png]]<br>Mermaid Zangoz Gumball Dispenser
|eStore
|No
|-
|[[File:Mermazingzangozfountain.png]]<br>Mermazing Zangoz Fountain
|eStore Promo Themed ?? Boxes<br>Mermazing
|Yes
|-
|[[File:Monarchbutterflycookiedispenser.png]]<br>Monarch Butterfly Cookie Dispenser
|eStore Promo Seeds & Planter Boxes<br>2026 Planter Mystery Box Series 1
|Yes
|-
|[[File:Moonbeamcupcakedispenser.png]]<br>Moonbeam Cupcake Dispenser
|eStore
|No
|-
|[[File:Mosaiczingozflowerpot.png]]<br>Mosaic Zingoz Flowerpot
|eStore
|No
|-
|[[File:Mummycakepopdispenser.png]]<br>Mummy Cakepop Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Mummyzangozcookiedispenser.png]]<br>Mummy Zangoz Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Navywackychristmasgnome.png]]<br>Navy Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Orangebatcupcakedispenser.png]]<br>Orange Bat Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Orangewackychristmasgnome.png]]<br>Orange Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Orangewitchcocoadispenser.png]]<br>Orange Witch Cocoa Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Orangewitchygummydispenser.png]]<br>Orange Witchy Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Paintedpoinsettiagnome.png]]<br>Painted Poinsettia Gnome
|eStore
|No
|-
|[[File:Paintedsunflowergnome.png]]<br>Painted Sunflower Gnome
|eStore
|No
|-
|[[File:Partysnowglobe.png]]<br>Party Snowglobe
|Party Packs
|Yes
|-
|[[File:Pinkbutterflycookiedispenser.png]]<br>Pink Butterfly Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Pinkwackychristmasgnome.png]]<br>Pink Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Playgroundteetertotter.png]]<br>Playground Teeter Totter
|Family Score
|Yes
|-
|[[File:Pumpkinlollipopdispenser.png]]<br>Pumpkin Lollipop Dispenser
|eStore
|No
|-
|[[File:Pumpkinspicedonutdispenser.png]]<br>Pumpkin Spice Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Purplebatcupcakedispenser.png]]<br>Purple Bat Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Purplebutterflycookiedispenser.png]]<br>Purple Butterfly Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Purplewackychristmasgnome.png]]<br>Purple Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Purplewitchcocoadispenser.png]]<br>Purple Witch Cocoa Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Purplewitchygummydispenser.png]]<br>Purple Witchy Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Rainbowwackylantern.png]]<br>Rainbow Wacky Lantern
|eStore
|No
|-
|[[File:Redbakedappledispenser.png]]<br>Red Baked Apple Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Redcelebrationpopdispenser.png]]<br>Red Celebration Pop Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Redornamentcupcakedispenser.png]]<br>Red Ornament Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Redstarcookiedispenser.png]]<br>Red Star Cookie Dispenser
|eStore Promo
|Yes
|-
|[[File:Redwackychristmasgnome.png]]<br>Red Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Rosewackychristmasgnome.png]]<br>Rose Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Safariwackylamp.png]]<br>Safari Wacky Lamp
|eStore Promo Themed ?? Boxes<br>Sweet Safari
|Yes
|-
|[[File:Scarecrowcakepop.png]]<br>Scarecrow Cakepop
|Holiday Gifts<br>Thanksgiving Gifts
|Yes
|-
|[[File:Scarecrowcookiedispenser.png]]<br>Scarecrow Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Scaredycatcocoadispenser.png]]<br>Scaredy Cat Cocoa Dispenser
|2022 Planter Mystery Box Series 5
|Yes
|-
|[[File:Sillyscarecrowwackyfence.png]]<br>Silly Scarecrow Wacky Fence
|eStore
|No
|-
|[[File:Silverzingozpoptrophy.png]]<br>Silver Zingoz Pop Trophy
|Challenge<br>Arcade Game
|Yes
|-
|[[File:Singingwackys.png]]<br>Singing Wackys
|eStore Stockings & Crackers<br>2014 Stocking Prizes
|Yes
|-
|[[File:Skatingzingoztreebase.png]]<br>Skating Zingoz Tree Base
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Smittenkittendispenser.png]]<br>Smitten Kitten Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Snowflakewackydispenser.png]]<br>Snowflake Wacky Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Snowmanwackydonutdispenser.png]]<br>Snowman Wacky Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Snowzangoz.png]]<br>Snow Zangoz
|Challenge - Seasonal<br>Winterfest 2017 Challenge
|Yes
|-
|[[File:Sourwatermelonwackydispenser.png]]<br>Sour Watermelon Wacky Dispenser
|eStore Promo Seeds & Planter Boxes<br>2025 Planter Mystery Box Series 5
|Yes
|-
|[[File:Spicynutcrackerdispenser.png]]<br>Spicy Nutcracker Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Springbunnycookiedispenser.png]]<br>Spring Bunny Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Springchickcookiedispenser.png]]<br>Spring Chick Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Springzingozmusicalfountain.png]]<br>Spring Zingoz Musical Fountain
|eStore
|No
|-
|[[File:Stormylamp.png]]<br>Stormy Lamp
|eStore Promo Themed ?? Boxes<br>Stormy
|Yes
|-
|[[File:Sugarcookiedispenser.png]]<br>Sugar Cookie Dispenser
|eStore
|No
|-
|[[File:Sugarplumgumdropdispenser.png]]<br>Sugar Plum Gumdrop Dispenser
|eStore
|No
|-
|[[File:Sugarystocking.png]]<br>Sugary Stocking
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Summerfunwackydispenser.png]]<br>Summer Fun Wacky Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Summersurfwackydispenser.png]]<br>Summer Surf Wacky Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Sunnycupcakedispenser.png]]<br>Sunny Cupcake Dispenser
|2021 Planter Mystery Box Series 3
|Yes
|-
|[[File:Superslugger600trophy.png]]<br>Super Slugger 600 Trophy
|Wacky Zingoz Celebration/Arcade Game
|Yes
|-
|[[File:Superspookycookiedispenser.png]]<br>Super Spooky Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Sweetnutcrackerdispenser.png]]<br>Sweet Nutcracker Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Teddywackydonutdispenser.png]]<br>Teddy Wacky Donut Dispenser
|eStore
|No
|-
|[[File:Thanksgivingscarecrow.png]]<br>Thanksgiving Scarecrow
|Holiday Gifts<br>Thanksgiving Gifts
|Yes
|-
|[[File:Thanksgivingzangozgumballmachine.png]]<br>Thanksgiving Gumball Machine
|eStore
|No
|-
|[[File:Theadolescentzangoz.png]]<br>The Adolescent Zangoz
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Thedeceptivedisappearingzangoz.png]]<br>The Deceptive Disappearing Zangoz
|eStore
|No
|-
|[[File:Thezingozzangozbouncer.png]]<br>The Zingoz Zangoz Bouncer
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Tikihutfountain.png]]<br>Tiki Hut Fountain
|eStore
|No
|-
|[[File:Tikipalmstatue.png]]<br>Tiki Palm Statue
|eStore
|No
|-
|[[File:Tikitotemdivider.png]]<br>Tiki Totem Divider
|eStore
|No
|-
|[[File:Toadstoolwackydispenser.png]]<br>Toadstool Wacky Dispenser
|eStore
|No
|-
|[[File:Toyemporiumstoragedisplay.png]]<br>Toy Emporium Storage Display
|eStore
|No
|-
|[[File:Tropicalzangozgummydispenser.png]]<br>Tropical Zangoz Gummy Dispenser
|2021 Planter Mystery Box Series 5
|Yes
|-
|[[File:Tropicalzingozgummydispenser.png]]<br>Tropical Zingoz Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Valentinecookiedispenser.png]]<br>Valentine Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Valentinepopcornbitesdispenser.png]]<br>Valentine Popcorn Bites Dispenser
|eStore
|No
|-
|[[File:Valentinewackydispenser.png]]<br>Valentine Wacky Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Valentinewackylantern.png]]<br>Valentine Wacky Lantern
|eStore
|No
|-
|[[File:Valentinezangozgumballmachine.png]]<br>Valentine Zangoz Gumball Machine
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Valentinezingozmusicalfountain.png]]<br>Valentine Zingoz Musical Fountain
|eStore
|No
|-
|[[File:Vampirezangozdispenser.png]]<br>Vampire Zangoz Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Violetwackychristmasgnome.png]]<br>Violet Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Violetwackygardenlantern.png]]<br>Violet Wacky Garden Lantern
|eStore Promo Themed ?? Boxes<br>Violet
|Yes
|-
|[[File:Wackyacorncupcakedispenser.png]]<br>Wacky Acorn Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyactionfigure.png]]<br>Wacky Action Figure
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyairplane.png]]<br>Wacky Airplane
|eStore
|No
|-
|[[File:Wackyalmonds.png]]<br>Wacky Almonds
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2023
|Yes
|-
|[[File:Wackybackpack.png]]<br>Wacky Backpack
|eStore Fall Mystery Promo<br>2014 Fall Mystery Prizes
|Yes
|-
|[[File:Wackyballroomgown.png]]<br>Wacky Ballroom Gown
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyballroomshoes.png]]<br>Wacky Ballroom Shoes
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackybeachtowel.png]]<br>Wacky Beach Towel
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackybeachumbrella.png]]<br>Wacky Beach Umbrella
|eStore
|No
|-
|[[File:Wackybed.png]]<br>Wacky Bed
|eStore
|No
|-
|[[File:Wackybowlingstatue.png]]<br>Wacky Bowling Statue
|Wheels & Games<br>Prize Klaw - Green Capsule
|Yes
|-
|[[File:Wackybumpercar.png]]<br>Wacky Bumpercar
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackybunchofballoons.png]]<br>Wacky Bunch of Balloons
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2014
|Yes
|-
|[[File:Wackybunnycookiedispenser.png]]<br>Wacky Bunny Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackycakepop.png]]<br>Wacky Cake Pop
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackycandyapple.png]]<br>Wacky Candy Apple
|Misc. Foods<br>Home Grown Food
|Yes
|-
|[[File:Wackycandyring.png]]<br>Wacky Candy Ring
|Dispenser Food
|Yes
|-
|[[File:Wackycandyringplanter.png]]<br>Wacky Candy Ring Planter
|eStore
|No
|-
|[[File:Wackycarvedcoconut.png]]<br>Wacky Carved Coconut
|Vacation Island<br>Sheldon's Souvenir Shop
|Yes
|-
|[[File:Wackycerealbowl.png]]<br>Wacky Cereal Bowl
|Dispenser Food
|Yes
|-
|[[File:Wackycerealdispenser.png]]<br>Wacky Cereal Dispenser
|eStore
|No
|-
|[[File:Wackycheercupcakedispenser.png]]<br>Wacky Cheer Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackycheerleaderdress.png]]<br>Wacky Cheerleader Dress
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2013
|Yes
|-
|[[File:Wackycheesepizza.png]]<br>Wacky Cheese Pizza
|Click-to-Win: Non-Annual<br>Wacky Week - 2026
|Yes
|-
|[[File:Wackychocolatecupcakedispenser.png]]<br>Wacky Chocolate Cupcake Dispenser
|eStore Promo Seeds & Planter Boxes<br>2024 Planter Mystery Box Series 5
|Yes
|-
|[[File:Wackychristmasgnomelantern.png]]<br>Wacky Christmas Gnome Lantern
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Wackycitrusgumballdispenser.png]]<br>Wacky Citrus Gumball Dispenser
|eStore Promo Themed ?? Boxes<br>Summer Citrus
|Yes
|-
|[[File:Wackyclaysculpture.png]]<br>Wacky Clay Sculpture
|WShop
|Yes
|-
|[[File:Wackyclaysculpturekit.png]]<br>Wacky Clay Sculpture Kit
|WShop
|No
|-
|[[File:Wackyclovercookiedispenser.png]]<br>Wacky Clover Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackycloverplanter.png]]<br>Wacky Clover Planter
|eStore
|No
|-
|[[File:Wackyclub600trophy.png]]<br>Wacky Club 600 Trophy
|Arcade Game - Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackycoconutdispenser.png]]<br>Wacky Coconut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackycookiejardispenser.png]]<br>Wacky Cookie Jar Dispenser
|eStore
|No
|-
|[[File:Wackycookies.png]]<br>Wacky Cookies
|Dispenser Food
|Yes
|-
|[[File:Wackycornchipgrowinggardensseeds.png]]<br>Wacky Corn Chip Growing Gardens Seeds
|eStore
|No
|-
|[[File:Wackycornchips.png]]<br>Wacky Corn Chips
|Misc. Foods<br>Home Grown Food
|Yes
|-
|[[File:Wackycornonthecob.png]]<br>Wacky Corn on the Cob
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Wackycottoncandy.png]]<br>Wacky Cotton Candy
|Dispenser Food
|Yes
|-
|[[File:Wackycottoncandymaker.png]]<br>Wacky Cotton Candy Maker
|eStore
|No
|-
|[[File:Wackycottoncandywig.png]]<br>Wacky Cotton Candy Wig
|eStore
|No
|-
|[[File:Wackycrackers.png]]<br>Wacky Crackers
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackycupcake.png]]<br>Wacky Cupcake
|Dispenser Food
|No
|-
|[[File:Wackycupcaketreeseeds.png]]<br>Wacky Cupcake Tree Seeds
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackydaisypopdispenser.png]]<br>Wacky Daisy Pop Dispenser
|eStore Promo<br>Gift With Purchase
|Yes
|-
|[[File:Wackydelightcupcakedispenser.png]]<br>Wacky Delight Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyeastergnome.png]]<br>Wacky Easter Gnome
|Click-to-Win: Annual<br>Spring Celebration
|Yes
|-
|[[File:Wackyelfdonutdispenser.png]]<br>Wacky Elf Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyelfgummydispenser.png]]<br>Wacky Elf Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyerflooring.png]]<br>WackyER Flooring
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyergardenstatue.png]]<br>WackyER Garden Statue
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyerhotairballoon.png]]<br>WackyER Hot Air Balloon
|Deluxe Membership<br>Deluxe Monthly Challenge - May 2024
|Yes
|-
|[[File:Wackyerstandee.png]]<br>WackyER Standee
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerwallpaper.png]]<br>WackyER Wallpaper
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerwindow.png]]<br>WackyER Window
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozarcadeunit.png]]<br>WackyER Zingoz Arcade Unit
|Seasonal Challenges<br>Wacky Zingoz Celebration 2015
|Yes
|-
|[[File:Wackyerzingozbaseballcap.png]]<br>WackyER Zingoz Baseball Cap
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozbaseballshirt.png]]<br>WackyER Zingoz Baseball Shirt
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozhat.png]]<br>WackyER Zingoz Hat
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozpants.png]]<br>WackyER Zingoz Pants
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozposter.png]]<br>WackyER Zingoz Poster
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozshirt.png]]<br>WackyER Zingoz Shirt
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingozshoes.png]]<br>WackyER Zingoz Shoes
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyerzingoztrophy.png]]<br>WackyER Zingoz Trophy
|Challenge<br>Arcade Game
|No
|-
|[[File:Wackyfallgardengnome.png]]<br>Wacky Fall Garden Gnome
|Click-to-Win: Annual<br>Fall Fest - 2025
|Yes
|-
|[[File:Wackyfireplace.png]]<br>Wacky Fireplace
|eStore
|No
|-
|[[File:Wackyfruitkebab.png]]<br>Wacky Fruit Kebab
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackygamingchair.png]]<br>Wacky Gaming Chair
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackygardengnomelantern.png]]<br>Wacky Garden Gnome Lantern
|eStore Promo Themed ?? Boxes<br>Toadstool Hollow
|Yes
|-
|[[File:Wackygeyser.png]]<br>Wacky Geyser
|Challenges<br>Arcade Game Challenges
|Yes
|-
|[[File:Wackygokart.png]]<br>Wacky Go-Kart
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackygreeneggdispenser.png]]<br>Wacky Green Egg Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackygumball.png]]<br>Wacky Gumball
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackygumdrops.png]]<br>Wacky Gumdrops
|Clubhouse Events<br>Trick or Treat
|Yes
|-
|[[File:Wackygumdropseeds.png]]<br>Wacky Gumdrop Seeds
|eStore
|No
|-
|[[File:Wackygummies.png]]<br>Wacky Gummies
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackygummybeachballdispenser.png]]<br>Wacky Gummy Beachball Dispenser
|eStore Promo Seeds & Planter Boxes<br>2023 Planter Mystery Box Series 4
|Yes
|-
|[[File:Wackyhamper.png]]<br>Wacky Hamper
|eStore
|No
|-
|[[File:Wackyharvestgummydispenser.png]]<br>Wacky Harvest Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyhashbrowndispenser.png]]<br>Wacky Hashbrown Dispenser
|eStore
|No
|-
|[[File:Wackyhashbrowns.png]]<br>Wacky Hashbrowns
|Dispenser Food
|Yes
|-
|[[File:Wackyheadphones.png]]<br>Wacky Headphones
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyholidaydonutdispenser.png]]<br>Wacky Holiday Donut Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyhotairballoon.png]]<br>Wacky Hot Air Balloon
|Wheels & Games<br>Wacky Log Out Carnival
|Yes
|-
|[[File:Wackyhouseofwacky.png]]<br>Wacky House of Wacky
|eStore
|No
|-
|[[File:Wackyhoverboard.png]]<br>Wacky Hoverboard
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyicecreamcone.png]]<br>Wacky Ice Cream Cone
|Click-to-Win: Annual<br>Wacky Zingoz Celebration<br>2024
|Yes
|-
|[[File:Wackyicecreamtruckfridge.png]]<br>Wacky Ice Cream Truck Fridge
|Click-to-Win: Annual<br>Wacky Zingoz Celebration<br>2024
|Yes
|-
|[[File:Wackyicepop.png]]<br>Wacky Ice Pop
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Wackyinflatableraft.png]]<br>Wacky Inflatable Raft
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackyjetbackpack.png]]<br>Wacky Jet Backpack
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyjuicebox.png]]<br>Wacky Juicebox
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyjumbleberrygumballdispenser.png]]<br>Wacky Jumbleberry Gumball Dispenser
|eStore
|No
|-
|[[File:Wackykinzcashcoin.png]]<br>Wacky KinzCash Coin
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyknapsack.png]]<br>Wacky Knapsack
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackylaptop.png]]<br>Wacky Laptop
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackylemonfizz.png]]<br>Wacky Lemon Fizz
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Wackylemonicepop.png]]<br>Wacky Lemon Ice Pop
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Wackyleprechaunfence.png]]<br>Wacky Leprechaun Fence
|eStore
|No
|-
|[[File:Wackyleprechaungummies.png]]<br>Wacky Leprechaun Gummies
|Dispenser Food
|Yes
|-
|[[File:Wackyleprechaungummydispenser.png]]<br>Wacky Leprechaun Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackylightuplamp.png]]<br>Wacky Light Up Lamp
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackylunchbox.png]]<br>Wacky Lunchbox
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackymapleleafcupcakedispenser.png]]<br>Wacky Maple Leaf Cupcake Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackymarshmallows.png]]<br>Wacky Marshmallows
|Dispenser Food
|Yes
|-
|[[File:Wackymarshmallowseeds.png]]<br>Wacky Marshmallow Seeds
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackymarshmallowtreat.png]]<br>Wacky Marshmallow Treat
|Dispenser Food
|Yes
|-
|[[File:Wackymarshmallowtreatsdispenser.png]]<br>Wacky Marshmallow Treat Dispenser
|eStore
|No
|-
|[[File:Wackymeal.png]]<br>Wacky Meal
|Dispenser Food
|Yes
|-
|[[File:Wackymilkshake.png]]<br>Wacky Milkshake
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Wackyminifridge.png]]<br>Wacky Mini Fridge
|Wheels & Games
|Yes
|-
|[[File:Wackymoonberrygumballdispenser.png]]<br>Wacky Moonberry Gumball Dispenser
|eStore
|No
|-
|[[File:Wackymusicbox.png]]<br>Wacky Music Box
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackynutbar.png]]<br>Wacky Nut Bar
|Click-to-Win: Annual<br>Wacky Zingoz Celebration<br>2016
|Yes
|-
|[[File:Wackynutbartreeseeds.png]]<br>Wacky Nut Bar Tree Seeds
|Click-to-Win: Annual<br>Wacky Zingoz Celebration<br>2023
|Yes
|-
|[[File:Wackypainting.png]]<br>Wacky Painting
|SPREE!<br>Kinzville Mall
|Yes
|-
|[[File:Wackypearlgumballdispenser.png]]<br>Wacky Pearl Gumball Dispenser
|2022 Planter Mystery Box Series 3
|Yes
|-
|[[File:Wackyperformancestatue.png]]<br>Wacky Performance Statue
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackypickleberrygumballdispenser.png]]<br>Wacky Pickleberry Gumball Dispenser
|eStore
|No
|-
|[[File:Wackypiggybank.png]]<br>Wacky Piggy Bank
|WackyER Zingoz<br>Wacky Weekend
|Yes
|-
|[[File:Wackypineappledispenser.png]]<br>Wacky Pineapple Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyplacesetting.png]]<br>Wacky Place Setting
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackypompoms.png]]<br>Wacky Pompoms
|Seasonal Challenges<br>Wacky Zingoz Celebration 2013 Challenge
|Yes
|-
|[[File:Wackypooltable.png]]<br>Wacky Pool Table
|Challenge<br>Arcade Game
|Yes
|-
|[[File:Wackypopcorn.png]]<br>Wacky Popcorn
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackypopcorntreeseeds.png]]<br>Wacky Popcorn Tree Seeds
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackypopuptent.png]]<br>Wacky Pop-up Tent
|eStore
|No
|-
|[[File:Wackypurpleeggdispenser.png]]<br>Wacky Purple Egg Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackypurplegumballdispenser.png]]<br>Wacky Purple Gumball Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackypurse.png]]<br>Wacky Purse
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyracer.png]]<br>Wacky Racer
|eStore
|No
|-
|[[File:Wackyracinghelmet.png]]<br>Wacky Racing Helmet
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyracingsuit.png]]<br>Wacky Racing Suit
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyrainbowdonutdispenser.png]]<br>Wacky Rainbow Donut Dispenser
|eStore
|No
|-
|[[File:Wackyriceballdispenser.png]]<br>Wacky Rice Ball Dispenser
|eStore
|No
|-
|[[File:Wackyrollerskates.png]]<br>Wacky Roller Skates
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyrug.png]]<br>Wacky Rug
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackysbullseyebattertrophy.png]]<br>Wacky's Bullseye Batter Trophy
|Challenge<br>Trophy Challenge
|Yes
|-
|[[File:Wackysburgerstand.png]]<br>Wacky's Burger Stand
|eStore
|No
|-
|[[File:Wackyschoolsupplies.png]]<br>Wacky School Supplies
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyscooter.png]]<br>Wacky Scooter
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2018
|Yes
|-
|[[File:Wackysignedportrait.png]]<br>Wacky's Signed Portrait
|Community Codes
|Yes
|-
|[[File:Wackyskateboard.png]]<br>Wacky's Skateboard
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyskyberrygumballdispenser.png]]<br>Wacky Skyberry Gumball Dispenser
|eStore
|No
|-
|[[File:Wackysled.png]]<br>Wacky Sled
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Wackysleepingbag.png]]<br>Wacky Sleeping Bag
|Click-to-Win: Non-Annual<br>Wacky Week - 2062
|Yes
|-
|[[File:Wackyslippers.png]]<br>Wacky Slippers
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Wackyslippyslide.png]]<br>Wacky Slippy Slide
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackysmore.png]]<br>Wacky S'more
|Dispenser Food
|Yes
|-
|[[File:Wackysmoredispenser.png]]<br>Wacky S'more Dispenser
|eStore
|Yes
|-
|[[File:Wackysnackmachinefridge.png]]<br>Wacky Snack Machine Fridge
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackysnackpack.png]]<br>Wacky Snack Pack
|Today's Activities
|No
|-
|[[File:Wackysnakegummydispenser.png]]<br>Wacky Snake Gummy Dispenser
|eStore
|No
|-
|[[File:Wackysnowballtruffledispenser.png]]<br>Wacky Snowball Truffle Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackysoda.png]]<br>Wacky Soda
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2025
|Yes
|-
|[[File:Wackysodamachinefridge.png]]<br>Wacky Soda Machine Fridge
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackysprinkler.png]]<br>Wacky Sprinkler
|eStore
|No
|-
|[[File:Wackystainedglasswindow.png]]<br>Wacky Stained Glass Window
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackystandee.png]]<br>Wacky Standee
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackystrengthtester.png]]<br>Wacky Strength Tester
|Deluxe Membership<br>Deluxe Day Prizes
|Yes
|-
|[[File:Wackystudentplush.png]]<br>Wacky Student Plush
|Kinzville Academy<br>Recess
|Yes
|-
|[[File:Wackysugarberrygumballdispenser.png]]<br>Wacky Sugarberry Gumball Dispenser
|eStore
|No
|-
|[[File:Wackysunflowersandwichdispenser.png]]<br>Wacky Sunflower Sandwich Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackysunglasses.png]]<br>Wacky Sunglasses
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackysuperherosodadispenser.png]]<br>Wacky Superhero Soda Dispesner
|eStore Promo Seeds & Planter Boxes<br>2025 Planter Mystery Box Series 3
|Yes
|-
|[[File:Wackysurfboard.png]]<br>Wacky Surfboard
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackyteaset.png]]<br>Wacky Tea Set
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackythankfulsandwichdispenser.png]]<br>Wacky Thankful Sandwich Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackythanksgivingplushy.png]]<br>Wacky Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts
|Yes
|-
|[[File:Wackytopiary.png]]<br>Wacky Topiary
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackytrain.png]]<br>Wacky Train
|eStore
|No
|-
|[[File:Wackytrophypedestal.png]]<br>Wacky Trophy Pedestal
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2014
|Yes
|-
|[[File:Wackytropicalplant.png]]<br>Wacky Tropical Plant
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Wackytuxedojacket.png]]<br>Wacky Tuxedo Jacket
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackytuxedopants.png]]<br>Wacky Tuxedo Pants
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyumbrellagummydispenser.png]]<br>Wacky Umbrella Gummy Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackywadingpool.png]]<br>Wacky Wading Pool
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackywallpaper.png]]<br>Wacky Wallpaper
|eStore
|No
|-
|[[File:Wackywig.png]]<br>Wacky Wig
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackywindchime.png]]<br>Wacky Windchime
|Deluxe Membership<br>Deluxe Day
|Yes
|-
|[[File:Wackywindow.png]]<br>Wacky Window
|eStore
|No
|-
|[[File:Wackywinduptoy.png]]<br>Wacky Wind-up Toy
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2014
|Yes
|-
|[[File:Wackywizard600trophy.png]]<br>Wacky Wizard 600 Trophy
|Trophies<br>Arcade Trophies
|Yes
|-
|[[File:Wackyxoxocookiedispenser.png]]<br>Wacky Xoxo Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Wackyzingoz2.png]]<br>Wacky Zingoz
|Feature Codes<br>Christmas Ornaments
|No
|-
|[[File:Wackyzingoz600trophy.png]]<br>Wacky Zingoz 600 Trophy
|Wacky Zingoz Celebration/Arcade Game
|Yes
|-
|[[File:Wackyzingoz600trophystand.png]]<br>Wacky Zingoz 600 Trophy Stand
|eStore
|No
|-
|[[File:Wackyzingozairship.png]]<br>Wacky Zingoz Airship
|eStore
|No
|-
|[[File:Wackyzingozbopper.png]]<br>Wacky Zingoz Bopper
|eStore
|No
|-
|[[File:Wackyzingozcelebration2022poster.png]]<br>Wacky Zingoz Celebration 2022 Poster
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Wackyzingozdoorbell.png]]<br>Wacky Zingoz Doorbell
|Deluxe Membership<br>Deluxe Day - August 2016
|Ye
|-
|[[File:Wackyzingozmusicbox.png]]<br>Wacky Zingoz Music Box
|eStore Summer Mystery Promo<br>2013 Summer Mystery Bag
|Yes
|-
|[[File:Wackyzingozplush.png]]<br>Wacky Zingoz Plush
|Media Promotions<br>Smurf Movie Promotion
|Yes
|-
|[[File:Wackyzingozporchswing.png]]<br>Wacky Zingoz Porch Swing
|eStore
|No
|-
|[[File:Wackyzingozswing.png]]<br>Wacky Zingoz Swing
|Deluxe Membership<br>Deluxe Day - August 2024
|Yes
|-
|[[File:Wackyzingoztoybox.png]]<br>Wacky Zingoz Toy Box
|Spree
|Yes
|-
|[[File:Watermelongumballdispenser.png]]<br>Watermelon Gumball Dispenser
|2021 Planter Mystery Box Series 2
|Yes
|-
|[[File:Webkinzdayzangozgumballmachine.png]]<br>Webkinz Day Zangoz Gumball Machine
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Whereswackytrophy.png]]<br>Where's Wacky Trophy
|Trophies<br>Trophy Challenges
|Yes
|-
|[[File:Whistlingwackys.png]]<br>Whistling Wackys
|eStore
|No
|-
|[[File:Windupzingoz.png]]<br>Wind Up Zingoz
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Winterchillmintdispenser.png]]<br>Winterchill Mint Dispenser
|eStore
|No
|-
|[[File:Winterelfcookiedispenser.png]]<br>Winter Elf Cookie Dispenser
|eStore
|No
|-
|[[File:Winterfestwackyplushy.png]]<br>Winterfest Wacky Plushy
|Click-to-Win: Annual<br>Winterfest
|Yes
|-
|[[File:Winterfunzingoz.png]]<br>Winter Fun Zingoz
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Winterfunzingozbopper.png]]<br>Winter Fun Zingoz Bopper
|eStore Stockings & Crackers<br>2011 Stocking Prizes
|Yes
|-
|[[File:Winterwackygnomelantern.png]]<br>Winter Wacky Gnome Lantern
|eStore
|No
|-
|[[File:Wizkinzjawbreakerdispenser.png]]<br>Wizkinz Jawbreaker Dispenser
|eStore
|No
|-
|[[File:Worldofzingozwaterslide.png]]<br>World of Zingoz Waterslide
|eStore
|No
|-
|[[File:Yellowbutterflycookiedispenser.png]]<br>Yellow Butterfly Cookie Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Yellowwackychristmasgnome.png]]<br>Yellow Wacky Christmas Gnome
|Christmas Countdown
|Yes
|-
|[[File:Zackyhotairballoon.png]]<br>Zacky Hot Air Balloon
|eStore
|No
|-
|[[File:Zackysmap.png]]<br>Zacky's Map
|Challenges<br>Arcade Game - Zacky's Quest
|Yes
|-
|[[File:Zackysqueststatue.png]]<br>Zacky's Quest Statue
|Arcade Game
|Yes
|-
|[[File:Zangozactionfigure.png]]<br>Zangoz Action Figure
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Zangozbumpercar.png]]<br>Zangoz Bumper Car
|eStore
|No
|-
|[[File:Zangozcakeballdispenser.png]]<br>Zangoz Cake Ball Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Zangozchocolatefountain.png]]<br>Zangoz Chocolate Fountain
|Exclusive<br> Adoption Exclusive - Current
|Yes
|-
|[[File:Zangozcookie.png]]<br>Zangoz Cookie
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zangozdivergemstonedispenser.png]]<br>Zangoz Diver Gemstone Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Zangozfridge.png]]<br>Zangoz Fridge
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2025
|Yes
|-
|[[File:Zangozfruitstand.png]]<br>Zangoz Fruit Stand
|WShop
|Yes
|-
|[[File:Zangozgamingchair.png]]<br>Zangoz Gaming Chair
|Holiday Gift<br>Christmas - 2025
|Yes
|-
|[[File:Zangozheadphones.png]]<br>Zangoz Headphones
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zangozholidayplushy.png]]<br>Zangoz Holiday Plushy
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Zangozknapsack.png]]<br>Zangoz Knapsack
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zangozmusicbox.png]]<br>Zangoz Music Box
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Zangozorangefizz.png]]<br>Zangoz Orange Fizz
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|No
|-
|[[File:Zangozpinatadispenser.png]]<br>Zangoz Pinata Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Zangozplushtoy.png]]<br>Zangoz Plush Toy
|WShop
|Yes
|-
|[[File:Zangozracinghelmet.png]]<br>Zangoz Racing Helmet
|Community Codes
|Yes
|-
|[[File:Zangozracingsuit.png]]<br>Zangoz Racing Suit
|Community Codes
|Yes
|-
|[[File:Zangozredcatgumballdispenser.png]]<br>Zangoz Red Cat Gumball Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Zangozriceball.png]]<br>Zangoz Rice Ball
|Dispenser Food<br>Wacky Rice Ball Dispenser
|Yes
|-
|[[File:Zangozrug.png]]<br>Zangoz Rug
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Zangozskateboard.png]]<br>Zangoz Skateboard
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zangozslippers.png]]<br>Zangoz Slippers
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Zangozsnowman.png]]<br>Zangoz Snowman
|Challenge - Seasonal<br>Winterfest 2015
|Yes
|-
|[[File:Zangozsodamachinefridge.png]]<br>Zangoz Soda Machine Fridge
|Challenge - Seasonal<br>Wacky Zingoz Celebration 2016
|Yes
|-
|[[File:Zangozspeedster.png]]<br>Zangoz Speedster
|Challenge<br>Arcade Game
|Yes
|-
|[[File:Zangozstatue.png]]<br>Zangoz Statue
|eStore
|No
|-
|[[File:Zangozsteindispenser.png]]<br>Zangozstein Dispenser
|eStore
|No
|-
|[[File:Zangoztaffy.png]]<br>Zangoz Taffy
|Dispenser Food
|Yes
|-
|[[File:Zangoztcgposter.png]]<br>Zangoz TCG Poster
|Trading Cards<br>Series 1
|Yes
|-
|[[File:Zangozthanksgivingplushy.png]]<br>Zangoz Thanksgiving Plushy
|Holiday Gifts<br>Thanksgiving Gifts
|Yes
|-
|[[File:Zangoztopiary.png]]<br>Zangoz Topiary
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Zangoztropicalplant.png]]<br>Zangoz Tropical Plant
|Wheels & Games<br>WackyER Zingoz
|Yes
|-
|[[File:Zangozwatersprayer.png]]<br>Zangoz Water Sprayer
|eStore Fall Mystery Promo<br>2013 Fall Mystery Prizes
|Yes
|-
|[[File:Zangozwig.png]]<br>Zangoz Wig
|WackyER Zingoz<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zingozandzangozicepop.png]]<br>Zingoz and Zangoz Ice Pop
|Seasonal Challenges<br>Wacky Zingoz Celebration 2013 Challenge
|Yes
|-
|[[File:Zingozbounceball.png]]<br>Zingoz Bounce Ball
|Prize Klaw<br>Green Capsule
|Yes
|-
|[[File:Zingozbouncetrophy.png]]<br>Zingoz Bounce Trophy
|Arcade Game
|Yes
|-
|[[File:Zingozbubbleblower.png]]<br>Zingoz Bubble Blower
|Exclusive<br>Adoption Exclusive - Retired
|Yes
|-
|[[File:Zingozcandyappletree.png]]<br>Zingoz Candy Apple Tree
|eStore
|No
|-
|[[File:Zingozcelebrationdress.png]]<br>Zingoz Celebration Dress
|eStore
|No
|-
|[[File:Zingozdunktrophy.png]]<br>Zingoz Dunk Trophy
|Dunk the Zingoz (Random Chance)
|Yes
|-
|[[File:Zingozholidayplushy.png]]<br>Zingoz Holiday Plushy
|Holiday Gifts<br>Christmas Gifts
|Yes
|-
|[[File:Zingozinabox.png]]<br>Zingoz in a Box
|WShop
|Yes
|-
|[[File:Zingozlamp.png]]<br>Zingoz Lamp
|eStore
|No
|-
|[[File:Zingozmusicalfountain.png]]<br>Zingoz Musical Fountain
|eStore Spring Mystery Promo<br>2017 Spring Mystery Prizes
|Yes
|-
|[[File:Zingozpiethrowtrophy.png]]<br>Zingoz Pie Throw Trophy
|Challenge<br>Trophy Challenge
|Yes
|-
|[[File:Zingozpinatadispenser.png]]<br>Zingoz Pinata Dispenser
|eStore Promo<br>Gift with Purchase
|Yes
|-
|[[File:Zingozplushy.png]]<br>Zingoz Plushy
|Click-to-Win: Annual<br>Wacky Zingoz Celebration
|Yes
|-
|[[File:Zingozriceball.png]]<br>Zingoz Rice Ball
|Dispenser Food<br>Wacky Rice Ball Dispenser
|Yes
|-
|[[File:Zingozswitcherooz.png]]<br>Zingoz Switcherooz
|W-Shop
|Yes
|-
|[[File:Zingozswitcheroozarcadeunit.png]]<br>Zingoz Switcherooz Arcade Unit
|SPREE!<br>Kinzville Mall - Retired
|Yes
|-
|[[File:Zingozswitcherooztrophy.png]]<br>Zingoz Switcherooz Trophy
|Challenge<br>Trophy Challenge
|Yes
|-
|[[File:Zingoztaffy.png]]<br>Zingoz Taffy
|Dispenser Food
|Yes
|-
|[[File:Zingoztree.png]]<br>Zingoz Tree
|eStore
|No
|-
|[[File:Zingozwindspinner.png]]<br>Zingoz Wind Spinner
|Click-to-Win: Annual<br>Wacky Zingoz Celebration<br>2010
|Yes
|-
|[[File:Zingozzangoztrophy.png]]<br>Zingoz Zangoz Trophy
|Arcade Game
|No
|-
|[[File:Zombiezangozgumballmachine.png]]<br>Zombie Zangoz Gumball Machine
|eStore
|No
|}`)
  });
}());
