import type { NormalizedProject } from "@/lib/portfolio/types";
import { ENGINE_LABELS } from "@/lib/portfolio/taxonomy";

export default function OpsProjectCard({ project }: { project: NormalizedProject }) {
  return (
    <div className="rounded-xl border border-view-border bg-view-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex-1 text-base font-bold text-view-fg">{project.title}</h3>
        {project.engine && (
          <span className="shrink-0 rounded-[5px] bg-[var(--view-engine-tag-bg)] px-1.5 py-0.5 font-mono text-[11px] text-view-accent">
            {ENGINE_LABELS[project.engine]}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{project.description}</p>
    </div>
  );
}
