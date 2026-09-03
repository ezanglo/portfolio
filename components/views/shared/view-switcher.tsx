"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NEW_VIEW_SLUGS, VIEWS } from "@/lib/views";
import { useDismissable } from "@/hooks/use-dismissable";
import { useEmbedded } from "@/hooks/use-embedded";
import type { ViewSlug } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";
import PreviewCard from "./preview-card";

const SWITCHER_ORDER = ["classic", ...NEW_VIEW_SLUGS] as const;

export default function ViewSwitcher({
  current,
  extraActions,
  inline = false,
}: {
  current: ViewSlug;
  extraActions?: React.ReactNode;
  /** Render as a normal in-flow control (e.g. under the ai-chat composer) instead of a floating pill. */
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  // Once true, the preview list stays mounted (just hidden) so iframes that already
  // loaded don't reload on every open/close — and priming can start before the click.
  const [primed, setPrimed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const embedded = useEmbedded();

  function prime() {
    setPrimed(true);
  }

  useDismissable(containerRef, open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  function handleBackToAll() {
    setOpen(false);
    router.push("/");
  }

  // Hidden inside the simulated browser (ai-chat's SitePreview iframe) — the floating
  // switcher and Surprise me pill are top-level chrome, not part of the previewed page.
  if (embedded) return null;

  return (
    <>
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/30"
        />
      )}

      <div
        ref={containerRef}
        className={cn(
          "flex items-end gap-2",
          inline ? "flex-wrap justify-center" : "fixed bottom-5 right-5 z-[9999]"
        )}
      >
        {extraActions}

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="view-switcher-sidebar"
          onClick={() => {
            prime();
            setOpen((o) => !o);
          }}
          onMouseEnter={prime}
          onFocus={prime}
          onTouchStart={prime}
          className="flex items-center gap-2 rounded-full bg-[#13161B] px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,.25)] transition hover:bg-[#1c2028]"
        >
          ⇄ Switch view
        </button>

        {primed && (
          <aside
            id="view-switcher-sidebar"
            aria-label="Switch view"
            className={cn(
              "fixed inset-y-0 right-0 w-full max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-[-10px_0_40px_rgba(0,0,0,.2)]",
              open ? "flex" : "hidden"
            )}
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
                  eager
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
