"use client";

import { useEffect, useState } from "react";

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The global CSS reduced-motion block (app/(site)/globals.css) only reaches CSS
 * transitions/animations. The Aceternity components that drive motion through JS
 * (`motion/react`'s `useScroll`/`useSpring`/`animate()`) need this instead — required so every
 * adopted Aceternity component actually respects `prefers-reduced-motion` (brief §27/§29).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
