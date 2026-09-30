"use client";

import { useEffect } from "react";
import { scrollToId } from "@/components/white/scrollToId";

/** Intercept in-page hash links for animated scroll. */
export function WhiteSmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      if (!document.getElementById(id)) return;

      e.preventDefault();
      history.pushState(null, "", href);
      scrollToId(id);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
