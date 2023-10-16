"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { experiencesData } from "@/lib/data";
import { motion } from "framer-motion";
import React from "react";
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
        <React.Fragment key={index}>
          <motion.div className="group">
            <ExperienceCard {...experience} index={index} />
          </motion.div>
        </React.Fragment>
      ))}
    </section>
  );
}
