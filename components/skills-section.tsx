"use client";

import { skillsData } from "@/lib/data";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useInView } from "react-intersection-observer";

const fadeInAnimationVariants = {
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

export default function SkillsSection() {
  const { setActiveSection, isClicked } = useActiveSectionContext();
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  useEffect(() => {
    inView && isClicked && setActiveSection("Skills");
  }, [inView, isClicked]);
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-sm text-primary">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-secondary-foreground/10 py-1 px-3 rounded-xl"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
