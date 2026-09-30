"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduced) return;

      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.fromTo(
        words,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".manifesto-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  const line =
    "Один кошелёк для рублей, стейблкоинов, карт и повседневных платежей.";

  return (
    <section
      ref={root}
      id="manifesto"
      className="section-pad relative border-t border-line"
      aria-labelledby="manifesto-title"
    >
      <div className="container-site">
        <SectionIndex index="01" label="О сервисе" className="mb-14" />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <p className="meta sticky top-28">Зачем A-bank</p>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <h2
              id="manifesto-title"
              className="font-display max-w-full text-[clamp(1.65rem,6vw,5.5rem)] leading-[1.12] break-words"
            >
              {line.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="mr-[0.28em] inline-block max-w-full overflow-hidden align-bottom"
                >
                  <span className="manifesto-word inline-block max-w-full">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <div className="manifesto-rule mt-12 h-px origin-left bg-gold" />

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink-soft">
                A-bank — электронный кошелёк для рублей и стейблкоинов. Храните,
                пополняйте, обменивайте и платите в одном пространстве.
              </p>
              <p className="text-lg leading-relaxed text-mute">
                Пополнение из любого банка РФ, карты МИР и Visa, обмен USDT и
                оплата сервисов — без переключения между приложениями.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
