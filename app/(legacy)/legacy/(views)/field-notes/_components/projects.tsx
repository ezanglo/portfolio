import type { NormalizedProject } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ProjectEntry({ project }: { project: NormalizedProject }) {
  return (
    <div className="border-b border-view-border pb-8">
      <h3 className="font-serif text-xl font-semibold text-view-fg">{project.title}</h3>
      <p className="mt-2 text-[15.5px] leading-relaxed text-view-fg-muted">{project.description}</p>
      {project.tags.length > 0 && (
        <p className="mt-3 text-[13px] text-view-accent">{project.tags.join(" · ")}</p>
      )}
    </div>
  );
}

export default function FieldNotesProjects({ projects, copy }: { projects: NormalizedProject[]; copy: ViewCopy }) {
  return (
    <section id="projects" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.projects}</SectionLabel>
      <div className="flex flex-col gap-[34px]">
        {projects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
