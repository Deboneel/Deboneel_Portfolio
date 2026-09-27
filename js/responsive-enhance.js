/*!
 * responsive-enhance.js
 * ---------------------------------------------------------------------------
 * Drop-in responsive layer for the existing portfolio (index.html / css/style.css
 * / js/main.js) — adds behaviour on top of the site without editing those files.
 *
 * WHAT IT DOES
 * 1. Injects one small stylesheet that:
 *    - fills the sizing gap below 380px that the current CSS doesn't cover
 *      (folded phones / cover screens, e.g. Galaxy Z Fold or Flip closed,
 *      small Android phones), so nothing overflows or looks oversized there.
 *    - adds a collapsed "peek" state for the pinned-photo boards (About,
 *      Education, Experience) on phone-width screens.
 * 2. On phone-width screens (≤ 767px — phones, folded/flip devices, small
 *    foldables in portrait) every photo board starts collapsed: you see the
 *    board title and a short peek of the pinned photos underneath, plus a
 *    "+N photos · Tap to view" bar. Tapping it expands that one board in
 *    place; tapping again hides it. Nothing is deleted — every photo is
 *    still there and still opens in the existing lightbox once visible.
 * 3. Tablets, laptops, MacBooks and desktops are left exactly as the current
 *    CSS already renders them (that layout already uses fluid clamp() sizing,
 *    which scales continuously rather than jumping at fixed device widths —
 *    so it already adapts to in-between sizes, e.g. an unfolded foldable
 *    tablet, without needing a rule of its own).
 *
 * HOW TO USE
 * This is plain JS with no build step and no edits to your existing files.
 * Save this file as js/responsive-enhance.js next to js/main.js, then add
 * ONE line near the end of index.html, after the existing script tags:
 *
 *   <script src="js/responsive-enhance.js" defer></script>
 *
 * That single line is the only change needed anywhere else. Everything this
 * file does happens at runtime — your HTML, CSS and other JS stay untouched.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  /* =========================================================================
     1. Stylesheet — appended once, after the site's own css/style.css, so it
        can safely add new rules without needing !important anywhere.
     ========================================================================= */
  var CSS = [
    /* ---- Small-screen gap-fill (below the site's existing 600px step) ---- */
    /* Folded / cover-screen phones, e.g. Galaxy Z Fold or Z Flip closed (~260-300px) */
    "@media (max-width: 300px) {",
    "  :root { --gutter: 12px; }",
    "  .btn { padding: .6em 1em; font-size: .88rem; }",
    "  .hero-tags li { font-size: .78rem; padding: 5px 10px; }",
    "  .board { --ph: 88px; padding: 12px 10px 18px; }",
    "  .board-grid { gap: 22px 10px; }",
    "  .proj-body { padding: 12px 12px 14px; }",
    "}",
    /* Small phones without a dedicated rule today, e.g. iPhone SE / mini (301-380px) */
    "@media (min-width: 301px) and (max-width: 380px) {",
    "  .board { --ph: 104px; }",
    "}",

    /* ---- Collapsible photo boards: phones + folded/flip + small foldables ---- */
    /* Hidden by default; only switched on inside the ≤767px block below, so
       tablets/laptops/MacBooks/desktops render the boards exactly as before. */
    ".re-peek-cta { display: none; }",
    "@media (max-width: 767px) {",
    "  .re-board { position: relative; }",
    "  .re-board .board-grid {",
    "    max-height: clamp(58px, 17vw, 80px);",
    "    overflow: hidden;",
    "    pointer-events: none;",
    "    -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 38%, transparent 96%);",
    "            mask-image: linear-gradient(to bottom, #000 0%, #000 38%, transparent 96%);",
    "    transition: max-height .45s var(--ease, ease);",
    "  }",
    "  .re-board.re-open .board-grid {",
    "    max-height: 240rem;",
    "    pointer-events: auto;",
    "    -webkit-mask-image: none;",
    "            mask-image: none;",
    "  }",
    "  @media (prefers-reduced-motion: reduce) { .re-board .board-grid { transition: none; } }",
    "  .re-peek-cta {",
    "    display: flex; align-items: center; justify-content: center; gap: 6px;",
    "    width: 100%; margin-top: 10px; padding: 10px 14px; min-height: 42px;",
    "    border-radius: 999px; cursor: pointer; -webkit-tap-highlight-color: transparent; user-select: none;",
    "    font-family: var(--f-mono, monospace); font-size: .74rem; font-weight: 500;",
    "    letter-spacing: .04em; text-transform: uppercase; line-height: 1.3; text-align: center;",
    "    color: var(--accent, #0e6a72); background: var(--glass-solid, rgba(255,255,255,.92));",
    "    border: 1px solid var(--line, rgba(0,0,0,.12)); box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,.08));",
    "  }",
    "  .re-peek-cta:active { transform: scale(.98); }",
    "  .re-board.re-open .re-peek-cta { margin-bottom: 6px; }",
    "}",
  ].join("\n");

  var styleEl = document.createElement("style");
  styleEl.id = "re-responsive-styles";
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* =========================================================================
     2. Collapsible photo boards
     ========================================================================= */
  var COMPACT = matchMedia("(max-width: 767px)");
  var reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gridIdSeq = 0;

  function pinCount(grid) {
    return grid.querySelectorAll(".pin").length;
  }

  function enhanceBoard(board) {
    if (board.dataset.reInit) return;
    var grid = board.querySelector(".board-grid");
    if (!grid) return;
    var count = pinCount(grid);
    // one photo alone doesn't need a "tap to view more" affordance
    if (count < 2) { board.dataset.reInit = "1"; return; }
    board.dataset.reInit = "1";
    board.classList.add("re-board");

    if (!grid.id) grid.id = "re-grid-" + (++gridIdSeq);

    var cta = document.createElement("div");
    cta.className = "re-peek-cta";
    cta.setAttribute("role", "button");
    cta.setAttribute("tabindex", "0");
    cta.setAttribute("aria-expanded", "false");
    cta.setAttribute("aria-controls", grid.id);
    board.appendChild(cta);

    function label(open) {
      var n = pinCount(grid); // re-read: a broken image can shrink the count later
      if (open) return "Hide photos \u2191";
      return "+" + n + " photo" + (n === 1 ? "" : "s") + " \u00b7 Tap to view";
    }
    function setOpen(open) {
      board.classList.toggle("re-open", open);
      cta.setAttribute("aria-expanded", String(open));
      cta.textContent = label(open);
    }
    setOpen(false);

    function toggle(e) {
      if (!COMPACT.matches) return; // desktop/tablet: boards are always fully shown, CTA is hidden anyway
      e.preventDefault();
      setOpen(!board.classList.contains("re-open"));
    }
    cta.addEventListener("click", toggle);
    cta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") toggle(e);
    });
  }

  function enhanceAll() {
    var boards = document.querySelectorAll(".boards .board");
    for (var i = 0; i < boards.length; i++) enhanceBoard(boards[i]);
  }

  function init() {
    enhanceAll();

    // Board HTML is built by js/main.js. If that script runs before this one
    // (recommended placement) everything is already in the DOM; this observer
    // is just a safety net for any board added or re-rendered later.
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes && mutations[i].addedNodes.length) { enhanceAll(); return; }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    // Leaving phone width (e.g. unfolding a foldable, rotating, resizing a
    // window) drops any manually-opened board back to collapsed, since the
    // wider layout shows every photo already and the state no longer applies.
    var onCompactChange = function (e) {
      if (e.matches) return;
      var open = document.querySelectorAll(".re-board.re-open");
      for (var i = 0; i < open.length; i++) {
        open[i].classList.remove("re-open");
        var cta = open[i].querySelector(".re-peek-cta");
        if (cta) cta.setAttribute("aria-expanded", "false");
      }
    };
    if (COMPACT.addEventListener) COMPACT.addEventListener("change", onCompactChange);
    else if (COMPACT.addListener) COMPACT.addListener(onCompactChange); // older Safari
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
