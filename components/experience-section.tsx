"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { experiencesData } from "@/lib/data";
import { motion } from "framer-motion";
import React from "react";
import ExperienceCard from "./experience-card";
import SectionHeading from "./section-heading";

export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
    },
  }),
};

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
          <motion.div
            className="group"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={index}
            viewport={{
              once: true,
            }}
          >
            <ExperienceCard {...experience} />
          </motion.div>
        </React.Fragment>
      ))}
    </section>
  );
}
