"use client";

import { useRef, useCallback } from "react";

export function useScrollToBottom<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = ref.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  return { ref, scrollToBottom };
}
