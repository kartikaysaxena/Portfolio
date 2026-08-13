// Generative fractal-branch backdrop, after antfu's ArtPlum sketch.
// Plain Canvas2D, no dependencies.

(function () {
  const R180 = Math.PI;
  const R90 = Math.PI / 2;
  const R15 = Math.PI / 12;

  // A tree branches eagerly until it has this many segments, then settles to a
  // rate where each branch replaces itself roughly once — a critical process,
  // so past this point a tree may run for a long time or stop almost at once.
  // The threshold is what decides how big a tree gets before that coin flip.
  const MIN_BRANCH = 60;
  const EAGER_RATE = 0.8;
  const SETTLED_RATE = 0.5;
  const LEN = 7;
  const FPS = 40;

  // One seed per this many pixels of edge, and one segment per this many pixels
  // of area. Both scale with the viewport so a phone isn't asked to draw a
  // desktop's worth of branches.
  const PX_PER_SEED = 280;
  const PX_PER_SEGMENT = 23;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const random = Math.random;

  const canvas = document.createElement("canvas");
  canvas.className = "plum-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  let width = 0;
  let height = 0;
  let ctx = null;
  let generation = 0;
  let points = [];
  let maxPoints = 0;

  const strokeColor = () =>
    document.documentElement.classList.contains("dark")
      ? "rgba(198, 208, 228, 0.18)"
      : "rgba(72, 84, 106, 0.26)";

  function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = dpr * width;
    canvas.height = dpr * height;
    ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 1;
    ctx.strokeStyle = strokeColor();

    const budget = Math.round((width * height) / PX_PER_SEGMENT);
    maxPoints = Math.min(Math.max(budget, 8000), 120000) * 4;
  }

  // Re-stroke everything grown so far in the current colour. Lets a theme
  // switch recolour the tree instantly instead of regrowing from a bare canvas.
  function repaint() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = strokeColor();
    ctx.beginPath();
    for (let i = 0; i < points.length; i += 4) {
      ctx.moveTo(points[i], points[i + 1]);
      ctx.lineTo(points[i + 2], points[i + 3]);
    }
    ctx.stroke();
  }

  // Adds to the path currently open on ctx; the caller strokes once per frame.
  function step(x, y, rad, counter, push) {
    if (points.length >= maxPoints) return;

    counter.value += 1;
    const length = random() * LEN;
    const nx = x + length * Math.cos(rad);
    const ny = y + length * Math.sin(rad);

    points.push(x, y, nx, ny);
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);

    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

    const rate = counter.value <= MIN_BRANCH ? EAGER_RATE : SETTLED_RATE;
    if (random() < rate)
      push(() => step(nx, ny, rad + random() * R15, counter, push));
    if (random() < rate)
      push(() => step(nx, ny, rad - random() * R15, counter, push));
  }

  // Entry points spread around the whole frame rather than one per edge, so a
  // wide viewport fills in instead of leaving the middle bare. Positions are
  // jittered within their slot to avoid an obviously even spacing.
  function seeds() {
    const spread = (count) =>
      Array.from(
        { length: count },
        (_, i) => (i + 0.5 + (random() - 0.5) * 0.7) / count
      );

    const cols = Math.max(2, Math.round(width / PX_PER_SEED));
    const rows = Math.max(1, Math.round(height / PX_PER_SEED));
    const list = [];

    spread(cols).forEach((t) => list.push([t * width, -5, R90]));
    spread(cols).forEach((t) => list.push([t * width, height + 5, -R90]));
    spread(rows).forEach((t) => list.push([-5, t * height, 0]));
    spread(rows).forEach((t) => list.push([width + 5, t * height, R180]));

    return list;
  }

  function start() {
    const run = ++generation;
    points = [];

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = strokeColor();

    let queue = [];
    const push = (fn) => queue.push(fn);

    ctx.beginPath();
    seeds().forEach(([x, y, rad]) => step(x, y, rad, { value: 0 }, push));
    ctx.stroke();

    if (reduced) {
      while (queue.length && points.length < maxPoints) {
        const pending = queue;
        queue = [];
        ctx.beginPath();
        pending.forEach((fn) => fn());
        ctx.stroke();
      }
      return;
    }

    const interval = 1000 / FPS;
    let last = performance.now();

    const frame = () => {
      if (run !== generation) return;
      if (performance.now() - last < interval) {
        requestAnimationFrame(frame);
        return;
      }
      last = performance.now();

      const pending = queue;
      queue = [];

      // Deferring half the queue to a later frame keeps growth uneven, so
      // branches creep rather than expanding as a uniform front.
      ctx.beginPath();
      pending.forEach((fn) => {
        if (random() < 0.5) queue.push(fn);
        else fn();
      });
      ctx.stroke();

      if (queue.length && points.length < maxPoints)
        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initCanvas();
      start();
    }, 200);
  });

  window.addEventListener("schemechange", repaint);

  initCanvas();
  start();
})();
