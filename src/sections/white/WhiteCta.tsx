import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { brand, legal, navItems } from "@/data/content";
import { withBase } from "@/lib/basePath";

export function WhitePresence() {
  return (
    <section className="w-section" aria-labelledby="white-presence-title">
      <div className="w-container">
        <div className="w-round grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-[26rem]">
            <Image
              src={withBase("/images/crypto-desk.jpg")}
              alt="Карта и активы в кошельке A-bank"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-[var(--lavender)] w-panel-pad text-white">
            <p className="w-meta !text-white/60">07 — Баланс</p>
            <h2
              id="white-presence-title"
              className="font-display mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]"
            >
              Карта. Курс.
              <br />
              Один баланс.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Рубли, USDT, Visa и МИР — в одном кошельке. Веб и Telegram с общей
              историей операций.
            </p>
            <p className="mt-8 max-w-sm border-t border-white/25 pt-5 font-display text-lg leading-snug text-white sm:text-xl">
              Рубли и стейблкоины — без разрыва между банком и цифровыми
              активами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhiteCta() {
  return (
    <section
      id="threshold"
      className="pb-[var(--space)]"
      aria-labelledby="white-cta-title"
    >
      <div className="w-container">
        <div className="w-round bg-[var(--purple)] w-panel-pad text-white sm:py-16 lg:py-[4.5rem]">
          <div className="grid grid-cols-1 gap-[var(--space-md)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="w-meta !text-white/50">08 — Вход</p>
              <h2
                id="white-cta-title"
                className="font-display mt-3 text-[clamp(2.4rem,8vw,5rem)] leading-[0.95]"
              >
                Откройте
                <br />
                кошелёк
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-start">
              <p className="max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
                Верификация, пополнение, карта и обмен — с одного входа в
                браузере или Telegram.
              </p>
              <a
                href={brand.walletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-btn w-btn-primary"
              >
                Войти в кошелёк
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <p className="w-meta !text-white/45">
                wallet.a-bank.ru · Telegram-бот
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhiteFooter() {
  return (
    <footer
      className="border-t border-[var(--line)] bg-[var(--paper)]"
      role="contentinfo"
    >
      <div className="w-container py-[var(--space)]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-2xl">A-bank</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mute)]">
              {brand.statement}
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="w-meta mb-3">Навигация</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className="text-sm text-[var(--ink-soft)] hover:text-[var(--purple)]"
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 md:col-span-4">
            <p className="w-meta mb-3">Ссылки</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="hover:text-[var(--purple)]"
                  href={brand.walletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть кошелёк
                </a>
              </li>
              <li>
                <a className="hover:text-[var(--purple)]" href="/">
                  Тёмная версия
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--purple)]"
                  href={brand.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  a-bank.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[var(--space-md)] grid gap-4 border-t border-[var(--line)] pt-6 text-xs leading-relaxed text-[var(--mute)] md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-1 break-words">
            <p>{legal.entity}</p>
            <p>{legal.basis}</p>
            <p>{legal.license}</p>
            <p>{legal.address}</p>
          </div>
          <p className="w-meta self-end md:text-right">
            © {new Date().getFullYear()} A-bank
          </p>
        </div>
      </div>
    </footer>
  );
}
