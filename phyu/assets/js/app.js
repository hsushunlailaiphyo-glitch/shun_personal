/* ==========================================================================
   Ten out of Ten — the engine.  You should not need to edit this file.

   Addresses that help you (not her):
     ?preview     skip the countdown and see the finished site (leaves no trace)
     ?reset       wipe everything stored on this device and re-lock the gate
     ?theme=carat preview any colour without editing content.js
   ========================================================================== */
(function () {
  "use strict";

  var C = window.CONTENT || (typeof CONTENT !== "undefined" ? CONTENT : null);
  if (!C) { document.body.innerHTML = "<p style='padding:2rem'>content.js did not load.</p>"; return; }

  var $ = function (id) { return document.getElementById(id); };
  var qs = new URLSearchParams(location.search);
  var PREVIEW = qs.has("preview");
  var NS = "phyu:";

  /* ---------------- storage that never throws ---------------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(NS + k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(NS + k); } catch (e) {} }
  };

  if (qs.has("reset")) {
    try {
      Object.keys(localStorage).filter(function (k) { return k.indexOf(NS) === 0; })
        .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  /* ======================================================================
     TIME — always measured where she is, not where the visitor is
     ====================================================================== */
  var TZ = C.timezone || "Asia/Tokyo";
  var DAY_MS = 86400000;

  function tzOffset(utcMs) {
    try {
      var f = new Intl.DateTimeFormat("en-US", {
        timeZone: TZ, hour12: false, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      var p = {};
      f.formatToParts(new Date(utcMs)).forEach(function (x) { p[x.type] = x.value; });
      var h = parseInt(p.hour, 10) % 24;
      return Date.UTC(+p.year, +p.month - 1, +p.day, h, +p.minute, +p.second) - utcMs;
    } catch (e) { return 9 * 3600 * 1000; }
  }
  function midnightThere(y, m, d) {
    var guess = Date.UTC(y, m - 1, d, 0, 0, 0);
    var t = guess - tzOffset(guess);
    return guess - tzOffset(t);
  }
  function partsThere(utcMs) {
    var d = new Date(utcMs + tzOffset(utcMs));
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(),
             hh: d.getUTCHours(), mm: d.getUTCMinutes(), ss: d.getUTCSeconds() };
  }
  var pad2 = function (n) { return n < 10 ? "0" + n : String(n); };
  function keyOf(y, m, d) { return y + "-" + pad2(m) + "-" + pad2(d); }
  function todayKey() { var p = partsThere(Date.now()); return keyOf(p.y, p.m, p.d); }

  var BD = C.birthday || { month: 10, day: 10 };

  // The moment the gift opens, once and for all. The gate is a one-time
  // reveal, not an annual lock: after this instant the site is open on every
  // device, forever, whether or not that device was here on the day.
  var REVEAL_AT = midnightThere(C.revealYear || 2026, BD.month, BD.day);

  // the next (or currently running) birthday
  function bdWindow(now) {
    var y = partsThere(now).y;
    var start = midnightThere(y, BD.month, BD.day);
    if (now >= start + DAY_MS) { y += 1; start = midnightThere(y, BD.month, BD.day); }
    return { start: start, end: start + DAY_MS, year: y };
  }

  // the 12 months the grid covers: this birthday through the day before the next
  var FIRST_YEAR = 2026;
  function yearSpan(now) {
    var p = partsThere(now);
    var y = p.y;
    if (p.m < BD.month || (p.m === BD.month && p.d < BD.day)) y -= 1;
    if (y < FIRST_YEAR) y = FIRST_YEAR;
    return { y: y, m: BD.month, d: BD.day };
  }

  /* ======================================================================
     STATE  —  local first, cloud second
     ====================================================================== */
  var SYNC = (C.syncUrl || "").replace(/\/+$/, "");
  var syncKey = qs.get("key") || store.get("key") || "";
  if (qs.get("key")) store.set("key", syncKey);

  var state = null;
  var saveTimer = null, pushTimer = null;
  var syncState = SYNC && syncKey ? "idle" : "off";

  function blankState() {
    return { v: 1, updatedAt: 0, moods: {}, habits: [], habitLog: {}, countdowns: [], wishes: [] };
  }
  function uid() { return Math.random().toString(36).slice(2, 9); }

  function seed(s) {
    (C.startingHabits || []).forEach(function (n) { s.habits.push({ id: uid(), name: n }); });
    (C.startingCountdowns || []).forEach(function (c) {
      if (c && c.title && c.date) s.countdowns.push({ id: uid(), title: c.title, date: c.date });
    });
    (C.startingWishes || []).forEach(function (w) { s.wishes.push({ id: uid(), text: w, done: false }); });
    return s;
  }

  function loadLocal() {
    var raw = store.get("data");
    if (raw) {
      try {
        var p = JSON.parse(raw);
        if (p && typeof p === "object") {
          var b = blankState();
          for (var k in b) if (!(k in p)) p[k] = b[k];
          return p;
        }
      } catch (e) {}
    }
    // first ever visit: write the seeded habits straight away, so the state
    // on disk matches what she sees rather than appearing on first tap
    var s = seed(blankState());
    s.updatedAt = Date.now();
    try { store.set("data", JSON.stringify(s)); } catch (e) {}
    return s;
  }

  function touch() {
    state.updatedAt = Date.now();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { store.set("data", JSON.stringify(state)); } catch (e) {}
    }, 120);
    queuePush();
  }

  /* ---- cloud: best effort, never blocking, never destructive ---- */
  function setSync(s) { syncState = s; paintSync(); }

  function queuePush() {
    if (!SYNC || !syncKey) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 1200);
  }

  function push() {
    if (!SYNC || !syncKey) return;
    setSync("saving");
    fetch(SYNC + "?key=" + encodeURIComponent(syncKey), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    }).then(function (r) { setSync(r.ok ? "ok" : "error"); })
      .catch(function () { setSync("error"); });
  }

  function pull() {
    if (!SYNC || !syncKey) return Promise.resolve(false);
    setSync("loading");
    return fetch(SYNC + "?key=" + encodeURIComponent(syncKey), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (remote) {
        setSync("ok");
        // only ever adopt something strictly newer, so a stale phone can't
        // wipe a laptop that has more in it
        if (remote && typeof remote === "object" && (remote.updatedAt || 0) > (state.updatedAt || 0)) {
          var b = blankState();
          for (var k in b) if (!(k in remote)) remote[k] = b[k];
          state = remote;
          try { store.set("data", JSON.stringify(state)); } catch (e) {}
          return true;
        }
        return false;
      })
      .catch(function () { setSync("error"); return false; });
  }

  function paintSync() {
    var el = $("footer-sync");
    if (!el) return;
    var msg = {
      off:     "saved on this device",
      idle:    "syncing is on",
      loading: "checking for changes…",
      saving:  "saving…",
      ok:      "synced",
      error:   "offline — saved on this device"
    }[syncState] || "";
    el.textContent = msg;
  }

  /* ======================================================================
     THEME
     ====================================================================== */
  var THEMES = [
    { id: "midnight", label: "midnight",  swatch: "#8fb8e8" },
    { id: "glass",    label: "glass",     swatch: "#9fb8dd" },
    { id: "carat",    label: "carat",     swatch: "#f0a8c0" },
    { id: "belle",    label: "belle",     swatch: "#e8c87a" },
    { id: "rapunzel", label: "rapunzel",  swatch: "#c9b2f2" },
    { id: "ariel",    label: "ariel",     swatch: "#8fd4d9" }
  ];
  var BG = { midnight: "#0a1026", glass: "#f4f8ff", carat: "#fff6f8",
             belle: "#fffaf0", rapunzel: "#faf7ff", ariel: "#f2fbfb" };

  function validTheme(t) { return THEMES.some(function (x) { return x.id === t; }) ? t : null; }

  function applyTheme(t, remember) {
    t = validTheme(t) || "midnight";
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", BG[t] || "#0a1026");
    if (remember) store.set("theme", t);
    Array.prototype.forEach.call(document.querySelectorAll(".theme-opt"), function (b) {
      b.setAttribute("aria-current", b.dataset.theme === t ? "true" : "false");
    });
  }
  applyTheme(validTheme(qs.get("theme")) || store.get("theme") || C.theme, false);

  function buildThemePicker() {
    var list = $("theme-list"), toggle = $("theme-toggle");
    list.innerHTML = THEMES.map(function (t) {
      return '<button class="theme-opt" data-theme="' + t.id + '"><i style="background:' + t.swatch + '"></i>' + t.label + "</button>";
    }).join("");
    list.addEventListener("click", function (e) {
      var b = e.target.closest(".theme-opt");
      if (b) applyTheme(b.dataset.theme, true);
    });
    toggle.addEventListener("click", function () {
      var open = list.hidden;
      list.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function (e) {
      if (!list.hidden && !e.target.closest(".theme-bar")) {
        list.hidden = true; toggle.setAttribute("aria-expanded", "false");
      }
    });
    applyTheme(document.documentElement.getAttribute("data-theme"), false);
  }

  /* ======================================================================
     HELPERS
     ====================================================================== */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function inline(str) {
    return esc(str).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function paras(arr) {
    return (arr || []).map(function (p) { return "<p>" + inline(p) + "</p>"; }).join("");
  }
  function setText(id, v) { var el = $(id); if (el) el.textContent = v || ""; }

  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function prettyDate(key) {
    var a = key.split("-");
    return +a[2] + " " + MONTHS[+a[1] - 1].slice(0, 3) + " " + a[0];
  }
  function daysInMonth(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  function weekdayOf(y, m, d) { return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }
  function shiftKey(key, delta) {
    var a = key.split("-");
    var t = Date.UTC(+a[0], +a[1] - 1, +a[2]) + delta * DAY_MS;
    var dt = new Date(t);
    return keyOf(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
  }
  function moodColor(m) { return "var(--mood-" + m + ")"; }

  var toastTimer = null;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 1800);
  }

  /* ======================================================================
     THE GATE
     ====================================================================== */
  var timer = null;

  function buildClockTicks() {
    var g = $("clock-ticks"); if (!g) return;
    var out = "";
    for (var i = 0; i < 60; i++) {
      if (i % 15 === 0) continue;          // XII, III, VI and IX stand in for these
      var major = i % 5 === 0;
      var a = (i / 60) * Math.PI * 2;
      var r1 = major ? 74 : 78, r2 = 82;
      out += '<line class="clock-tick' + (major ? " major" : "") + '"' +
             ' x1="' + (100 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (100 - Math.cos(a) * r1).toFixed(1) +
             '" x2="' + (100 + Math.sin(a) * r2).toFixed(1) + '" y2="' + (100 - Math.cos(a) * r2).toFixed(1) + '"/>';
    }
    g.innerHTML = out;
  }

  function startGate() {
    $("gate").hidden = false;
    document.body.classList.add("locked");
    buildClockTicks();
    setText("gate-eyebrow", (C.gate && C.gate.eyebrow) || "");
    setText("gate-name", C.name);
    setText("gate-note", (C.gate && C.gate.note) || "");
    setText("gate-sign", (C.gate && C.gate.signature) || "");

    function tick() {
      var now = Date.now();
      if (now >= REVEAL_AT) { openSite(true, true); return; }

      var left = REVEAL_AT - now;
      setText("cd-days", String(Math.floor(left / DAY_MS)));
      setText("cd-hours", pad2(Math.floor(left / 3600000) % 24));
      setText("cd-mins", pad2(Math.floor(left / 60000) % 60));
      setText("cd-secs", pad2(Math.floor(left / 1000) % 60));

      // the hands show her real local time, creeping toward twelve
      var p = partsThere(now);
      var secA = p.ss * 6;
      var minA = p.mm * 6 + p.ss * 0.1;
      var hrA  = (p.hh % 12) * 30 + p.mm * 0.5;
      $("hand-sec").style.transform = "rotate(" + secA + "deg)";
      $("hand-min").style.transform = "rotate(" + minA + "deg)";
      $("hand-hour").style.transform = "rotate(" + hrA + "deg)";
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  // `remember` persists the unlock. Previewing must not, or checking the site
  // once would open it for good in that browser.
  function openSite(animate, remember) {
    if (timer) { clearInterval(timer); timer = null; }
    if (remember) store.set("unlocked", "1");
    document.body.classList.remove("locked");

    var gate = $("gate");
    if (gate && !gate.hidden && animate) {
      gate.style.transition = "opacity 1.4s ease";
      gate.style.opacity = "0";
      setTimeout(function () { gate.hidden = true; gate.style.opacity = ""; }, 1400);
    } else if (gate) { gate.hidden = true; }

    $("site").hidden = false;
    boot();
  }
  window.__openSite = openSite;

  /* ======================================================================
     RENDER
     ====================================================================== */
  function boot() {
    state = loadLocal();
    buildThemePicker();
    renderStatic();
    renderAll();
    paintSync();
    revealOnScroll();

    pull().then(function (changed) { if (changed) { renderAll(); toast("brought in your latest"); } });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) pull().then(function (c) { if (c) renderAll(); });
    });
  }

  function renderStatic() {
    var h = C.hero || {};
    setText("hero-eyebrow", h.eyebrow);
    setText("hero-title", h.title || C.name);
    setText("hero-sub", h.subtitle);
    $("hero-body").innerHTML = paras(h.body);

    $("hero-nav").innerHTML = (C.nav || []).map(function (n) {
      return '<a href="' + n.href + '">' + esc(n.label) + "</a>";
    }).join("");

    setText("today-title", C.todayTitle);
    setText("today-lede", C.todayLede);
    setText("today-mood-panel", C.todayMoodPanel);
    setText("today-habit-panel", C.todayHabitPanel);
    setText("year-title", C.yearTitle);
    setText("year-lede", C.yearLede);
    setText("cd-title", C.countdownTitle);
    setText("cd-lede", C.countdownLede);
    setText("wish-title", C.wishTitle);
    setText("wish-lede", C.wishLede);
    setText("notes-title", C.notesTitle);
    setText("notes-lede", C.notesLede);
    setText("music-title", C.musicTitle);
    setText("music-lede", C.musicLede);
    setText("photos-title", C.photosTitle);
    setText("photos-lede", C.photosLede);
    setText("keep-title", C.keepTitle);
    setText("keep-lede", C.keepLede);

    var cl = C.closing || {};
    setText("closing-title", cl.title);
    $("closing-body").innerHTML = paras(cl.body);
    setText("closing-sign", cl.signature);
    setText("footer-made", C.footerMade);

    var days = Math.ceil((bdWindow(Date.now()).start - Date.now()) / DAY_MS);
    setText("footer-next", days <= 0 ? "today. right now." : "next birthday in " + days + (days === 1 ? " day" : " days"));

    $("year-legend").innerHTML = '<span>how the day felt</span>' +
      (C.moods || []).map(function (m) {
        return '<span class="legend-swatch"><i style="background:' + moodColor(m.id) + '"></i>' + esc(m.name) + "</span>";
      }).join("");

    renderNotes();
    renderMusic();
    renderPhotos();
  }

  function renderAll() {
    renderToday();
    renderYear();
    renderCountdowns();
    renderWishes();
  }

  /* ---------------------------- today ---------------------------- */
  function moodButtons(selected) {
    return (C.moods || []).map(function (m) {
      return '<button class="mood" data-mood="' + m.id + '" aria-pressed="' + (selected === m.id) + '">' +
        '<span class="mood-dot" style="background:' + moodColor(m.id) + '"></span>' +
        '<span class="mood-name">' + esc(m.name) + "</span></button>";
    }).join("");
  }

  function renderToday() {
    var k = todayKey();
    var p = partsThere(Date.now());
    setText("today-date", MONTHS[p.m - 1] + " " + p.d);

    var entry = state.moods[k] || {};
    $("mood-row").innerHTML = moodButtons(entry.m);
    $("mood-note").value = entry.note || "";

    var doneToday = state.habitLog[k] || [];
    $("habit-list").innerHTML = state.habits.length
      ? state.habits.map(function (hb) {
          var done = doneToday.indexOf(hb.id) !== -1;
          var st = streak(hb.id);
          return '<li class="habit' + (done ? " done" : "") + '" data-habit="' + hb.id + '">' +
            '<button class="habit-tick" aria-pressed="' + done + '" aria-label="' + esc(hb.name) + '">' + (done ? "&#10003;" : "") + "</button>" +
            '<span class="habit-name">' + esc(hb.name) + "</span>" +
            (st > 1 ? '<span class="habit-streak">' + st + " days</span>" : "") +
            '<button class="habit-del" aria-label="remove ' + esc(hb.name) + '" hidden>&times;</button></li>';
        }).join("")
      : '<li class="habit"><span class="habit-name" style="color:var(--muted)">no habits yet — tap edit to add one</span></li>';

    if (editingHabits) showHabitEditing(true);
  }

  function streak(habitId) {
    var k = todayKey(), n = 0;
    if ((state.habitLog[k] || []).indexOf(habitId) === -1) k = shiftKey(k, -1);
    while ((state.habitLog[k] || []).indexOf(habitId) !== -1) { n++; k = shiftKey(k, -1); }
    return n;
  }

  var editingHabits = false;
  function showHabitEditing(on) {
    editingHabits = on;
    $("habit-add").hidden = !on;
    $("habit-edit").textContent = on ? "done" : "edit";
    Array.prototype.forEach.call(document.querySelectorAll(".habit-del"), function (b) { b.hidden = !on; });
  }

  /* ---------------------------- the year ---------------------------- */
  function renderYear() {
    var span = yearSpan(Date.now());
    var startKey = keyOf(span.y, span.m, span.d);
    var tKey = todayKey();
    var out = "", answered = 0, sum = 0;

    for (var i = 0; i < 12; i++) {
      var mm = span.m + i, yy = span.y;
      while (mm > 12) { mm -= 12; yy += 1; }
      var dim = daysInMonth(yy, mm);
      var cells = "";
      var lead = weekdayOf(yy, mm, 1);
      for (var b = 0; b < lead; b++) cells += '<div class="day blank"></div>';

      for (var d = 1; d <= dim; d++) {
        var key = keyOf(yy, mm, d);
        if (key < startKey) { cells += '<div class="day blank"></div>'; continue; }
        if (key > shiftKey(keyOf(span.y + 1, span.m, span.d), -1)) { cells += '<div class="day blank"></div>'; continue; }

        var e = state.moods[key];
        var future = key > tKey;
        var cls = "day" + (future ? " future" : "") + (key === tKey ? " today" : "");
        var style = e && e.m ? ' style="background:' + moodColor(e.m) + ';border-color:transparent"' : "";
        if (e && e.m) { answered++; sum += e.m; }
        cells += future
          ? '<div class="' + cls + '"' + style + "></div>"
          : '<button class="' + cls + '" data-day="' + key + '" title="' + prettyDate(key) + '"' + style + "></button>";
      }
      out += '<div class="month reveal"><p class="month-name">' + MONTHS[mm - 1] + " " + yy + "</p>" +
             '<div class="month-grid">' + cells + "</div></div>";
    }
    $("year-months").innerHTML = out;

    var txt = answered === 0
      ? "No days filled in yet. Today is a good one to start."
      : answered + (answered === 1 ? " day" : " days") + " filled in so far" +
        (answered >= 3 ? " — mostly " + moodName(Math.round(sum / answered)) + " days." : ".");
    setText("year-stats", txt);
  }
  function moodName(id) {
    var m = (C.moods || []).filter(function (x) { return x.id === id; })[0];
    return m ? m.name : "";
  }

  /* ---------------------------- countdowns ---------------------------- */
  function daysUntil(dateStr) {
    var a = dateStr.split("-");
    var target = midnightThere(+a[0], +a[1], +a[2]);
    var p = partsThere(Date.now());
    var todayStart = midnightThere(p.y, p.m, p.d);
    return Math.round((target - todayStart) / DAY_MS);
  }

  function renderCountdowns() {
    var list = state.countdowns.slice().sort(function (a, b) {
      return daysUntil(a.date) - daysUntil(b.date);
    });
    $("cd-grid").innerHTML = list.length ? list.map(function (c) {
      var n = daysUntil(c.date);
      var cls = "cd-card reveal" + (n < 0 ? " past" : n <= 7 ? " soon" : "");
      var big, word;
      if (n === 0) { big = "today"; word = "it's here"; }
      else if (n < 0) { big = String(-n); word = (-n === 1 ? "day ago" : "days ago"); }
      else { big = String(n); word = (n === 1 ? "day to go" : "days to go"); }
      return '<div class="' + cls + '" data-cd="' + c.id + '">' +
        '<button class="cd-del" aria-label="remove">&times;</button>' +
        '<span class="cd-big">' + esc(big) + '</span><span class="cd-word">' + esc(word) + "</span>" +
        '<p class="cd-name">' + esc(c.title) + "</p>" +
        '<p class="cd-when">' + esc(prettyDate(c.date)) + "</p></div>";
    }).join("") : '<p class="section-lede" style="margin:0">Nothing yet. Add the first thing you’re waiting for.</p>';
    markRevealed($("cd-grid"));
  }

  /* ---------------------------- wishes ---------------------------- */
  function renderWishes() {
    $("wish-list").innerHTML = state.wishes.length ? state.wishes.map(function (w) {
      return '<li class="wish' + (w.done ? " done" : "") + '" data-wish="' + w.id + '">' +
        '<button class="wish-tick" aria-pressed="' + !!w.done + '" aria-label="done">' + (w.done ? "&#10003;" : "") + "</button>" +
        '<span class="wish-text">' + esc(w.text) + "</span>" +
        '<button class="wish-del" aria-label="remove">&times;</button></li>';
    }).join("") : '<li class="wish"><span class="wish-text" style="color:var(--muted)">' + esc(C.wishEmpty || "") + "</span></li>";
  }

  /* ---------------------------- notes ---------------------------- */
  function renderNotes() {
    $("note-grid").innerHTML = (C.notes || []).map(function (n, i) {
      return '<button class="note-card reveal" data-note="' + i + '">' +
        '<p class="note-from">' + esc(n.from) + "</p>" +
        '<p class="note-role">' + esc(n.role || "") + "</p>" +
        '<p class="note-prev">' + esc(n.preview || (n.body || [])[0] || "") + "</p>" +
        '<span class="note-open">read it &rarr;</span></button>';
    }).join("");
  }

  /* ---------------------------- music ---------------------------- */
  function trackList(items, prefix) {
    return items.map(function (t, i) {
      return '<div id="' + prefix + i + '"><button class="track" data-track="' + prefix + i + '">' +
        '<span class="track-play" aria-hidden="true">&#9654;</span><span>' +
        '<span class="track-title">' + esc(t.title) + "</span><br>" +
        '<span class="track-artist">' + esc(t.artist || "") + "</span></span></button></div>";
    }).join("");
  }
  var musicIndex = {};
  function renderMusic() {
    var disney = C.musicDisney || [], svt = C.musicSvt || [];
    disney.forEach(function (t, i) { musicIndex["d" + i] = t; });
    svt.forEach(function (t, i) { musicIndex["s" + i] = t; });
    $("music-cols").innerHTML =
      '<div class="reveal"><h3 class="music-head">' + esc(C.musicDisneyHead || "disney") + '</h3>' +
      '<div class="track-list">' + trackList(disney, "d") + "</div></div>" +
      '<div class="reveal"><h3 class="music-head">' + esc(C.musicSvtHead || "seventeen") + '</h3>' +
      '<div class="track-list">' + trackList(svt, "s") + "</div></div>";
  }

  /* ---------------------------- photos ---------------------------- */
  var photos = [];
  function renderPhotos() {
    photos = (C.photos || []).filter(function (p) { return p && p.src; });
    var html = photos.map(function (p, i) {
      return '<button class="photo reveal" data-photo="' + i + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "a photo") + '" loading="lazy">' +
        (p.caption ? '<span class="photo-cap">' + esc(p.caption) + "</span>" : "") + "</button>";
    }).join("");
    var blanks = photos.length ? 0 : Math.max(0, C.emptySlots || 0);
    for (var i = 0; i < blanks; i++) html += '<div class="photo empty reveal"><span>waiting for a photo</span></div>';
    $("photo-grid").innerHTML = html;
    Array.prototype.forEach.call($("photo-grid").querySelectorAll("img"), function (img) {
      img.addEventListener("error", function () {
        var card = img.closest(".photo");
        card.classList.add("empty"); card.removeAttribute("data-photo");
        card.innerHTML = "<span>waiting for a photo</span>";
      });
    });
  }

  /* ======================================================================
     INTERACTION
     ====================================================================== */
  function setMood(key, m) {
    var e = state.moods[key] || {};
    e.m = (e.m === m) ? 0 : m;
    if (!e.m) delete e.m;
    if (!e.m && !e.note) delete state.moods[key]; else state.moods[key] = e;
    touch();
  }
  function setNote(key, text) {
    var e = state.moods[key] || {};
    text = String(text || "").slice(0, 140);
    if (text) e.note = text; else delete e.note;
    if (!e.m && !e.note) delete state.moods[key]; else state.moods[key] = e;
    touch();
  }

  // today: mood
  $("mood-row").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mood]"); if (!b) return;
    setMood(todayKey(), +b.dataset.mood);
    renderToday(); renderYear();
  });
  var noteTimer = null;
  $("mood-note").addEventListener("input", function () {
    clearTimeout(noteTimer);
    var v = this.value;
    noteTimer = setTimeout(function () { setNote(todayKey(), v); }, 400);
  });

  // today: habits
  $("habit-list").addEventListener("click", function (e) {
    var li = e.target.closest("[data-habit]"); if (!li) return;
    var id = li.dataset.habit;
    if (e.target.closest(".habit-del")) {
      state.habits = state.habits.filter(function (h) { return h.id !== id; });
      Object.keys(state.habitLog).forEach(function (k) {
        state.habitLog[k] = state.habitLog[k].filter(function (x) { return x !== id; });
        if (!state.habitLog[k].length) delete state.habitLog[k];
      });
      touch(); renderToday(); return;
    }
    if (e.target.closest(".habit-tick")) {
      var k = todayKey();
      var arr = state.habitLog[k] || [];
      var at = arr.indexOf(id);
      if (at === -1) arr.push(id); else arr.splice(at, 1);
      if (arr.length) state.habitLog[k] = arr; else delete state.habitLog[k];
      touch(); renderToday();
    }
  });
  $("habit-edit").addEventListener("click", function () { showHabitEditing(!editingHabits); });
  $("habit-add").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("habit-new");
    var name = input.value.trim();
    if (!name) return;
    state.habits.push({ id: uid(), name: name });
    input.value = ""; touch(); renderToday(); showHabitEditing(true);
  });

  // the year grid: fill in a past day
  var editingDay = null;
  $("year-months").addEventListener("click", function (e) {
    var b = e.target.closest("[data-day]"); if (!b) return;
    editingDay = b.dataset.day;
    var entry = state.moods[editingDay] || {};
    setText("dayedit-title", prettyDate(editingDay));
    $("dayedit-moods").innerHTML = moodButtons(entry.m);
    $("dayedit-note").value = entry.note || "";
    $("dayedit").hidden = false;
    document.body.classList.add("locked");
  });
  $("dayedit-moods").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mood]"); if (!b || !editingDay) return;
    setMood(editingDay, +b.dataset.mood);
    var entry = state.moods[editingDay] || {};
    $("dayedit-moods").innerHTML = moodButtons(entry.m);
    renderYear(); renderToday();
  });
  var dayNoteTimer = null;
  $("dayedit-note").addEventListener("input", function () {
    clearTimeout(dayNoteTimer);
    var v = this.value;
    dayNoteTimer = setTimeout(function () { if (editingDay) setNote(editingDay, v); }, 400);
  });
  function closeDayEdit() { $("dayedit").hidden = true; document.body.classList.remove("locked"); editingDay = null; }
  $("dayedit-close").addEventListener("click", closeDayEdit);

  // countdowns
  $("cd-grid").addEventListener("click", function (e) {
    var card = e.target.closest("[data-cd]"); if (!card) return;
    if (e.target.closest(".cd-del")) {
      state.countdowns = state.countdowns.filter(function (c) { return c.id !== card.dataset.cd; });
      touch(); renderCountdowns();
    }
  });
  $("cd-add").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = $("cd-new-title").value.trim(), d = $("cd-new-date").value;
    if (!t || !d) return;
    state.countdowns.push({ id: uid(), title: t, date: d });
    $("cd-new-title").value = ""; $("cd-new-date").value = "";
    touch(); renderCountdowns(); toast("added");
  });

  // wishes
  $("wish-list").addEventListener("click", function (e) {
    var li = e.target.closest("[data-wish]"); if (!li) return;
    var id = li.dataset.wish;
    if (e.target.closest(".wish-del")) {
      state.wishes = state.wishes.filter(function (w) { return w.id !== id; });
      touch(); renderWishes(); return;
    }
    if (e.target.closest(".wish-tick")) {
      state.wishes.forEach(function (w) { if (w.id === id) w.done = !w.done; });
      touch(); renderWishes();
    }
  });
  $("wish-add").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = $("wish-new").value.trim();
    if (!v) return;
    state.wishes.push({ id: uid(), text: v, done: false });
    $("wish-new").value = ""; touch(); renderWishes();
  });

  // notes
  $("note-grid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-note]"); if (!b) return;
    var n = C.notes[+b.dataset.note];
    setText("reader-eyebrow", "a note from " + (n.from || ""));
    setText("reader-title", n.from || "");
    $("reader-body").innerHTML = paras(n.body);
    setText("reader-sign", n.signature ? "— " + n.signature : "");
    $("reader").hidden = false;
    document.body.classList.add("locked");
    $("reader-close").focus();
    $("reader").querySelector(".reader-card").scrollTop = 0;
  });
  function closeReader() { $("reader").hidden = true; document.body.classList.remove("locked"); }
  $("reader-close").addEventListener("click", closeReader);

  // music
  $("music-cols").addEventListener("click", function (e) {
    var b = e.target.closest("[data-track]"); if (!b) return;
    var id = b.dataset.track, t = musicIndex[id];
    if (!t) return;
    if (!t.youtubeId) {
      window.open("https://www.youtube.com/results?search_query=" +
        encodeURIComponent((t.artist || "") + " " + t.title), "_blank", "noopener");
      return;
    }
    $(id).innerHTML = '<div class="track-embed"><iframe src="https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(t.youtubeId) + '?autoplay=1&rel=0" title="' + esc(t.title) +
      '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
  });

  // photos
  var lbIndex = 0;
  $("photo-grid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-photo]"); if (!b) return;
    lbIndex = +b.dataset.photo; showPhoto();
    $("lightbox").hidden = false; document.body.classList.add("locked");
  });
  function showPhoto() {
    var p = photos[lbIndex]; if (!p) return;
    $("lb-img").src = p.src; $("lb-img").alt = p.caption || "";
    setText("lb-cap", p.caption || "");
    var many = photos.length > 1;
    $("lb-prev").hidden = !many; $("lb-next").hidden = !many;
  }
  function moveLb(step) { lbIndex = (lbIndex + step + photos.length) % photos.length; showPhoto(); }
  function closeLb() { $("lightbox").hidden = true; document.body.classList.remove("locked"); }
  $("lb-close").addEventListener("click", closeLb);
  $("lb-prev").addEventListener("click", function () { moveLb(-1); });
  $("lb-next").addEventListener("click", function () { moveLb(1); });

  document.addEventListener("click", function (e) {
    if (!e.target.matches("[data-close]")) return;
    if (!$("reader").hidden) closeReader();
    if (!$("dayedit").hidden) closeDayEdit();
    if (!$("lightbox").hidden) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!$("reader").hidden) closeReader();
      else if (!$("dayedit").hidden) closeDayEdit();
      else if (!$("lightbox").hidden) closeLb();
    }
    if (!$("lightbox").hidden) {
      if (e.key === "ArrowLeft") moveLb(-1);
      if (e.key === "ArrowRight") moveLb(1);
    }
  });
  (function () {
    var x0 = null, lb = $("lightbox");
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) moveLb(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  })();

  // Save on the way out, in case a debounce is still pending — but never
  // write over something newer. Two tabs open at once would otherwise let the
  // stale one overwrite the one she was actually typing in.
  window.addEventListener("pagehide", function () {
    if (!state) return;
    try {
      var raw = store.get("data");
      if (raw) {
        var cur = JSON.parse(raw);
        if ((cur.updatedAt || 0) > (state.updatedAt || 0)) return;
      }
      store.set("data", JSON.stringify(state));
    } catch (e) {}
  });

  /* ======================================================================
     KEEPING A COPY
     Her year lives on her device. This hands her a file she can put
     anywhere, and take back later or on another phone.
     ====================================================================== */
  function stamp() {
    var p = partsThere(Date.now());
    return p.y + "-" + pad2(p.m) + "-" + pad2(p.d);
  }

  $("keep-save").addEventListener("click", function () {
    try {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "phyu-year-" + stamp() + ".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast("saved to your downloads");
    } catch (e) {
      toast("couldn't save a copy here");
    }
  });

  $("keep-load").addEventListener("click", function () { $("keep-file").click(); });

  $("keep-file").addEventListener("change", function () {
    var file = this.files && this.files[0];
    this.value = "";                       // so the same file can be picked twice
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function () {
      var doc;
      try { doc = JSON.parse(reader.result); } catch (e) { doc = null; }
      if (!doc || typeof doc !== "object" || Array.isArray(doc) || !("moods" in doc)) {
        toast("that doesn't look like one of your copies");
        return;
      }
      var days = Object.keys(doc.moods || {}).length;
      var mine = Object.keys(state.moods || {}).length;
      var ok = window.confirm(
        "Restore " + days + (days === 1 ? " day" : " days") + " from this file?\n\n" +
        "What's on this device now (" + mine + (mine === 1 ? " day" : " days") + ") will be replaced."
      );
      if (!ok) return;

      var b = blankState();
      for (var k in b) if (!(k in doc)) doc[k] = b[k];
      state = doc;
      state.updatedAt = Date.now();        // this copy is now the current one
      try { store.set("data", JSON.stringify(state)); } catch (e) {}
      queuePush();
      renderAll();
      toast("your year is back");
    };
    reader.onerror = function () { toast("couldn't read that file"); };
    reader.readAsText(file);
  });

  /* ---------------------------- reveal ---------------------------- */
  var io = null;
  function revealOnScroll() {
    if (!("IntersectionObserver" in window)) { markRevealed(document); return; }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });
  }
  function markRevealed(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(".reveal"), function (el) {
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  /* ======================================================================
     GO
     ====================================================================== */
  if (PREVIEW) {
    openSite(false, false);          // a look, not an unlock — leaves no trace
  } else if (Date.now() >= REVEAL_AT || store.get("unlocked") === "1") {
    openSite(false, true);
  } else {
    startGate();
  }
})();
