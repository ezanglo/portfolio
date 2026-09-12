"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import ProjectCard from "@/components/legacy/project-card";
import FeaturedProjectCard from "@/components/legacy/featured-project-card";
import SectionHeading from "@/components/legacy/section-heading";
import { Project } from "@/lib/legacy/types";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref } = useSectionInView("Projects", 0.2);

  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const rest = projects.filter((project) => !featured.includes(project));

  return (
    <section
      id="projects"
      ref={ref}
      className="mb-28 max-w-[53rem] xl:max-w-[80rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Projects I&apos;ve worked on</SectionHeading>
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-start">
          {featured.map((project, index) => (
            <FeaturedProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-5 justify-center">
        {rest.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
