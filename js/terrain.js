/* Hero background: a slowly drifting 3D terrain mesh with a river valley,
   drawn on a 2D canvas (no libraries). It turns a little as you scroll. Pauses when the tab is hidden, uses a lighter mesh
   on small screens, and draws one still frame for reduced-motion users. */
(function () {
  "use strict";
  const c = document.getElementById("terrain");
  if (!c || !c.getContext) return;
  const ctx = c.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // --- value noise ---
  const p = new Uint8Array(512);
  (function () { const a = []; for (let i = 0; i < 256; i++) a[i] = i; let s = 7;
    for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    for (let i = 0; i < 512; i++) p[i] = a[i & 255]; })();
  const fade = t => t * t * (3 - 2 * t);
  const rnd = (x, y) => p[p[x & 255] + (y & 255)] / 255;
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const a = rnd(xi, yi), b = rnd(xi + 1, yi), c2 = rnd(xi, yi + 1), d = rnd(xi + 1, yi + 1);
    const u = fade(xf), v = fade(yf);
    return a + (b - a) * u + (c2 - a) * v + (a - b - c2 + d) * u * v;
  }
  const fbm = (x, y) => noise(x, y) * .6 + noise(x * 2.1, y * 2.1) * .28 + noise(x * 4.3, y * 4.3) * .12;

  let W = 0, H = 0, cols = 50, rows = 32, t = 0, last = 0, running = false, prog = 0, tprog = 0, top = 0, ttop = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0, A = "14,106,114", B = "21,32,28";
  let pts = new Float32Array(0), hs = new Float32Array(0);

  function colours() {
    const cs = getComputedStyle(document.documentElement);
    A = cs.getPropertyValue("--terrain").trim() || A;
    B = cs.getPropertyValue("--terrain-2").trim() || B;
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = c.clientWidth; H = c.clientHeight;
    if (!W || !H) return;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const small = W < 860;
    cols = small ? 30 : 54; rows = small ? 22 : 34;
    pts = new Float32Array(cols * rows * 2); hs = new Float32Array(cols * rows);
    draw();
  }

  function draw() {
    if (!W) return;
    const small = W < 860;
    ctx.clearRect(0, 0, W, H);
    const yaw = -0.55 + top * 0.5 + mx * 0.22 + Math.sin(t * 0.05) * 0.06;
    const pitch = 0.98 - prog * 0.18 + my * 0.08;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cx0 = small ? W * 0.5 : W * 0.66, cy0 = small ? H * 0.78 : H * 0.6;
    const scale = small ? W * 0.95 : Math.min(W * 0.62, H * 1.25);
    const dist = 3.1, amp = 0.42;

    for (let j = 0; j < rows; j++) {
      const v = j / (rows - 1);
      for (let i = 0; i < cols; i++) {
        const u = i / (cols - 1);
        const n = fbm(u * 3.1 + t * 0.035, v * 3.1 - t * 0.02);
        const rc = 0.5 + 0.17 * Math.sin(v * 5.2 + 1.3) + 0.05 * Math.sin(v * 11 + t * 0.05);
        const d = u - rc;
        const valley = Math.exp(-(d * d) / 0.005);
        const h = n - valley * 0.5;
        const X = (u - 0.5) * 3.2, Z = (v - 0.5) * 2.4, Y = (h - 0.35) * amp * 2;
        const x1 = X * cy - Z * sy, z1 = X * sy + Z * cy;
        const y2 = Y * cp - z1 * sp, z2 = Y * sp + z1 * cp;
        const f = scale / (z2 + dist);
        const k = j * cols + i;
        pts[k * 2] = cx0 + x1 * f; pts[k * 2 + 1] = cy0 - y2 * f;
        hs[k] = h;
      }
    }

    // two passes: far half lighter, near half stronger; water (low) in accent colour
    const water = 0.18;
    for (let band = 0; band < 2; band++) {
      const j0 = band ? Math.floor(rows / 2) : 0, j1 = band ? rows : Math.floor(rows / 2) + 1;
      const land = new Path2D(), wet = new Path2D();
      for (let j = j0; j < j1; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i, x = pts[k * 2], y = pts[k * 2 + 1];
          if (i < cols - 1) { const k2 = k + 1; const path = (hs[k] + hs[k2]) / 2 < water ? wet : land; path.moveTo(x, y); path.lineTo(pts[k2 * 2], pts[k2 * 2 + 1]); }
          if (j < j1 - 1) { const k2 = k + cols; const path = (hs[k] + hs[k2]) / 2 < water ? wet : land; path.moveTo(x, y); path.lineTo(pts[k2 * 2], pts[k2 * 2 + 1]); }
        }
      }
      ctx.lineWidth = band ? 0.9 : 0.7;
      ctx.strokeStyle = `rgba(${B},${band ? 0.2 : 0.1})`; ctx.stroke(land);
      ctx.lineWidth = band ? 1.3 : 1;
      ctx.strokeStyle = `rgba(${A},${band ? 0.75 : 0.4})`; ctx.stroke(wet);
    }
  }

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (now - last < (W < 860 ? 42 : 33)) return; // 24–30 fps is plenty
    const dt = Math.min(0.1, (now - last) / 1000 || 0.016); last = now;
    t += dt * 2;
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    prog += (tprog - prog) * 0.06; top += (ttop - top) * 0.06;
    draw();
  }
  let onScreen = true;
  function start() { if (running || reduced || !onScreen || document.hidden) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
  function stop() { running = false; }

  colours(); resize();
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
  addEventListener("themechange", () => { colours(); draw(); });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    tprog = max > 0 ? scrollY / max : 0;
    ttop = Math.min(1, scrollY / innerHeight);
    if (reduced) { prog = tprog; top = ttop; draw(); }
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll(); prog = tprog; top = ttop;
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); }).observe(c);
  if (fine) addEventListener("pointermove", e => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; }, { passive: true });
  start();
})();
