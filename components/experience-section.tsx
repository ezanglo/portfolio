"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useTheme } from "next-themes";
import ExperienceCard from "./experience-card";

export default function ExperienceSection() {
  const { ref } = useSectionInView("Experience", 0.2);
  const { theme } = useTheme();

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-28 mb-28 sm:mb-40 px-5 sm:px-16"
    >
      <SectionHeading>My Experience</SectionHeading>
      <div>
        {experiencesData.map((experience, index) => (
          <React.Fragment key={index}>
            <ExperienceCard {...experience} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
