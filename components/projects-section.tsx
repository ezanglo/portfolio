"use client";

import { projectsData } from "@/lib/data";
import SectionHeading from "./section-heading";
import ProjectCard from "./project-card";
import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useInView } from "react-intersection-observer";

export default function ProjectsSection() {
  const { setActiveSection, isClicked } = useActiveSectionContext();
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    inView && isClicked && setActiveSection("Projects");
  }, [inView, isClicked]);

  return (
    <section
      id="projects"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
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
