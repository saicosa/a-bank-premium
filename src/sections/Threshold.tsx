"use client";

import { ArrowUpRight } from "lucide-react";
import { brand } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionIndex } from "@/components/ui/SectionIndex";

export function Threshold() {
  return (
    <section
      id="threshold"
      className="relative overflow-hidden border-t border-line bg-gold text-[var(--on-gold)]"
      aria-labelledby="threshold-title"
    >
      <div className="container-site section-pad relative z-10">
        <SectionIndex
          index="08"
          label="Вход"
          className="mb-10 md:mb-16 [&_.meta]:!text-[var(--on-gold)]/55 [&_span]:!text-[var(--on-gold)]"
        />

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              id="threshold-title"
              className="font-display text-[clamp(2.5rem,10vw,8rem)] leading-[1.05] md:leading-[0.92]"
            >
              Откройте
              <br />
              кошелёк.
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:gap-8">
            <p className="max-w-sm text-sm leading-relaxed text-[var(--on-gold)]/75 md:text-base lg:text-lg">
              Верификация, пополнение, карта и обмен — всё начинается с одного
              входа в браузере или Telegram.
            </p>
            <MagneticButton
              href={brand.walletUrl}
              external
              className="w-full self-start !bg-[var(--gold)] !text-black hover:!bg-black hover:!text-[var(--gold)] sm:w-auto"
            >
              Войти в кошелёк
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--on-gold)]/25 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-4 md:pt-8">
          <p className="meta max-w-full break-words !text-[var(--on-gold)]/55">
            wallet.a-bank.ru · Telegram-бот
          </p>
          <p className="meta max-w-full break-words !text-[var(--on-gold)]/55">
            Нужна верификация · Только свои счета
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-10 -bottom-24 font-display text-[clamp(8rem,28vw,22rem)] leading-none text-[var(--on-gold)]/[0.08] select-none"
        aria-hidden
      >
        A-BANK
      </div>
    </section>
  );
}
