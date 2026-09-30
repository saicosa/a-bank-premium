"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorProvider";

const RING_BASE = 16;
const RING_HOVER = 26;
const RING_VIEW = 34;

export function CustomCursor() {
  const { state, label, enabled } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    registerGsap();

    const dot = dotRef.current;
    const ringWrap = ringWrapRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ringWrap || !labelEl) return;

    gsap.set([dot, ringWrap, labelEl], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ringWrap, "x", {
      duration: 0.32,
      ease: "power3.out",
    });
    const yRing = gsap.quickTo(ringWrap, "y", {
      duration: 0.32,
      ease: "power3.out",
    });
    const xLabel = gsap.quickTo(labelEl, "x", {
      duration: 0.28,
      ease: "power3.out",
    });
    const yLabel = gsap.quickTo(labelEl, "y", {
      duration: 0.28,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      xLabel(e.clientX);
      yLabel(e.clientY + 28);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const ringWrap = ringWrapRef.current;
    const labelEl = labelRef.current;
    if (!ring || !ringWrap || !labelEl) return;

    const radius =
      state === "hover"
        ? RING_HOVER
        : state === "drag" || state === "view"
          ? RING_VIEW
          : RING_BASE;

    gsap.to(ring, {
      attr: { r: radius },
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(ringWrap, {
      opacity: state === "hidden" ? 0 : 1,
      duration: 0.25,
    });

    gsap.to(labelEl, {
      opacity: label ? 1 : 0,
      duration: 0.22,
    });
  }, [state, label, enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-2 w-2 rounded-full bg-gold"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringWrapRef}
        className="absolute top-0 left-0 h-20 w-20"
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="0 0 80 80"
          className="h-full w-full overflow-visible"
          fill="none"
        >
          <circle
            ref={ringRef}
            cx="40"
            cy="40"
            r={RING_BASE}
            stroke="var(--gold)"
            strokeOpacity="0.75"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div
        ref={labelRef}
        className="absolute top-0 left-0 opacity-0"
        style={{ willChange: "transform" }}
      >
        <span className="meta whitespace-nowrap bg-gold px-2 py-1 text-[var(--on-gold)]">
          {label}
        </span>
      </div>
    </div>
  );
}
