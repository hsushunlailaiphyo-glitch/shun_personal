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
    eyebrow: "the clock is counting down for",
    note: "in the story, midnight ends the magic.\nhere it starts it. come back on the 10th.",
    signature: "— shun, nann & sutaki",
  },

  /* ---------------- 4. THE FIRST SCREEN ---------------- */
  hero: {
    eyebrow: "october 10",
    title: "Phyu Phway",
    subtitle: "twenty-four, and a ten out of ten",
    body: [
      "Born on 10/10, which we think explains a lot.",
      "This isn't only a card. It's a small place to keep track of your year — your days, your countdowns, the things you want. It's yours now, and it stays open all year.",
    ],
  },

  /* ---------------- 5. TODAY ---------------- */
  todayTitle: "today",
  todayLede: "Two taps. That's the whole thing.",

  /* The five moods. Keep five — the colours are built around it. */
  moods: [
    { id: 1, name: "rough" },
    { id: 2, name: "low" },
    { id: 3, name: "okay" },
    { id: 4, name: "good" },
    { id: 5, name: "magic" },
  ],

  /* Habits she starts with. She can add and delete her own. */
  startingHabits: ["water", "sleep", "self care", "study"],

  /* ---------------- 6. HER YEAR ---------------- */
  yearTitle: "your year, one square at a time",
  yearLede: "Every day you answer, a square fills in. By next 10/10 this is a picture of your whole year. Tap any past day to fill it in late.",

  /* ---------------- 7. COUNTDOWNS ---------------- */
  countdownTitle: "what you're waiting for",
  countdownLede: "Add anything — going home, the end of exams, a comeback. It counts down for you.",

  /* ✏️ Seed a few if you know real dates. Dates are YYYY-MM-DD. */
  startingCountdowns: [
    { title: "my next birthday", date: "2027-10-10" },
  ],

  /* ---------------- 8. WISHES ---------------- */
  wishTitle: "things you want from this year",
  wishLede: "Not a to-do list. The bigger things. Tick them off when they happen.",
  wishEmpty: "nothing here yet — what do you want this year to hold?",

  startingWishes: [],

  /* ---------------- 9. NOTES ----------------
     ✏️ REPLACE these three. Three or four sentences each is plenty.      */
  notesTitle: "three people wanted to say something",
  notesLede: "Short, because school started again. True, because we meant it.",

  notes: [
    {
      from: "Shun",
      role: "your friend",
      preview: "✏️ replace me — a line or two that shows on the card before she opens it.",
      body: [
        "Phyu,",
        "✏️ REPLACE THIS. Three or four sentences is genuinely enough. Say the one thing you'd want her to read on a bad day.",
        "Happy birthday.",
      ],
      signature: "shun",
    },
    {
      from: "Nann",
      role: "your friend",
      preview: "✏️ replace me.",
      body: [
        "Phyu,",
        "✏️ REPLACE THIS.",
        "Happy birthday.",
      ],
      signature: "nann wai",
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
  musicTitle: "something to put on",
  musicLede: "One side Disney, one side SEVENTEEN.",

  musicDisneyHead: "disney",
  musicDisney: [
    { title: "A Dream Is a Wish Your Heart Makes", artist: "Cinderella",            youtubeId: "" },
    { title: "So This Is Love",                    artist: "Cinderella",            youtubeId: "" },
    { title: "When You Wish Upon a Star",          artist: "Pinocchio",             youtubeId: "" },
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
  photosLede: "Proof.",
  emptySlots: 6,
  photos: [
  ],

  /* ---------------- 12. THE LAST THING ---------------- */
  closing: {
    title: "happy birthday, phyu phway",
    body: [
      "This doesn't expire. Come back on an ordinary Tuesday. It will still be here, filling up, and so will we.",
    ],
    signature: "— shun, nann & sutaki",
  },

  footerMade: "made by hand, with love, in okayama",
};
