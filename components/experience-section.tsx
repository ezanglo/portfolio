"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { experiencesData } from "@/lib/data";
import ExperienceCard from "./experience-card";
import SectionHeading from "./section-heading";

export default function ExperienceSection() {
  const { ref } = useSectionInView("Experience", 0.2);

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-28 mb-28 sm:mb-40 px-5 sm:px-16"
    >
      <SectionHeading>My Experience</SectionHeading>
      {experiencesData.map((experience, index) => (
        <div className="group" key={index}>
          <ExperienceCard {...experience} index={index} />
        </div>
      ))}
    </section>
  );
}
