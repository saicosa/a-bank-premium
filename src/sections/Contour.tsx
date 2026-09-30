"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { contourProducts } from "@/data/content";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Contour() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (reduced || !root.current) return;

      gsap.from(".contour-item", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="contour"
      className="border-t border-line"
      aria-labelledby="contour-title"
    >
      <div className="container-site section-pad">
        <SectionIndex index="03" label="Продукты" className="mb-5 sm:mb-6" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
            <h2
              id="contour-title"
              className="font-display text-[clamp(1.85rem,7vw,4.5rem)] leading-[1.08]"
            >
              Пять продуктов
              <br />
              <span className="text-gold">одного кошелька</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mute sm:mt-5 sm:text-base">
              Кошелёк, карты МИР и Visa, обмен USDT и повседневные платежи —
              всё на одном балансе.
            </p>
          </div>

          <ul className="lg:col-span-7">
            {contourProducts.map((product, i) => (
              <li
                key={product.id}
                className="contour-item border-t border-line py-6 last:border-b sm:py-8"
              >
                <div className="flex min-w-0 items-baseline justify-between gap-3">
                  <span className="meta shrink-0 text-gold">{product.index}</span>
                  <span className="meta min-w-0 text-right break-words">
                    {product.meta}
                  </span>
                </div>
                <p className="meta mt-3">{product.subtitle}</p>
                <h3 className="mt-1 font-display text-[clamp(1.45rem,4vw,2.4rem)] leading-[1.1]">
                  {product.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute sm:text-[0.95rem]">
                  {product.copy}
                </p>
                <p className="meta mt-4 opacity-60">
                  {i + 1} / {contourProducts.length}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
