"use client";

import { useState } from "react";
import { flowSteps } from "@/data/content";

const marks = [
  "bg-[var(--purple)]",
  "bg-[var(--lavender)]",
  "bg-[var(--yellow)]",
  "bg-[var(--orange)]",
] as const;

export function WhitePath() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="flow"
      className="w-section"
      aria-labelledby="white-path-title"
    >
      <div className="w-container">
        <div className="w-round bg-[var(--paper-2)] w-panel-pad">
          <div className="w-section-head !mb-[var(--space-md)]">
            <p className="w-meta text-[var(--purple)]">05 — Путь денег</p>
            <div>
              <h2
                id="white-path-title"
                className="font-display text-[clamp(1.85rem,4.5vw,2.9rem)] leading-[1.08]"
              >
                От верификации до платежей
              </h2>
              <p className="mt-3 max-w-lg text-sm text-[var(--mute)] sm:text-base">
                Четыре шага: подтвердите личность, пополните баланс, пользуйтесь
                сервисами и выводите средства, когда нужно.
              </p>
            </div>
          </div>

          <ol className="relative">
            {flowSteps.map((step, i) => {
              const isActive = i === active;
              const isLast = i === flowSteps.length - 1;
              return (
                <li key={step.id} className="relative">
                  {!isLast ? (
                    <span
                      className="absolute top-[1.35rem] bottom-0 left-[0.6875rem] w-px -translate-x-1/2 bg-[var(--line)] sm:left-[0.8125rem]"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative grid w-full grid-cols-[1.375rem_1fr] gap-4 py-4 text-left sm:grid-cols-[1.625rem_6.5rem_1fr] sm:gap-6 sm:py-5"
                  >
                    <span className="relative z-10 flex h-6 w-[1.375rem] items-start justify-center pt-1.5 sm:h-7 sm:w-[1.625rem] sm:pt-2">
                      <span
                        className={`block h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3 ${
                          isActive ? marks[i] : "bg-[var(--line)]"
                        }`}
                        aria-hidden
                      />
                    </span>
                    <span
                      className={`hidden pt-1 font-display text-sm sm:block ${
                        isActive ? "text-[var(--ink)]" : "text-[var(--mute)]"
                      }`}
                    >
                      {step.index}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl leading-none sm:text-2xl ${
                          isActive ? "text-[var(--ink)]" : "text-[var(--mute)]"
                        }`}
                      >
                        <span className="mr-3 font-display text-sm sm:hidden">
                          {step.index}
                        </span>
                        {step.title}
                      </h3>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-xl pt-3 text-sm leading-relaxed text-[var(--mute)] sm:text-base">
                            {step.copy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
