"use client";

import { useCallback, useState } from "react";

/**
 * Roving tabindex over a flat list of item keys (e.g. IDE tree rows in visible order).
 * Only the focused item is tab-stoppable; arrow keys move focus within the list.
 */
export function useRovingTabindex(itemKeys: string[], initialKey?: string) {
  const [focusedKey, setFocusedKey] = useState<string | null>(
    initialKey ?? itemKeys[0] ?? null
  );

  const move = useCallback(
    (delta: 1 | -1) => {
      setFocusedKey((current) => {
        const idx = current ? itemKeys.indexOf(current) : -1;
        const nextIdx = Math.min(Math.max(idx + delta, 0), itemKeys.length - 1);
        return itemKeys[nextIdx] ?? current;
      });
    },
    [itemKeys]
  );

  const isTabbable = useCallback(
    (key: string) => key === (focusedKey ?? itemKeys[0]),
    [focusedKey, itemKeys]
  );

  return { focusedKey, setFocusedKey, move, isTabbable };
}
