"use client";

import { useMemo, useState } from "react";
import type { NormalizedProject, GridTag } from "@/lib/portfolio/types";
import { countLabel, filterByAnyTag } from "@/lib/views/filters";
import FilterPills from "./filter-pills";
import FilterGridProjectCard from "./project-card";
import SrLive from "@/components/views/shared/sr-live";

export default function FilterGridBrowser({ projects }: { projects: NormalizedProject[] }) {
  const [activeTags, setActiveTags] = useState<GridTag[]>([]);
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => filterByAnyTag(projects, activeTags, (p) => p.grid), [projects, activeTags]);

  function toggleTag(tag: GridTag) {
    setActiveTags((tags) => (tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]));
  }

  function toggleExpanded(slug: string) {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  const label = countLabel(filtered.length, projects.length);

  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-24 sm:px-12">
      <FilterPills active={activeTags} onToggle={toggleTag} />
      <p className="mt-4 text-[13px] text-view-fg-subtle">{label}</p>
      <SrLive>{label}</SrLive>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <FilterGridProjectCard
            key={project.slug}
            project={project}
            expanded={expandedSlugs.has(project.slug)}
            onToggle={() => toggleExpanded(project.slug)}
          />
        ))}
      </div>
    </div>
  );
}
