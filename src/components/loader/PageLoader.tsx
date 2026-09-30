"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  onDone: () => void;
};

export function PageLoader({ onDone }: Props) {
  const reduced = useReducedMotion();
  const doneRef = useRef(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    doneRef.current = false;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    if (reduced) {
      finish();
      return;
    }

    const obj = { n: 0 };
    const root = rootRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        finish();
        if (!root) return;
        gsap.to(root, {
          yPercent: -100,
          duration: 0.8,
          delay: 0.05,
          ease: "power4.inOut",
          onComplete: () => {
            root.style.visibility = "hidden";
            root.style.pointerEvents = "none";
          },
        });
      },
    });

    tl.to(obj, {
      n: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        const n = Math.round(obj.n);
        if (progressRef.current) {
          progressRef.current.textContent = String(n).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.width = `${n}%`;
        }
      },
    }).fromTo(
      ".loader-brand",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      0.1,
    );

    const safety = window.setTimeout(finish, 2200);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <div
      ref={rootRef}
      className="loader-root fixed inset-0 z-[120] flex flex-col justify-between bg-[var(--surface-deep)] px-[var(--gutter)] py-6 text-[var(--ink)] sm:py-8"
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
    >
      <div className="meta flex justify-between text-[var(--mute)]">
        <span>A-bank</span>
        <span>Black · Gold</span>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        <p className="loader-brand font-display text-[clamp(2.2rem,8vw,5.5rem)] leading-[0.95] text-[var(--gold)]">
          A-bank
        </p>
        <div className="flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-white/10">
            <div
              ref={barRef}
              className="h-px bg-[var(--gold)]"
              style={{ width: "0%" }}
            />
          </div>
          <span
            ref={progressRef}
            className="font-mono text-[clamp(1.75rem,6vw,3.5rem)] tabular-nums leading-none text-[var(--ink)]"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
