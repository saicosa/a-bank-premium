"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/content";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useCursor } from "@/components/providers/CursorProvider";

export function ServicesIndex() {
  const [active, setActive] = useState<(typeof services)[number]["id"]>(
    services[0].id,
  );
  const current = services.find((s) => s.id === active) ?? services[0];
  const { setCursor } = useCursor();

  return (
    <section
      id="services"
      className="section-pad border-t border-line"
      aria-labelledby="services-title"
    >
      <div className="container-site">
        <div className="mb-10 grid grid-cols-12 gap-5 md:mb-14 md:gap-6">
          <div className="col-span-12 md:col-span-5">
            <SectionIndex index="04" label="Сервисы" className="mb-5 md:mb-6" />
            <h2
              id="services-title"
              className="font-display text-[clamp(1.9rem,5vw,4.2rem)] leading-[1.08]"
            >
              Что можно
              <br />
              сделать в кошельке
            </h2>
          </div>
          <p className="col-span-12 max-w-md self-end text-sm leading-relaxed text-mute md:col-span-5 md:col-start-8 md:text-base">
            Пополнение, карты, QR, ЖКХ и App Store — повседневные операции без
            выхода из A-bank.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <ul className="col-span-12 lg:col-span-6" role="listbox" aria-label="Сервисы">
            {services.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id} className="border-t border-line last:border-b">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className="focus-ring group flex w-full min-w-0 items-baseline gap-3 py-5 text-left transition-colors sm:gap-5"
                    onClick={() => setActive(item.id)}
                    onMouseEnter={() => {
                      setActive(item.id);
                      setCursor("hover");
                    }}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <span
                      className={`meta transition-colors ${
                        isActive ? "text-gold" : "text-mute"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-display text-[clamp(1.25rem,4.5vw,2.2rem)] leading-[1.15] break-words transition-transform duration-400 ${
                        isActive
                          ? "text-ink sm:translate-x-2"
                          : "text-ink/55"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="col-span-12 min-h-[16rem] border border-line bg-paper-2 p-8 lg:col-span-6 lg:min-h-[28rem] lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <p className="meta mb-8">{current.index} / 06</p>
                  <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-none">
                    {current.title}
                  </h3>
                </div>
                <p className="mt-10 max-w-md text-lg leading-relaxed text-ink-soft">
                  {current.copy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
