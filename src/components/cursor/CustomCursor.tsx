"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorProvider";

export function CustomCursor() {
  const { state, label, enabled } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    registerGsap();

    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });
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
    const labelEl = labelRef.current;
    if (!ring || !labelEl) return;

    const scale =
      state === "hover" ? 1.7 : state === "drag" || state === "view" ? 2.2 : 1;

    gsap.to(ring, {
      scale,
      duration: 0.35,
      ease: "power3.out",
      opacity: state === "hidden" ? 0 : 1,
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
        className="absolute top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70"
        style={{ willChange: "transform" }}
      />
      <div
        ref={labelRef}
        className="absolute top-0 left-0 -translate-x-1/2 opacity-0"
        style={{ willChange: "transform" }}
      >
        <span className="meta whitespace-nowrap bg-gold px-2 py-1 text-[var(--on-gold)]">
          {label}
        </span>
      </div>
    </div>
  );
}
