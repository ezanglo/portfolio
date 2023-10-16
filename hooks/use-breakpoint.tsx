import { useMediaQuery } from "react-responsive";
// @ts-ignore
import tailwindConfig from "../tailwind.config"; // Your tailwind config

import resolveConfig from "tailwindcss/resolveConfig";

const {
  theme: { screens },
} = resolveConfig(tailwindConfig);

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${screens[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
