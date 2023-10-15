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
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
        {projectsData.map((project, index) => (
          <div key={index}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
