"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Wallet } from "lucide-react";
import { brand } from "@/data/content";
import { useCursor } from "@/components/providers/CursorProvider";
import { useMagnetic } from "@/hooks/useMagnetic";

export function FloatingWallet() {
  const [visible, setVisible] = useState(false);
  const { setCursor } = useCursor();
  const ref = useMagnetic<HTMLAnchorElement>(0.35);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={ref}
      href={brand.walletUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Открыть кошелёк A-bank"
      className={`focus-ring fixed right-3 bottom-3 z-[70] flex items-center gap-2 bg-gold px-3.5 py-3 text-sm font-semibold !text-black transition-all duration-300 will-change-transform sm:right-6 sm:bottom-6 sm:gap-2.5 sm:px-5 sm:py-3.5 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      onMouseEnter={() => setCursor("hover")}
      onMouseLeave={() => setCursor("default")}
    >
      <Wallet className="h-4 w-4" aria-hidden />
      <span>Кошелёк</span>
      <ArrowUpRight className="hidden h-4 w-4 sm:block" aria-hidden />
    </a>
  );
}
