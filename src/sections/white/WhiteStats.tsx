"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { stats } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WhiteStats() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduced || !root.current) return;
      gsap.from(".w-stat-line", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="scale"
      className="w-section"
      aria-labelledby="white-stats-title"
    >
      <div className="w-container">
        <div className="w-round bg-[var(--ink)] w-panel-pad text-white">
          <div className="mb-[var(--space-md)] flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="w-meta !text-white/45">02 — Масштаб</p>
              <h2
                id="white-stats-title"
                className="font-display mt-3 text-[clamp(1.7rem,4vw,2.5rem)] leading-[1.1]"
              >
                Цифры сервиса
              </h2>
            </div>
            <p className="max-w-xs text-sm text-white/50">
              Условия и масштаб, на которых работает кошелёк каждый день.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {stats.map((item, i) => (
              <li
                key={item.label}
                className={`w-stat-line border-white/15 py-2 lg:px-5 ${
                  i > 0 ? "border-t sm:border-t-0 lg:border-l" : ""
                } ${i > 1 ? "sm:border-t lg:border-t-0 sm:pt-6 lg:pt-2" : ""} ${
                  i % 2 === 1 ? "sm:pl-5" : ""
                }`}
              >
                <p
                  className={`font-display text-[clamp(2.5rem,6.5vw,3.5rem)] leading-none tabular-nums ${
                    i === 0
                      ? "text-[var(--yellow)]"
                      : i === 3
                        ? "text-[var(--lavender)]"
                        : "text-white"
                  }`}
                >
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-4 max-w-[12rem] text-sm leading-snug text-white/55">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
