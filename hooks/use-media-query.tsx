import { useMediaQuery } from "react-responsive";

// Simple hook for common breakpoints
export function useIsMd() {
  return useMediaQuery({ query: "(min-width: 768px)" });
}

export function useIsLg() {
  return useMediaQuery({ query: "(min-width: 1024px)" });
}

export function useIsXl() {
  return useMediaQuery({ query: "(min-width: 1280px)" });
}

// Or a generic one
export function useMedia(breakpoint: string) {
  return useMediaQuery({ query: `(min-width: ${breakpoint})` });
}
