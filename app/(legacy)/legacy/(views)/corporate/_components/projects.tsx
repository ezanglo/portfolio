import type { NormalizedProject } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ProjectCard({ project }: { project: NormalizedProject }) {
  return (
    <div className="rounded-xl border border-view-border bg-view-surface p-5">
      <h3 className="text-[17px] font-bold text-view-fg">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-[5px] bg-view-accent-soft px-1.5 py-0.5 text-[11.5px] font-semibold text-view-accent">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CorporateProjects({ projects, copy }: { projects: NormalizedProject[]; copy: ViewCopy }) {
  return (
    <section id="projects" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.projects}</SectionLabel>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
