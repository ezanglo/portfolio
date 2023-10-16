"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { projectsData } from "@/lib/data";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";

export default function ProjectsSection() {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <section
      id="projects"
      ref={ref}
      className="mb-28 max-w-[53rem] xl:max-w-[80rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My Projects</SectionHeading>
      <div className="flex flex-wrap gap-5 justify-center">
        {projectsData.map((project, index) => (
          <div key={index}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
