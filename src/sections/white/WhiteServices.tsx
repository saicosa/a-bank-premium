"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/content";

export function WhiteServices() {
  const [active, setActive] = useState<(typeof services)[number]["id"]>(
    services[0].id,
  );
  const current = services.find((s) => s.id === active) ?? services[0];

  return (
    <section
      id="services"
      className="w-section"
      aria-labelledby="white-services-title"
    >
      <div className="w-container">
        <div className="w-section-head">
          <p className="w-meta text-[var(--purple)]">04 — Сервисы</p>
          <div>
            <h2
              id="white-services-title"
              className="font-display text-[clamp(1.85rem,4.5vw,2.9rem)] leading-[1.08]"
            >
              Что можно сделать в кошельке
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-md)] lg:grid-cols-12 lg:gap-0">
          <ul className="border-t border-[var(--line)] lg:col-span-5">
            {services.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id} className="border-b border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setActive(item.id)}
                    className="flex w-full items-baseline gap-4 py-4 text-left transition-colors"
                  >
                    <span
                      className={`w-meta shrink-0 ${
                        isActive ? "text-[var(--orange)]" : ""
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={`font-display text-lg leading-tight sm:text-xl ${
                        isActive ? "text-[var(--ink)]" : "text-[var(--mute)]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-[var(--line)] lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <p className="w-meta text-[var(--lavender)]">
                  {current.index} / 06
                </p>
                <h3 className="font-display mt-4 text-[clamp(1.7rem,3.5vw,2.5rem)] leading-[1.12]">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--mute)] sm:text-lg">
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
