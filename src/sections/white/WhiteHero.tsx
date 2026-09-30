"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { brand } from "@/data/content";
import { heroSlides as slides } from "@/data/heroSlides";
import { withBase } from "@/lib/basePath";

export function WhiteHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3400);
    return () => window.clearInterval(t);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const current = slides[index];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]"
      aria-label="Вступление"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_78%_42%,rgba(139,145,232,0.22),transparent_70%)]" />

      <div className="w-container relative z-10 grid flex-1 grid-cols-1 items-center gap-10 py-8 lg:grid-cols-12 lg:gap-12 lg:py-10">
        {/* Left copy — matches reference */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="font-display text-[clamp(2.8rem,7.5vw,4.75rem)] leading-[0.95] tracking-[-0.05em] text-[var(--ink)]">
            A-bank
          </p>
          <h1 className="mt-5 max-w-md text-[clamp(1.15rem,2.1vw,1.4rem)] font-medium leading-snug text-[var(--ink-soft)]">
            Рубли и стейблкоины в одном кошельке — карты, обмен и платежи.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mute)] sm:text-base">
            Пополнение из любого банка РФ. Visa и МИР. Обмен USDT.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={brand.walletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-btn w-btn-primary"
            >
              Открыть кошелёк
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#contour" className="w-btn w-btn-ghost">
              Продукты
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <p className="w-meta">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
            <p className="text-sm text-[var(--mute)]">{current.label}</p>
          </div>
        </motion.div>

        {/* Right horizontal card — stack travels with the slide */}
        <div className="relative lg:col-span-7">
          <div className="relative ml-0 aspect-[16/9] w-full max-w-3xl lg:ml-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, x: 24, rotate: 1.5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -16, rotate: -1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-y-[10%] -right-[8%] left-[10%] rotate-[3.5deg] rounded-[1.5rem] bg-[var(--orange)] sm:rounded-[1.75rem]"
                  aria-hidden
                />
                <div
                  className="absolute inset-y-[6%] -right-[5%] left-[6%] rotate-[2deg] rounded-[1.5rem] bg-[var(--yellow)] sm:rounded-[1.75rem]"
                  aria-hidden
                />
                <div
                  className="absolute inset-y-[3%] -right-[2.5%] left-[3%] rotate-[1deg] rounded-[1.5rem] bg-[var(--lavender)] sm:rounded-[1.75rem]"
                  aria-hidden
                />
                <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-[#0c0c0e] sm:rounded-[1.75rem]">
                  <Image
                    src={withBase(current.src)}
                    alt={current.label}
                    fill
                    priority={index === 0}
                    unoptimized
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущий слайд"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 text-[var(--mute)] transition hover:border-[var(--purple)] hover:text-[var(--ink)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующий слайд"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 text-[var(--mute)] transition hover:border-[var(--purple)] hover:text-[var(--ink)]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-container relative z-10 pb-6">
        <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
          <p className="w-meta">Web · Telegram</p>
          <p className="w-meta text-right">Единый баланс RUB + USDT</p>
        </div>
      </div>
    </section>
  );
}
