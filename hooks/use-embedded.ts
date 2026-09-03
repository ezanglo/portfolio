"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  // Embedding status can't change after load — nothing to subscribe to.
  return () => {};
}

function getSnapshot() {
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin access to window.top throws — that only happens when embedded.
    return true;
  }
}

/**
 * True when the page is rendered inside an `<iframe>` (e.g. the simulated browser
 * in the ai-chat view). Returns `false` during SSR/first paint, then the real
 * value after hydration. Use it to hide chrome that shouldn't appear in an
 * embedded preview.
 */
export function useEmbedded() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
