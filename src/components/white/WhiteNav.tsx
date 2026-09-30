"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand, navItems } from "@/data/content";
import { scrollToId } from "@/components/white/scrollToId";

export function WhiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    window.setTimeout(() => {
      history.pushState(null, "", `#${id}`);
      scrollToId(id);
    }, open ? 180 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 bg-[var(--paper)] ${
          scrolled
            ? "border-[var(--line)]"
            : "border-transparent md:bg-transparent"
        }`}
      >
        <div className="w-container flex h-[var(--nav-h)] items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight">
            A-bank
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="text-sm text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={brand.walletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-btn w-btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex"
            >
              Кошелёк
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              type="button"
              className="text-sm font-semibold tracking-wide uppercase lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              Меню
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--paper)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] px-[var(--gutter)] py-4">
              <span className="font-display text-lg">A-bank</span>
              <button type="button" className="text-sm font-semibold uppercase" onClick={() => setOpen(false)}>
                Закрыть
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-[var(--gutter)] py-6">
              <ul>
                {navItems.map((item, i) => (
                  <li key={item.id} className="border-b border-[var(--line)]">
                    <motion.button
                      type="button"
                      className="flex w-full items-baseline justify-between gap-4 py-4 text-left"
                      onClick={() => go(item.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i }}
                    >
                      <span className="font-display text-2xl">{item.label}</span>
                      <span className="w-meta">{item.index}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-[var(--line)] px-[var(--gutter)] py-4">
              <a
                href={brand.walletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-btn w-btn-primary w-full"
              >
                Открыть кошелёк
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
