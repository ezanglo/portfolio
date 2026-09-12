"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import SectionHeading from "@/components/legacy/section-heading";
import TechIcon from "@/components/legacy/tech-icon";
import { cn } from "@/lib/utils";
import { FALLBACK_PROCESS_INTRO, FALLBACK_PROCESS_NOTE, FALLBACK_PROCESS_STEPS } from "@/lib/portfolio/narrative";
import { SiteConfig } from "@/lib/legacy/types";
import {
  CompassIcon,
  ClipboardListIcon,
  HammerIcon,
  FlaskConicalIcon,
  RocketIcon,
  RefreshCwIcon,
  LucideIcon,
} from "lucide-react";

const STEP_ICONS: LucideIcon[] = [
  CompassIcon,
  ClipboardListIcon,
  HammerIcon,
  FlaskConicalIcon,
  RocketIcon,
  RefreshCwIcon,
];

interface AboutSectionProps {
  siteConfig: SiteConfig | null;
}

export default function AboutSection({ siteConfig }: AboutSectionProps) {
  const { ref } = useSectionInView("How I Work", 0.75);

  const howIWork = siteConfig?.howIWork;
  const intro = howIWork?.intro || FALLBACK_PROCESS_INTRO;
  const steps = howIWork?.steps && howIWork.steps.length > 0 ? howIWork.steps : FALLBACK_PROCESS_STEPS;
  const note = FALLBACK_PROCESS_NOTE;

  return (
    <motion.section
      id="about"
      ref={ref}
      className="mb-28 max-w-[62rem] text-center scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>How I work</SectionHeading>
      <p className="mb-14 max-w-[42rem] mx-auto leading-8 text-secondary-foreground/80">
        {intro}
      </p>

      <div className="hidden md:grid md:grid-cols-6 md:gap-4 relative">
        <div
          className="absolute left-0 right-0 top-6 h-px bg-primary/20"
          style={{ marginInline: `${100 / steps.length / 2}%` }}
        />
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index % STEP_ICONS.length];
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center text-left"
            >
              <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-secondary shadow-md border border-primary/20 mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </span>
              <h3 className="font-medium mb-1">{step.label}</h3>
              <p className="text-xs text-secondary-foreground/70 leading-relaxed mb-3">
                {step.description}
              </p>
              {step.tools && step.tools.length > 0 && (
                <div className="flex gap-1.5 mt-auto">
                  {step.tools.map((tool) => (
                    <span
                      key={tool.name}
                      title={tool.name}
                      className="flex items-center justify-center w-6 h-6 rounded-md bg-secondary-foreground/10 text-secondary-foreground/70"
                    >
                      <TechIcon slug={tool.iconSlug} className="w-3.5 h-3.5" />
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 md:hidden text-left">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index % STEP_ICONS.length];
          return (
            <div
              key={step.label}
              className={cn(
                "flex gap-4 pb-6 border-l border-primary/20 pl-5 relative",
                index === steps.length - 1 && "border-none pb-0"
              )}
            >
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 rounded-full bg-secondary shadow-md border border-primary/20">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <div className="ml-5">
                <h3 className="font-medium mb-1">{step.label}</h3>
                <p className="text-sm text-secondary-foreground/70 leading-relaxed mb-2">
                  {step.description}
                </p>
                {step.tools && step.tools.length > 0 && (
                  <div className="flex gap-1.5">
                    {step.tools.map((tool) => (
                      <span
                        key={tool.name}
                        title={tool.name}
                        className="flex items-center justify-center w-6 h-6 rounded-md bg-secondary-foreground/10 text-secondary-foreground/70"
                      >
                        <TechIcon slug={tool.iconSlug} className="w-3.5 h-3.5" />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-[42rem] rounded-xl bg-secondary/70 p-6 text-left shadow-md">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
          {note.title}
        </h3>
        <p className="leading-relaxed text-secondary-foreground/80">{note.body}</p>
      </div>
    </motion.section>
  );
}
