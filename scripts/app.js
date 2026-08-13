// Shared behaviour: colour scheme toggle and scroll-to-top.

const STORAGE_KEY = "color-scheme";

function currentScheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyScheme(scheme) {
  document.documentElement.classList.toggle("dark", scheme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    /* private mode — the toggle still works for this session */
  }
  window.dispatchEvent(new CustomEvent("schemechange", { detail: scheme }));
}

// Circular wipe from the click point, falling back to an instant swap where
// the View Transitions API or motion preferences don't allow it.
function toggleScheme(event) {
  const next = currentScheme() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduced) {
    applyScheme(next);
    return;
  }

  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => applyScheme(next));

  transition.ready.then(() => {
    const clip = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ];
    const goingDark = next === "dark";
    document.documentElement.animate(
      { clipPath: goingDark ? clip.slice().reverse() : clip },
      {
        duration: 480,
        easing: "ease-in-out",
        pseudoElement: goingDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
}

document.querySelectorAll("[data-toggle-scheme]").forEach((el) => {
  el.addEventListener("click", toggleScheme);
});

// Follow the OS preference for as long as the visitor hasn't picked a side.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (!stored) {
      document.documentElement.classList.toggle("dark", e.matches);
      window.dispatchEvent(
        new CustomEvent("schemechange", {
          detail: e.matches ? "dark" : "light",
        })
      );
    }
  });

const toTop = document.querySelector(".to-top");
if (toTop) {
  const sync = () => toTop.classList.toggle("show", window.scrollY > 300);
  window.addEventListener("scroll", sync, { passive: true });
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  sync();
}
