/* ==========================================================================
   data.js  —  THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE WEBSITE CONTENT
   --------------------------------------------------------------------------
   Everything below is DUMMY CONTENT so the site looks complete.
   Replace it with your real details later.

   HOW TO EDIT (read this once):
   • Text is always inside quotes:  "like this"
   • Every item ends with a comma  ,   — do not delete the commas.
   • Do not delete { } [ ] brackets. Only change the text between the quotes.
   • Save with Ctrl + S after every change, then refresh the browser.

   PICTURES
   • Until you add real photos, a clean festive placeholder is shown.
   • To use a REAL photo: copy it into the matching folder
     (images/menu, images/games, images/team, images/gallery) with the SAME
     file name written in the  image: / photo: / src:  line below.
     Example: save your vada pav photo as  images/menu/vada-pav.jpg
     and it replaces the artwork automatically. No other change needed.
   • Use .jpg files, no spaces in names, small size (under ~500 KB).

   QUICK RECIPES
   • Change a price ........ find the item in `menu.items`, change  price: 20
   • Add a menu item ....... copy one whole { ... }, block inside `items`,
                             paste it below, change the words.
   • Remove an item ........ delete its whole { ... }, block.
   • Mark sold out ......... set  available: false
   • Add a team member ..... copy one { ... }, block inside `team`, paste, edit.
   • Update the venue ...... change the `event` section below.
   • Google Maps link ...... open Google Maps → search your venue → Share →
                             Copy link → paste it into  event.mapUrl
   • Leave something empty . use ""  (empty quotes). Empty contact fields show
                             a "coming soon" note.
   ========================================================================== */

const SITE = {

  /* ---------- 1. BASIC INFO ---------- */
  stallName: "The Festive Junction",
  tagline: "Where food meets festival fun",        // DUMMY – change to your own slogan
  heroImage: "images/hero.jpg",                    // optional big background photo (ignored if missing)
  heroPlate: "images/hero-plate.jpg",              // optional round food photo on the right of the hero
  welcome: "Welcome! Come hungry, leave happy. Explore our menu, play our games and meet the team behind the stall.",

  /* ---------- 2. ABOUT ---------- */
  about: {
    title: "Our Story",
    story:
      "The Festive Junction is a stall where great food, games and festive spirit meet. " +
      "Every dish is prepared fresh by our team, from crispy snacks to creamy desserts. " +
      "Come say hello, grab a plate and join the fun!",
    // Each highlight can show a small photo: save it as the `image` file name.
    highlights: [
      { title: "Made Fresh",          text: "Every plate is cooked to order, hot off the tawa.",          image: "images/about/fresh.jpg" },
      { title: "Quality Ingredients", text: "Fresh vegetables and hand-ground masalas daily.",            image: "images/about/ingredients.jpg" },
      { title: "Food + Fun",          text: "Play games, win prizes and enjoy great food.",               image: "images/about/fun.jpg" },
      { title: "Eco-Friendly Stall",  text: "Leaf plates, paper straws and zero single-use plastic.",     image: "images/about/eco.jpg" }
    ]
  },

  /* ---------- 2b. VISION & MISSION ---------- */
  vision:
    "To create a festive space on campus where great food, joyful games and conscious choices come together — " +
    "proving that a celebration can be delicious, inclusive and kind to the planet at the same time.",
  mission: [
    "Serve fresh, hygienic and affordable food made with quality ingredients.",
    "Bring students together through fun games, friendly competition and festive spirit.",
    "Run a low-waste stall using eco-friendly, biodegradable and reusable materials.",
    "Learn real teamwork, planning and entrepreneurship by running a stall from scratch."
  ],

  /* ---------- 2c. ECO-FRIENDLY & SUSTAINABLE ---------- */


  /* ---------- 3. EVENT / VENUE ---------- */
  event: {
    name: "Join us on 27 October",
    venue: "S.B. Patil Architecture Building",
    address: "Ground Floor",
    stallNumber: "",                                // add e.g. "Stall No. 12" if you have one
    date: "27 October 2026",
    time: "9:00 AM – 5:00 PM",
    // Opens a Google Maps search for the venue. Replace with your exact Maps link if you like.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=S.B.+Patil+Architecture+Building"
  },

  /* ---------- 4. CONTACT & SOCIAL ---------- */
  contact: {
    phone: "+91 95759 68633",
    whatsapp: "919575968633",                       // digits only with country code
    email: "thefestivejunction@gmail.com"
  },
  social: {
    instagram: "",   // paste your Instagram page link here when you have one
    facebook: "",
    youtube: ""
  },

  /* ---------- 5. MENU ---------- */
  menu: {
    currency: "₹",
    categories: [
      { id: "food",   label: "Food" },
      { id: "drinks", label: "Drinks" },
      { id: "eco",    label: "Eco-Friendly Product" }
    ],
    items: [
      // veg: true = Veg, false = Non-veg, null = no label
      // popular: true shows a "Popular" badge and lists it under Crowd Favourites
      { name: "Chinese Bhel",        category: "food",   price: 40, veg: true,  popular: true,  available: true,
        description: "Crispy fried noodles tossed with veggies and tangy Chinese sauces.",
        image: "images/menu/chinese-bhel.jpg" },
      { name: "Monaco Sandwich",     category: "food",   price: 30, veg: true,  popular: true,  available: true,
        description: "Crunchy Monaco biscuits topped with a fresh, zesty filling.",
        image: "images/menu/monaco-sandwich.jpg" },
      { name: "Mohabbat ka Sharbat", category: "drinks", price: 30, veg: true,  popular: true,  available: true,
        description: "Chilled rose milk with watermelon — the famous Purani Dilli favourite.",
        image: "images/menu/mohabbat-ka-sharbat.jpg" },
      { name: "Diwali Ubtan",        category: "eco",    price: 50, veg: null,  popular: false, available: true,
        description: "Natural, handmade herbal ubtan for a traditional festive glow.",
        image: "images/menu/diwali-ubtan.jpg" }
    ]
  },

  /* ---------- 6. GAMES & ACTIVITIES ---------- */
  games: [
    { name: "Sharbat Pong",
      description: "Bounce the ball into the sharbat cups and win a prize!",
      rules: ["Three balls per turn", "Stand behind the line", "Ball must land inside the cup"],
      howToJoin: "Ask at the stall counter.",
      prize: "Free sharbat or small gift",
      image: "images/games/sharbat-pong.jpg" },
    { name: "Flip the bottle",
      description: "Flip the bottle and make it land upright to win a prize!",
      rules: ["Three attempts per turn",
    "Flip the bottle from the marked line",
    "The bottle must land upright on its base"],
      howToJoin: "Ask at the stall counter.",
      prize: "Free drink or small gift",
      image: "images/games/game2.jpg" }
  ],

  /* ---------- 7. TEAM ---------- */
  // Shown in this exact order, group by group.
  // To add a photo: save it in the folder images/team/ named exactly like the
  // photo line (name without spaces, e.g. RiyaPawar.jpeg). The extension can be
  // .jpg .jpeg .png or .webp - no need to write it here. Capital letters must match.
  // Until a photo exists the person's initials are shown. To add a person, copy one
  // { name: ..., photo: ... }, line.
  // lead: true makes that group's photos a bit bigger.
  team: [
    { group: "Mentors", lead: true, members: [
      { name: "Vinay Dharne",          photo: "images/team/Mentor1", role: "Mentor" },
      { name: "Mangesh Suryawanshi",          photo: "images/team/Mentor2", role: "Mentor" },
      { name: "Pranav Kamble",          photo: "images/team/Mentor3", role: "Mentor" },
      { name: "Akash Mithe",          photo: "images/team/Mentor4", role: "Mentor" }
    ]},
    { group: "Leader", lead: true, members: [
      { name: "Jiya Porwal",            photo: "images/team/JiyaPorwal" }
    ]},
    { group: "Product Manager", lead: true, members: [
      { name: "Gaurav Patil",           photo: "images/team/GauravPatil" }
    ]},
    { group: "Finance", members: [
      { name: "Prathamesh Patil",       photo: "images/team/PrathameshPatil" },
      { name: "Maithili Pawar",         photo: "images/team/MaithiliPawar" },
      { name: "Preeti Ohol",   photo: "images/team/PritiOhol" }
    ]},
    { group: "Decoration", members: [
      { name: "Radha Muley",             photo: "images/team/RadhaMuley" },
      { name: "Riya Pawar",             photo: "images/team/RiyaPawar" },
      { name: "Pranita Ramgirwar",      photo: "images/team/PranitaRamgirwar" }
    ]},
    { group: "Marketing", members: [
      { name: "Ritik Raushan",            photo: "images/team/RohitPawar" },
      { name: "Rohit Pawar",           photo: "images/team/RitikRoshan" }
    ]},
    { group: "Social Media", members: [
      { name: "Avdhut Patil",           photo: "images/team/AvdhutPatil" },
      { name: "Sujal Pol",              photo: "images/team/SujalPol" }
    ]},
    { group: "Operations Manager", members: [
      { name: "Priti Ohol",             photo: "images/team/PritiOhol" },
      { name: "Krupa More",             photo: "images/team/KrupaMore" },
       { name: "Pruthviraj Ozarkar",      photo: "images/team/PruthvirajOzarkar" }
    ]}
  ],

  /* ---------- 8. GALLERY ---------- */
  // Save photos in images/gallery/ with these exact names.
 
  footerNote: "© 2026 Team The Festive Junction"
};
