"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "hover" | "drag" | "view" | "hidden";

type CursorContextValue = {
  state: CursorState;
  label: string;
  setCursor: (state: CursorState, label?: string) => void;
  enabled: boolean;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const desktopPointer = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
  );
  const reduced = useReducedMotion();
  const enabled = desktopPointer.ready && desktopPointer.matches && !reduced;
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const setCursor = useCallback(
    (next: CursorState, nextLabel = "") => {
      if (!enabled) return;
      setState(next);
      setLabel(nextLabel);
    },
    [enabled],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  const value = useMemo(
    () => ({ state, label, setCursor, enabled }),
    [state, label, setCursor, enabled],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    return {
      state: "default" as CursorState,
      label: "",
      setCursor: () => undefined,
      enabled: false,
    };
  }
  return ctx;
}
