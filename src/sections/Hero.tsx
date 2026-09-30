"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap";
import { brand } from "@/data/content";
import { heroSlides as slides } from "@/data/heroSlides";
import { withBase } from "@/lib/basePath";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCursor } from "@/components/providers/CursorProvider";

type Props = {
  ready: boolean;
};

export function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { setCursor } = useCursor();
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

  // Hard fallback: never leave hero text invisible
  useEffect(() => {
    if (!ready || !root.current) return;

    const forceShow = () => {
      const el = root.current;
      if (!el) return;
      el.querySelectorAll<HTMLElement>(
        ".hero-meta, .hero-aside, .hero-line, .hero-panel",
      ).forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
        node.style.clipPath = "none";
      });
    };

    const t = window.setTimeout(forceShow, 1600);
    return () => window.clearTimeout(t);
  }, [ready]);

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      if (!el) return;

      if (reduced) {
        gsap.set(
          el.querySelectorAll(".hero-meta, .hero-aside, .hero-line, .hero-panel"),
          { clearProps: "all" },
        );
        return;
      }

      if (!ready) {
        gsap.set(".hero-meta", { y: 18, opacity: 0 });
        gsap.set(".hero-line", { yPercent: 110 });
        gsap.set(".hero-panel", { clipPath: "inset(100% 0 0 0)" });
        gsap.set(".hero-aside", { y: 20, opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, immediateRender: false },
      )
        .fromTo(
          ".hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, stagger: 0.09, immediateRender: false },
          0.04,
        )
        .fromTo(
          ".hero-panel",
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.95,
            ease: "power4.inOut",
            immediateRender: false,
          },
          0.1,
        )
        .fromTo(
          ".hero-aside",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, immediateRender: false },
          0.3,
        );

      return () => {
        tl.kill();
      };
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden pt-[var(--nav-h)]"
      aria-label="Вступление"
    >
      <div className="container-site grid grid-cols-1 gap-7 py-7 sm:gap-8 sm:py-10 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-10 lg:py-14">
        <div className="hero-meta flex items-start justify-between lg:col-span-4">
          <div className="space-y-2">
            <p className="meta text-gold">Кошелёк · Карты · Обмен</p>
            <p className="max-w-[16rem] text-sm leading-relaxed text-mute">
              Электронный кошелёк для рублей и стейблкоинов.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 lg:pt-1">
          <h1 className="font-display max-w-full text-[52px] leading-[1.1] tracking-[-0.02em] break-words sm:leading-[1.06]">
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-line inline-block max-w-full">Рубли.</span>
            </span>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-line inline-block max-w-full">Мир.</span>
            </span>
            <span className="block overflow-hidden py-[0.04em] text-gold">
              <span className="hero-line inline-block max-w-full">Один контур.</span>
            </span>
          </h1>
        </div>

        <div className="hero-aside flex flex-col gap-5 sm:gap-6 lg:col-span-4 lg:justify-end">
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft sm:text-base lg:text-lg">
            {brand.tagline}. Карты Visa и МИР. Обмен USDT. Пополнение из любого
            банка РФ.
          </p>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              href={brand.walletUrl}
              external
              className="w-full sm:w-auto"
            >
              Открыть кошелёк
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
            <MagneticButton
              href="#contour"
              variant="line"
              className="w-full sm:w-auto"
            >
              Смотреть продукты
            </MagneticButton>
          </div>
        </div>

        <div
          className="hero-panel relative aspect-[16/9] w-full overflow-hidden border border-line bg-black lg:col-span-8"
          onMouseEnter={() => {
            setPaused(true);
            setCursor("view", "Кошелёк");
          }}
          onMouseLeave={() => {
            setPaused(false);
            setCursor("default");
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                className="object-cover object-center"
                src={withBase(current.src)}
                alt={current.label}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={index === 0}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-ink sm:inset-x-6 sm:bottom-6">
            <div>
              <p className="meta text-gold">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[0.7rem] text-ink/80 sm:text-xs">
                {current.label}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущий слайд"
                className="inline-flex h-9 w-9 items-center justify-center border border-line bg-black/50 text-ink/80 transition hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующий слайд"
                className="inline-flex h-9 w-9 items-center justify-center border border-line bg-black/50 text-ink/80 transition hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
