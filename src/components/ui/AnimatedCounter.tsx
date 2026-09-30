"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${Math.round(n).toLocaleString("ru-RU")}${suffix}`;

    if (reduced) {
      el.textContent = format(value);
      return;
    }

    // 0% / zero values: reveal instead of a useless 0→0 tween
    if (value === 0) {
      el.textContent = format(0);
      const tween = gsap.fromTo(
        el,
        { opacity: 0.15, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
      ScrollTrigger.refresh();
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    const obj = { n: 0 };
    el.textContent = format(0);

    const tween = gsap.to(obj, {
      n: value,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = format(obj.n);
      },
      onComplete: () => {
        el.textContent = format(value);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix, reduced]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
