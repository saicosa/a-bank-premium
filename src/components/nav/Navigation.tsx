"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, brand } from "@/data/content";
import { useCursor } from "@/components/providers/CursorProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Props = {
  ready: boolean;
};

export function Navigation({ ready }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setCursor } = useCursor();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          ready ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex h-[var(--nav-h)] w-full items-center justify-between px-[var(--gutter)] transition-colors duration-500 ${
            scrolled ? "bg-paper/90 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="focus-ring font-display text-base tracking-tight text-ink sm:text-lg"
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            A-bank
          </a>

          <button
            type="button"
            className="focus-ring meta group flex items-center gap-3 text-ink"
            onClick={() => setOpen(true)}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span>Меню</span>
            <span className="relative block h-3 w-5" aria-hidden>
              <span className="absolute top-0 left-0 h-px w-full bg-gold" />
              <span className="absolute bottom-0 left-0 h-px w-3 bg-gold" />
            </span>
          </button>
        </div>
        <div className="h-px w-full bg-line">
          <div
            className="progress-rail h-px bg-gold"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--surface-deep)] text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
          >
            <div className="flex shrink-0 items-center justify-between px-[var(--gutter)] py-4">
              <span className="font-display text-base text-gold">A-bank</span>
              <button
                type="button"
                className="focus-ring meta text-mute"
                onClick={() => setOpen(false)}
              >
                Закрыть
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--gutter)] pb-4">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <li key={item.id}>
                    <motion.button
                      type="button"
                      className="focus-ring group flex w-full items-baseline gap-3 border-b border-line py-3 text-left sm:gap-5 sm:py-3.5"
                      onClick={() => go(item.id)}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.04 * i, duration: 0.35 }}
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                    >
                      <span className="meta shrink-0 text-gold/70">
                        {item.index}
                      </span>
                      <span className="font-display text-[clamp(1.35rem,5.5vw,2.75rem)] leading-none text-ink transition-colors group-hover:text-gold">
                        {item.label}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-line px-[var(--gutter)] py-4">
              <MagneticButton
                href={brand.walletUrl}
                external
                className="w-full sm:w-auto"
              >
                Открыть кошелёк
              </MagneticButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
