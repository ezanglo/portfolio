"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NEW_VIEW_SLUGS, VIEWS } from "@/lib/views";
import { useDismissable } from "@/hooks/use-dismissable";
import type { ViewSlug } from "@/lib/portfolio/types";

export default function ViewSwitcher({ current }: { current: ViewSlug }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useDismissable(containerRef, open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  function handleNavigate() {
    setOpen(false);
  }

  function handleBackToAll() {
    setOpen(false);
    router.push("/welcome");
  }

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-[9998]">
      {open && (
        <div
          id="view-switcher-menu"
          role="menu"
          aria-label="Switch view"
          className="absolute bottom-14 right-0 flex max-h-[70dvh] w-[270px] max-w-[calc(100vw-2.5rem)] flex-col overflow-y-auto rounded-2xl bg-[#13161B] p-2 text-white shadow-[0_10px_40px_rgba(0,0,0,.3)] max-[480px]:fixed max-[480px]:bottom-0 max-[480px]:left-2 max-[480px]:right-2 max-[480px]:w-auto max-[480px]:max-h-[70dvh] max-[480px]:rounded-b-none"
        >
          <div className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            All versions
          </div>
          {NEW_VIEW_SLUGS.map((slug) => (
            <SwitchRow key={slug} view={VIEWS[slug]} active={slug === current} onSelect={handleNavigate} />
          ))}
          <SwitchRow view={VIEWS.classic} active={current === "classic"} onSelect={handleNavigate} />

          <div className="mt-2 border-t border-white/10 pt-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleBackToAll}
              className="w-full rounded-lg px-2 py-2 text-left text-sm text-white/70 hover:bg-white/10"
            >
              ↺ Back to all views
            </button>
          </div>
        </div>
      )}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="view-switcher-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-[#13161B] px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,.25)] transition hover:bg-[#1c2028]"
      >
        ⇄ Switch view
      </button>
    </div>
  );
}

function SwitchRow({
  view,
  active,
  onSelect,
}: {
  view: (typeof VIEWS)[ViewSlug];
  active: boolean;
  onSelect: (slug: ViewSlug) => void;
}) {
  return (
    <a
      href={view.href}
      role="menuitem"
      onClick={() => onSelect(view.slug)}
      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
        active ? "bg-[#DDEDFF] text-[#0055A9]" : "text-white/85 hover:bg-white/10"
      }`}
    >
      <span aria-hidden>{view.emoji}</span>
      <span className="flex-1">{view.label}</span>
    </a>
  );
}
