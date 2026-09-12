import { Smartphone, Code2, Server, Database, Plug, Cloud, Rocket, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SkillsTabs, type SkillCategoryTab } from "@/components/site/skills-tabs";
import { CORE_STACK_LAYERS } from "@/components/site/stack-diagram";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { Skill, SiteContent } from "@/content/types";

const AI_PLATFORM_NAMES = ["Claude", "OpenRouter", "ChatGPT", "Gemini", "Grok"];

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
  const aiSkills = byCategory("integrations").filter((s) => AI_PLATFORM_NAMES.includes(s.name));

  const iconClass = "size-4.5";
  const categories: SkillCategoryTab[] = [
    {
      num: "01",
      label: "Mobile",
      icon: <Smartphone className={iconClass} />,
      heading: "Mobile engineering",
      description: "Cross-platform product development with native-platform awareness and release discipline.",
      skills: byCategory("mobile"),
    },
    {
      num: "02",
      label: "Interface",
      icon: <Code2 className={iconClass} />,
      heading: "Interface engineering",
      description: "The web UI layer: frameworks, styling, and motion that ship fast and hold up under real use.",
      skills: byCategory("interface"),
    },
    {
      num: "03",
      label: "Backend",
      icon: <Server className={iconClass} />,
      heading: "Backend engineering",
      description: "The server frameworks behind these products, from current production stacks to earlier client work.",
      skills: byCategory("backend"),
    },
    {
      num: "04",
      label: "State & Data",
      icon: <Database className={iconClass} />,
      heading: "State & data engineering",
      description: "Databases and ORMs, plus the client-side state that keeps a product in sync.",
      skills: byCategory("data"),
    },
    {
      num: "05",
      label: "Integrations",
      icon: <Plug className={iconClass} />,
      heading: "Third-party integrations",
      description: "Payments, auth, BaaS platforms, analytics, error tracking, and the AI platforms wired into production.",
      skills: byCategory("integrations"),
    },
    {
      num: "06",
      label: "Cloud",
      icon: <Cloud className={iconClass} />,
      heading: "Cloud & hosting",
      description: "Where these products actually run, from managed platforms to self-hosted infrastructure.",
      skills: byCategory("cloud"),
    },
    {
      num: "07",
      label: "Delivery",
      icon: <Rocket className={iconClass} />,
      heading: "Shipping & delivery",
      description: "Version control, CI/CD, and the tooling that gets code from commit to production.",
      skills: byCategory("delivery"),
    },
  ];

  return (
    <Section id="skills" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          heading="Tools I work with."
          description="The frameworks, platforms, and AI tools behind my recent projects — grouped by where each sits in the stack."
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
              {aiSkills.map((skill) => (
                <span key={skill.name} className="rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) text-brand">
                  {skill.name}
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
