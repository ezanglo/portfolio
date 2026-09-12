"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import SectionHeading from "@/components/legacy/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Skill, SiteConfig } from "@/lib/legacy/types";
import { ENGINE_DOT_COLOR, ENGINE_LABELS, isAiEngine } from "@/lib/portfolio/taxonomy";
import type { EngineKey } from "@/lib/portfolio/types";

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

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  mobile: "Mobile",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud & DevOps",
  integrations: "AI & Integrations",
  tools: "Tools & Others",
};

const CATEGORY_ORDER: Skill["category"][] = [
  "mobile",
  "integrations",
  "frontend",
  "backend",
  "database",
  "cloud",
  "tools",
];

const AI_ENGINES: EngineKey[] = ["claude", "gemini", "vertex"];

interface SkillsSectionProps {
  skills: Skill[];
  projects: Project[];
  siteConfig: SiteConfig | null;
}

export default function SkillsSection({ skills, projects, siteConfig }: SkillsSectionProps) {
  const { ref } = useSectionInView("Skills", 0.75);

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    skills: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.skills.length > 0);

  const aiIntro =
    siteConfig?.aiEngineering?.intro ||
    "I treat AI models as another backend service to integrate, not as a novelty. Every model I bring into a product is there to cut a specific cost or unlock a specific feature, chosen and swapped on evidence.";
  const aiProjects = projects.filter((project) => isAiEngine((project.aiEngine ?? null) as EngineKey | null));

  return (
    <motion.section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <SectionHeading>Tools I work with</SectionHeading>
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.category} className="text-left">
            <h3 className="text-sm font-medium text-secondary-foreground/70 mb-3">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2 text-md text-primary">
              {group.skills.map((skill, index) => (
                <motion.li
                  className="bg-secondary-foreground/10 py-1 px-3 rounded-xl"
                  key={skill.id}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={index}
                >
                  {skill.name}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {aiProjects.length > 0 && (
        <div className="mt-14 text-left">
          <h3 className="text-lg font-medium mb-3 text-center">AI engineering</h3>
          <p className="mb-6 max-w-[42rem] mx-auto text-center leading-7 text-sm text-secondary-foreground/80">
            {aiIntro}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {AI_ENGINES.map((engine) => (
              <span
                key={engine}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${ENGINE_DOT_COLOR[engine]}1a`,
                  color: ENGINE_DOT_COLOR[engine],
                }}
              >
                {ENGINE_LABELS[engine]}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiProjects.map((project) => {
              const engine = project.aiEngine as EngineKey;
              return (
                <Card key={project.id} className="bg-secondary/70 border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <span
                        className="shrink-0 text-[0.65rem] font-medium tracking-wide px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${ENGINE_DOT_COLOR[engine]}1a`,
                          color: ENGINE_DOT_COLOR[engine],
                        }}
                      >
                        {ENGINE_LABELS[engine]}
                      </span>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
}
