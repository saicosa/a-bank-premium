"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { securityLayers } from "@/data/content";

export function WhiteTrust() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="security"
      className="w-section"
      aria-labelledby="white-trust-title"
    >
      <div className="w-container">
        <div className="w-section-head">
          <p className="w-meta text-[var(--purple)]">06 — Безопасность</p>
          <div>
            <h2
              id="white-trust-title"
              className="font-display text-[clamp(1.85rem,4.5vw,2.9rem)] leading-[1.08]"
            >
              Как защищён ваш кошелёк
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[var(--mute)] sm:text-base">
              Проверка личности, шифрование, свои счета и контроль доступа.
            </p>
          </div>
        </div>

        <ul className="border-t border-[var(--line)]">
          {securityLayers.map((layer, i) => {
            const isOpen = open === i;
            return (
              <li key={layer.id} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(i)}
                  className="grid w-full grid-cols-[3rem_1fr] gap-4 py-5 text-left sm:grid-cols-[4rem_1fr_auto] sm:items-baseline"
                >
                  <span
                    className={`w-meta ${isOpen ? "text-[var(--orange)]" : ""}`}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl sm:text-2xl">
                    {layer.title}
                  </span>
                  <span className="hidden w-meta sm:block">
                    {isOpen ? "—" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-[3rem] text-sm leading-relaxed text-[var(--mute)] sm:pl-[4rem] sm:text-base">
                        {layer.copy}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
