"use client";

import { useState } from "react";
import { ExternalLink, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

const PREVIEW_URL = "https://ezraanglo.com";

export default function SitePreview({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className={cn("flex min-h-0 flex-col bg-view-surface", className)}>
      <div className="flex shrink-0 items-center gap-2 border-b border-view-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-view-fg-subtle/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-view-fg-subtle/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-view-fg-subtle/30" />
        </div>
        <div className="flex-1 truncate rounded-md bg-view-surface-2 px-3 py-1 text-center font-mono text-[12px] text-view-fg-muted">
          ezraanglo.com
        </div>
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            setReloadKey((k) => k + 1);
          }}
          className="shrink-0 rounded-md p-1.5 text-view-fg-subtle transition hover:bg-view-surface-2 hover:text-view-fg"
          aria-label="Reload preview"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
        <a
          href={PREVIEW_URL}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-md p-1.5 text-view-fg-subtle transition hover:bg-view-surface-2 hover:text-view-fg"
          aria-label="Open ezraanglo.com in a new tab"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="relative min-h-0 flex-1">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-view-surface">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-view-fg-subtle border-t-transparent" aria-hidden />
          </div>
        )}
        <iframe
          key={reloadKey}
          src={PREVIEW_URL}
          title="Live preview of ezraanglo.com"
          onLoad={() => setLoaded(true)}
          className={cn("h-full w-full border-0 transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        />
      </div>
    </div>
  );
}
