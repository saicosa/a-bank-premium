"use client";

/** Smooth animated scroll to an element id, accounting for fixed nav. */
export function scrollToId(id: string, offset = 72) {
  const el = document.getElementById(id);
  if (!el) return;

  const start = window.scrollY;
  const target =
    el.getBoundingClientRect().top + window.scrollY - offset;
  const distance = target - start;
  if (Math.abs(distance) < 1) return;

  const duration = Math.min(1100, Math.max(420, Math.abs(distance) * 0.45));
  const startTime = performance.now();

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
