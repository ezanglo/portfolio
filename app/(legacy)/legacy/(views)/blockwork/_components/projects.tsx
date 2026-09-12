import type { NormalizedProject } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ProjectCell({ project }: { project: NormalizedProject }) {
  return (
    <div className="border-b-[3px] border-r-[3px] border-view-fg p-5">
      <h3 className="text-lg font-black uppercase text-view-fg">{project.title}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-view-fg-muted">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="border-2 border-view-fg px-1.5 py-0.5 text-[11px] font-bold uppercase text-view-fg">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlockworkProjects({ projects, copy }: { projects: NormalizedProject[]; copy: ViewCopy }) {
  return (
    <section id="projects" className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:px-12">
      <SectionLabel>{copy.sectionLabels.projects}</SectionLabel>
      <div className="grid grid-cols-1 border-t-[3px] border-view-fg sm:grid-cols-2 sm:border-l-[3px]">
        {projects.map((project) => (
          <ProjectCell key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
