import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

// Function to get breakpoints from Tailwind CSS custom properties
function getTailwindBreakpoints() {
  if (typeof window === "undefined") {
    // Fallback for SSR
    return {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };
  }

  const styles = getComputedStyle(document.documentElement);
  return {
    sm: styles.getPropertyValue('--breakpoint-sm').trim() || "640px",
    md: styles.getPropertyValue('--breakpoint-md').trim() || "768px",
    lg: styles.getPropertyValue('--breakpoint-lg').trim() || "1024px",
    xl: styles.getPropertyValue('--breakpoint-xl').trim() || "1280px",
    "2xl": styles.getPropertyValue('--breakpoint-2xl').trim() || "1536px",
  };
}

// Get the breakpoints from Tailwind configuration
const screens = getTailwindBreakpoints();

export function useBreakpoint<K extends keyof typeof screens>(breakpointKey: K) {
  const [breakpoints, setBreakpoints] = useState(screens);
  
  useEffect(() => {
    // Update breakpoints on client side to ensure we get the actual CSS values
    const tailwindBreakpoints = getTailwindBreakpoints();
    setBreakpoints(tailwindBreakpoints);
  }, []);

  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}

// Export the screens object for reference if needed elsewhere
export { screens };
