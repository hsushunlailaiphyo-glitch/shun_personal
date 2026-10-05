# Turning on sync (optional, ~10 minutes)

**The site works without this.** Everything saves to her phone immediately either
way. This only adds the extra: her planner following her between phone and laptop.

Do it *after* the site is live and you've checked it. If it breaks, nothing on
the site breaks with it.

---

## 1. Make the storage

1. **dash.cloudflare.com** → **Storage & Databases** → **KV**
2. **Create a namespace**, call it `phyu-planner`
3. Done — leave the page

## 2. Make the worker

1. **Workers & Pages** → **Create** → **Start from Hello World** → **Deploy**
   - Name it `phyu-sync`
2. Once deployed → **Edit code**
3. Delete everything in the editor, paste the whole of **`sync-worker.js`**
   (the file next to this one), then **Deploy**

## 3. Connect them

1. Still in the `phyu-sync` worker → **Settings** → **Bindings** → **Add**
2. Choose **KV namespace**
3. **Variable name:** `PLANNER` ← must be exactly this, capitals included
4. **KV namespace:** `phyu-planner`
5. **Deploy**

## 4. Make her secret key

A key is just a long random string. Open any browser console and run:

```js
crypto.randomUUID() + crypto.randomUUID().slice(0, 8)
```

Or mash the keyboard — **anything 16–80 characters, letters, numbers, `-` and `_` only.**
Keep it somewhere safe. Whoever has this key has her planner.

## 5. Point the site at it

In `phyu/assets/js/content.js`, set:

```js
syncUrl: "https://phyu-sync.<your-subdomain>.workers.dev",
```

(the address Cloudflare shows on the worker's page). Commit.

## 6. Give her the key, once

Send her the link **with the key on the end, one time**:

```
https://<her site>/?key=THEKEYYOUMADE
```

The site stores it and never needs it again. Every later visit is just the plain
address. Opening that same `?key=` link on her laptop joins it to the same
planner.

---

## Checking it worked

The very bottom of the site says what's happening:

| It says | Meaning |
|---|---|
| `saved on this device` | sync is off — `syncUrl` is empty, or she hasn't used a `?key=` link |
| `synced` | working |
| `offline — saved on this device` | can't reach the worker; nothing is lost, it retries |

## What this costs

Nothing. Cloudflare's free tier allows 100,000 reads and 1,000 writes a day.
One person tapping a mood a few times a day is nowhere near it.

## Things worth knowing

- **The key is the password.** Anyone with her link *including the key* can read
  and change her planner. Don't post it anywhere.
- **Older copies can't overwrite newer ones.** If her phone is offline for a
  week, reconnecting won't wipe what her laptop saved — the worker rejects the
  stale copy and hands back the newer one.
- **If you ever lose the key**, the data is still in KV under that key; you'd
  need the key to read it. Keep a copy.
