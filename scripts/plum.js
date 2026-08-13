// Generative fractal-branch backdrop, ported from antfu's ArtPlum sketch.
// Plain Canvas2D, no dependencies. Draws once per load and on resize.

(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const R180 = Math.PI;
  const R90 = Math.PI / 2;
  const R15 = Math.PI / 12;
  const MIN_BRANCH = 30;
  const LEN = 6;
  const random = Math.random;

  const canvas = document.createElement("canvas");
  canvas.className = "plum-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  let width = 0;
  let height = 0;
  let ctx = null;
  let stopped = false;

  const strokeColor = () =>
    document.documentElement.classList.contains("dark")
      ? "rgba(190, 200, 220, 0.16)"
      : "rgba(90, 100, 120, 0.20)";

  function polar2cart(x, y, r, theta) {
    return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
  }

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
  }

  function step(x, y, rad, counter, push) {
    const length = random() * LEN;
    counter.value += 1;
    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

    // Branch eagerly at first, then taper off so the canvas stays airy.
    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;
    if (random() < rate) push(() => step(nx, ny, rad + random() * R15, counter, push));
    if (random() < rate) push(() => step(nx, ny, rad - random() * R15, counter, push));
  }

  const randomMiddle = () => random() * 0.6 + 0.2;

  function start() {
    stopped = true;
    requestAnimationFrame(() => {
      stopped = false;
      ctx.strokeStyle = strokeColor();
      ctx.clearRect(0, 0, width, height);

      let steps = [];
      const push = (fn) => steps.push(fn);

      // One seed creeping in from each edge.
      step(randomMiddle() * width, -5, R90, { value: 0 }, push);
      step(randomMiddle() * width, height + 5, -R90, { value: 0 }, push);
      step(-5, randomMiddle() * height, 0, { value: 0 }, push);
      step(width + 5, randomMiddle() * height, R180, { value: 0 }, push);

      // Drain the queue at ~25fps, deferring half the work each frame so the
      // branches grow at an organic, uneven pace.
      const interval = 1000 / 25;
      let lastTime = performance.now();

      const frame = () => {
        if (stopped) return;
        if (performance.now() - lastTime < interval) {
          requestAnimationFrame(frame);
          return;
        }
        lastTime = performance.now();

        const pending = steps;
        steps = [];
        pending.forEach((fn) => {
          if (random() < 0.5) steps.push(fn);
          else fn();
        });

        if (steps.length) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initCanvas();
      start();
    }, 200);
  });

  window.addEventListener("schemechange", () => {
    if (!ctx) return;
    ctx.strokeStyle = strokeColor();
    start();
  });

  initCanvas();
  start();
})();
