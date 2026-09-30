"use client";

import { useEffect } from "react";

export function WhiteTheme({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-white");
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", "#fafafc");

    return () => {
      root.classList.remove("theme-white");
      if (meta && prev) meta.setAttribute("content", prev);
    };
  }, []);

  return <>{children}</>;
}
