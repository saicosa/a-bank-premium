"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { flowSteps } from "@/data/content";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCursor } from "@/components/providers/CursorProvider";

export function Flow() {
  const root = useRef<HTMLElement>(null);
  const pinTrigger = useRef<ScrollTrigger | null>(null);
  const clickLockUntil = useRef(0);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { setCursor } = useCursor();
  const { matches: isMobile, ready: mqReady } = useMediaQuery(
    "(max-width: 767px)",
  );
  const useScrollStory = mqReady && !isMobile && !reduced;

  useGSAP(
    () => {
      registerGsap();
      if (!useScrollStory || !root.current) return;

      const steps = flowSteps.length;
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * steps * 0.85}`,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (performance.now() < clickLockUntil.current) return;
            const idx = Math.min(
              steps - 1,
              Math.floor(self.progress * steps),
            );
            setActive(idx);
          },
        },
      });

      pinTrigger.current = st.scrollTrigger ?? null;

      return () => {
        pinTrigger.current = null;
        st.scrollTrigger?.kill();
        st.kill();
      };
    },
    { scope: root, dependencies: [useScrollStory] },
  );

  const goToStep = (i: number) => {
    clickLockUntil.current = performance.now() + 900;
    setActive(i);
    const trigger = pinTrigger.current;
    if (!trigger) return;
    const steps = flowSteps.length;
    const progress = (i + 0.5) / steps;
    const y =
      trigger.start + (trigger.end - trigger.start) * Math.min(0.999, progress);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="flow"
      className="relative border-t border-line bg-paper-2"
      aria-labelledby="flow-title"
    >
      <div className="container-site flex min-h-[100svh] flex-col justify-center py-14 md:py-16">
        <SectionIndex index="05" label="Путь денег" className="mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id="flow-title"
              className="font-display text-[clamp(1.85rem,6vw,3.6rem)] leading-[1.08]"
            >
              От верификации
              <br />
              до платежей
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute sm:mt-5 sm:text-base">
              Четыре шага: подтвердите личность, пополните баланс, пользуйтесь
              сервисами и выводите средства, когда нужно.
            </p>

            <ol className="mt-8 space-y-1" role="listbox" aria-label="Этапы">
              {flowSteps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`flow-step focus-ring group flex w-full items-baseline gap-4 border-l-2 py-3.5 pl-4 text-left ${
                        isActive
                          ? "is-active border-gold"
                          : "border-line text-mute"
                      }`}
                      onClick={() => goToStep(i)}
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                    >
                      <span
                        className={`meta shrink-0 ${isActive ? "text-gold" : "text-mute group-hover:text-gold"}`}
                      >
                        {step.index}
                      </span>
                      <span className="font-display text-lg leading-none sm:text-xl">
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-[26rem]">
              {flowSteps.map((step, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={step.id}
                    className={`absolute inset-0 flex flex-col justify-between border border-line bg-paper p-6 transition-all duration-500 sm:p-8 lg:p-10 ${
                      isActive
                        ? "z-10 translate-y-0 opacity-100"
                        : "pointer-events-none z-0 translate-y-5 opacity-0"
                    }`}
                    aria-hidden={!isActive}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-[clamp(3rem,10vw,7rem)] leading-none text-line">
                        {step.index}
                      </span>
                      <span className="meta text-gold">
                        {i + 1} / {flowSteps.length}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.6rem,4vw,3rem)] leading-[1.08]">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute sm:text-base lg:text-lg">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex gap-2" aria-hidden>
              {flowSteps.map((step, i) => (
                <div
                  key={step.id}
                  className={`h-px flex-1 transition-colors duration-300 ${
                    i <= active ? "bg-gold" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
