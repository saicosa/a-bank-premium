import { brand, legal, navItems } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2" role="contentinfo">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-3xl tracking-tight">A-bank</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
              {brand.statement}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="meta mb-4">Навигация</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a className="link-draw text-sm" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="meta mb-4">Контур</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="link-draw"
                  href={brand.walletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть кошелёк
                </a>
              </li>
              <li>
                <a className="link-draw" href="/white">
                  Светлая версия
                </a>
              </li>
              <li>
                <a
                  className="link-draw"
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

        <div className="mt-16 grid gap-6 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0 space-y-2 text-xs leading-relaxed break-words text-mute">
            <p>{legal.entity}</p>
            <p>{legal.basis}</p>
            <p>{legal.license}</p>
            <p>{legal.address}</p>
          </div>
          <p className="meta self-end break-words md:text-right">
            © {new Date().getFullYear()} A-bank
          </p>
        </div>
      </div>
    </footer>
  );
}
