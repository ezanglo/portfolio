"use client";

import type { NormalizedProject } from "@/lib/portfolio/types";
import AppIcon from "./app-icon";

export default function AppCard({ project, onOpen }: { project: NormalizedProject; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col items-start gap-3 rounded-2xl border border-view-border bg-view-surface p-4 text-left transition hover:-translate-y-0.5"
      style={{ boxShadow: "var(--view-shadow)" }}
    >
      <AppIcon initials={project.store.initials} bg={project.store.iconBg} size={52} radius={13} />
      <span>
        <span className="block text-[15.5px] font-bold text-view-fg">{project.title}</span>
        <span className="mt-0.5 block text-[12.5px] font-semibold uppercase text-[var(--view-tag-fg)]">
          {project.store.category}
        </span>
      </span>
    </button>
  );
}
