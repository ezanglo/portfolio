"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NEW_VIEW_SLUGS, VIEWS } from "@/lib/views";
import { useDismissable } from "@/hooks/use-dismissable";
import type { ViewSlug } from "@/lib/portfolio/types";
import PreviewCard from "./preview-card";

const SWITCHER_ORDER = ["classic", ...NEW_VIEW_SLUGS] as const;

export default function ViewSwitcher({
  current,
  extraActions,
}: {
  current: ViewSlug;
  extraActions?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useDismissable(containerRef, open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  function handleBackToAll() {
    setOpen(false);
    router.push("/");
  }

  return (
    <>
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/30"
        />
      )}

      <div ref={containerRef} className="fixed bottom-5 right-5 z-[9999] flex items-end gap-2">
        {extraActions}

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="view-switcher-sidebar"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full bg-[#13161B] px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,.25)] transition hover:bg-[#1c2028]"
        >
          ⇄ Switch view
        </button>

        {open && (
          <aside
            id="view-switcher-sidebar"
            aria-label="Switch view"
            className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-[-10px_0_40px_rgba(0,0,0,.2)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                All versions
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1.5 text-neutral-500 transition hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {SWITCHER_ORDER.map((slug) => (
                <PreviewCard
                  key={slug}
                  view={VIEWS[slug]}
                  active={slug === current}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleBackToAll}
              className="mt-4 shrink-0 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50"
            >
              ↺ Back to all views
            </button>
          </aside>
        )}
      </div>
    </>
  );
}
