import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-space",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A-bank — Единый контур для рублей и мира",
  description:
    "Криптокошелёк A-bank: карты Visa и МИР, обмен USDT, пополнение из любого банка РФ. Рубли и стейблкоины в одном контуре.",
  metadataBase: new URL("https://a-bank.ru"),
  openGraph: {
    title: "A-bank — Единый контур для рублей и мира",
    description:
      "Электронный кошелёк для рублей и стейблкоинов. Карты, обмен, повседневные платежи.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-paper text-ink">
        <a
          href="#top"
          className="focus-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[130] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
