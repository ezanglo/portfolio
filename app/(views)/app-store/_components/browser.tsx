"use client";

import { useMemo, useState } from "react";
import type { NormalizedProject } from "@/lib/portfolio/types";
import { filterBySingle } from "@/lib/views/filters";
import AppStoreFilterBar from "./filter-bar";
import AppCard from "./app-card";
import AppModal from "./app-modal";

export default function AppStoreBrowser({ projects }: { projects: NormalizedProject[] }) {
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState<number | null>(null);

  const filtered = useMemo(
    () => filterBySingle(projects, filter, (p) => p.store.category),
    [projects, filter]
  );

  const activeIndex = activeId === null ? -1 : filtered.findIndex((p) => p.id === activeId);
  const activeProject = activeIndex >= 0 ? filtered[activeIndex] : null;

  function step(delta: 1 | -1) {
    if (filtered.length === 0) return;
    const nextIndex = (activeIndex + delta + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex].id);
  }

  return (
    <div className="mx-auto max-w-[1000px] px-6 pb-24 pt-6 sm:px-8">
      <AppStoreFilterBar active={filter} onSelect={setFilter} />

      <div className="mt-6 grid grid-cols-2 gap-[18px] sm:grid-cols-3">
        {filtered.map((project) => (
          <AppCard key={project.id} project={project} onOpen={() => setActiveId(project.id)} />
        ))}
      </div>

      <AppModal
        project={activeProject}
        onClose={() => setActiveId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}
