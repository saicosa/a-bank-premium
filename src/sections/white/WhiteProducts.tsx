"use client";

import { ArrowUpRight } from "lucide-react";
import { brand, contourProducts } from "@/data/content";

const bands = [
  { bg: "bg-[var(--purple)]", muted: "text-white/70" },
  { bg: "bg-[var(--lavender)]", muted: "text-white/75" },
  { bg: "bg-[var(--yellow)]", muted: "text-black/55" },
  { bg: "bg-[var(--orange)]", muted: "text-white/75" },
  { bg: "bg-[var(--ink)]", muted: "text-white/60" },
] as const;

export function WhiteProducts() {
  return (
    <section
      id="contour"
      className="w-section"
      aria-labelledby="white-products-title"
    >
      <div className="w-container">
        <div className="w-section-head">
          <p className="w-meta text-[var(--purple)]">03 — Продукты</p>
          <div>
            <h2
              id="white-products-title"
              className="font-display text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.08]"
            >
              Пять продуктов одного кошелька
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--mute)] sm:text-base">
              Кошелёк, карты МИР и Visa, обмен USDT и повседневные платежи — всё
              на одном балансе.
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {contourProducts.map((product, i) => {
            const tone = bands[i];
            const isYellow = tone.bg.includes("yellow");
            return (
              <li key={product.id}>
                <a
                  href={brand.walletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-round w-band block transition-opacity hover:opacity-95 ${tone.bg} ${
                    isYellow ? "text-[var(--ink)]" : "text-white"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-4 px-[var(--panel-pad)] py-7 sm:grid-cols-12 sm:items-end sm:gap-6 sm:py-8">
                    <p className="w-meta sm:col-span-2">{product.index}</p>
                    <div className="sm:col-span-5">
                      <p className={`text-sm ${tone.muted}`}>
                        {product.subtitle}
                      </p>
                      <h3 className="font-display mt-1 text-[clamp(1.55rem,3.2vw,2.25rem)] leading-[1.1] text-white">
                        {product.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm leading-relaxed sm:col-span-4 sm:text-[0.95rem] ${tone.muted}`}
                    >
                      {product.copy}
                    </p>
                    <div className="flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
                      <span className={`text-xs sm:hidden ${tone.muted}`}>
                        {product.meta}
                      </span>
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                          isYellow ? "bg-black/10" : "bg-white/15"
                        }`}
                        aria-hidden
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
