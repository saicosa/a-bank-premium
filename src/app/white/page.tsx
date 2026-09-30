import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { WhiteExperience } from "@/components/white/WhiteExperience";
import "./white.css";

const onest = Onest({
  variable: "--font-white-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A-bank — Светлая версия | Единый контур для рублей и мира",
  description:
    "Светлая версия лендинга A-bank: кошелёк для рублей и стейблкоинов, карты Visa и МИР, обмен USDT.",
};

export const viewport: Viewport = {
  themeColor: "#fafafc",
  width: "device-width",
  initialScale: 1,
};

export default function WhitePage() {
  return (
    <div className={`${onest.variable} ${onest.className}`}>
      <WhiteExperience />
    </div>
  );
}
