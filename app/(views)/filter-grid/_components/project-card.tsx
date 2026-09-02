"use client";

import type { NormalizedProject } from "@/lib/portfolio/types";

export default function FilterGridProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: NormalizedProject;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `fg-panel-${project.slug}`;
  return (
    <div className="rounded-xl border border-view-border bg-view-surface p-5">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <span>
          <span className="block text-base font-bold text-view-fg">{project.title}</span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {project.grid.map((tag) => (
              <span
                key={tag}
                className="rounded-[5px] bg-view-accent-soft px-1.5 py-0.5 text-[11.5px] font-semibold text-view-accent"
              >
                {tag}
              </span>
            ))}
          </span>
        </span>
        <span aria-hidden className="mt-1 shrink-0 text-lg text-view-fg-subtle">
          {expanded ? "−" : "+"}
        </span>
      </button>
      {expanded && (
        <p id={panelId} className="mt-3 text-sm leading-relaxed text-view-fg-muted">
          {project.description}
        </p>
      )}
    </div>
  );
}
