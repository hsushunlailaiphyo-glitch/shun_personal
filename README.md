# for nann wai 🤍

A birthday site for Nann Wai — 28 September, Okayama.

It shows a **countdown** until midnight JST on the 28th, then opens by itself
and stays open forever. The countdown resets each year to her next birthday.

---

## The only thing you need to know

**Everything on the site — every letter, photo and song — lives in one file:**

```
assets/js/content.js
```

Open it, change the words between the `"quotes"`, save. That's the whole job.
You never need to touch the other files.

---

## How to edit it (no terminal, no Claude needed)

The easiest way, from your phone or laptop:

1. Go to your repository on **github.com**
2. Click into `assets` → `js` → `content.js`
3. Click the **pencil ✏️ icon** (top right)
4. Change the text
5. Scroll down, click **Commit changes**

Cloudflare rebuilds the site automatically in about 30 seconds. Refresh and it's live.

> **If the site ever goes blank after an edit**, you deleted a comma, a quote or
> a bracket. On GitHub, open the file → **History** → click the version before
> your change → **Revert**. Nothing is ever permanently broken.

---

## How to add photos

1. On GitHub, open the **`photos`** folder → **Add file** → **Upload files**
2. Drag your pictures in → **Commit changes**
3. Open `assets/js/content.js` and add one line per photo inside `photos: [ ]`:

```js
photos: [
  { src: "photos/nann-01.jpg", caption: "the night we didn't sleep" },
  { src: "photos/nann-02.jpg", caption: "okayama, spring" },
],
```

4. Set `emptySlots: 0` once you have real photos in.

**Tips**
- Rename files to simple lowercase names, no spaces: `nann-01.jpg`, not `IMG 2839 (1).JPG`
- Keep each photo under ~1 MB if you can. Shrink big ones at [squoosh.app](https://squoosh.app) — free, works in the browser, takes 10 seconds each.
- Aim for **under 100 photos total**. That keeps the site instant on her phone.

---

## How to add the music links

A YouTube address looks like `youtube.com/watch?v=`**`dQw4w9WgXcQ`**

Copy the bit after `v=` into `youtubeId`:

```js
{ title: "seasons", artist: "wave to earth", youtubeId: "dQw4w9WgXcQ" },
```

Leave it as `""` and the song still shows — clicking it just searches YouTube.
Nothing looks broken either way.

---

## How to add the videos (Sutaki's message + your wishes)

**Use YouTube. Do not put the video files in the repo.** A phone video is
usually 200MB-2GB; GitHub refuses anything over 100MB, and even a small one
would make the site slow to open on her data connection.

1. Upload the video to YouTube
2. On the upload screen set visibility to **Unlisted**
   - Unlisted = it will **not** appear on your channel, and nobody can search
     for it. Only people with the link can see it. This is the right setting.
   - Do *not* pick Private — private videos won't play on the site.
3. Copy the link: `youtube.com/watch?v=`**`ABC123xyz`**
4. Paste the part after `v=` into `youtubeId` in `content.js`:

```js
videos: [
  { title: "a message from Sutaki", note: "she recorded this for you", youtubeId: "ABC123xyz" },
  { title: "our wishes", note: "all of us, saying it out loud", youtubeId: "DEF456uvw" },
],
```

Until you paste the ids, those slots show a soft "video coming soon" frame
rather than anything broken.

> **Hosting a video in the repo instead.** Sutaki's message is done this
> way — it lives in `videos/` and is written as
> `{ title: "...", file: "videos/sutaki-message.mp4", poster: "videos/sutaki-message-poster.jpg" }`.
>
> Two rules if you add another this way:
> 1. **Under 25MB.** Cloudflare Pages rejects any single file above that.
> 2. **It must be H.264 MP4, not .MOV.** iPhones record HEVC in a .MOV
>    container, which will not play in Chrome or on most Android phones.
>    Sutaki's was converted before it went in. If you have another .MOV,
>    send it here rather than committing it, and I'll convert it.

---

## How to put photos inside a letter

Add one `photos` line to that letter in `content.js`:

```js
{
  from: "Phyu",
  role: "your friend",
  preview: "...",
  body: [ "..." ],
  signature: "phyu",
  photos: ["photos/phyu-1.jpg", "photos/phyu-2.jpg"],
},
```

Upload those files to the `photos` folder first (GitHub → `photos` → Add file
→ Upload files). The pictures appear underneath that letter when she opens it.

- **One photo** looks great. **Two** sit side by side. **Three or four** stack.
- More than four is a lot — the gallery section is the better home for those.
- The "open when" letters take `photos:` the same way.
- If you mistype a filename, that picture just quietly disappears instead of
  showing a broken-image icon.

---

## Secret addresses (for you, not for her)

Add these to the end of the site's address:

| Address | What it does |
|---|---|
| `?preview` | Skip the countdown and see the finished site right now |
| `?theme=sky` | Preview any theme without editing anything |
| `?reset` | Put the countdown back and re-seal all the envelopes |

Example: `https://nann.pages.dev/?preview`

**Test with `?preview` often while you write.** It's the only way to see what
she'll see on the day.

---

## Putting it online (Cloudflare Pages — free, ~5 minutes, once)

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Choose this repository
3. Leave **every build setting empty**:
   - Framework preset: **None**
   - Build command: **(leave blank)**
   - Build output directory: **`/`**
4. Click **Save and Deploy**

You'll get a free address like `nann-wai.pages.dev`. It's yours forever, no card needed.

From then on, **every time you commit on GitHub the site updates itself.**

> Want a nicer address later? You can add a real domain (~$12/year) at any time
> without rebuilding anything. The free address keeps working too.

---

## Will this still exist in ten years?

Yes, if you do three small things:

| Part | How long it lasts | What would kill it |
|---|---|---|
| The code (GitHub) | Forever, free | Deleting the repo |
| Hosting (Cloudflare Pages) | Forever, free, no expiry | Deleting the account |
| The photos | As long as the repo | Nothing — they're inside it |
| A custom domain (optional) | Until you stop paying | A missed renewal email |

**The three things:**
1. Don't delete the GitHub repo. That's the master copy — code *and* photos.
2. Keep a second copy of the original photos somewhere else (Google Drive). Repos are safe, but never trust one copy of anything.
3. Give Nann access to the GitHub repo. If it's only yours, it dies with your attention. If it's hers, it's hers.

Nothing here rots on its own. There's no server to maintain, no database to
back up, no npm packages to update, no bill to pay. This is why plain HTML was
the right choice — it will still open in a browser in 2040.

---

## What she can do herself, today

- **Change the colours** — the "colours" button, top right. Seven pastel themes. It remembers her choice.
- **Open the sealed letters** — the site quietly records the date she first opened each one, so it becomes a record of her hard days.
- Everything works offline-ish, on any phone, with no login.

## What she *can't* do yet (phase 2)

Writing her own diary entries and uploading her own camera work needs a real
database — that's Cloudflare D1 + R2, and it's a separate build after the
birthday. This version is deliberately the gift, done properly, on time.

---

## Your checklist before 28 September

**Done:**
- [x] Phyu's birthday letter
- [x] Phyu's three "open when" letters (lonely / sad / anxious)
- [x] Andy's letter (Burmese)
- [x] Shun's birthday letter
- [x] Shun's three "open when" letters (miss home / miss us / proud of yourself)
- [x] Ko Aung Thukha's letter, with three photos of the two of them
- [x] A photo in every letter
- [x] Ten photos in the "us, on film" gallery
- [x] Sutaki's video message, hosted in the repo

**Still to do:**
- [ ] Name Shun's two songs — they're first in the playlist as "for you, no. 1 / 2". Song 2 still needs its YouTube id
- [ ] Upload the wishes video to YouTube as **Unlisted**, paste the id
- [ ] Paste Sutaki's funny video id into the "you need to laugh" envelope
- [ ] Get Sutaki's letter — replace the placeholder
- [ ] Add more gallery photos if you want, and swap the placeholder captions for real ones
- [ ] Paste the YouTube ids for the wave to earth songs
- [ ] Check Andy's Burmese renders correctly on your phone (see below)
- [ ] Deploy to Cloudflare Pages
- [ ] Visit `?reset` on your phone afterwards so *you* see the countdown too
- [ ] Send her the link on the 28th

### One thing to check about Andy's letter

Burmese has two competing encodings — **Unicode** and the older **Zawgyi**.
The site loads the Noto Sans Myanmar font, which expects Unicode. If Andy
typed on a Zawgyi keyboard, his message will look scrambled to her.

**Just open the site on your phone and look at Andy's letter.** If it reads
correctly, you're fine. If it looks wrong, ask Andy to resend it from a
Unicode keyboard (every modern Android and iPhone is Unicode by default),
or paste his text into a free online "Zawgyi to Unicode" converter.

---

## The files, briefly

```
index.html              the page skeleton
assets/css/style.css    all the design + the seven colour themes
assets/js/content.js    ← everything you edit
assets/js/app.js        the countdown + the interactions
photos/                 your pictures go here
```

The order she sees it in: **countdown → videos → letters → open when →
photos → playlist**.
