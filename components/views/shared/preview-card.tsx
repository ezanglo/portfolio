"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ViewMeta } from "@/lib/views";
import { cn } from "@/lib/utils";

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;

export default function PreviewCard({
  view,
  active = false,
  onNavigate,
}: {
  view: ViewMeta;
  active?: boolean;
  onNavigate?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.25);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setScale(width / PREVIEW_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href={view.href}
      onClick={onNavigate}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5 hover:shadow-lg",
        active ? "border-neutral-900 ring-2 ring-neutral-900" : "border-neutral-200"
      )}
    >
      <div
        ref={frameRef}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-200"
        style={{ background: view.swatch }}
      >
        <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-full bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
          {view.previewLabel}
        </span>

        <iframe
          src={`${view.href}?preview=1`}
          title={`Preview of ${view.label}`}
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`origin-top-left border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <div className="flex items-center gap-2 font-medium text-neutral-900">
            <span aria-hidden>{view.emoji}</span>
            {view.label}
          </div>
          <p className="mt-1 text-sm text-neutral-500">{view.blurb}</p>
        </div>
        {view.gimmick && (
          <span className="shrink-0 rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-semibold uppercase text-white">
            Gimmick
          </span>
        )}
      </div>
    </Link>
  );
}
