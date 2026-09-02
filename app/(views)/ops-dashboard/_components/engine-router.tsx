"use client";

import { useMemo, useState } from "react";
import type { NormalizedProject } from "@/lib/portfolio/types";
import { ENGINE_DOT_COLOR, ENGINE_LABELS } from "@/lib/portfolio/taxonomy";
import { filterBySingle } from "@/lib/views/filters";
import EngineChip from "./engine-chip";
import OpsProjectCard from "./project-card";
import SrLive from "@/components/views/shared/sr-live";

const ENGINE_KEYS = ["all", "claude", "gemini", "vertex", "native", "web"] as const;

export default function EngineRouter({ projects }: { projects: NormalizedProject[] }) {
  const [engine, setEngine] = useState<string>("all");
  const routable = useMemo(() => projects.filter((p) => p.engine !== null), [projects]);
  const filtered = useMemo(() => filterBySingle(routable, engine, (p) => p.engine), [routable, engine]);

  return (
    <section className="mx-auto mt-8 max-w-[1100px] px-4 pb-20 sm:px-12">
      <div className="rounded-xl border border-view-border bg-view-surface p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-view-fg-subtle">Route by engine</p>
        <div role="radiogroup" aria-label="Filter projects by engine" className="flex flex-wrap gap-2">
          {ENGINE_KEYS.map((key) => (
            <EngineChip
              key={key}
              label={key === "all" ? "All Systems" : ENGINE_LABELS[key]}
              color={ENGINE_DOT_COLOR[key]}
              active={engine === key}
              onSelect={() => setEngine(key)}
            />
          ))}
        </div>
      </div>

      <SrLive>{`${filtered.length} projects shown`}</SrLive>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <OpsProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
