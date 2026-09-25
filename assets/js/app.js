/* ==========================================================================
   for nann wai — the engine
   You do NOT need to edit this file. All the words live in content.js.

   Useful web addresses for you (not for her):
     ?preview   → skip the countdown and see the finished site right now
     ?reset     → forget which envelopes were opened, and re-lock the gate
     ?theme=rose → preview any theme without editing content.js
   ========================================================================== */
(function () {
  "use strict";

  var C = window.CONTENT || (typeof CONTENT !== "undefined" ? CONTENT : null);
  if (!C) { document.body.innerHTML = "<p style='padding:2rem'>content.js did not load.</p>"; return; }

  var $  = function (id) { return document.getElementById(id); };
  var qs = new URLSearchParams(location.search);
  var PREVIEW = qs.has("preview");

  /* ---------- tiny safe storage (never throws, even in private mode) ---- */
  var store = {
    get: function (k) { try { return localStorage.getItem("nannwai:" + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem("nannwai:" + k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem("nannwai:" + k); } catch (e) {} }
  };

  if (qs.has("reset")) {
    try {
      Object.keys(localStorage)
        .filter(function (k) { return k.indexOf("nannwai:") === 0; })
        .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  /* ======================================================================
     TIME — everything is measured in her timezone, not the visitor's,
     so the site opens at midnight in Japan no matter where it's opened.
     ====================================================================== */
  var TZ = C.timezone || "Asia/Tokyo";

  // How far the named timezone is from UTC at a given moment.
  function tzOffset(utcMs) {
    try {
      var f = new Intl.DateTimeFormat("en-US", {
        timeZone: TZ, hour12: false,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      var p = {};
      f.formatToParts(new Date(utcMs)).forEach(function (x) { p[x.type] = x.value; });
      var h = parseInt(p.hour, 10) % 24;
      return Date.UTC(+p.year, +p.month - 1, +p.day, h, +p.minute, +p.second) - utcMs;
    } catch (e) {
      return 9 * 3600 * 1000; // fall back to JST
    }
  }

  // Midnight of a given date in her timezone, as a real UTC timestamp.
  function midnightThere(y, m, d) {
    var guess = Date.UTC(y, m - 1, d, 0, 0, 0);
    var t = guess - tzOffset(guess);
    return guess - tzOffset(t); // second pass handles daylight-saving edges
  }

  function yearThere(utcMs) {
    return new Date(utcMs + tzOffset(utcMs)).getUTCFullYear();
  }

  var BD = C.birthday || { month: 9, day: 28 };
  var DAY_MS = 86400000;

  // The next (or currently running) birthday window.
  function window_(now) {
    var y = yearThere(now);
    var start = midnightThere(y, BD.month, BD.day);
    if (now >= start + DAY_MS) { y += 1; start = midnightThere(y, BD.month, BD.day); }
    return { start: start, end: start + DAY_MS, year: y };
  }

  /* ======================================================================
     THEME
     ====================================================================== */
  var THEMES = [
    { id: "blush",    label: "baby pink", swatch: "#f7a8c4" },
    { id: "sky",      label: "baby blue", swatch: "#8fcaf0" },
    { id: "lavender", label: "lavender",  swatch: "#c0a6ef" },
    { id: "mint",     label: "mint",      swatch: "#8fd9be" },
    { id: "butter",   label: "butter",    swatch: "#f5cf82" },
    { id: "cherry",   label: "cherry",    swatch: "#f09a92" },
    { id: "midnight", label: "midnight",  swatch: "#f291b8" }
  ];

  var BG = { blush: "#fff6f9", sky: "#f4faff", lavender: "#faf7ff", mint: "#f3fcf8",
             butter: "#fffbf1", cherry: "#fff8f6", midnight: "#14121f" };

  function validTheme(t) {
    return THEMES.some(function (x) { return x.id === t; }) ? t : null;
  }

  function applyTheme(t, remember) {
    t = validTheme(t) || "blush";
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", BG[t] || "#fff6f9");
    if (remember) store.set("theme", t);
    Array.prototype.forEach.call(document.querySelectorAll(".theme-opt"), function (b) {
      b.setAttribute("aria-current", b.dataset.theme === t ? "true" : "false");
    });
  }

  applyTheme(validTheme(qs.get("theme")) || store.get("theme") || C.theme, false);

  function buildThemePicker() {
    var list = $("theme-list"), toggle = $("theme-toggle");
    if (!list || !toggle) return;

    list.innerHTML = THEMES.map(function (t) {
      return '<button class="theme-opt" data-theme="' + t.id + '">' +
             '<i style="background:' + t.swatch + '"></i>' + t.label + "</button>";
    }).join("");

    list.addEventListener("click", function (e) {
      var b = e.target.closest(".theme-opt");
      if (!b) return;
      applyTheme(b.dataset.theme, true);
    });

    toggle.addEventListener("click", function () {
      var open = list.hidden;
      list.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", function (e) {
      if (!list.hidden && !e.target.closest(".theme-bar")) {
        list.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    applyTheme(document.documentElement.getAttribute("data-theme"), false);
  }

  /* ======================================================================
     SMALL HELPERS
     ====================================================================== */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function paras(arr) {
    return (arr || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }

  function setText(id, value) {
    var el = $(id);
    if (el) el.textContent = value || "";
  }

  function prettyDate(ms) {
    try {
      return new Date(ms).toLocaleDateString("en-GB",
        { day: "numeric", month: "short", year: "numeric" });
    } catch (e) { return ""; }
  }

  /* ======================================================================
     THE GATE  (countdown before her birthday)
     ====================================================================== */
  var timer = null;

  function startGate() {
    var gate = $("gate");
    gate.hidden = false;
    document.body.classList.add("locked");

    setText("gate-eyebrow", (C.gate && C.gate.eyebrow) || "something is waiting for");
    setText("gate-name", C.name || "");
    setText("gate-note", (C.gate && C.gate.note) || "");
    setText("gate-sign", (C.gate && C.gate.signature) || "");

    function tick() {
      var now = Date.now();
      var w = window_(now);

      if (now >= w.start) { openSite(true); return; }

      var left = w.start - now;
      var d = Math.floor(left / DAY_MS);
      var h = Math.floor(left / 3600000) % 24;
      var m = Math.floor(left / 60000) % 60;
      var s = Math.floor(left / 1000) % 60;
      var pad = function (n) { return n < 10 ? "0" + n : String(n); };

      setText("cd-days", String(d));
      setText("cd-hours", pad(h));
      setText("cd-mins", pad(m));
      setText("cd-secs", pad(s));
    }

    tick();
    timer = setInterval(tick, 1000);
  }

  function openSite(animate) {
    if (timer) { clearInterval(timer); timer = null; }
    var gate = $("gate");
    var site = $("site");

    store.set("unlocked", "1");
    document.body.classList.remove("locked");

    if (gate && !gate.hidden && animate) {
      gate.style.transition = "opacity 1.4s ease";
      gate.style.opacity = "0";
      setTimeout(function () { gate.hidden = true; gate.style.opacity = ""; }, 1400);
    } else if (gate) {
      gate.hidden = true;
    }

    site.hidden = false;
    render();
  }

  /* ======================================================================
     RENDER THE SITE
     ====================================================================== */
  function render() {
    buildThemePicker();

    /* ---- hero ---- */
    var hero = C.hero || {};
    setText("hero-eyebrow", hero.eyebrow);
    setText("hero-title", hero.title || C.name);
    setText("hero-sub", hero.subtitle);
    $("hero-body").innerHTML = paras(hero.body);

    var nav = [
      { href: "#videos",   label: "video",     on: (C.videos || []).length },
      { href: "#letters",  label: "letters",   on: (C.letters || []).length },
      { href: "#openwhen", label: "open when", on: (C.openWhen || []).length },
      { href: "#photos",   label: "photos",    on: true },
      { href: "#music",    label: "music",     on: (C.music || []).length }
    ].filter(function (x) { return x.on; });
    $("hero-nav").innerHTML = nav.map(function (n) {
      return '<a href="' + n.href + '">' + esc(n.label) + "</a>";
    }).join("");

    /* ---- videos ---- */
    setText("videos-title", C.videosTitle);
    setText("videos-lede", C.videosLede);
    renderVideos();

    /* ---- letters ---- */
    setText("letters-title", C.lettersTitle);
    setText("letters-lede", C.lettersLede);
    var lg = $("letter-grid");
    lg.innerHTML = (C.letters || []).map(function (l, i) {
      return '<button class="letter-card" data-letter="' + i + '">' +
        '<p class="lc-from">' + esc(l.from) + "</p>" +
        '<p class="lc-role">' + esc(l.role || "") + "</p>" +
        '<p class="lc-preview' + (l.lang === "my" ? " is-my" : "") + '">' + esc(l.preview || (l.body || [])[0] || "") + "</p>" +
        '<span class="lc-open">read it &rarr;</span>' +
      "</button>";
    }).join("");
    lg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-letter]");
      if (!b) return;
      var l = C.letters[+b.dataset.letter];
      openReader({
        eyebrow: l.eyebrow || ("a letter from " + (l.from || "")),
        title: l.from || "",
        body: l.body,
        signature: l.signature || l.from,
        lang: l.lang,
        photos: l.photos,
        youtubeId: l.youtubeId,
        file: l.file
      });
    });

    /* ---- open when ---- */
    setText("ow-title", C.openWhenTitle);
    setText("ow-lede", C.openWhenLede);
    setText("ow-foot", C.openWhenFoot);
    var eg = $("env-grid");
    eg.innerHTML = (C.openWhen || []).map(function (o, i) {
      var when = store.get("ow:" + o.id);
      return '<button class="env' + (when ? " opened" : "") + '" data-env="' + i + '">' +
        '<span class="env-seal" aria-hidden="true">' + (when ? "&#9825;" : "&#10084;") + "</span>" +
        '<p class="env-title">open when<br>' + esc(o.title) + "</p>" +
        '<span class="env-status">' + (when ? "opened " + esc(prettyDate(+when)) : "sealed") + "</span>" +
      "</button>";
    }).join("");
    eg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-env]");
      if (!b) return;
      var o = C.openWhen[+b.dataset.env];
      var key = "ow:" + o.id;
      var when = store.get(key);
      if (!when) {
        when = String(Date.now());
        store.set(key, when);
        b.classList.add("opened");
        b.querySelector(".env-seal").innerHTML = "&#9825;";
        b.querySelector(".env-status").textContent = "opened " + prettyDate(+when);
      }
      openReader({
        eyebrow: "open when",
        title: o.title,
        body: o.body,
        signature: o.signature,
        lang: o.lang,
        photos: o.photos,
        youtubeId: o.youtubeId,
        file: o.file,
        meta: "you first opened this on " + prettyDate(+when)
      });
    });

    /* ---- photos ---- */
    setText("photos-title", C.photosTitle);
    setText("photos-lede", C.photosLede);
    renderPhotos();

    /* ---- music ---- */
    setText("music-title", C.musicTitle);
    setText("music-lede", C.musicLede);
    renderMusic();

    /* ---- closing + footer ---- */
    var cl = C.closing || {};
    setText("closing-title", cl.title);
    $("closing-body").innerHTML = paras(cl.body);
    setText("closing-sign", cl.signature);
    setText("footer-made", C.footerMade);

    var w = window_(Date.now());
    var days = Math.ceil((w.start - Date.now()) / DAY_MS);
    setText("footer-next", days <= 0
      ? "today. right now. happy birthday."
      : "next birthday in " + days + (days === 1 ? " day" : " days"));

    revealOnScroll();
  }

  /* ---------------------------- photos ---------------------------- */
  var photos = [];

  function renderPhotos() {
    photos = (C.photos || []).filter(function (p) { return p && p.src; });
    var grid = $("photo-grid");
    var html = photos.map(function (p, i) {
      return '<button class="photo reveal" data-photo="' + i + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "a photo of us") + '" loading="lazy">' +
        (p.caption ? '<span class="photo-cap">' + esc(p.caption) + "</span>" : "") +
      "</button>";
    }).join("");

    var blanks = photos.length ? 0 : Math.max(0, C.emptySlots || 0);
    for (var i = 0; i < blanks; i++) {
      html += '<div class="photo empty reveal"><span>waiting to be developed</span></div>';
    }

    grid.innerHTML = html;

    // If an image file is missing or misspelled, show a quiet frame
    // instead of a broken-image icon.
    Array.prototype.forEach.call(grid.querySelectorAll("img"), function (img) {
      img.addEventListener("error", function () {
        var card = img.closest(".photo");
        card.classList.add("empty");
        card.removeAttribute("data-photo");
        card.innerHTML = "<span>waiting to be developed</span>";
      });
    });

    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-photo]");
      if (b) openLightbox(+b.dataset.photo);
    });
  }

  /* ---------------------------- videos ---------------------------- */
  function renderVideos() {
    var grid = $("video-grid");
    if (!grid) return;

    grid.innerHTML = (C.videos || []).map(function (v, i) {
      var inner;
      if (v.youtubeId || v.file) {
        inner = '<button class="video-frame" data-video="' + i + '" aria-label="play ' + esc(v.title) + '">' +
                (v.youtubeId ? '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(v.youtubeId) +
                               '/hqdefault.jpg" alt="" loading="lazy">' : "") +
                '<span class="video-play" aria-hidden="true">&#9654;</span></button>';
      } else {
        inner = '<div class="video-frame empty"><span>video coming soon</span></div>';
      }
      return '<div class="video-card reveal" id="video-' + i + '">' + inner +
        '<div class="video-meta">' +
          '<p class="video-title">' + esc(v.title) + "</p>" +
          (v.note ? '<p class="video-note">' + esc(v.note) + "</p>" : "") +
        "</div></div>";
    }).join("");

    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-video]");
      if (!b) return;
      var v = C.videos[+b.dataset.video];
      if (v.youtubeId) {
        b.outerHTML = '<div class="video-frame"><iframe ' +
          'src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtubeId) + '?autoplay=1&rel=0" ' +
          'title="' + esc(v.title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
          'allowfullscreen></iframe></div>';
      } else if (v.file) {
        b.outerHTML = '<div class="video-frame"><video src="' + esc(v.file) +
          '" controls autoplay playsinline></video></div>';
      }
    });
  }

  /* ---------------------------- music ---------------------------- */
  function renderMusic() {
    var list = $("track-list");
    list.innerHTML = (C.music || []).map(function (t, i) {
      return '<div class="reveal" id="track-' + i + '">' +
        '<button class="track" data-track="' + i + '">' +
          '<span class="track-play" aria-hidden="true">&#9654;</span>' +
          '<span class="track-meta">' +
            '<span class="track-title">' + esc(t.title) + "</span>" +
            '<span class="track-artist">' + esc(t.artist || "") + "</span>" +
          "</span>" +
        "</button></div>";
    }).join("");

    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-track]");
      if (!b) return;
      var t = C.music[+b.dataset.track];

      // No YouTube id filled in yet → search YouTube instead of breaking.
      if (!t.youtubeId) {
        window.open("https://www.youtube.com/results?search_query=" +
          encodeURIComponent((t.artist || "") + " " + t.title), "_blank", "noopener");
        return;
      }

      var host = $("track-" + b.dataset.track);
      host.innerHTML = '<div class="track-embed"><iframe ' +
        'src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(t.youtubeId) + '?autoplay=1&rel=0" ' +
        'title="' + esc(t.title) + '" allow="autoplay; encrypted-media; picture-in-picture" ' +
        'allowfullscreen loading="lazy"></iframe></div>';
    });
  }

  /* ======================================================================
     READER  (the letter overlay)
     ====================================================================== */
  var lastFocus = null;

  function openReader(o) {
    lastFocus = document.activeElement;
    setText("reader-eyebrow", o.eyebrow);
    setText("reader-title", o.title);
    var rb = $("reader-body");
    rb.innerHTML = paras(o.body);
    rb.className = "reader-body" + (o.lang === "my" ? " is-my" : "");

    var rv = $("reader-video");
    if (o.youtubeId) {
      rv.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' +
        encodeURIComponent(o.youtubeId) + '?rel=0" title="' + esc(o.title || "") +
        '" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    } else if (o.file) {
      rv.innerHTML = '<video src="' + esc(o.file) + '" controls playsinline></video>';
    } else {
      rv.innerHTML = "";
    }

    var rp = $("reader-photos");
    var pics = (o.photos || []).filter(Boolean);
    rp.className = "reader-photos" + (pics.length === 2 ? " two" : "");
    rp.innerHTML = pics.map(function (src) {
      return '<img src="' + esc(src) + '" alt="" loading="lazy">';
    }).join("");
    // a mistyped filename shouldn't leave a broken-image icon in a letter
    Array.prototype.forEach.call(rp.querySelectorAll("img"), function (img) {
      img.addEventListener("error", function () { img.remove(); });
    });
    setText("reader-sign", o.signature ? "— " + o.signature : "");
    setText("reader-meta", o.meta || "");
    $("reader-meta").hidden = !o.meta;
    $("reader").hidden = false;
    document.body.classList.add("locked");
    $("reader-close").focus();
    $("reader").querySelector(".reader-card").scrollTop = 0;
  }

  function closeReader() {
    $("reader").hidden = true;
    document.body.classList.remove("locked");
    if (lastFocus) lastFocus.focus();
  }

  /* ======================================================================
     LIGHTBOX
     ====================================================================== */
  var lbIndex = 0;

  function openLightbox(i) {
    if (!photos.length) return;
    lastFocus = document.activeElement;
    lbIndex = i;
    showPhoto();
    $("lightbox").hidden = false;
    document.body.classList.add("locked");
    $("lb-close").focus();
  }

  function showPhoto() {
    var p = photos[lbIndex];
    $("lb-img").src = p.src;
    $("lb-img").alt = p.caption || "a photo of us";
    setText("lb-cap", p.caption || "");
    var many = photos.length > 1;
    $("lb-prev").hidden = !many;
    $("lb-next").hidden = !many;
  }

  function moveLightbox(step) {
    lbIndex = (lbIndex + step + photos.length) % photos.length;
    showPhoto();
  }

  function closeLightbox() {
    $("lightbox").hidden = true;
    document.body.classList.remove("locked");
    if (lastFocus) lastFocus.focus();
  }

  /* ======================================================================
     SCROLL REVEAL
     ====================================================================== */
  function revealOnScroll() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ======================================================================
     GLOBAL EVENTS
     ====================================================================== */
  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-close]")) {
      if (!$("reader").hidden) closeReader();
      if (!$("lightbox").hidden) closeLightbox();
    }
  });
  $("reader-close").addEventListener("click", closeReader);
  $("lb-close").addEventListener("click", closeLightbox);
  $("lb-prev").addEventListener("click", function () { moveLightbox(-1); });
  $("lb-next").addEventListener("click", function () { moveLightbox(1); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!$("reader").hidden) closeReader();
      else if (!$("lightbox").hidden) closeLightbox();
    }
    if (!$("lightbox").hidden) {
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    }
  });

  // swipe between photos on a phone
  (function () {
    var x0 = null;
    var lb = $("lightbox");
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) moveLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  })();

  /* ======================================================================
     GO
     ====================================================================== */
  var now = Date.now();
  var w = window_(now);
  var alreadyOpened = store.get("unlocked") === "1";
  var itsHerBirthday = now >= w.start && now < w.end;

  if (PREVIEW || alreadyOpened || itsHerBirthday) {
    openSite(false);
  } else {
    startGate();
  }
})();
