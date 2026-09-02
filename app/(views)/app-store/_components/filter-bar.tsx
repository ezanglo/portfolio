"use client";

import type { StoreCategory } from "@/lib/portfolio/types";

const CATEGORIES: { key: StoreCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "AI", label: "AI" },
  { key: "Mobile", label: "Mobile" },
  { key: "Web", label: "Web" },
  { key: "Desktop", label: "Desktop" },
];

export default function AppStoreFilterBar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div role="group" aria-label="Filter apps by category" className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          type="button"
          aria-pressed={active === c.key}
          onClick={() => onSelect(c.key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === c.key
              ? "bg-view-accent text-view-accent-fg"
              : "border border-view-border text-view-fg-muted hover:border-view-fg-subtle"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
