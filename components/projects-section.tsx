import { projectsData } from "@/lib/data";
import SectionHeading from "./section-heading";
import ProjectCard from "./project-card";

export default function ProjectsSection() {

  return (
    <section
      id="projects"
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
