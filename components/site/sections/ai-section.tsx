import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { TechBadgeList } from "@/components/site/tech-badge";
import type { AiStat, Project } from "@/content/types";

const WORKFLOW_STEPS = ["Understand", "Plan", "AI-assisted implementation", "Review", "Test", "Ship"];

/**
 * brief §13 — AI stays the third rung of React Native -> Full-Stack -> AI, never the
 * headline. Two distinct halves: real AI-powered products, and the AI-assisted engineering
 * workflow, with the "AI accelerates development, experience guides the decisions" line
 * stated plainly rather than left implicit.
 */
export function AiSection({ aiProjects, aiStats }: { aiProjects: Project[]; aiStats: AiStat[] }) {
  return (
    <Section id="ai" className="bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="AI"
          heading="AI-powered products. AI-accelerated development."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-(length:--text-h3) font-semibold">Building AI-powered products</h3>
            <p className="mt-2 text-(length:--text-small) text-muted-foreground">
              Real projects with LLM capability integrated as a backend service, not a demo.
            </p>
            <ul className="mt-6 space-y-4">
              {aiProjects.map((project) => (
                <li key={project.slug} className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold">{project.title}</p>
                  <p className="mt-1 text-(length:--text-small) text-muted-foreground">{project.description}</p>
                  {project.aiPlatform ? (
                    <div className="mt-3">
                      <TechBadgeList items={[project.aiPlatform]} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            {aiStats.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {aiStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border p-4">
                    <p className="text-(length:--text-h2) font-semibold text-brand">{stat.value}</p>
                    <p className="text-(length:--text-caption) text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-(length:--text-caption) text-muted-foreground/70">{stat.context}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-(length:--text-h3) font-semibold">AI-assisted engineering</h3>
            <p className="mt-2 text-(length:--text-small) text-muted-foreground">
              I use modern AI development tools such as Claude Code to accelerate codebase exploration,
              implementation, debugging, refactoring, testing, and repetitive development work.
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-card px-3 py-1.5 text-(length:--text-caption) font-medium">
                    {step}
                  </span>
                  {i < WORKFLOW_STEPS.length - 1 ? (
                    <ArrowRight aria-hidden className="size-3.5 text-muted-foreground/60" />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-2 border-brand pl-4 text-(length:--text-body) font-medium text-pretty">
              AI accelerates development. Experience guides the engineering decisions.
            </p>
            <p className="mt-3 text-(length:--text-small) text-muted-foreground">
              Architecture, security, maintainability, and production decisions stay my responsibility.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
