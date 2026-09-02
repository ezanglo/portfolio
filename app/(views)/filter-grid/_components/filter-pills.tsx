"use client";

import type { GridTag } from "@/lib/portfolio/types";

const TAG_ORDER: GridTag[] = ["AI", "React Native", "Web", "Mobile", "Desktop", "Personal"];

export default function FilterPills({
  active,
  onToggle,
}: {
  active: GridTag[];
  onToggle: (tag: GridTag) => void;
}) {
  return (
    <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
      {TAG_ORDER.map((tag) => {
        const isActive = active.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(tag)}
            className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${
              isActive
                ? "bg-view-fg text-view-page"
                : "border border-view-border bg-view-surface text-view-fg-muted hover:border-view-fg-subtle"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
