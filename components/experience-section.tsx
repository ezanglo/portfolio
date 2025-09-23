"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import SectionHeading from "@/components/section-heading";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Experience } from "@/payload-types";

const ExperienceCard = dynamic(() => import("@/components/experience-card"));

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { ref } = useSectionInView("Experience", 0.2);

  return (
    <motion.section
      id="experience"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-28 mb-28 sm:mb-40 pl-5 sm:px-16 overflow-x-hidden"
    >
      <SectionHeading>My Experience</SectionHeading>
      {experiences.map((experience, index) => (
        <div className="group" key={index}>
          <ExperienceCard {...experience} index={index} />
        </div>
      ))}
    </motion.section>
  );
}
