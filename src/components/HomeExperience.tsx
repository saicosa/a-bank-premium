"use client";

import { useCallback, useEffect, useState } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageLoader } from "@/components/loader/PageLoader";
import { Navigation } from "@/components/nav/Navigation";
import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { Numbers } from "@/sections/Numbers";
import { Contour } from "@/sections/Contour";
import { ServicesIndex } from "@/sections/ServicesIndex";
import { Flow } from "@/sections/Flow";
import { Security } from "@/sections/Security";
import { Presence } from "@/sections/Presence";
import { Threshold } from "@/sections/Threshold";
import { FloatingWallet } from "@/components/ui/FloatingWallet";
import { Footer } from "@/sections/Footer";

export function HomeExperience() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  // Failsafe if loader callback never fires
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <CursorProvider>
      <SmoothScroll>
        <PageLoader onDone={onLoaderDone} />
        <CustomCursor />
        <Navigation ready={ready} />
        <main>
          <Hero ready={ready} />
          <Manifesto />
          <Numbers />
          <Contour />
          <ServicesIndex />
          <Flow />
          <Security />
          <Presence />
          <Threshold />
        </main>
        <Footer />
        <FloatingWallet />
      </SmoothScroll>
    </CursorProvider>
  );
}
