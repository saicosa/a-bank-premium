"use client";

import { WhiteTheme } from "@/components/white/WhiteTheme";
import { WhiteNav } from "@/components/white/WhiteNav";
import { WhiteSmoothAnchors } from "@/components/white/WhiteSmoothAnchors";
import { WhiteHero } from "@/sections/white/WhiteHero";
import { WhiteStory } from "@/sections/white/WhiteStory";
import { WhiteStats } from "@/sections/white/WhiteStats";
import { WhiteProducts } from "@/sections/white/WhiteProducts";
import { WhiteServices } from "@/sections/white/WhiteServices";
import { WhitePath } from "@/sections/white/WhitePath";
import { WhiteTrust } from "@/sections/white/WhiteTrust";
import {
  WhiteCta,
  WhiteFooter,
  WhitePresence,
} from "@/sections/white/WhiteCta";

export function WhiteExperience() {
  return (
    <WhiteTheme>
      <div className="white-shell">
        <WhiteSmoothAnchors />
        <WhiteNav />
        <main>
          <WhiteHero />
          <WhiteStory />
          <WhiteStats />
          <WhiteProducts />
          <WhiteServices />
          <WhitePath />
          <WhiteTrust />
          <WhitePresence />
          <WhiteCta />
        </main>
        <WhiteFooter />
      </div>
    </WhiteTheme>
  );
}
