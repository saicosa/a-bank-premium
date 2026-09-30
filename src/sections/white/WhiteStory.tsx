export function WhiteStory() {
  return (
    <section
      id="manifesto"
      className="w-section"
      aria-labelledby="white-story-title"
    >
      <div className="w-container">
        <div className="w-section-head">
          <p className="w-meta text-[var(--purple)]">01 — О сервисе</p>
          <div>
            <h2
              id="white-story-title"
              className="font-display max-w-4xl text-[clamp(1.85rem,4.5vw,3.2rem)] leading-[1.12]"
            >
              Один кошелёк для рублей, стейблкоинов, карт и повседневных
              платежей.
            </h2>
            <div className="mt-[var(--space-md)] grid gap-6 sm:grid-cols-2 sm:gap-8">
              <p className="text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                Храните, пополняйте, обменивайте и платите в одном пространстве —
                в браузере или через Telegram-бота.
              </p>
              <p className="text-base leading-relaxed text-[var(--mute)] sm:text-lg">
                Пополнение из любого банка РФ, карты МИР и Visa, обмен USDT и
                оплата сервисов без переключения между приложениями.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
