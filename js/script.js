/* ==========================================================================
   script.js — builds the page from js/data.js and makes it interactive.
   You normally DON'T need to edit this file. Edit js/data.js instead.
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Safety net: never leave content hidden
  setTimeout(function () {
    document.querySelectorAll(".reveal").forEach(function (i) { i.classList.add("visible"); });
  }, 1800);

  let observer = null;

  if (typeof SITE === "undefined") {
    document.body.innerHTML = "<p style='padding:2rem'>Could not load js/data.js. Check the file name and that it is saved.</p>";
    return;
  }

  /* ---------- Helpers ---------- */
  const $ = (id) => document.getElementById(id);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function money(n) { return SITE.menu.currency + n; }
  function safeUrl(url) { return /^https?:\/\//i.test(url || "") ? url : ""; }

  /* ---------- Clean festive placeholders (used until you add photos) ---------- */
  const PALETTES = [
    ["#ff9e2c", "#c2185b"], ["#ffc94a", "#e8590c"], ["#e64980", "#6b0f3a"],
    ["#12b886", "#0b5345"], ["#f59f00", "#9c2b12"], ["#7048e8", "#c2255c"]
  ];
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function toUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }

  // Gradient + rangoli motif + label. No emojis.
  function artUri(label, w, h) {
    w = w || 400; h = h || 300;
    const seed = hash(label || "x");
    const pal = PALETTES[seed % PALETTES.length];
    const cx = w / 2, cy = h / 2 - 12, r = Math.min(w, h) * 0.26;
    let petals = "";
    for (let i = 0; i < 12; i++) {
      petals += '<ellipse cx="' + cx + '" cy="' + (cy - r * 0.62) + '" rx="' + (r * 0.16) + '" ry="' + (r * 0.4) +
        '" fill="#fff" opacity=".16" transform="rotate(' + (i * 30) + ' ' + cx + ' ' + cy + ')"/>';
    }
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + pal[0] + '"/>' +
      '<stop offset="1" stop-color="' + pal[1] + '"/></linearGradient>' +
      '<pattern id="p" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="1.4" fill="#fff" opacity=".18"/></pattern></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/><rect width="' + w + '" height="' + h + '" fill="url(#p)"/>' +
      petals +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="2 6"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.3) + '" fill="#fff" opacity=".85"/>' +
      '<text x="' + cx + '" y="' + (h - 22) + '" font-family="Arial, sans-serif" font-size="' + Math.round(w / 34) +
      '" letter-spacing="3" fill="#fff" fill-opacity=".7" text-anchor="middle">PHOTO COMING SOON</text>' +
      '</svg>';
    return toUri(svg);
  }

  // Initials avatar for team members
  function avatarUri(name) {
    const seed = hash(name || "x");
    const pal = PALETTES[seed % PALETTES.length];
    const initials = String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + pal[0] + '"/>' +
      '<stop offset="1" stop-color="' + pal[1] + '"/></linearGradient></defs>' +
      '<rect width="200" height="200" fill="url(#g)"/>' +
      '<circle cx="100" cy="100" r="78" fill="none" stroke="#fff" stroke-opacity=".35" stroke-dasharray="2 6"/>' +
      '<text x="100" y="104" font-family="Georgia, serif" font-size="64" fill="#fff" text-anchor="middle" dominant-baseline="middle">' + esc(initials) + '</text>' +
      '</svg>';
    return toUri(svg);
  }

  // Loads your real photo; without extension it tries .jpg .jpeg .png .webp.
  function setPhoto(img, src, fallbackUri) {
    const exts = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
    const hasExt = /\.[a-z0-9]{3,4}$/i.test(src || "");
    img._tries = !src ? [] : hasExt ? [src] : exts.map((e) => src + "." + e);
    img._i = 0;
    img._fb = fallbackUri;
    if (!img._wired) {
      img._wired = true;
      img.addEventListener("error", function () {
        img._i++;
        img.src = img._i < img._tries.length ? img._tries[img._i] : img._fb;
      });
    }
    img.src = img._tries.length ? img._tries[0] : fallbackUri;
  }

  function mediaBox(src, alt, fallbackUri) {
    const box = el("div", "media");
    const img = document.createElement("img");
    img.alt = alt || "";
    img.loading = "lazy";
    setPhoto(img, src, fallbackUri);
    box.appendChild(img);
    return box;
  }

  // Clean line icons (SVG) instead of emojis
  const ICONS = {
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 13v4M8 21h8M9 17h6"/>'
  };
  function icon(name) {
    const s = el("span", "ico");
    s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
    return s;
  }

  function infoRow(iconName, label, valueNode) {
    const li = el("li");
    li.appendChild(icon(iconName));
    const wrap = el("div");
    wrap.appendChild(el("small", "", label));
    wrap.appendChild(valueNode);
    li.appendChild(wrap);
    return li;
  }
  function textOrPending(value, pendingText) {
    return value ? el("span", "", value) : el("span", "pending", pendingText);
  }

  /* ---------- Basic text ---------- */
  document.title = SITE.stallName + " — " + SITE.tagline;
  $("brandName").textContent = SITE.stallName;
  $("heroTitle").textContent = SITE.stallName;
  $("heroTagline").textContent = SITE.tagline;
  $("heroWelcome").textContent = SITE.welcome;
  $("heroEvent").textContent = SITE.event.name || "";
  $("footerBrand").textContent = SITE.stallName;
  $("footerVenue").textContent = [SITE.event.venue, SITE.event.date].filter(Boolean).join("  ·  ");
  $("footerNote").textContent = SITE.footerNote || "";

  if (SITE.heroImage) {
    const probe = new Image();
    probe.onload = function () {
      const bg = $("heroBg");
      bg.style.setProperty("--hero-photo", 'url("' + SITE.heroImage + '")');
      bg.classList.add("has-photo");
    };
    probe.src = SITE.heroImage;
  }
  // Round hero photo (falls back to a festive placeholder)
  const heroImg = document.createElement("img");
  heroImg.alt = "";
  setPhoto(heroImg, SITE.heroPlate, artUri(SITE.stallName, 400, 400));
  $("heroPhoto").appendChild(heroImg);

  /* ---------- Countdown ---------- */


  /* ---------- Ticker ---------- */
  const tickerWords = [SITE.event.date, "Fresh street food", "Games & prizes", "Zero single-use plastic", SITE.event.venue, "Festive vibes"].filter(Boolean);
  const track = $("ticker");
  for (let k = 0; k < 2; k++) tickerWords.forEach((w) => { track.appendChild(el("span", "", w)); track.appendChild(el("i", "dot")); });

  /* ---------- About ---------- */
  $("aboutTitle").textContent = SITE.about.title;
  $("aboutStory").textContent = SITE.about.story;
  SITE.about.highlights.forEach((h, i) => {
    const box = el("div", "highlight reveal");
    box.style.setProperty("--d", i * 80 + "ms");
    const pic = el("div", "hl-pic");
    const img = document.createElement("img");
    img.alt = ""; img.loading = "lazy";
    setPhoto(img, h.image, artUri(h.title, 300, 300));
    pic.appendChild(img);
    box.appendChild(pic);
    box.appendChild(el("h3", "", h.title));
    box.appendChild(el("p", "", h.text));
    $("aboutHighlights").appendChild(box);
  });

  /* ---------- Vision & Mission ---------- */
  $("visionText").textContent = SITE.vision || "";
  (SITE.mission || []).forEach((m) => $("missionList").appendChild(el("li", "", m)));

  /* ---------- Sustainability ---------- */
  

  /* ---------- Menu ---------- */
  function menuCard(item) {
    const card = el("article", "card reveal" + (item.available === false ? " unavailable" : ""));
    card.appendChild(mediaBox(item.image, item.name, artUri(item.name)));
    const body = el("div", "card-body");
    const top = el("div", "card-top");
    top.appendChild(el("h3", "", item.name));
    top.appendChild(el("span", "price", money(item.price)));
    body.appendChild(top);
    body.appendChild(el("p", "", item.description));
    const badges = el("div", "badges");
    if (item.veg === true) badges.appendChild(el("span", "badge veg", "Veg"));
    if (item.veg === false) badges.appendChild(el("span", "badge nonveg", "Non-veg"));
    if (item.popular) badges.appendChild(el("span", "badge popular", "Popular"));
    if (item.available === false) badges.appendChild(el("span", "badge sold", "Sold out"));
    body.appendChild(badges);
    card.appendChild(body);
    addTilt(card);
    return card;
  }

  // Gentle 3D tilt on hover (desktop only)
  function addTilt(card) {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "translateY(-6px) rotateX(" + (-y * 6).toFixed(2) + "deg) rotateY(" + (x * 6).toFixed(2) + "deg)";
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  }

  const menuGrid = $("menuGrid");
  const filtersBox = $("menuFilters");
  const searchBox = $("menuSearch");
  let activeCategory = "all";

  function renderMenu() {
    menuGrid.innerHTML = "";
    const q = (searchBox.value || "").trim().toLowerCase();
    const items = SITE.menu.items.filter((i) =>
      (activeCategory === "all" || i.category === activeCategory) &&
      (!q || (i.name + " " + i.description).toLowerCase().includes(q)));
    if (!items.length) menuGrid.appendChild(el("p", "empty-note", "Nothing here yet — check back soon!"));
    items.forEach((i) => menuGrid.appendChild(menuCard(i)));
    observeReveals();
  }

  function renderFilters() {
    const all = [{ id: "all", label: "All" }].concat(SITE.menu.categories);
    all.forEach((cat) => {
      const count = cat.id === "all" ? SITE.menu.items.length : SITE.menu.items.filter((i) => i.category === cat.id).length;
      const btn = el("button", "filter-btn", cat.label);
      btn.appendChild(el("span", "count", String(count)));
      btn.type = "button";
      btn.setAttribute("aria-pressed", cat.id === activeCategory ? "true" : "false");
      btn.addEventListener("click", () => {
        activeCategory = cat.id;
        filtersBox.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        renderMenu();
      });
      filtersBox.appendChild(btn);
    });
  }
  searchBox.addEventListener("input", renderMenu);

  renderFilters();
  renderMenu();

  const featured = SITE.menu.items.filter((i) => i.popular && i.available !== false);
  if (featured.length) featured.forEach((i) => $("featuredGrid").appendChild(menuCard(i)));
  else $("featured").hidden = true;

  /* ---------- Games ---------- */
  SITE.games.forEach((g) => {
    const card = el("article", "game-card reveal");
    card.appendChild(mediaBox(g.image, g.name, artUri(g.name)));
    const body = el("div", "game-body");
    body.appendChild(el("h3", "", g.name));
    body.appendChild(el("p", "", g.description));
    if (g.rules && g.rules.length) {
      body.appendChild(el("h4", "", "Rules"));
      const ul = el("ul");
      g.rules.forEach((r) => ul.appendChild(el("li", "", r)));
      body.appendChild(ul);
    }
    if (g.howToJoin) {
      body.appendChild(el("h4", "", "How to join"));
      body.appendChild(el("p", "", g.howToJoin));
    }
    if (g.prize) {
      const p = el("span", "prize");
      p.appendChild(icon("trophy"));
      p.appendChild(document.createTextNode(g.prize));
      body.appendChild(p);
    }
    card.appendChild(body);
    $("gamesGrid").appendChild(card);
  });

  /* ---------- Venue & contact ---------- */
  const ev = SITE.event;
  $("venueEvent").textContent = ev.name;
  const vl = $("venueList");
  vl.appendChild(infoRow("pin", "Venue", textOrPending(ev.venue, "Venue coming soon")));
  vl.appendChild(infoRow("home", "Address", textOrPending(ev.address, "Address coming soon")));
  if (ev.stallNumber) vl.appendChild(infoRow("tag", "Stall", el("span", "", ev.stallNumber)));
  vl.appendChild(infoRow("cal", "Date", textOrPending(ev.date, "Date coming soon")));
  vl.appendChild(infoRow("clock", "Timings", textOrPending(ev.time, "Timings coming soon")));

  const mapUrl = safeUrl(ev.mapUrl);
  if (mapUrl) {
    const a = el("a", "btn btn-primary", "Open in Google Maps");
    a.href = mapUrl; a.target = "_blank"; a.rel = "noopener noreferrer";
    $("venueButtons").appendChild(a);
  } else {
    $("venueButtons").appendChild(el("span", "pending", "Map link coming soon"));
  }

  const c = SITE.contact;
  const cl = $("contactList");
  function linkNode(text, href) { const a = el("a", "", text); a.href = href; return a; }
  cl.appendChild(infoRow("phone", "Phone", c.phone ? linkNode(c.phone, "tel:" + c.phone.replace(/[^\d+]/g, "")) : textOrPending("", "Phone coming soon")));
  if (c.whatsapp) {
    const w = linkNode("Chat on WhatsApp", "https://wa.me/" + c.whatsapp.replace(/\D/g, ""));
    w.target = "_blank"; w.rel = "noopener noreferrer";
    cl.appendChild(infoRow("chat", "WhatsApp", w));
  }
  cl.appendChild(infoRow("mail", "Email", c.email ? linkNode(c.email, "mailto:" + c.email) : textOrPending("", "Email coming soon")));

  const socialBox = $("socialLinks");
  let anySocial = false;
  [["Instagram", SITE.social.instagram], ["Facebook", SITE.social.facebook], ["YouTube", SITE.social.youtube]].forEach(([label, url]) => {
    const safe = safeUrl(url);
    if (!safe) return;
    anySocial = true;
    const a = el("a", "", label);
    a.href = safe; a.target = "_blank"; a.rel = "noopener noreferrer";
    socialBox.appendChild(a);
  });
  if (!anySocial) socialBox.appendChild(el("span", "pending", "Social links coming soon"));

  /* ---------- Team ---------- */
  SITE.team.forEach((group) => {
    const wrap = el("div", "team-group reveal" + (group.lead ? " lead" : ""));
    wrap.appendChild(el("h3", "team-group-title", group.group));
    const row = el("div", "team-row");
    group.members.forEach((m) => {
      const card = el("article", "team-card");
      const avatar = el("div", "avatar");
      const img = document.createElement("img");
      img.alt = "Photo of " + m.name;
      img.loading = "lazy";
      setPhoto(img, m.photo, avatarUri(m.name));
      avatar.appendChild(img);
      card.appendChild(avatar);
      card.appendChild(el("h4", "member-name", m.name));
      card.appendChild(el("p", "role", m.role || group.group));
      row.appendChild(card);
    });
    wrap.appendChild(row);
    $("teamGrid").appendChild(wrap);
  });

  /* ---------- Gallery + lightbox ---------- */


  /* ---------- Mobile navigation ---------- */
  const navToggle = $("navToggle");
  const navLinks = $("navLinks");
  function setNav(open) {
    navLinks.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  navToggle.addEventListener("click", () => setNav(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- Scroll: progress bar, header, back-to-top, active link ---------- */
  const toTop = $("toTop");
  const header = document.querySelector(".site-header");
  const progress = $("scrollProgress");
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const links = Array.from(navLinks.querySelectorAll("a"));
  const alias = { featured: "home", vision: "about", eco: "menu" };
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    header.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
    let current = "home";
    sections.forEach((s) => { if (y + 120 >= s.offsetTop) current = s.id; });
    current = alias[current] || current;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-reveal ---------- */
  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("visible")); return; }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); }
        });
      }, { threshold: 0.05 });
    }
    items.forEach((i) => observer.observe(i));
  }
  observeReveals();
})();
