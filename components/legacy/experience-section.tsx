"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import SectionHeading from "@/components/legacy/section-heading";
import { motion } from "framer-motion";
import Timeline, { TimelineItem } from "@/components/legacy/timeline";
import { Experience } from "@/lib/legacy/types";
import {
  GraduationCap,
  MonitorIcon,
  Code2Icon,
  BookOpenIcon,
  StarIcon,
} from "lucide-react";

const iconMap = {
  star: StarIcon,
  code: Code2Icon,
  monitor: MonitorIcon,
  book: BookOpenIcon,
  graduation: GraduationCap,
};

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { ref } = useSectionInView("Experience", 0.2);

  const items: TimelineItem[] = experiences.map((experience) => ({
    title: experience.title,
    subtitle: experience.company,
    location: experience.location,
    year: experience.year,
    description: experience.description,
    details: experience.responsibilities?.map((r) => r.responsibility),
    icon: iconMap[experience.icon as keyof typeof iconMap] || StarIcon,
  }));

  return (
    <motion.section
      id="experience"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-28 mb-28 sm:mb-40 pl-5 sm:px-16 overflow-x-hidden"
    >
      <SectionHeading>Experience</SectionHeading>
      <Timeline items={items} />
    </motion.section>
  );
}
