/* Renders js/data.js into the page and wires up the small interactions. */
(function () {
  "use strict";
  const S = SITE, P = S.profile;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => Array.from(r.querySelectorAll(q));
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const img = (name) => "images/" + encodeURI(name);
  const thumb = (name) => "images/thumbs/" + encodeURI(name);

  const icons = {
    mail: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    school: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M2.5 9 12 4.5 21.5 9 12 13.5z M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.3 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2s.2-1 .1-1.2l-.5-.3Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="17" height="17"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"/></svg>',
    gh: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.3a3 3 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.5 2.3 5.5 2.6 5.5 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.8 5.6 5.5 6a3 3 0 0 0-.8 2.2V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  /* ---------- Links ---------- */
  const mailto = `mailto:${P.email},${P.academicEmail}?subject=${encodeURIComponent("Hello Deboneel")}`;
  const wa = `https://wa.me/${P.whatsapp}?text=${encodeURIComponent("Hi Deboneel, I saw your portfolio and would like to get in touch.")}`;
  $$(".mail-link").forEach(a => (a.href = mailto));
  $$(".wa-link").forEach(a => (a.href = wa));
  $$(".li-link").forEach(a => (a.href = P.linkedin));
  $$(".tel-link").forEach(a => (a.href = "tel:" + P.phone));
  $$(".cv-link").forEach(a => { a.href = P.resume; a.setAttribute("download", "Deboneel_Kundu_Partho_CV.pdf"); });
  $$("[data-f]").forEach(n => (n.textContent = P[n.dataset.f] || ""));
  $("#portraitImg").src = P.portrait;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Notice boards: photos clipped to a pin board ---------- */
  const groups = {};
  const R = [-2, 1.5, -1, 2, -1.5, 1];
  // miniature realistic push pin, built purely from CSS (see .tack rules in style.css)
  const pushpin = () => `<span class="tack" aria-hidden="true"><span class="tk-needle"></span></span>`;
  const ratio = (src) => (typeof PHOTO_RATIO !== "undefined" && PHOTO_RATIO[src]) || 0.8;
  function board(b, group) {
    if (!b || !b.photos || !b.photos.length) return "";
    groups[group] = b.photos.map(p => ({ src: p.src, caption: p.caption || "" }));
    const pins = b.photos.map((p, i) => `
      <button class="pin" type="button" data-g="${group}" data-i="${i}" style="--r:${R[i % R.length]}deg;--ar:${ratio(p.src)}" aria-label="Open photo: ${esc(p.caption || p.src)}">
        ${pushpin()}
        <img src="${thumb(p.src)}" data-full="${img(p.src)}" alt="${esc(p.caption || "")}" loading="lazy" decoding="async">
        <span class="pin-cap">${esc(p.caption || "")}</span>
      </button>`).join("");
    return `<div class="board${b.land ? " land" : ""}" data-n="${b.photos.length}" style="--n:${b.photos.length}">
      <div class="board-head"><span>${esc(b.title)}</span><small>${finePointer ? "click to enlarge" : "tap to enlarge"}</small></div>
      <div class="board-grid">${pins}</div></div>`;
  }
  const boards = (list, key) => (list || []).map((b, j) => board(b, key + "-" + j)).join("");

  /* ---------- Hero ---------- */
  $("#heroTags").innerHTML = P.focusTags.map(t => `<li>${esc(t)}</li>`).join("");

  /* ---------- About ---------- */
  $("#bio").innerHTML = P.bio.map(p => `<p>${esc(p)}</p>`).join("") +
    `<div class="sign"><span>${esc(P.email)}</span><span>${esc(P.phoneDisplay)}</span><span>${esc(P.location)}</span></div>`;
  $("#personal").innerHTML = board(P.personalBoard, "personal");
  const video = $("#video");
  video.src = P.video;
  video.poster = P.videoPoster;
  video.addEventListener("loadedmetadata", () => { try { video.currentTime = 0; } catch (e) {} });
  video.addEventListener("ended", () => { video.currentTime = 0; });

  $("#focus").innerHTML = S.focus.map((f, i) => `
    <article class="card reveal">
      <span class="num">0${i + 1}</span>
      <h4>${esc(f.title)}</h4>
      <p>${esc(f.text)}</p>
      <div class="tag-row">${f.tools.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </article>`).join("");

  /* ---------- Experience ---------- */
  $("#roles").innerHTML = S.experience.map((r, i) => {
    const now = /present/i.test(r.period);
    return `
    <li class="role reveal">
      <div class="role-when">
        <span class="period">${esc(r.period)}</span>
        <span class="place">${esc(r.place || "")}</span>
        ${now ? '<span class="now">Current</span>' : ""}
      </div>
      <article class="card">
        <h3>${esc(r.role)}</h3>
        <p class="org">${esc(r.org)}</p>
        <ul class="points">${r.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="boards">${boards(r.boards, "exp" + i)}</div>
        <div class="role-foot">
          <div class="tag-row">${r.tags.map(t => `<span class="tag plain">${esc(t)}</span>`).join("")}</div>
          ${r.certificate ? `<a class="link-arrow" href="${encodeURI(r.certificate)}" target="_blank" rel="noopener">Certificate ${icons.arrow}</a>` : ""}
        </div>
      </article>
    </li>`;
  }).join("");

  /* ---------- Projects ---------- */
  $("#projectList").innerHTML = S.projects.map(p => `
    <a class="card proj reveal" href="${p.url}" target="_blank" rel="noopener">
      <div class="proj-img"><img src="${p.image}" alt="${esc(p.title)} cover" loading="lazy" decoding="async" ${p.pos ? `style="object-position:${p.pos}"` : ""}></div>
      <div class="proj-body">
        <span class="kicker">${esc(p.kicker)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="find">${esc(p.finding)}</p>
        <span class="link-arrow">Case study ${icons.arrow}</span>
      </div>
    </a>`).join("");

  /* ---------- Publications ---------- */
  const me = /(Deboneel Kundu Partho)/g;
  $("#pubs").innerHTML = S.publications.map(p => `
    <li class="pub reveal">
      <div class="pub-year"><b>${esc(p.year)}</b></div>
      <div>
        <h3><a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
        <p class="jr"><span>${esc(p.journal)}</span><span class="tag">${esc(p.q)}</span><span class="tag plain">${esc(p.impact)}</span></p>
        <p class="au">${esc(p.authors).replace(me, "<mark>$1</mark>")}</p>
      </div>
      <a class="doi" href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI ↗</a>
    </li>`).join("");
  $("#review").innerHTML = S.underReview.map(r => `
    <li class="reveal"><span class="st">Under review</span><p>${esc(r.title)}${r.note ? `<small>${esc(r.note)}</small>` : ""}</p></li>`).join("");

  /* ---------- Education ---------- */
  $("#edu").innerHTML = S.education.map((e, i) => {
    const hasPhotos = e.boards && e.boards.length;
    return `
    <article class="card degree reveal ${hasPhotos ? "has-photos" : ""}">
      <div>
        <h3>${esc(e.degree)}</h3>
        <p class="school-name">${esc(e.school)}</p>
      </div>
      <span class="when">${e.current ? `<span class="now"><span class="dot"></span>${esc(e.period)}</span>` : esc(e.period)}</span>
      <div class="body">
        <ul class="points">${e.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>
        ${hasPhotos ? `<div class="boards">${boards(e.boards, "edu" + i)}</div>` : ""}
      </div>
    </article>`;
  }).join("");
  $("#school").innerHTML = S.school.map(s => `
    <a class="school-card reveal" href="${encodeURI(s.file)}" target="_blank" rel="noopener">
      <div class="sc-top"><b>${esc(s.name)}</b><span class="gpa">${esc(s.gpa)}</span></div>
      <p class="sc-school">${esc(s.school)}</p>
      <p class="sc-meta">${[s.group, s.board, "Passed " + s.year].filter(Boolean).map(esc).join(" · ")}</p>
      <i>View certificate ↗</i>
    </a>`).join("");

  $("#courses").innerHTML = `<span class="label">Key courses · B.Sc.</span><ul class="course-cloud">` +
    S.coursework.map(c => `<li>${esc(c)}</li>`).join("") + `</ul>`;
  $("#handson").innerHTML = `<span class="label">Practical courses</span><h4>${esc(S.handsOn.title)}</h4><p>${esc(S.handsOn.text)}</p><div class="boards">${boards(S.handsOn.boards, "hands")}</div>`;
  $("#baures").innerHTML = `<div><span class="label">Research community</span><h4>${esc(S.baures.title)}</h4><p>${esc(S.baures.text)}</p></div>${board({ title: S.baures.board, photos: S.baures.photos, land: true }, "baures")}`;

  /* ---------- Skills & certificates ---------- */
  $("#skillList").innerHTML = S.skills.map(g =>
    `<div class="skill"><h4>${esc(g.group)}</h4><ul>${g.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
  $("#certs").innerHTML = S.certificates.map(c => `
    <a class="cert reveal" href="${encodeURI(c.file)}" target="_blank" rel="noopener">
      <div class="cert-img"><img src="${encodeURI(c.thumb)}" alt="" loading="lazy" decoding="async"></div>
      <div class="cert-body"><b>${esc(c.title)}</b><span>${esc(c.by)} · ${esc(c.date)}</span><i>Open PDF ↗</i></div>
    </a>`).join("");

  /* ---------- Next + contact ---------- */
  $("#nextIntro").textContent = S.next.intro;
  $("#nowList").innerHTML = `<div class="card now-card reveal"><span class="label"><span class="dot"></span>Right now</span><ul>` +
    S.next.now.map(n => `<li><b>${esc(n.title)}</b><span>${esc(n.text)}</span></li>`).join("") + `</ul></div>`;
  $("#qIntro").textContent = S.next.questionsIntro;
  $("#nextList").innerHTML = S.next.items.map((n, i) =>
    `<li class="reveal"><span class="n">${i + 1}.</span><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></li>`).join("");
  $("#looking").textContent = "I'm looking for " + S.next.looking.charAt(0).toLowerCase() + S.next.looking.slice(1) + " The fastest way to reach me is email or WhatsApp.";
  const rows = [
    { ico: "mail", label: "Email", text: P.email, href: mailto, copy: P.email },
    { ico: "school", label: "University email", text: P.academicEmail, href: mailto, copy: P.academicEmail },
    { ico: "wa", label: "WhatsApp", text: P.phoneDisplay, href: wa, copy: P.phone, ext: true, cls: "wa" },
    { ico: "phone", label: "Phone", text: P.phoneDisplay, href: "tel:" + P.phone, copy: P.phone },
    { ico: "li", label: "LinkedIn", text: "in/deboneelpartho", href: P.linkedin, ext: true, cls: "li" },
    { ico: "gh", label: "GitHub", text: "deboneel", href: P.github, ext: true },
  ];
  $("#contactList").innerHTML = rows.map(r => `
    <li class="c-row">
      <span class="c-ico ${r.cls ? "brand " + r.cls : ""}" aria-hidden="true">${icons[r.ico]}</span>
      <div class="c-main"><small>${r.label}</small><a href="${r.href}" ${r.ext ? 'target="_blank" rel="noopener"' : ""}>${esc(r.text)}</a></div>
      ${r.copy ? `<button class="copy" type="button" data-copy="${esc(r.copy)}">Copy</button>` : `<a class="copy" href="${r.href}" target="_blank" rel="noopener">Open ↗</a>`}
    </li>`).join("");

  /* ---------- Copy to clipboard ---------- */
  const toast = $("#toast");
  let toastT;
  function say(msg) { toast.textContent = msg; toast.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("show"), 1800); }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const v = b.dataset.copy;
    const done = () => { say("Copied: " + v); b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1600); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, () => fallback(v, done));
    else fallback(v, done);
  });
  function fallback(v, done) {
    const t = document.createElement("textarea"); t.value = v; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) {} t.remove();
  }

  /* ---------- Image fallbacks (missing thumbs / photos) ---------- */
  $$(".pin img").forEach(im => {
    // match the frame to the real photo shape once it loads
    im.addEventListener("load", () => { if (im.naturalWidth) im.closest(".pin").style.setProperty("--ar", (im.naturalWidth / im.naturalHeight).toFixed(3)); });
    im.addEventListener("error", () => {
      if (!im.dataset.tried) { im.dataset.tried = "1"; im.src = im.dataset.full; return; }
      // photo not uploaded yet: remove it quietly
      const b = im.closest(".pin"), bd = b.closest(".board");
      const g = groups[b.dataset.g]; if (g) g[+b.dataset.i] = null;
      b.remove();
      if (!bd.querySelector(".pin")) bd.remove(); else bd.dataset.n = bd.querySelectorAll(".pin").length;
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let cur = null, curI = 0, lastFocus = null;
  function items(g) { return (groups[g] || []).map((p, i) => p && { ...p, i }).filter(Boolean); }
  function show(g, i) {
    const list = items(g); if (!list.length) return;
    curI = (i + list.length) % list.length; cur = g;
    const p = list[curI];
    lbImg.src = img(p.src); lbImg.alt = p.caption;
    lbCap.innerHTML = `${esc(p.caption)}<span>${curI + 1} / ${list.length}</span>`;
    const multi = list.length > 1;
    $("#lbPrev").hidden = !multi; $("#lbNext").hidden = !multi;
  }
  function open(g, i) {
    lastFocus = document.activeElement;
    const list = items(g); const pos = list.findIndex(p => p.i === i);
    show(g, pos < 0 ? 0 : pos);
    lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus();
  }
  function close() { lb.hidden = true; document.body.style.overflow = ""; lbImg.src = ""; lastFocus && lastFocus.focus(); }
  document.addEventListener("click", e => {
    const b = e.target.closest(".pin"); if (b) open(b.dataset.g, +b.dataset.i);
  });
  $("#lbClose").onclick = close;
  $("#lbPrev").onclick = () => show(cur, curI - 1);
  $("#lbNext").onclick = () => show(cur, curI + 1);
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb-fig")) close(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur, curI - 1);
    if (e.key === "ArrowRight") show(cur, curI + 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", e => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 45) show(cur, curI + (dx < 0 ? 1 : -1));
  });

  /* ---------- Theme ---------- */
  const root = document.documentElement, themeBtn = $("#theme"), meta = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.dataset.theme = t;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    meta.setAttribute("content", t === "dark" ? "#0e1412" : "#f3f0e8");
    try { sessionStorage.setItem("theme", t); } catch (e) {}
    window.dispatchEvent(new Event("themechange"));
  }
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
  themeBtn.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  /* ---------- Mobile menu ---------- */
  const sheet = $("#sheet"), menuBtn = $("#menuBtn");
  $(".sheet-in").innerHTML = $$("#nav a").map(a => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
  function setMenu(open) { sheet.hidden = !open; menuBtn.setAttribute("aria-expanded", open); menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  menuBtn.addEventListener("click", () => setMenu(sheet.hidden));
  sheet.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("resize", () => { if (innerWidth > 920 && !sheet.hidden) setMenu(false); });

  /* ---------- Header state, scroll spy, FAB ---------- */
  const bar = $("#bar"), fab = $("#fab"), fabBtn = $("#fabBtn"), fabMenu = $("#fabMenu");
  let heroOut = false, contactIn = false;
  const syncFab = () => { fab.classList.toggle("show", heroOut && !contactIn); if (!(heroOut && !contactIn)) setFab(false); };
  function setFab(o) { fabMenu.hidden = !o; fabBtn.setAttribute("aria-expanded", o); }
  fabBtn.addEventListener("click", e => { e.stopPropagation(); setFab(fabMenu.hidden); });
  document.addEventListener("click", e => { if (!e.target.closest("#fab")) setFab(false); });
  addEventListener("scroll", () => bar.classList.toggle("scrolled", scrollY > 8), { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; syncFab(); }, { rootMargin: "-40% 0px 0px 0px" }).observe($(".hero-cta"));
    new IntersectionObserver(([e]) => { contactIn = e.isIntersecting; syncFab(); }, { threshold: 0.15 }).observe($("#contact"));

    const links = $$("#nav a");
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      let id = e.target.id; if (id === "skills") id = "projects"; if (id === "focus-sec") id = "education"; if (id === "next") id = "contact";
      links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section[id]").forEach(s => spy.observe(s));

    // reveal on scroll, with a gentle stagger for siblings
    $$(".sec-head").forEach(h => h.classList.add("reveal"));
    const rv = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, sibs = Array.from(el.parentElement.children).filter(c => c.classList.contains("reveal"));
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 5) * 0.08 + "s");
      el.classList.add("in"); rv.unobserve(el);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(el => rv.observe(el));

  } else {
    $$(".reveal").forEach(el => el.classList.add("in"));
    fab.classList.add("show");
  }

  /* ---------- Desktop-only depth effects ---------- */
  if (finePointer && !reduced) {
    // portrait tilts gently in 3D with the pointer
    const pt = $("#portrait"), frame = $(".portrait-frame", pt);
    let raf = 0;
    pt.addEventListener("pointermove", e => {
      const r = pt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        frame.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
        frame.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
      });
    });
    pt.addEventListener("pointerleave", () => {
      frame.style.setProperty("--ry", "0deg"); frame.style.setProperty("--rx", "0deg");
    });
    // soft light that follows the pointer inside cards
    let lastCard = null, q = 0;
    document.addEventListener("pointermove", e => {
      const c = e.target.closest && e.target.closest(".card");
      if (!c) return;
      if (q) return;
      q = requestAnimationFrame(() => {
        q = 0; const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (e.clientX - r.left) + "px");
        c.style.setProperty("--my", (e.clientY - r.top) + "px");
        lastCard = c;
      });
    }, { passive: true });
  }
})();
