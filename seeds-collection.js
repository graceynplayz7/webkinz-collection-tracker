(function () {
  function parseGrowingSeedsTable(rawTable) {
    return rawTable
      .split("|-\n")
      .map((entry) => entry.trim())
      .filter((entry) => entry.startsWith("|[[File:"))
      .map((entry) => {
        const lines = entry.split("\n");
        const seedMatch = lines[0].match(/^\|\[\[File:(.+?)\]\]<br>(.+)$/);
        const foodMatch = (lines[1] || "").match(/^\|(?:\{\{!\}\})?\[\[File:(.+?)\]\]<br>(.+)$/);

        if (!seedMatch) {
          return null;
        }

        const [, fileName, itemName] = seedMatch;
        const foodImage = foodMatch ? foodMatch[1].trim() : "";
        const foodName = foodMatch ? foodMatch[2].trim() : "";
        const availability = (lines[2] || "")
          .replace(/^\|/, "")
          .replace(/<br>/g, " - ")
          .trim();
        const tradeable = (lines[3] || "").replace(/^\|/, "").trim() || "Unknown";

        return {
          id: itemName
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
          name: itemName.trim(),
          owned: false,
          notes: foodName ? `Plants: ${foodName}` : "",
          food: foodName,
          foodImage,
          availability,
          tradeable,
          image: fileName.trim()
        };
      })
      .filter(Boolean);
  }

  window.extraCollections = window.extraCollections || [];
  window.extraCollections.push({
    id: "growing-seeds-and-foods",
    name: "Growing Seeds & Foods Collection",
    description: "Growing seeds and food plants from Webkinz Guide, without growth stage entries.",
    category: "Food",
    items: parseGrowingSeedsTable(`{| class="greentable sortable" width=100%"
|- align="left"
!Item
!Food
!Availability
!Tradeable
!Growth Stages
!Harvest Time (Days)
!Resell Value (KC)
!KC per day
|-
|[[File:Autumnsunflowerseeds.png]]<br>Autumn Sunflower Seeds
|[[File:Salt&peppersunflowerseeds.png]]<br>Salt & Pepper Sunflower Seeds
|eStore
|No
|{{File:Autumnsunflowerseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Bbqsunflowerseeds.png]]<br>BBQ Sunflower Seeds
|[[File:Candycoatedsunflowerseeds.png]]<br>Candy Coated Sunflower Seeds
|BBQ: Can only be obtained by feeding your pet Salt & Pepper Sunflower Seeds<br>Candy Coated: Can only be obtained by feeding your pet BBQ Sunflower Seeds
|No
|{{File:Autumnsunflowerseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Backyardbeehive.png]]<br>Backyard Beehive
|[[File:Honeycomb.png]]<br>Honeycomb
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2025
|Yes
|{{File:Backyardbeehive.png}}
|10 Days
|4 KC
|0.40 KC/day
|-
|[[File:Bananablasticecreamplantseeds.png]]<br>Banana Blast Ice Cream Plant Seeds
|[[File:Bananablasticecreamcone.png]]<br>Banana Blast Ice Cream Cone
|eStore
|No
|{{File:Bananablasticecreamplantseeds.png}}
|8 Days
|9 KC
|1.13 KC/day
|-
|[[File:Bananasplitseeds.png]]<br>Banana Split Seeds
|[[File:Farmfreshbananasplit.png]]<br>Farm Fresh Banana Split
|Exclusives<br>Pet of the Month - Current
|Yes
|{{File:Bananasplitseeds.png}}
|7 Days
|20 KC
|2.86 KC/day
|-
|[[File:Blackcherryplumseeds.png]]<br>Black Cherry Plum Seeds
|[[File:Freshlypickedcherryplums.png]]<br>Freshly Picked Cherry Plums
|eStore Promo Seeds & Planter Boxes<br>2020 Growing Mystery Box Series 1
|Yes
|{{File:Blackcherryplumseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Blackberryplanterbox.png]]<br>Blackberry Planter Box
|[[File:Homemadeblackberryjam.png]]<br>Homemade Blackberry Jam
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Blackberryplanterbox.png}}
|Days
|KC
|KC/day
|-
|[[File:Blueberryplanterbox.png]]<br>Blueberry Planter Box
|[[File:Homemadeblueberryjam.png]]<br>Homemade Blueberry Jam
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Blueberryplanterbox.png}}
|Days
|KC
|KC/day
|-
|[[File:Bloodorangetreeseeds.png]]<br>Blood Orange Tree Seeds
|[[File:Freshlypickedbloodorange.png]]<br>Freshly Picked Blood Orange
|eStore Promo Seeds & Planter Boxes<br>2020 Growing Mystery Box Series 2
|Yes
|{{File:Bloodorangetreeseeds.png}}
|9 Days
|8 KC
|0.89 KC/day
|-
|[[File:Blueribboncornseeds.png]]<br>Blue Ribbon Corn Seeds
|[[File:Bluechipsandsalsa.png]]<br>Blue Chips and Salsa
|eStore
|No
|{{File:Blueribboncornseeds.png}}
|9 Days
|10 KC
|1.11 KC/day
|-
|[[File:Candyappleseeds.png]]<br>Candy Apple Seeds
|[[File:Farmfreshcandyapple.png]]<br>Farm Fresh Candy Apple
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2016
|Yes
|{{File:Candyappleseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Candycaneseeds.png]]<br>Candy Cane Seeds
|[[File:Farmfreshcandycanes.png]]<br>Farm Fresh Candy Canes
|Pet Specific Item<br>Peppermint Puppy 
|Yes
|{{File:Candycaneseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Candycosmosseeds.png]]<br>Candy Cosmos Seeds
|[[File:Pinkcandycosmos.png]]<br>Pink Candy Cosmos
|Pet Specific Item<br>Fairykinz Raccoon 
|Yes
|{{File:Candycosmosseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Caramelappleseeds.png]]<br>Caramel Apple Seeds
|[[File:Farmfreshcaramelapple.png]]<br>Farm Fresh Caramel Apple
|Exclusives<br>Pet of the Month - Current  
|Yes
|{{File:Caramelappleseeds.png}}
|10 Days
|8 KC
|0.80 KC/day
|-
|[[File:Chocolatedippedgoogooberryseeds.png]]<br>Chocolate Dipped Goo-Goo Berry Seeds
|[[File:Chocolatedippedgoogooberry.png]]<br>Chocolate Dipped Goo-Goo Berry
|Click-to-Win: Annual<br>Berry Fest - 2024
|Yes
|{{File:Chocolatedippedgoogooberryseeds.png}}
|9 Days
|11 KC
|1.22 KC/day
|-
|[[File:Chocolatedippedpolarberryseeds.png]]<br>Chocolate Dipped Polarberry Seeds
|[[File:Chocolatedippedpolarberry.png]]<br>Chocolate Dipped Polarberry
|Click-to-Win: Annual<br>Berry Fest - 2024
|Yes
|{{File:Chocolatedippedpolarberryseeds.png}}
|9 Days
|11 KC
|1.22 KC/day
|-
|[[File:Chocolatekinzcashcoinseeds.png]]<br>Chocolate KinzCash Coin Seeds
|[[File:Goldenchocolatecoins.png]]<br>Golden Chocolate Coins
|eStore Promo<br>Gift with Purchase
|Yes
|{{File:Chocolatekinzcashcoinseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Chocolatemarshmallowseeds.png]]<br>Chocolate Marshmallow Seeds
|[[File:Chocolatemarshmallows.png]]<br>Chocolate Marshmallows
|eStore
|No
|{{File:Chocolatemarshmallowseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Cinnamonhearttreeseeds.png]]<br>Cinnamon Heart Tree Seeds
|[[File:Cinnamonhearts.png]]<br>Cinnamon Hearts
|KinzVille Park<br> Cinnamon's Chocolate Collection - 2021
|Yes
|{{File:Cinnamonhearttreeseeds.png}}
|5 Days
|4 KC
|0.80 KC/day
|-
|[[File:Coconuttreeseeds.png]]<br>Coconut Tree Seeds
|[[File:Tropicaltroublespunch.png]]<br>Tropical Troubles Punch
|Challenges<br>Arcade Game Challenges - Tropical Troubles
|Yes
|{{File:Coconuttreeseeds.png}}
|5 Days
|3 KC
|0.60 KC/day
|-
|[[File:Cranberrygrowinggardensseeds.png]]<br>Cranberry Growing Gardens Seeds
|[[File:Farmfreshcranberries.png]]<br>Farm Fresh Cranberries
|eStore
|No
|{{File:Cranberrygrowinggardensseeds.png}}
|10 Days
|6 KC
|0.60 KC/day
|-
|[[File:Datepalmtreeseeds.png]]<br>Date Palm Tree Seeds
|[[File:Freshlypickeddates.png]]<br>Freshly Picked Dates
|eStore Promo Seeds & Planter Boxes<br>Growing Seeds Mystery Box Series 2 
|Yes
|{{File:Datepalmtreeseeds.png}}
|9 Days
|8 KC
|0.89 KC/day
|-
|[[File:Donutplantseeds.png]]<br>Donut Plant Seeds
|[[File:Homegrowndonut.png]]<br>Home Grown Donut
|Exclusives<br>Pet of the Month - Current  
|Yes
|{{File:Donutplantseeds.png}}
|7 Days
|7 KC
|1.00 KC/day
|-
|[[File:Extracheesymacaroniseeds.png]]<br>Extra Cheesy Macaroni Seeds
|[[File:Farmfreshextracheesymacaroni.png]]<br>Farm Fresh Extra Cheesy Macaroni
|eStore
|No
|{{File:Extracheesymacaroniseeds.png}}
|7 Days
|25 KC
|3.57 KC/day
|-
|[[File:Figtreeseeds.png]]<br>Fig Tree Seeds
|[[File:Freshlypickedfig.png]]<br>Freshly Picked Fig
|eStore Promo Seeds & Planter Boxes<br>2020 Growing Mystery Box Series 5  
|Yes
|{{File:Figtreeseeds.png}}
|9 Days
|3 KC
|0.33 KC/day
|-
|[[File:Gingerbreadrollgrowinggardensseeds.png]]<br>Gingerbread Roll Growing Gardens Seeds
|[[File:Gingerbreadcinnamonrolls.png]]<br>Gingerbread Cinnamon Rolls
|Pet Specific Item<br>Gingerbread Bear
|Yes
|{{File:Gingerbreadrollgrowinggardensseeds.png}}
|9 Days
|8 KC
|0.89 KC/day
|-
|[[File:Goldendeliciousappleseeds.png]]<br>Golden Delicious Apple Seeds
|[[File:Farmfreshgoldendeliciousapple.png]]<br>Farm Fresh Golden Delicious Apple
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2016
|Yes
|{{File:Goldendeliciousappleseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Goodygumdroptree.png]]<br>Goody Gumdrop Tree
|[[File:Goodygumdrops.png]]<br>Goody Gumdrops
|Exclusives<br>Pet of the Month - Current
|Yes
|{{File:Goodygumdroptree.png}}
|8 Days
|4 KC
|0.50 KC/day
|-
|[[File:Googooberrygumballseeds.png]]<br>Goo-Goo Berry Gumball Seeds
|[[File:Googooberrygumball.png]]<br>Goo-Goo Berry Gumball
|Click-to-Win: Annual<br>Berry Fest - 2025
|Yes
|{{File:Googooberrygumballseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Greenappletreeseeds.png]]<br>Green Apple Tree Seeds
|[[File:Farmfreshgreenapple.png]]<br>Farm Fresh Green Apple
|Click-to-Win: Annual<br>Fall Fest - 2017
|Yes
|{{File:Greenappletreeseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Growinggardensblackberryseeds.png]]<br>Growing Gardens Blackberry Seeds
|[[File:Farmfreshblackberries.png]]<br>Farm Fresh Blackberries
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2022
|Yes
|{{File:Growinggardensblackberryseeds.png}}
|10 Days
|3 KC
|0.30 KC/day
|-
|[[File:Growinggardensblueberryseeds.png]]<br>Growing Gardens Blueberry Seeds
|[[File:Farmfreshwildblueberries.png]]<br>Farm Fresh Wild Blueberries
|Clubhouse Events<br>Garden Center
|Yes
|{{File:Growinggardensblueberryseeds.png}}
|10 Days
|3 KC
|0.30 KC/day
|-
|[[File:Growinggardensbutternutsquashseeds.png]]<br>Growing Gardens Butternut Squash Seeds
|[[File:Farmfreshbutternutsquash.png]]<br>Farm Fresh Butternut Squash
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardensbutternutsquashseeds.png}}
|7 Days
|6 KC
|0.86 KC/day
|-
|[[File:Growinggardenscabbageseeds.png]]<br>Growing Gardens Cabbage Seeds
|[[File:Farmfreshcabbage.png]]<br>Farm Fresh Cabbage
|WShop  
|Yes
|{{File:Growinggardenscabbageseeds.png}}
|9 Days
|8 KC
|0.89 KC/day
|-
|[[File:Growinggardenscantaloupeseeds.png]]<br>Growing Gardens Cantaloupe Seeds
|[[File:Farmfreshcantaloupe.png]]<br>Farm Fresh Cantaloupe
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2019
|Yes
|{{File:Growinggardenscantaloupeseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Growinggardenscarrotseeds.png]]<br>Growing Gardens Carrot Seeds
|[[File:Farmfreshbunchofcarrots.png]]<br>Farm Fresh Bunch of Carrots
|WShop  
|Yes
|{{File:Growinggardenscarrotseeds.png}}
|8 Days
|7 KC
|0.88 KC/day
|-
|[[File:Growinggardensceleryseeds.png]]<br>Growing Gardens Celery Seeds
|[[File:Farmfreshcelery.png]]<br>Farm Fresh Celery
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardensceleryseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Growinggardenscherrytomatoseeds.png]]<br>Growing Gardens Cherry Tomato Seeds
|[[File:Farmfreshcherrytomatoes.png]]<br>Farm Fresh Cherry Tomatoes
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardenscherrytomatoseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Growinggardenscornseeds.png]]<br>Growing Gardens Corn Seeds
|[[File:Farmfreshcorn.png]]<br>Farm Fresh Corn
|WShop  
|Yes
|{{File:Growinggardenscornseeds.png}}
|10 Days
|6 KC
|0.60 KC/day
|-
|[[File:Growinggardenscucumberseeds.png]]<br>Growing Gardens Cucumber Seeds
|[[File:Farmfreshcucumber.png]]<br>Farm Fresh Cucumber
|Click-to-Win: Annual<br>Fall Fest - 2019
|Yes
|{{File:Growinggardenscucumberseeds.png}}
|8 Days
|5 KC
|0.63 KC/day
|-
|[[File:Growinggardenshotpepperseeds.png]]<br>Growing Gardens Hot Pepper Seeds
|[[File:Farmfreshhotpeppers.png]]<br>Farm Fresh Hot Peppers
|Click-to-Win: Annual<br>Fall Fest - 2018
|Yes
|{{File:Growinggardenshotpepperseeds.png}}
|9 Days
|7 KC
|0.78 KC/day
|-
|[[File:Growinggardenskaleseeds.png]]<br>Growing Gardens Kale Seeds
|[[File:Farmfreshkale.png]]<br>Farm Fresh Kale
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2022
|Yes
|{{File:Growinggardenskaleseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Growinggardenslettuceseeds.png]]<br>Growing Gardens Lettuce Seeds
|[[File:Farmfreshlettuce.png]]<br>Farm Fresh Lettuce
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardenslettuceseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Growinggardensonionseeds.png]]<br>Growing Gardens Onion Seeds
|[[File:Farmfreshonion.png]]<br>Farm Fresh Onion
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardensonionseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Growinggardensparsnipseeds.png]]<br>Growing Gardens Parsnip Seeds
|[[File:Farmfreshparsnips.png]]<br>Farm Fresh Parsnips
|Click-to-Win: Non-Annual<br>Veggie Fest  
|Yes
|{{File:Growinggardensparsnipseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Growinggardenspeachseeds.png]]<br>Growing Gardens Peach Seeds
|[[File:Farmfreshpeach.png]]<br>Farm Fresh Peach
|Click-to-Win: Annual<br>Fall Fest - 2018
|Yes
|{{File:Growinggardenspeachseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Growinggardenspineappleseeds.png]]<br>Growing Gardens Pineapple Seeds
|[[File:Farmfreshpineapple.png]]<br>Farm Fresh Pineapple
|Click-to-Win: Non-Annual<br>Magic W
|Yes
|{{File:Growinggardenspineappleseeds.png}}
|5 Days
|6 KC
|1.20 KC/day
|-
|[[File:Growinggardenspumpkinseeds.png]]<br>Growing Gardens Pumpkin Seeds
|[[File:Farmfreshpumpkin.png]]<br>Farm Fresh Pumpkin
|WShop  
|Yes
|{{File:Growinggardenspumpkinseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Growinggardensredbellpepperseeds.png]]<br>Growing Gardens Red Bell Pepper Seeds
|[[File:Farmfreshredbellpepper.png]]<br>Farm Fresh Red Bell Pepper
|Click-to-Win: Annual<br>Fall Fest - 2020
|Yes
|{{File:Growinggardensredbellpepperseeds.png}}
|9 Days
|6 KC
|0.67 KC/day
|-
|[[File:Growinggardenssnowpeaseeds.png]]<br>Growing Gardens Snow Pea Seeds
|[[File:Farmfreshsnowpeas.png]]<br>Farm Fresh Snow Peas
|Click-to-Win: Annual<br>Fall Fest - 2018
|Yes
|{{File:Growinggardenssnowpeaseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Growinggardensstrawberryseeds.png]]<br>Growing Gardens Strawberry Seeds
|[[File:Farmfreshstrawberries.png]]<br>Farm Fresh Strawberries
|WShop  
|Yes
|{{File:Growinggardensstrawberryseeds.png}}
|10 Days
|6 KC
|0.60 KC/day
|-
|[[File:Growinggardenstomatoseeds.png]]<br>Growing Gardens Tomato Seeds
|[[File:Farmfreshtomato.png]]<br>Farm Fresh Tomato
|WShop  
|Yes
|{{File:Growinggardenstomatoseeds.png}}
|12 Days
|6 KC
|0.50 KC/day
|-
|[[File:Growinggardenswatermelonseeds.png]]<br>Growing Gardens Watermelon Seeds
|[[File:Farmfreshwatermelon.png]]<br>Farm Fresh Watermelon
|WShop  
|Yes
|{{File:Growinggardenswatermelonseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Growinggardensyellowbellpepperseeds.png]]<br>Growing Gardens Yellow Bell Pepper Seeds
|[[File:Farmfreshyellowbellpepper.png]]<br>Farm Fresh Yellow Bell Pepper
|Click-to-Win: Non-Annual<br>Magic W
|Yes
|{{File:Growinggardensyellowbellpepperseeds.png}}
|9 Days
|6 KC
|0.67 KC/day
|-
|[[File:Hazelnuttreeseeds.png]]<br>Hazelnut Tree Seeds
|[[File:Freshlypickedhazelnuts.png]]<br>Freshly Picked Hazelnuts
|eStore Promo Seeds & Planter Boxes<br>2020 Growing Mystery Box Series 3
|Yes
|{{File:Hazelnuttreeseeds.png}}
|9 Days
|6 KC
|0.67 KC/day
|-
|[[File:Holidaygumdropseeds.png]]<br>Holiday Gum Drop Seeds
|[[File:2020holidaygumdrops.png]]<br>Holiday Gum Drops
|Pet Specific Item<br>Gingerbread Elf
|Yes
|{{File:Holidaygumdropseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Icecreamsandwichseeds.png]]<br>Ice Cream Sandwich Seeds
|[[File:Farmfreshicecreamsandwich.png]]<br>Farm Fresh Ice Cream Sandwich
|eStore
|No
|{{File:Icecreamsandwichseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Jackolanternseeds.png]]<br>Jack O'Lantern Seeds
|[[File:Sweet&spookyjackolantern.png]]<br>Sweet & Spooky Jack O'Lantern
|eStore
|No
|{{File:Jackolanternseeds.png}}
|7 Days
|13 KC
|1.85 KC/day
|-
|[[File:Jellybeanplantseeds.png]]<br>Jelly Bean Plant Seeds
|[[File:Farmfreshjellybeans.png]]<br>Farm Fresh Jelly Beans
|eStore
|No
|{{File:Jellybeanplantseeds.png}}
|8 Days
|5 KC
|0.63 KC/day
|-
|[[File:Jumbleberryseeds.png]]<br>Jumbleberry Seeds
|[[File:Jumbleberry.png]]<br>Jumbleberry
|eStore
|No
|{{File:Jumbleberryseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Limesnoconeseeds.png]]<br>Lime Sno-Cone Seeds
|[[File:Limesnocone.png]]<br>Lime Sno-Cone
|eStore
|No
|{{File:Limesnoconeseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Lollipopseeds.png]]<br>Lollipop Seeds
|[[File:Colorfulswirllollipop.png]]<br>Colorful Swirl Lollipop
|eStore
|No
|{{File:Lollipopseeds.png}}
|9 Days
|6 KC
|0.67 KC/day
|-
|[[File:Macadamianuttreegrowingseeds.png]]<br>Macadamia Nut Tree Growing Seeds
|[[File:Macadamianuts.png]]<br>Macadamia Nuts
|eStore Promo Seeds & Planter Boxes<br>Growing Seeds Mystery Box
|Yes
|{{File:Macadamianuttreegrowingseeds.png}}
|9 Days
|6 KC
|0.67 KC/day
|-
|[[File:Magicbeanseeds.png]]<br>Magic Bean Seeds
|[[File:Giantbean.png]]<br>Giant Bean
|eStore
|No
|{{File:Magicbeanseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Magicwsourgumballseeds.png]]<br>Magic W Sour Gumball Seeds
|[[File:Magicwsourgumball.png]]<br>Magic W Sour Gumball
|eStore Promo<br>Gift with Purchase
|Yes
|{{File:Magicwsourgumballseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Mangotreeseeds.png]]<br>Mango Tree Seeds
|[[File:Freshlypickedmango.png]]<br>Freshly Picked Mango
|eStore Promo Seeds & Planter Boxes<br>Growing Seeds Mystery Box Series 3
|Yes
|{{File:Mangotreeseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Mapledippedappleseeds.png]]<br>Maple Dipped Apple Seeds
|[[File:Farmfreshmapledippedapple.png]]<br>Farm Fresh Maple Dipped Apple
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2017
|Yes
|{{File:Mapledippedappleseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Marshmallowseeds.png]]<br>Marshmallow Seeds
|[[File:Farmfreshmarshmallows.png]]<br>Farm Fresh Marshmallows
|Pet Specific Item<br>Marshmallow Bunny 
|Yes
|{{File:Marshmallowseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Milkchocolatetulipbulbs.png]]<br>Milk Chocolate Tulip Bulbs
|[[File:Chocolatetulip.png]]<br>Chocolate Tulip
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2020
|Yes
|{{File:Milkchocolatetulipbulbs.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Minieggseeds.png]]<br>Mini Egg Seeds
|[[File:Minieggs.png]]<br>Mini Eggs
|Wheels & Games<br>Wheel of WOW
|Yes
|{{File:Minieggseeds.png}}
|8 Days
|8 KC
|1.00 KC/day
|-
|[[File:Moonberryseeds.png]]<br>Moonberry Seeds
|[[File:Moonberry.png]]<br>Moonberry
|eStore
|No
|{{File:Moonberryseeds.png}}
|7 Days
|15 KC
|2.14 KC/day
|-
|[[File:Mulberrytreeseeds.png]]<br>Mulberry Tree Seeds
|[[File:Freshlypickedmulberries.png]]<br>Freshly Picked Mulberries
|eStore Promo Seeds & Planter Boxes<br>2020 Growing Mystery Box Series 4
|Yes
|{{File:Mulberrytreeseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Northerntrailsjellybeanplantseeds.png]]<br>Northern Trails Jelly Bean Plant Seeds
|{{!}}[[File:Northerntrailsjellybeans.png]]<br>Northern Trails Jelly Beans
|Pet Specific Item<br>Northern Trails Lynx
|Yes
|{{File:Northerntrailsjellybeanplantseeds.png}}
|8 Days
|5 KC
|0.63 KC/day
|-
|[[File:Orangetreegrowinggardensseeds.png]]<br>Orange Tree Growing Gardens Seeds
|[[File:Freshlyslicedoranges.png]]<br>Freshly Sliced Oranges
|eStore Promo Seeds & Planter Boxes<br>Growing Gardens Seeds Mystery Box
|Yes
|{{File:Orangetreegrowinggardensseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Ossililyplantseeds.png]]<br>Ossilily Plant Seeds
|[[File:Ossililybone.png]]<br>Ossilily Bone
|Pet Specific Item<br>Collie 
|Yes
|{{File:Ossililyplantseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Owlcookieseeds.png]]<br>Owl Cookie Seeds
|[[File:Owlcookie.png]]<br>Owl Cookie
|Click-to-Win: Annual<br>Fall Fest - 2020
|Yes
|{{File:Owlcookieseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Peppermintcakepoptreeseeds.png]]<br>Peppermint Cake Pop Tree Seeds
|[[File:Peppermintcakepop.png]]<br>Peppermint Cake Pop
|Deluxe Membership<br>Monthly Challenge – December 2021
|Yes
|{{File:Peppermintcakepoptreeseeds.png}}
|7 Days
|8 KC
|1.14 KC/day
|-
|[[File:Pickleberryseeds.png]]<br>Pickleberry Seeds
|[[File:Pickleberry.png]]<br>Pickleberry
|eStore
|No
|{{File:Pickleberryseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Plumpuddingseeds.png]]<br>Plum Pudding Seeds
|[[File:Plumpuddingbites.png]]<br>Plum Pudding Bites
|eStore
|No
|{{File:Plumpuddingseeds.png}}
|9 Days
|10 KC
|1.11 KC/day
|-
|[[File:Polarberrygumballseeds.png]]<br>Polarberry Gumball Seeds
|[[File:Polarberrygumball.png]]<br>Polarberry Gumball
|Click-to-Win: Annual<br>Berry Fest - 2025
|Yes
|{{File:Googooberrygumballseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Pottedchilipepperplant.png]]<br>Potted Chili Pepper Plant
|[[File:Homegrownchilipeppers.png]]<br>Home Grown Chili Peppers
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedchilipepperplant.png}}
|8 Days
|7 KC
|0.88 KC/day
|-
|[[File:Pottedcornplant.png]]<br>Potted Corn Plant
|[[File:Homegrowncorn.png]]<br>Home Grown Corn
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2024
|Yes
|{{File:Pottedcornplant.png}}
|8 Days
|6 KC
|0.75 KC/day
|-
|[[File:Pottedgingerbreadbiscuittree.png]]<br>Potted Gingerbread Biscuit Tree
|[[File:Gingerbreadbiscuit.png]]<br>Gingerbread Biscuit
|Pet Specific Item<br>Gingerbread Kitten
|Yes
|{{File:Pottedgingerbreadbiscuittree.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Pottedgingerplant.png]]<br>Potted Ginger Plant
|[[File:Homegrownginger.png]]<br>Home Grown Ginger
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedgingerplant.png}}
|10 Days
|3 KC
|0.30 KC/day
|-
|[[File:Pottedlemongrassplant.png]]<br>Potted Lemongrass Plant
|[[File:Homegrownlemongrass.png]]<br>Home Grown Lemongrass
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedlemongrassplant.png}}
|10 Days
|3 KC
|0.30 KC/day
|-
|[[File:Pottedminicucumberplant.png]]<br>Potted Mini Cucumber Plant
|[[File:Homegrownminicucumbers.png]]<br>Home Grown Mini Cucumbers
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedminicucumberplant.png}}
|8 Days
|5 KC
|0.63 KC/day
|-
|[[File:Pottedmintplant.png]]<br>Potted Mint Plant
|[[File:Homegrownmint.png]]<br>Home Grown Mint
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedmintplant.png}}
|10 Days
|3 KC
|0.30 KC/day
|-
|[[File:Pottedpizzaplant.png]]<br>Potted Pizza Plant
|[[File:Homegrownpepperonipizza.png]]<br>Home Grown Pepperoni Pizza
|Challenge<br>Seasonal - Pizza Party
|Yes
|{{File:Pottedpizzaplant.png}}
|7 Days
|8 KC
|1.41 KC/day
|-
|[[File:Pottedpoinsettiaplant.png]]<br>Potted Poinsettia Plant
|[[File:Poinsettiasugarcookie.png]]<br>Poinsettia Sugar Cookie
|Click-to-Win: Non-Annual<br>Magic W
|Yes
|{{File:Pottedpoinsettiaplant.png}}
|8 Days
|5 KC
|0.63 KC/day
|-
|[[File:Pottedpumpkinplant.png]]<br>Potted Pumpkin Plant
|[[File:Homegrownpumpkinseeds.png]]<br>Home Grown Pumpkin Seeds
|Click-to-Win: Annual<br>Fall Fest - Fall Fest Soda 2025
|Yes
|{{File:Pottedpumpkinplant.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Pottedstrawberryplant.png]]<br>Potted Strawberry Plant
|[[File:Homegrownstrawberries.png]]<br>Home Grown Strawberries
|Click-to-Win: Annual<br>Spring Celebration - Milk Chocolate Egg 2025
|Yes
|{{File:Pottedstrawberryplant.png}}
|10 Days
|5 KC
|0.50 KC/day
|-
|[[File:Pottedsunflowerplant.png]]<br>Potted Sunflower Plant
|[[File:Homegrownsunflowerseeds.png]]<br>Home Grown Sunflower Seeds
|Click-to-Win: Annual<br>Fall Fest - 2025
|Yes
|{{File:Pottedsunflowerplant.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Pottedyellowcherrytomatoplant.png]]<br>Potted Yellow Cherry Tomato Plant
|[[File:Homegrownyellowcherrytomatoes.png]]<br>Home Grown Yellow Cherry Tomatoes
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Pottedyellowcherrytomatoplant.png}}
|8 Days
|6 KC
|0.75 KC/day
|-
|[[File:Powdereddonutplantseeds.png]]<br>Powdered Donut Plant Seeds
|[[File:Minipowdereddonut.png]]<br>Mini Powdered Donut
|Pet Specific Item<br>Winter Goat
|Yes
|{{File:Powdereddonutplantseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Pumpkinspicecookieseeds.png]]<br>Pumpkin Spice Cookie Seeds
|[[File:Pumpkinspicecookie.png]]<br>Pumpkin Spice Cookie
| Click-to-Win: Annual<br>Fall Fest - 2020
|Yes
|{{File:Pumpkinspicecookieseeds.png}}
|7 Days
|4 KC
|0.57 KC/day
|-
|[[File:Rainbowgumdropseeds.png]]<br>Rainbow Gum Drop Seeds
|[[File:Rainbowgumdrops.png]]<br>Rainbow Gum Drops
|eStore
|No
|{{File:Rainbowgumdropseeds.png}}
|7 Days
|13 KC
|1.86 KC/day
|-
|[[File:Reddeliciousappletreeseeds.png]]<br>Red Delicious Apple Tree Seeds
|[[File:Farmfreshreddeliciousapple.png]]<br>Farm Fresh Red Delicious Apple
|Click-to-Win: Annual<br>Fall Fest - 2016
|Yes
|{{File:Reddeliciousappletreeseeds.png}}
|7 Days
|3 KC
|0.43 KC/day
|-
|[[File:Skyberrygrowinggardensseeds.png]]<br>Sky Berry Growing Gardens Seeds
|[[File:Skyberry.png]]<br>Sky Berry
|eStore
|No
|{{File:Skyberrygrowinggardensseeds.png}}
|7 Days
|8 KC
|1.14 KC/day
|-
|[[File:Snoconeplantseeds.png]]<br>Sno-Cone Plant Seeds
|[[File:Farmfreshsnocone.png]]<br>Farm Fresh Sno-Cone
|eStore
|No
|{{File:Snoconeplantseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Sourgoogooberryseeds.png]]<br>Sour Goo-Goo Berry Seeds
|[[File:Sourgoogooberry.png]]<br>Sour Goo-Goo Berry
|Click-to-Win: Annual<br>Berry Fest - 2019
|Yes
|{{File:Sourgoogooberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourjumbleberryseeds.png]]<br>Sour Jumbleberry Seeds
|[[File:Sourjumbleberry.png]]<br>Sour Jumbleberry
|Jumbleberry Fields<br>Jumbleberry
|Yes
|{{File:Sourjumbleberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourmoonberryseeds.png]]<br>Sour Moonberry Seeds
|[[File:Sourmoonberry.png]]<br>Sour Moonberry
|Jumbleberry Fields<br>Moonberry
|Yes
|{{File:Sourmoonberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourpickleberryseeds.png]]<br>Sour Pickleberry Seeds
|[[File:Sourpickleberry.png]]<br>Sour Pickleberry
|Jumbleberry Fields<br>Pickleberry
|Yes
|{{File:Sourpickleberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourpolarberryseeds.png]]<br>Sour Polarberry Seeds
|[[File:Sourpolarberry.png]]<br>Sour Polarberry
|Click-to-Win: Annual<br>Berry Fest - 2019 
|Yes
|{{File:Sourpolarberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourshamrocktreeseeds.png]]<br>Sour Shamrock Tree Seeds
|[[File:Sourshamrock.png]]<br>Sour Shamrock
|Clubhouse Events<br>Leprechaun Chase - 2022
|Yes
|{{File:Sourshamrocktreeseeds.png}}
|8 Days
|4 KC
|0.50 KC/day
|-
|[[File:Soursugarberryseeds.png]]<br>Sour Sugarberry Seeds
|[[File:Soursugarberry.png]]<br>Sour Sugarberry
|Jumbleberry Fields<br>Sugarberry
|Yes
|{{File:Soursugarberryseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Sourwildberrygummyseeds.png]]<br>Sour Wild Berry Gummy Seeds
|[[File:Sourwildberrygummies.png]]<br>Sour Wild Berry Gummies
|eStore
|No
|{{File:Sourwildberrygummyseeds.png}}
|9 Days
|13 KC
|1.44 KC/day
|-
|[[File:Spaghettivineseeds.png]]<br>Spaghetti Vine Seeds
|[[File:Spaghettiandmeatballpopper.png]]<br>Spaghetti and Meatball Popper
|eStore Summer Mystery Promo<br>2016 Summer Super Mystery Bag
|Yes
|{{File:Spaghettivineseeds.png}}
|10 Days
|10 KC
|1.00 KC/day
|-
|[[File:Strawberryplanterbox.png]]<br>Strawberry Planter Box
|[[File:Homemadestrawberryjam.png]]<br>Homemade Strawberry Jam
|Clubhouse Event<br>Garden Center
|Yes
|{{File:Strawberryplanterbox.png}}
|Days
|KC
|KC/day
|-
|[[File:Sugarberryseeds.png]]<br>Sugarberry Seeds
|[[File:Sugarberry.png]]<br>Sugarberry
|eStore
|No
|{{File:Sugarberryseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Sweetsushiplantseeds.png]]<br>Sweet Sushi Plant Seeds
|[[File:Farmfreshsweetsushi.png]]<br>Farm Fresh Sweet Sushi
|eStore
|No
|{{File:Sweetsushiplantseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Wackycornchipgrowinggardensseeds.png]]<br>Wacky Corn Chip Growing Gardens Seeds
|[[File:Wackycornchips.png]]<br>Wacky Corn Chips
|eStore
|No
|{{File:Wackycornchipgrowinggardensseeds.png}}
|7 Days
|8 KC
|1.14 KC/day
|-
|[[File:Wackycupcaketreeseeds.png]]<br>Wacky Cupcake Tree Seeds
|[[File:Wackycupcake.png]]<br>Wacky Cupcake
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2022
|Yes
|{{File:Wackycupcaketreeseeds.png}}
|7 Days
|13 KC
|1.86 KC/day
|-
|[[File:Wackygumdropseeds.png]]<br>Wacky Gum Drop Seeds
|[[File:Wackygumdrops.png]]<br>Wacky Gum Drops
|eStore
|No
|{{File:Wackygumdropseeds.png}}
|7 Days
|5 KC
|0.71 KC/day
|-
|[[File:Wackymarshmallowseeds.png]]<br>Wacky Marshmallow Seeds
|[[File:Wackymarshmallows.png]]<br>Wacky Marshmallows
|Wheels & Games<br> WackyER Zingoz - 2020
|Yes
|{{File:Wackymarshmallowseeds.png}}
|5 Days
|18 KC
|3.60 KC/day
|-
|[[File:Wackynutbartreeseeds.png]]<br>Wacky Nut Bar Tree Seeds
|[[File:Wackynutbar.png]]<br>Wacky Nut Bar
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2023
|Yes
|{{File:Wackynutbartreeseeds.png}}
|9 Days
|5 KC
|0.56 KC/day
|-
|[[File:Wackypopcorntreeseeds.png]]<br>Wacky Popcorn Tree Seeds
|[[File:Wackypopcorn.png]]<br>Wacky Popcorn
|Click-to-Win: Annual<br>Wacky Zingoz Celebration - 2021
|Yes
|{{File:Wackypopcorntreeseeds.png}}
|7 Days
|10 KC
|1.43 KC/day
|-
|[[File:Webkinzdaysorbetgrowinggardensseeds.png]]<br>Webkinz Day Sorbet Growing Gardens Seeds
|[[File:Webkinzdaysorbet.png]]<br>Webkinz Day Sorbet
|eStore
|No
|{{File:Webkinzdaysorbetgrowinggardensseeds.png}}
|9 Days
|8 KC
|0.89 KC/day
|-
|[[File:Whitechocolatetulipbulbs.png]]<br>White Chocolate Tulip Bulbs
|[[File:Whitechocolatetulip.png]]<br>White Chocolate Tulip
|Click-to-Win: Annual<br>Spring Celebration - White Chocolate Egg 2020
|Yes
|{{File:Whitechocolatetulipbulbs.png}}
|9 Days
|5 KC
|0.56 KC/day
|}`)
  });
}());
