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
      preview: "You made Japan feel a little more like home. Thank you for being my best friend, and for making a foreign country feel like home.",
      body: [
        "Happy birthday, Phyu. 🤍",
        "I hope life brings you all the beautiful things you deserve, all the happiness your heart can hold, and all the love you have always given to the people around you.",
        "Sometimes I think about how lucky I am to have come to Okayama University, and you are one of the biggest reasons why. When we first arrived, everything was new and unfamiliar. We were far from home, trying to settle into a different country and start a new chapter. But you were there for us. You helped us settle in, bought us futons, cooked Burmese food for us, and took care of us in so many ways.",
        "Before coming to Japan, I thought I would miss home terribly. I thought I would be homesick, miss Burmese food, and constantly wish I could go back. But somehow, because of you, I never felt as far from home as I expected to. Your cooking, your warmth, and all the little things you did made this unfamiliar place feel comfortable. You made Japan feel a little more like home.",
        "And I think that is one of the most beautiful things about you, Phyu. You have a way of making people feel cared for without realising how much it means to them. You don't just give people food or help with their problems — you give them somewhere they can feel safe, loved and accepted. You have given me that, and I don't think I can ever thank you enough for it.",
        "I'm so happy our group became my second family. Honestly, I never imagined I would find people like you all here. The memories we've made, the food we've shared, the conversations, the laughter, the silly moments, even the ordinary days — they have become such precious parts of my life. Maybe they seemed small when they happened, but looking back, they are the moments that made my life here so special. No matter where life takes us, I will carry them with me.",
        "You know, I sometimes feel like I'm the person in our group who shows the least love. I'm not always good at expressing my feelings, and sometimes I don't know how to show people how much they mean to me. There are moments when I just want to pull you into a big hug and say, “Thank you for being my best friend. Thank you for being here. Thank you for making my life so much better.”",
        "But somehow I don't always do it. Maybe expressing love is something I still need to learn. Maybe my actions don't always show as much love as my heart holds. But please never mistake my quietness for a lack of love. I care about you so much more than I know how to express, and I hope you can feel that even on the days I don't say it.",
        "I know I may have told you this in other letters before, but I want to say it again, because there is nothing wrong with reminding someone how much they are loved.",
        "Phyu, I love you. You know that, right? 🥹🤍",
        "Thank you for everything you have given me. Thank you for the love, the food, the ice cream, the blueberries, and all the little things you have shared with me. Thank you for your advice whenever I feel like something is wrong with me, for listening to me, and for being someone I can come to when I feel lonely or overwhelmed. Thank you for taking care of me in ways you might not even remember, but that I never will forget.",
        "The way you love me makes me feel like I'm home. Maybe that's why, whenever I feel lonely, whenever things get difficult, or whenever I just need a little comfort, I find myself wanting to come to you. Being around you makes me feel safe. I don't have to pretend to be someone else or act like I have everything figured out. I can simply be myself, and that is such a precious feeling.",
        "I hope you know you don't always have to be the one taking care of everyone, either. You deserve to be taken care of too. You deserve someone to listen when you're tired, hold you when you're sad, and remind you that you don't have to be strong all the time. I hope that in our friendship you find the same comfort and safety you have given me. Whenever you need someone, please remember you have me too.",
        "And Phyu, one of the things I wish for most is that our little family is never undone by distance, misunderstanding, time, or whatever else life brings. I know that someday we may graduate, move to different cities, even live in different countries. Our lives will change, and we might not see each other as often as we do now. Maybe we'll get busy, and maybe there will be days when all we can manage is a quick message to ask how everyone is doing.",
        "But I hope we never stop caring about one another. I hope we always find our way back to each other, however far apart we are. Even if we live on opposite sides of the world, I want to believe we will meet again someday, sit together, share food, laugh about our old memories, and feel as if no time has passed at all.",
        "After all, the world can feel so small when the people you love are scattered across it. And when our hearts are connected, distance doesn't have to mean losing each other.",
        "I don't know what our futures look like, but I'm so grateful our paths crossed here in Okayama. Out of all the people we could have met and all the places we could have ended up, somehow we found each other. And if I could go back to the beginning and choose again, I would still choose to meet you and become your friend.",
        "I love everyone in our group, but you, Phyu, have a special little place in my heart that belongs only to you. Thank you for being the person you are. Thank you for being my best friend, for making me feel loved, and for making a foreign country feel like home.",
        "On your birthday, I hope you receive even a little of the love you have given to so many people. I hope you have countless reasons to smile, people who appreciate you as much as you deserve, and days when your heart feels light and peaceful. I hope your dreams come true, that you are always surrounded by genuine love, and that whenever life gets difficult, you remember how many people are lucky to have you.",
        "And I hope that many years from now we are still celebrating each other's birthdays, still writing letters like this one, and laughing about how emotional I used to get.",
        "Happy birthday, my Phyu. Thank you for everything. Thank you for being part of my life. And thank you for making this place feel like home.",
        "I love you today, I will love you tomorrow, and I will keep loving you wherever life takes us.",
        "Love you forever. 🤍",
      ],
      photos: ["photos/phyu-sutaki-1.jpg"],
      signature: "with all my love, sutaki",
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
  emptySlots: 0,
  photos: [
    { src: "photos/phyu-us-1.jpg", caption: "between classes" },
    { src: "photos/phyu-us-2.jpg", caption: "waiting on the food, as always" },
    { src: "photos/phyu-us-3.jpg", caption: "the four of us, in the sea" },
    { src: "photos/phyu-us-4.jpg", caption: "the sleepovers that turned into a tradition" },
    { src: "photos/phyu-us-5.jpg", caption: "walking home, late" },
    { src: "photos/phyu-us-6.jpg", caption: "four heads on one blanket" },
    { src: "photos/phyu-us-7.jpg", caption: "thingyan in okayama" },
    { src: "photos/phyu-us-8.jpg", caption: "studying, allegedly" },
    { src: "photos/phyu-us-9.jpg", caption: "flash on, august" },
    { src: "photos/phyu-us-10.jpg", caption: "the back row, mid-lecture" },
    { src: "photos/phyu-us-11.jpg", caption: "all dressed up" },
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
