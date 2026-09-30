"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCursor } from "@/components/providers/CursorProvider";
import { withBase } from "@/lib/basePath";

export function Presence() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { setCursor } = useCursor();

  useGSAP(
    () => {
      registerGsap();
      if (reduced || !root.current) return;

      gsap.fromTo(
        ".presence-mask",
        { clipPath: "inset(10% 10% 10% 10%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "top 35%",
            scrub: true,
          },
        },
      );

      gsap.from(".presence-copy", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="section-pad overflow-hidden border-t border-line"
      aria-labelledby="presence-title"
    >
      <div className="container-site">
        <SectionIndex index="07" label="Баланс" className="mb-6 sm:mb-10" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div
              className="presence-mask relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[16/11]"
              onMouseEnter={() => setCursor("view", "Кошелёк")}
              onMouseLeave={() => setCursor("default")}
            >
              <Image
                src={withBase("/images/crypto-desk.jpg")}
                alt="Карта, курс и активы в кошельке A-bank"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>

          <div className="presence-copy flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <h2
                id="presence-title"
                className="font-display text-[clamp(1.75rem,5vw,3rem)] leading-[1.08]"
              >
                Карта. Курс.
                <br />
                <span className="text-gold">Один баланс.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-mute sm:mt-5 sm:text-base">
                Рубли, USDT, Visa и МИР — в одном кошельке. Веб и Telegram с
                общей историей операций.
              </p>
            </div>

            <blockquote className="border-l border-gold pl-4 sm:pl-6">
              <p className="font-display text-[clamp(1.25rem,3.5vw,2.2rem)] leading-[1.2]">
                «Рубли и стейблкоины — без разрыва между банком и цифровыми
                активами.»
              </p>
              <footer className="meta mt-4 text-gold sm:mt-5">
                Принцип A-bank
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
