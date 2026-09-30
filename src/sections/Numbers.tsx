"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { stats } from "@/data/content";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduced || !root.current) return;

      gsap.from(".num-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="scale"
      className="section-pad border-t border-line bg-paper-2"
      aria-labelledby="scale-title"
    >
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <SectionIndex index="02" label="Масштаб" className="mb-5" />
            <h2
              id="scale-title"
              className="font-display text-[clamp(1.85rem,5vw,4rem)] leading-[1.08]"
            >
              Цифры сервиса
              <br />
              <span className="text-gold">на сегодня</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mute">
            Сколько людей уже в экосистеме и на каких условиях работает
            кошелёк каждый день.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <li
              key={item.label}
              className="num-item bg-paper-2 px-1 py-8 sm:px-5 sm:py-10 lg:py-14"
            >
              <p className="font-display text-[clamp(2.75rem,8vw,5.25rem)] leading-none tracking-tight text-gold tabular-nums">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </p>
              <p className="meta mt-5 max-w-[14rem] sm:mt-6">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
