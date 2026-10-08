/* ==========================================================================
   ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ==========================================================================
   Same rules as Nann's site:
     1. Text goes inside "quotes".
     2. Every item ends with a comma ,
     3. If the site goes blank, you removed a comma, quote or bracket —
        undo your last change on GitHub (History → the version before → Revert).
   ========================================================================== */

const CONTENT = {

  /* ---------------- 1. HER ---------------- */
  name: "Phyu Phway",
  birthday: { month: 10, day: 10 },
  birthYear: 2002,
  timezone: "Asia/Tokyo",

  /* The year the gift is given. Once midnight on 10 October 2026 has passed,
     the site is open for good on any device — the countdown is a one-time
     reveal, not a lock that comes back every year. Don't change this. */
  revealYear: 2026,

  /* Starting colour. She can change it herself, top right.
       "midnight"  Cinderella at the ball — navy, blue, gold   ← default
       "glass"     the slipper — pale blue and silver
       "carat"     rose quartz & serenity (SEVENTEEN's colours)
       "belle"     gold
       "rapunzel"  lilac
       "ariel"     sea teal                                                */
  theme: "midnight",

  /* ---------------- 2. CLOUD SYNC ----------------
     Leave this empty ("") and everything still works perfectly — it just
     saves to her phone only. Once you set up the sync worker (see
     worker/SETUP.md) paste its address here and her planner follows her
     between phone and laptop.                                             */
  syncUrl: "",

  /* ---------------- 3. THE COUNTDOWN SCREEN ---------------- */
  gate: {
    eyebrow: "the clock is striking for",
    note: "in the story, midnight takes the magic away.\nhere, it brings it. come back on the tenth.",
    signature: "— shun, nann & sutaki",
  },

  /* ---------------- 4. THE FIRST SCREEN ---------------- */
  hero: {
    eyebrow: "the tenth of october",
    title: "Phyu Phway",
    subtitle: "twenty-four, and a ten out of ten",
    body: [
      "Born on 10/10, which we have always thought explains a great deal.",
      "This isn't only a card. It's a small room with your name on the door — somewhere to keep your days, your countdowns, and the things you're still reaching for.",
      "The clock has struck, and nothing here disappears at midnight. It's yours now, all year.",
    ],
  },

  /* The six buttons under her name. Order follows the page. */
  nav: [
    { href: "#today",    label: "today" },
    { href: "#year",     label: "your year" },
    { href: "#counting", label: "countdowns" },
    { href: "#wishes",   label: "goals" },
    { href: "#notes",    label: "letters" },
    { href: "#music",    label: "music" },
  ],

  /* ---------------- 5. TODAY ---------------- */
  todayTitle: "today",
  todayLede: "Two taps and today is written down. That's all it ever asks of you.",

  /* The two little headings on this screen. */
  todayMoodPanel: "how did today feel?",
  todayHabitPanel: "small promises",

  /* The five moods. Keep five — the colours are built around it. */
  moods: [
    { id: 1, name: "stormy" },
    { id: 2, name: "grey" },
    { id: 3, name: "quiet" },
    { id: 4, name: "lovely" },
    { id: 5, name: "magic" },
  ],

  /* Habits she starts with. She can add and delete her own. */
  startingHabits: ["water", "sleep", "self care", "study"],

  /* ---------------- 6. HER YEAR ---------------- */
  yearTitle: "the book of your year",
  yearLede: "Every day you answer, a square lights up. By next 10/10 this is a whole year of you, in colour. Tap any day gone by to fill it in late — nothing is ever closed to you.",

  /* The quiet line under the year grid that lets her keep a copy. */
  keepTitle: "keep a copy",
  keepLede: "Your year is saved on this device the moment you tap. This hands you a copy of it to keep somewhere safe.",

  /* ---------------- 7. COUNTDOWNS ---------------- */
  countdownTitle: "until the next good thing",
  countdownLede: "Going home. The end of exams. A comeback. Tell the clock what you're waiting for and it will count the days so you don't have to.",

  /* ✏️ Seed a few if you know real dates. Dates are YYYY-MM-DD. */
  startingCountdowns: [
    { title: "my next birthday", date: "2027-10-10" },
  ],

  /* ---------------- 8. WISHES ---------------- */
  wishTitle: "the things you're reaching for",
  wishLede: "Not a list of errands — the bigger ones. Tick them off as they come true.",
  wishEmpty: "nothing here yet. what do you want this year to hold?",

  startingWishes: [],

  /* ---------------- 9. NOTES ----------------
     ✏️ REPLACE these three. Three or four sentences each is plenty.

     A letter can carry photos too — add a line like:
         photos: ["photos/phyu-nann-1.webp"],
     Put the files in phyu/photos first. They show full width under the
     letter, at their own proportions.                                     */
  notesTitle: "letters from your loves",
  notesLede: "",

  notes: [
    {
      from: "Shun",
      role: "your friend",
      preview: "What am I without your porridge on my sick days, your words on my sad days, your arms when everything is too much?",
      body: [
        "Happy birthday, Phyu Phway. \u2661",
        "The first thing I want to say is that I love you. Very, very much.",
        "Thank you for coming into my life and staying in it. Thank you for being there for me \u2014 emotionally and physically, in every way possible.",
        "To me, you are an emotional safe space. A sister from another mother, and the very best friend I have ever had.",
        "The things I don't say to anybody else, I can say to you. Anything in my life, I can tell you without explaining myself first and without worrying how it will sound. That's why, whenever something happens, you are the first person I go to.",
        "Sometimes I can't help but think \u2014 what am I without your porridge on my sick days? What am I without your encouraging words on my sad days? What am I without your warm embrace when I'm overwhelmed? Who would I tell, when my heart is full and I need to say it out loud?",
        "I want to be that for you too. A safe space, and a good listener. When something is heavy, and when there's good news \u2014 like your Korean programme \u2014 call me. I want to stay by your side and celebrate your wins with you.",
        "I love you. Always.",
      ],
      signature: "shun",
      photos: [
        "photos/phyu-shun-1.jpg",
      ],
    },
    {
      from: "Nann",
      role: "your friend",
      preview: "I never call anyone Princess except Pann Wai \u2014 but you are my princess.",
      body: [
        "To my Dearest Phyu Phway ly,",
        "I wish you the happiest birthday. It's your 2nd birthday we have spent together. One thing I'm sure of is that I love you very much and I always feel like you are my sister from another mother. And I am also very proud of being your best friend.",
        "You are very pretty, cute, smart, well-planned and hardworking, kind-hearted and I wonder if there's anyone who doesn't admire you. I honestly love you so much and I even doubted myself of being a lesbian lol.",
        "I feel sorry for being harsh with you about your bf. But I want you to know that I want to give you **THE VERY BEST THING** in this world.",
        "I never call anyone Princess except Pann Wai but you are my princess. I want to take care of you and some pretty flowers, good food, pretty clothes remind me of you. I'd spend every penny I have on you, and I wouldn't even think twice about it.",
        "You are very precious to me and I'm scared we have to be apart when we graduate.",
        "I love you so much my princess. Let's get old together. Happy birthday my pretty princess.",
      ],
      signature: "nann wai",
      photos: [
        "photos/phyu-nann-1.webp",
      ],
    },
    {
      from: "Sutaki",
      role: "your friend",
      preview: "✏️ replace me.",
      body: [
        "Phyu,",
        "✏️ REPLACE THIS.",
        "Happy birthday.",
      ],
      signature: "sutaki",
    },
  ],

  /* ---------------- 10. MUSIC ----------------
     A YouTube address looks like  youtube.com/watch?v=ABC123xyz
     Paste the bit after  v=  into youtubeId to make it play in the page.
     Left empty, the song still shows and tapping it searches YouTube —
     so nothing ever looks broken.

     ✏️ I picked these without knowing her taste. Swap freely.            */
  musicTitle: "something for the ballroom",
  musicLede: "One side Disney, one side SEVENTEEN. Put it on and let it run.",

  musicDisneyHead: "disney",
  musicDisney: [
    { title: "A Dream Is a Wish Your Heart Makes", artist: "Cinderella",            youtubeId: "" },
    { title: "A Whole New World",                  artist: "Aladdin",               youtubeId: "" },
    { title: "Let It Go",                          artist: "Frozen",                youtubeId: "" },
    { title: "Part of Your World",                 artist: "The Little Mermaid",    youtubeId: "" },
    { title: "Beauty and the Beast",               artist: "Beauty and the Beast",  youtubeId: "" },
  ],

  musicSvtHead: "seventeen",
  musicSvt: [
    { title: "2 MINUS 1",      artist: "Wonwoo & Mingyu", youtubeId: "" },
    { title: "Fallin' Flower", artist: "SEVENTEEN",       youtubeId: "" },
    { title: "Pinwheel",       artist: "SEVENTEEN",       youtubeId: "" },
    { title: "Smile Flower",   artist: "SEVENTEEN",       youtubeId: "" },
    { title: "Home",           artist: "SEVENTEEN",       youtubeId: "" },
  ],

  /* ---------------- 11. PHOTOS ----------------
     Put files in the phyu/photos folder, then add a line like:
       { src: "photos/phyu-01.jpg", caption: "okayama, spring" },
     Set emptySlots to 0 once you have real photos in.                     */
  photosTitle: "us",
  photosLede: "Proof that the story is real.",
  emptySlots: 6,
  photos: [
  ],

  /* ---------------- 12. THE LAST THING ---------------- */
  closing: {
    title: "happy birthday, phyu phway",
    body: [
      "This one doesn't expire at midnight. Come back on an ordinary Tuesday, or at two in the morning. It will still be here, filling up, and so will we.",
    ],
    signature: "— shun, nann & sutaki",
  },

  footerMade: "made by hand, with love, in okayama",
};
