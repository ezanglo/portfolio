import type { NormalizedProject } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ProjectCard({ project }: { project: NormalizedProject }) {
  return (
    <div className="rounded-lg border border-view-border bg-view-surface p-5">
      <h3 className="text-[17px] font-semibold text-view-fg">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 font-mono">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded bg-view-accent-soft px-1.5 py-0.5 text-[11px] text-view-accent">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RuntimeProjects({ projects, copy }: { projects: NormalizedProject[]; copy: ViewCopy }) {
  return (
    <section id="projects" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.projects}</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
