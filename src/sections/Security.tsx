"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, Lock, ShieldCheck, UserRoundCheck } from "lucide-react";
import { securityLayers } from "@/data/content";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useCursor } from "@/components/providers/CursorProvider";

const icons = [UserRoundCheck, Lock, ShieldCheck, Fingerprint] as const;

export function Security() {
  const [active, setActive] = useState(0);
  const { setCursor } = useCursor();
  const ActiveIcon = icons[active];

  return (
    <section
      id="security"
      className="section-pad border-t border-line bg-paper-2"
      aria-labelledby="security-title"
    >
      <div className="container-site">
        <div className="mb-10 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-6">
            <SectionIndex index="06" label="Безопасность" className="mb-5" />
            <h2
              id="security-title"
              className="font-display text-[clamp(1.85rem,5vw,4.2rem)] leading-[1.08]"
            >
              Как защищён
              <br />
              <span className="text-gold">ваш кошелёк</span>
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-mute md:col-span-5 md:col-start-8">
            Проверка личности, шифрование, свои счета и контроль доступа —
            четыре уровня защиты операций.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Clean strata — no overlapping plates */}
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:col-span-6">
            {securityLayers.map((layer, i) => {
              const isActive = active === i;
              const Icon = icons[i];
              return (
                <button
                  key={layer.id}
                  type="button"
                  aria-pressed={isActive}
                  className={`focus-ring group relative w-full overflow-hidden border text-left transition-all duration-300 ${
                    isActive
                      ? "border-gold bg-gold/[0.08]"
                      : "border-line bg-paper hover:border-gold/45"
                  }`}
                  onMouseEnter={() => {
                    setActive(i);
                    setCursor("hover");
                  }}
                  onFocus={() => setActive(i)}
                  onMouseLeave={() => setCursor("default")}
                  onClick={() => setActive(i)}
                >
                  <div
                    className={`flex min-w-0 items-center gap-3 px-4 transition-[padding] duration-300 sm:gap-5 sm:px-5 ${
                      isActive ? "py-5 sm:py-6" : "py-3.5 sm:py-4"
                    }`}
                  >
                    <span
                      className={`meta shrink-0 ${
                        isActive ? "text-gold" : "text-mute"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`hidden h-px min-w-4 flex-1 transition-colors sm:block ${
                        isActive ? "bg-gold/50" : "bg-line"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`min-w-0 flex-1 font-display text-base leading-tight sm:flex-none sm:text-lg sm:leading-none ${
                        isActive ? "text-ink" : "text-mute"
                      }`}
                    >
                      {layer.title}
                    </span>
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive ? "text-gold" : "text-mute"
                      }`}
                      aria-hidden
                    />
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 text-sm leading-relaxed text-mute sm:px-5 sm:pb-6 lg:hidden">
                        {layer.copy}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={securityLayers[active].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[16rem] flex-col justify-between border border-line bg-paper p-6 sm:min-h-[18rem] sm:p-8 lg:min-h-[22rem] lg:p-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="meta text-gold">
                    Уровень 0{active + 1} / 0{securityLayers.length}
                  </span>
                  <ActiveIcon className="h-6 w-6 text-gold" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.08]">
                    {securityLayers[active].title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-mute sm:mt-5 sm:text-base lg:text-lg">
                    {securityLayers[active].copy}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {securityLayers.map((layer, i) => {
                const isActive = active === i;
                const Icon = icons[i];
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      className={`focus-ring flex h-full w-full flex-col items-center justify-center gap-2 border px-2 py-3 text-center transition-colors ${
                        isActive
                          ? "border-gold bg-gold/10"
                          : "border-line hover:border-gold/40"
                      }`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                      aria-pressed={isActive}
                    >
                      <Icon
                        className={`h-4 w-4 ${isActive ? "text-gold" : "text-mute"}`}
                        aria-hidden
                      />
                      <span
                        className={`text-[0.7rem] leading-tight ${
                          isActive ? "text-ink" : "text-mute"
                        }`}
                      >
                        {layer.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
