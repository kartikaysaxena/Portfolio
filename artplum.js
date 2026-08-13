// ArtPlum port — animated fractal branch background (adapted from antfu.me's ArtPlum.vue)
// Plain JS + Canvas2D, no dependencies. Works as a fixed full-screen backdrop.

(function () {
  const r180 = Math.PI;
  const r90 = Math.PI / 2;
  const r15 = Math.PI / 12;
  const MIN_BRANCH = 30;
  const LEN = 6;
  const random = Math.random;

  const canvas = document.createElement('canvas');
  canvas.className = 'artplum-canvas';
  document.body.appendChild(canvas);

  let width = 0;
  let height = 0;
  let ctx = null;

  function polar2cart(x, y, r, theta) {
    return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
  }

  function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = dpr * width;
    canvas.height = dpr * height;
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(110, 120, 140, 0.20)';
  }

  let stopFlag = false;

  function step(x, y, rad, counter, push) {
    const length = random() * LEN;
    counter.value += 1;
    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    const rad1 = rad + random() * r15;
    const rad2 = rad - random() * r15;

    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;
    if (random() < rate) push(() => step(nx, ny, rad1, counter, push));
    if (random() < rate) push(() => step(nx, ny, rad2, counter, push));
  }

  const randomMiddle = () => random() * 0.6 + 0.2;

  function start() {
    stopFlag = true;
    requestAnimationFrame(() => {
      stopFlag = false;
      ctx.clearRect(0, 0, width, height);

      let steps = [];
      // seed 4 branch starters, one from each edge
      [
        () => step(randomMiddle() * width, -5, r90, { value: 0 }, (f) => steps.push(f)),
        () => step(randomMiddle() * width, height + 5, -r90, { value: 0 }, (f) => steps.push(f)),
        () => step(-5, randomMiddle() * height, 0, { value: 0 }, (f) => steps.push(f)),
        () => step(width + 5, randomMiddle() * height, r180, { value: 0 }, (f) => steps.push(f)),
      ].forEach((s) => s());

      // Drain the step queue across frames at ~25fps, keeping 50% each frame for an organic feel.
      const interval = 1000 / 25;
      let lastTime = performance.now();
      let raf;

      const frame = () => {
        if (stopFlag) return;
        if (performance.now() - lastTime < interval) {
          raf = requestAnimationFrame(frame);
          return;
        }
        lastTime = performance.now();

        const prevSteps = steps;
        steps = [];
        prevSteps.forEach((i) => {
          if (random() < 0.5) steps.push(i);
          else i();
        });

        if (steps.length) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    });
  }

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      initCanvas();
      start();
    }, 200);
  });

  initCanvas();
  start();
})();
