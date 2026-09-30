"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => {
      setMatches(mq.matches);
      setReady(true);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return { matches, ready };
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  return touch;
}
