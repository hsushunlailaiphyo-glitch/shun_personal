/* ==========================================================================
   ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ==========================================================================

   Every word, photo, video and song on the website comes from this file.

   THREE RULES so you never break it:
     1. Text goes inside "quotes".
     2. If your text contains an apostrophe (it's, don't), that's fine —
        just make sure the quotes at the START and END are double quotes.
     3. Every item ends with a comma ,   Keep the commas where they are.

   If the site ever goes blank after an edit, you deleted a comma,
   a quote or a bracket. Undo your last change and it will come back.
   ========================================================================== */

const CONTENT = {

  /* ------------------------------------------------------------------
     1. HER  +  THE COLOURS
     ------------------------------------------------------------------ */

  name: "Nann Wai",
  fullName: "Nann Wai Wai",

  // Her birthday. Month 9 = September. The countdown repeats every year.
  birthday: { month: 9, day: 28 },
  birthYear: 2002,
  timezone: "Asia/Tokyo",   // countdown unlocks at midnight in Japan

  /* Pick the starting colour theme. She can change it herself with the
     "colours" button in the top-right corner, and it remembers her choice.

     Choose one:  "blush"     baby pink, soft and sweet   ← the default
                  "sky"       baby blue
                  "lavender"  soft purple
                  "mint"      soft green
                  "butter"    warm cream
                  "cherry"    her red, softened
                  "midnight"  soft dark, nice for reading at 2am   */
  theme: "blush",


  /* ------------------------------------------------------------------
     2. THE COUNTDOWN SCREEN (what she sees before Sep 28)
     ------------------------------------------------------------------ */

  gate: {
    eyebrow: "something is waiting for",
    note: "come back on the 28th. it opens by itself.",
    signature: "— shun, sutaki, phyu & andy",
  },


  /* ------------------------------------------------------------------
     3. THE FIRST SCREEN (after it unlocks)
     ------------------------------------------------------------------ */

  hero: {
    eyebrow: "september 28",
    title: "Nann Wai",
    subtitle: "twenty-four, and still the warmest person we know",
    body: [
      "This is not a card. It is a small room we built for you, and it stays open all year.",
      "Start with the video. Then read the letters. Some of them are sealed — you'll know when to open those.",
    ],
  },


  /* ------------------------------------------------------------------
     4. VIDEOS  —  the first thing she sees
     ------------------------------------------------------------------
     EASIEST WAY TO ADD A VIDEO (do this, not the other way):

       1. Upload the video to YouTube.
       2. On the upload screen set visibility to **Unlisted**.
          Unlisted = nobody can find it or search it, only people with
          the link. It will NOT appear on your channel.
       3. Copy the link. It looks like  youtube.com/watch?v=ABC123xyz
       4. Paste the part after  v=  into `youtubeId` below.

     Why YouTube and not the repo: a phone video is often 200MB-2GB.
     GitHub refuses files over 100MB, and even a small one would make
     the site slow to open. YouTube streams it instantly on any phone,
     for free, and handles her data connection for her.

     If a video is small (under ~40MB) you CAN put it in a `videos`
     folder instead and write:  { title: "...", file: "videos/x.mp4" },
     ------------------------------------------------------------------ */

  videosTitle: "watch this first",
  videosLede: "Before you read anything — press play.",

  videos: [
    {
      title: "a message from Sutaki",
      note: "she recorded this for you",
      youtubeId: "",          // ✏️ paste the YouTube id here
    },
    {
      title: "our wishes",
      note: "all of us, saying it out loud",
      youtubeId: "",          // ✏️ paste the YouTube id here
    },
  ],


  /* ------------------------------------------------------------------
     5. LETTERS
     ------------------------------------------------------------------
     TO PUT PHOTOS INSIDE A LETTER, add a `photos` line to it:

         photos: ["photos/phyu-1.jpg", "photos/phyu-2.jpg"],

     Upload those files to the `photos` folder first. The pictures
     appear underneath that letter when she opens it. One photo looks
     great; two or three look great; more than four is a lot.

     `lang: "my"` switches that letter to the Burmese font.
     Leave it out for English letters.
     ------------------------------------------------------------------ */

  lettersTitle: "letters, from the people who love you",
  lettersLede: "Take your time. They are not going anywhere.",

  letters: [
    {
      from: "Phyu",
      role: "your friend",
      preview: "Happy birthday our warm and big-hearted girl 🫶. You are the sister I could never had.",
      body: [
        "Dearest Nann,",
        "Happy birthday our warm and big-hearted girl 🫶. I am so glad to be with u on ur bd. And wish I could spend together every birthday of u and me. And this letter is all about my wishes for u.",
        "You are already a perfect girl, smart, funny, confident, and sexy 🤓. I just hope u carry less emotional burden of others. Otherwise it also makes me feel sad seeing u crying.",
        "And I know u had a big trauma from LS, but REMEMBER u don't have to face those things anymore. U have me 🫶, I will hate anyone who have done bad things to u, anyone u hate, and will never leave u alone. I will blame together with u to people who give u stress.",
        "You are the sister I could never had. Love u Nann.",
        "Again, Happy Birthday 🥳 !!!!",
      ],
      signature: "phyu",
      // photos: ["photos/phyu-1.jpg"],
    },
    {
      from: "Andy",
      role: "your friend",
      lang: "my",
      preview: "ငါ့ဘဝမှာ သူငယ်ချင်းလို့ပြောရင် ဒီလောက်နဲ့ ပြည့်စုံပြီလို့ ဆိုရလောက်တဲ့ သူငယ်ချင်းမျိုး",
      body: [
        "Happy Birthday ချစ်တုံး",
        "ငါ့ဘဝမှာ သူငယ်ချင်းလို့ပြောရင်\nသူကတော့ ဒါကောင်းတယ်\nဒါမကောင်းဘူး ဆိုတာမျိုး မရှိ\nဒီလောက်နဲ့ ပြည့်စုံပြီလို့\nဆိုရလောက်တဲ့ သူငယ်ချင်းမျိုးအနေနဲ့\nဘဝထဲ ဝင်လာပေးလို့ ကျေးဇူး👉🏼👈🏼",
        "အစစအရာရာ အဆင်ပြေပြီး\nစိတ်ရော ကိုယ်ရော ကျန်းမာ ချမ်းသာ ပါစေ ကောင်မ",
      ],
      signature: "andy",
    },
    {
      // ✏️ REPLACE — this one is still a placeholder
      from: "Shun",
      role: "your friend",
      preview: "I have wanted to tell you these things for a long time, and a birthday felt like a good excuse.",
      body: [
        "Nann Wai,",
        "I have wanted to tell you these things for a long time, and a birthday felt like a good excuse to finally do it properly.",
        "You are the person who notices. When someone in our group goes quiet, you are always the first one to ask why. I don't think you know how rare that is.",
        "Thank you for every time you carried something heavy without telling anyone. I hope this year is lighter for you.",
        "Happy birthday.",
      ],
      signature: "shun",
    },
    {
      // ✏️ REPLACE — this one is still a placeholder
      from: "Sutaki",
      role: "your friend",
      preview: "Happy birthday to the one who keeps all of us together without ever making it look like work.",
      body: [
        "Nann Wai,",
        "Happy birthday to the one who keeps all of us together without ever making it look like work.",
        "You have this way of making people feel like they arrived somewhere safe. I hope this year gives you back everything you've been quietly giving away.",
        "I'm so glad you're mine to grow old with.",
      ],
      signature: "sutaki",
    },
    {
      // ✏️ REPLACE — this one is still a placeholder
      from: "Tho",
      role: "ko aung thukha",
      preview: "Of all the ordinary days, the best ones are the ones with you in them.",
      body: [
        "Nann Wai,",
        "Of all the ordinary days, the best ones are the ones with you in them.",
        "Happy birthday, my love. Here's to another year of your laugh, your camera, and your terrible music timing.",
        "I'm proud of you. Always.",
      ],
      signature: "ko aung thukha",
    },
  ],


  /* ------------------------------------------------------------------
     6. "OPEN WHEN" LETTERS
     ------------------------------------------------------------------
     Sealed envelopes she opens on the day she needs them.
     The site quietly remembers the date she first opened each one.

     These can take `photos:` too, exactly like the letters above.
     Keep each `id` unique — that is how the site remembers.
     ------------------------------------------------------------------ */

  openWhenTitle: "open when...",
  openWhenLede: "Ten sealed letters. Don't read them all today. Save them for the days that need them.",
  openWhenFoot: "we'll keep adding to these. it's never going to be finished.",

  openWhen: [
    {
      id: "alone",
      title: "you feel lonely",
      body: [
        "Dearest Nann,",
        "If you're opening this, I'm guessing you're feeling a bit isolated or empty right now.",
        "First, remember how busy life gets or how less often we hangout, I am always there for you. Distance or time can never change how much you mean to me.",
        "You don't have to carry the weight of the whole family on your own, and you are always welcome to reach out (like when I was in Malaysia). I am even proud to be the one u reach out, just say “Phyu, I need u”.",
        "I love you when you're laughing, and I love you when you're feeling quiet and disconnected. And sometimes I might be giving u personal space or taking my emotional space, but that doesn't mean I stop loving u🫶.",
        "Put on our favorite sitcom, wrap yourself in a warm blanket, switch on ur heater to 29 degree 🤭, rest on the pillow I gave u, and send me a text or call me whenever you're ready. I'm right here. You are never alone.",
        "With so much love,",
      ],
      signature: "phyu 💕",
    },
    {
      id: "sad",
      title: "you feel sad",
      body: [
        "Dearest Nann,",
        "I'm so sorry if today is feeling heavy. Whatever happened or even if you just woke up feeling a wave of sadness and loneliness for no specific reason, I want you to know that it's completely okay to feel this way.",
        "You don't have to force yourself to be happy, positive, stay strong, or be there for everyone. Let yourself feel what you need to feel, and cry if you need to. Your feelings are valid, and taking time to rest your heart is important.",
        "I know how warm, kind, and resilient you are, but right now, you don't need to fix anything. Just be gentle with yourself. Make a warm cup of milk, lie down, and take it one hour at a time.",
        "Whenever you want to talk or even if you just want to sit together in silence, I'm here for you👯‍♀️.",
        "Always here for you,",
      ],
      signature: "phyu 🫂",
    },
    {
      id: "anxious",
      title: "you feel anxious or overwhelmed",
      body: [
        "Dearest Nann,",
        "Stop for 10 seconds, take one deep breath in and slow breath out.",
        "I know your mind might be overwhelmed right now, feeling like everything is too much to handle. But I need you to remember who you are: you have made it through 100% of your hardest days so far, and you will get through this moment, too. You are the most confident person I have ever met.",
        "You don't have to figure out your whole future or solve every problem today. Just focus on the very next step, no matter how small it is.",
        "Even if things don't go perfectly, some people badmouth you, your worth doesn't change. I believe in you, I trust your strength, and I'm rooting for you no matter what.",
        "Take things one moment at a time. You've got this, I promise.",
        "Your biggest cheerleader,",
      ],
      signature: "phyu phyu 🫶",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "tired",
      title: "you are tired",
      body: [
        "Stop. Whatever it is, it can wait until tomorrow.",
        "You do not have to earn rest. You are allowed to be tired without having a good enough reason for it.",
        "Drink some water. Put the phone down after this. We'll still be here in the morning.",
      ],
      signature: "shun",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "cantsleep",
      title: "you can't sleep",
      body: [
        "Nothing has to be solved tonight. Whatever your brain is chewing on at this hour, it will be a smaller thing in daylight. It always is.",
        "Put on something soft. Let the room be dark. You are safe.",
        "Goodnight, Nann Wai.",
      ],
      signature: "shun",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "missus",
      title: "you miss us",
      body: [
        "We miss you too. Constantly, and usually at inconvenient times.",
        "Distance hasn't done anything to this. We are exactly where you left us.",
        "Scroll up. Look at the photos. Then come back and tell us you miss us — we like hearing it.",
      ],
      signature: "shun, sutaki, phyu & andy",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "misshome",
      title: "you miss home",
      body: [
        "It's allowed to hurt. Missing home isn't weakness and it isn't ungratefulness for where you are.",
        "You carry it with you anyway — in how you talk, how you feed people, how you love.",
        "Home is not somewhere behind you. Some of it is right here reading this with you.",
      ],
      signature: "all of us",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "proud",
      title: "you are proud of yourself",
      body: [
        "GOOD. Say it out loud. Tell somebody. Tell all of us.",
        "You are so quick to make yourself small about your own wins, so this letter is here to make you sit in it for a minute.",
        "You did that. Nobody did it for you.",
      ],
      signature: "all of us",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "laugh",
      title: "you need to laugh",
      body: [
        "Think about the most unhinged thing one of us has ever done in front of you.",
        "You already smiled, didn't you.",
        "Okay — now go find one of us and demand entertainment. We're contractually obligated.",
      ],
      signature: "sutaki",
    },
    {
      // ✏️ REPLACE — placeholder
      id: "doubt",
      title: "you doubt yourself",
      body: [
        "The voice telling you you're not good enough has been lying to you for years and it has never once been right.",
        "Look at what you've built. Look at who chose to stay near you. That is the evidence. The doubt is not.",
        "We are certain about you, even on the days you aren't.",
      ],
      signature: "all of us",
    },
  ],


  /* ------------------------------------------------------------------
     7. PHOTOS  (the gallery)
     ------------------------------------------------------------------
     HOW TO ADD A PHOTO:
       1. Put the image file in the `photos` folder.
       2. Add a line below like:
             { src: "photos/beach.jpg", caption: "okayama, summer" },
       3. That's it. Refresh the page.

     Tip: rename files to simple lowercase names with no spaces
          (nann-01.jpg, not "IMG 2839 (1).JPG").

     `emptySlots` is how many blank film frames to show while the
     gallery is still empty. Set it to 0 once you've added real photos.
     ------------------------------------------------------------------ */

  photosTitle: "us, on film",
  photosLede: "Proof. Some of these you have never seen.",
  emptySlots: 6,

  photos: [
    // ✏️ add your photos here, for example:
    // { src: "photos/nann-01.jpg", caption: "the night we didn't sleep" },
  ],


  /* ------------------------------------------------------------------
     8. MUSIC  (the playlist, last)
     ------------------------------------------------------------------
     A YouTube address looks like  youtube.com/watch?v=ABC123xyz
     Paste just the bit after  v=  into `youtubeId`.

     If you leave it empty (""), the song still shows and clicking it
     searches YouTube — so nothing ever looks broken.
     ------------------------------------------------------------------ */

  musicTitle: "something soft, for the background",
  musicLede: "Press play and leave it on while you read. You know these already.",

  music: [
    { title: "seasons",             artist: "wave to earth", youtubeId: "" },
    { title: "bad",                 artist: "wave to earth", youtubeId: "" },
    { title: "sunny days sleeping", artist: "wave to earth", youtubeId: "" },
    { title: "annie",               artist: "wave to earth", youtubeId: "" },
    { title: "light",               artist: "wave to earth", youtubeId: "" },
  ],


  /* ------------------------------------------------------------------
     9. THE LAST THING SHE READS
     ------------------------------------------------------------------ */

  closing: {
    title: "happy birthday, nann wai",
    body: [
      "This site doesn't expire. Come back on a bad Tuesday in February. Come back at 2am. It will still be here, and so will we.",
    ],
    signature: "with everything — shun, sutaki, phyu & andy",
  },

  footerMade: "made by hand, with love, in okayama",
};
