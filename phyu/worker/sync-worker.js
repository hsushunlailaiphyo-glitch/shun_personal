/**
 * Ten out of Ten — sync worker
 *
 * A tiny Cloudflare Worker that stores one JSON document per key.
 * The site works perfectly without it; this only adds phone <-> laptop sync.
 *
 * Setup is in SETUP.md next to this file.
 *
 * Needs one binding:  KV namespace, variable name  PLANNER
 */

const MAX_BYTES = 256 * 1024;         // plenty for years of entries
const KEY_RE = /^[A-Za-z0-9_-]{16,80}$/;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    const url = new URL(request.url);
    const key = url.searchParams.get("key") || "";

    // The key is the whole secret, so it has to look like a real one.
    // This also stops someone scanning for short or guessable keys.
    if (!KEY_RE.test(key)) {
      return json({ error: "bad key" }, 400, origin);
    }
    if (!env.PLANNER) {
      return json({ error: "no KV binding named PLANNER" }, 500, origin);
    }

    if (request.method === "GET") {
      const stored = await env.PLANNER.get("doc:" + key);
      if (!stored) return json({}, 200, origin);
      return new Response(stored, {
        status: 200,
        headers: { "Content-Type": "application/json", ...cors(origin) },
      });
    }

    if (request.method === "PUT") {
      const body = await request.text();
      if (body.length > MAX_BYTES) {
        return json({ error: "too big" }, 413, origin);
      }
      let doc;
      try {
        doc = JSON.parse(body);
      } catch {
        return json({ error: "not json" }, 400, origin);
      }
      if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
        return json({ error: "not an object" }, 400, origin);
      }

      // Never let an older copy overwrite a newer one. A phone that has been
      // offline for a week must not wipe what the laptop saved yesterday.
      const prev = await env.PLANNER.get("doc:" + key);
      if (prev) {
        try {
          const old = JSON.parse(prev);
          if ((old.updatedAt || 0) > (doc.updatedAt || 0)) {
            return new Response(prev, {
              status: 409,
              headers: { "Content-Type": "application/json", ...cors(origin) },
            });
          }
        } catch {
          /* unreadable previous value — let the new one replace it */
        }
      }

      await env.PLANNER.put("doc:" + key, body);
      return json({ ok: true, updatedAt: doc.updatedAt || 0 }, 200, origin);
    }

    return json({ error: "method not allowed" }, 405, origin);
  },
};
