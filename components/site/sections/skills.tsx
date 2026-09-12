import { Code2, Smartphone, Server, Database, Cloud, Bot, Wrench, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SkillsTabs, type SkillCategoryTab } from "@/components/site/skills-tabs";
import { CORE_STACK_LAYERS } from "@/components/site/stack-diagram";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Skill, SiteContent } from "@/content/types";

const AI_CHIPS = ["Claude", "Gemini", "Vertex AI", "OpenRouter"];
const AI_CHECKLIST = [
  "Understand before implementing",
  "Review every AI-generated diff like a teammate's pull request",
  "Architecture, security, and production decisions stay mine",
];

export function Skills({
  skills,
  aiStats,
}: {
  skills: Skill[];
  aiStats: SiteContent["aiStats"];
}) {
  const byCategory = (category: Skill["category"]) => skills.filter((s) => s.category === category);

  const iconClass = "size-4.5";
  const categories: SkillCategoryTab[] = [
    { num: "01", label: "Frontend", icon: <Code2 className={iconClass} />, skills: byCategory("frontend") },
    { num: "02", label: "Mobile", icon: <Smartphone className={iconClass} />, skills: byCategory("mobile") },
    { num: "03", label: "Backend", icon: <Server className={iconClass} />, skills: byCategory("backend") },
    { num: "04", label: "Database", icon: <Database className={iconClass} />, skills: byCategory("database") },
    { num: "05", label: "Cloud", icon: <Cloud className={iconClass} />, skills: byCategory("cloud") },
    { num: "06", label: "AI Integrations", icon: <Bot className={iconClass} />, pointsToAi: true },
    { num: "07", label: "Tools", icon: <Wrench className={iconClass} />, skills: byCategory("tools") },
  ];

  return (
    <Section id="skills" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          heading="Tools I work with."
          description="My production toolkit, grouped by where it sits in a mobile product."
        />

        <div className="mt-9 mb-10 flex flex-wrap items-center gap-1.5">
          {CORE_STACK_LAYERS.map((layer, i) => (
            <div key={layer.label} className="flex items-center gap-1.5">
              <span className="rounded-full border border-border bg-card px-3 py-1.5 text-(length:--text-caption) font-medium text-muted-foreground">
                {layer.label}
              </span>
              {i < CORE_STACK_LAYERS.length - 1 ? (
                <ArrowRight aria-hidden className="size-3 text-muted-foreground/40" />
              ) : null}
            </div>
          ))}
        </div>

        <SkillsTabs categories={categories} />

        <div id="ai-focus" className="mt-6 scroll-mt-20">
          <div className="relative rounded-2xl border border-border bg-card p-7">
            <GlowingEffect proximity={90} spread={35} borderWidth={2} />
            <h3 className="font-display text-(length:--text-h3) font-semibold">
              Mobile engineering, with an AI focus.
            </h3>
            <p className="mt-2 text-(length:--text-small) text-muted-foreground">
              I treat AI models as another backend service to integrate, not as a novelty.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {AI_CHIPS.map((chip) => (
                <span key={chip} className="rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) text-brand">
                  {chip}
                </span>
              ))}
            </div>
            <ul className="mt-5 space-y-2.5">
              {AI_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2 text-(length:--text-small)">
                  <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            {aiStats.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
                {aiStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-(length:--text-h3) font-semibold text-brand">{stat.value}</p>
                    <p className="text-(length:--text-caption) text-muted-foreground">{stat.label}</p>
                    <p className="mt-0.5 text-(length:--text-caption) text-muted-foreground/60">{stat.context}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
