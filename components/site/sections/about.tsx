import Image from "next/image";
import { Download } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { TechBadgeList } from "@/components/site/tech-badge";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import type { Experience, SiteContent, Skill } from "@/content/types";

const SKILL_CATEGORIES: { label: string; category: Skill["category"] }[] = [
  { label: "Mobile", category: "mobile" },
  { label: "Frontend", category: "frontend" },
  { label: "Backend", category: "backend" },
  { label: "Database", category: "database" },
  { label: "Cloud", category: "cloud" },
  { label: "AI Integrations", category: "integrations" },
  { label: "Tools", category: "tools" },
];

/** brief §20 — folded into the one-page portfolio. Skips "why full-stack matters" and "how I
 * work" here since `FullStackDifferentiator` and `Process`/`AiSection` already cover that
 * ground earlier on the same page — no need to say it twice. */
export function About({ site, experience, skills }: { site: SiteContent; experience: Experience[]; skills: Skill[] }) {
  const timelineData = experience.map((e) => ({
    title: e.yearRange,
    content: (
      <div className="pb-4">
        <p className="font-semibold">{e.title}</p>
        <p className="text-(length:--text-small) text-muted-foreground">
          {e.company} — {e.location}
        </p>
        <p className="mt-2 text-(length:--text-small) text-muted-foreground">{e.description}</p>
      </div>
    ),
  }));

  return (
    <Section id="about" className="border-t border-border">
      <Container size="narrow">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <Image
            src={site.portraitUrl}
            alt={site.name}
            width={112}
            height={112}
            className="rounded-full object-cover"
          />
          <SectionHeading eyebrow="About" heading="Who I am" description={site.role} />
        </div>

        <div className="mt-10 space-y-6 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
          <div>
            <h3 className="text-(length:--text-h3) font-semibold text-foreground">My background</h3>
            <p className="mt-2">
              {site.yearsExperience} years of software engineering experience across web, mobile, backend, cloud,
              and AI. {site.bio[0]}
            </p>
          </div>
          <div>
            <h3 className="text-(length:--text-h3) font-semibold text-foreground">What I focus on today</h3>
            <p className="mt-2">{site.bio[1]}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-(length:--text-h3) font-semibold">Skills</h3>
          <div className="mt-4 space-y-5">
            {SKILL_CATEGORIES.map(({ label, category }) => {
              const names = skills.filter((s) => s.category === category).map((s) => s.name);
              if (names.length === 0) return null;
              return (
                <div key={category}>
                  <p className="text-(length:--text-small) font-semibold">{label}</p>
                  <div className="mt-2">
                    <TechBadgeList items={names} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-(length:--text-small) text-muted-foreground">
            Most of the work below was built for companies and clients, so not every repository is public — see
            individual project pages for links where they exist.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <a href={site.cvUrl} target="_blank" rel="noreferrer">
              <Download className="size-4" />
              Download CV
            </a>
          </Button>
        </div>
      </Container>

      <div className="mt-6">
        <Container>
          <SectionHeading eyebrow="Experience" heading="A concise timeline." align="center" className="mx-auto" />
        </Container>
        <Timeline data={timelineData} />
      </div>
    </Section>
  );
}
