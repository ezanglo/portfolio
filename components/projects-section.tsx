"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";
import { Project } from "@/payload-types";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <section
      id="projects"
      ref={ref}
      className="mb-28 max-w-[53rem] xl:max-w-[80rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My Projects</SectionHeading>
      <div className="flex flex-wrap gap-5 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
