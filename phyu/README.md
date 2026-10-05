# Ten out of Ten 🩵

For **Phyu Phway** — 10 October, Okayama.

A countdown until midnight JST on the 10th, then it opens by itself and stays
open **forever, on every device**. After that it isn't a card any more; it's
something she keeps.

---

## It lives in the same repo as Nann's site

| | |
|---|---|
| `/` (repo root) | Nann's site |
| `/phyu` | this one |

They share nothing and can't break each other.

### ⚠️ Set this up as its own Cloudflare project

Otherwise Phyu can delete `/phyu` from the address and land on Nann's letters.

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick `shun_personal`
2. Framework preset **None**, build command **empty**
3. **Root directory: `/phyu`** ← the important one. It's under build settings,
   sometimes behind an "advanced" link.
4. Build output directory: `/`
5. Deploy

That project then serves only this folder, on its own address.

---

## The only file you edit

```
phyu/assets/js/content.js
```

Same as Nann's site: edit on github.com with the pencil ✏️, commit, live in ~30
seconds. If it goes blank, you lost a comma — **History → the version before →
Revert**.

### Secret addresses for you

| Add to the end | What it does |
|---|---|
| `?preview` | see the finished site now, without unlocking it |
| `?reset` | wipe everything stored on this device and re-lock |
| `?theme=carat` | preview any colour |

---

## What's still to do

- [ ] **The three notes** — Shun, Nann, Sutaki. They're marked `✏️ REPLACE`. Three or four sentences each.
- [ ] **Check the SEVENTEEN songs.** I picked five soft ones without knowing her taste — swap any of them.
- [ ] **Photos** into `phyu/photos`, then list them in `content.js` and set `emptySlots: 0`.
- [ ] **Real countdown dates** if you know them (going home, exams ending) — seed them in `startingCountdowns`.
- [ ] Optional: **turn on sync** (see `worker/SETUP.md`).

---

## What she can do, and where it's kept

She can set a mood for any day, write a line about it, tick and add habits, make
her own countdowns, and keep a wish list. Everything saves **the instant she taps**,
to her own device.

**Right now that means one device.** Her phone and her laptop would each keep
their own copy.

Two things guard against losing it:

1. **Keep a copy** — under the year grid. *Save a copy* downloads her whole year
   as a small file; *restore* takes it back, on any device. No accounts, works
   even with sync switched off. Tell her about this one.
2. **Sync** — `worker/SETUP.md`, about ten minutes of Cloudflare clicks, and her
   phone and laptop stay in step by themselves. The site works perfectly if you
   never set it up.

The bottom of the page always says which it is: *saved on this device* or *synced*.

---

## Things I decided, so you know

- **The gate opens once.** On 10 October it opens and never closes again — on
  any device, cleared browser or not. (Nann's site had a bug here: it re-locked
  every year, so a new phone would have shown a countdown to 2027. Fixed in both.)
- **Moods are five**, and their colours are the same in every theme, because
  they're data rather than decoration.
- **Nothing overwrites something newer.** Two tabs, or a phone that's been
  offline, can't wipe more recent entries.
- **Six themes**: midnight (Cinderella at the ball), glass, carat (SEVENTEEN's
  rose quartz & serenity), belle, rapunzel, ariel. All checked for readability.
- **The sparkle sits above the countdown** but below the letters, so the first
  screen has dust in the air and reading a letter never does.

## The sections, and what they're called in content.js

| On the page | In the file |
|---|---|
| today | `todayTitle`, `todayMoodPanel`, `todayHabitPanel`, `moods`, `startingHabits` |
| the book of your year | `yearTitle`, `yearLede` |
| until the next good thing | `countdownTitle`, `startingCountdowns` |
| the things you're reaching for (**goals**) | `wishTitle`, `wishEmpty`, `startingWishes` |
| letters from your loves (**letters**) | `notesTitle`, `notes` |
| something for the ballroom | `musicDisney`, `musicSvt` |

The six buttons under her name are the `nav:` list — rename or reorder freely.
