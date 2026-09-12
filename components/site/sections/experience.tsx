import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Timeline } from "@/components/ui/timeline";
import type { Experience } from "@/content/types";

/** Tags shown on each timeline card, derived from each role's own description (not stored
 * data) — matches the design brief's Experience table exactly. */
const TAGS_BY_SLUG: Record<string, string[]> = {
  "freelance-software-engineer-freelance": ["React", "Next.js", "TypeScript", "Tailwind", "PHP", "PostgreSQL"],
  "full-stack-developer-stream-tv-cayman": ["Laravel", "MySQL", "NextJS", "Docker", "AWS"],
  "senior-full-stack-developer-net-net-inc": ["React Native", "React"],
  "net-developer-quad-it-solutions": [".NET"],
  "freelance-software-developer-freelance": ["Mobile", "IoT"],
};

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  const timelineData = experience.map((e) => {
    const current = e.dateRange.includes("Present");
    const tags = TAGS_BY_SLUG[e.slug];
    return {
      title: e.yearRange,
      content: (
        <div className="pb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="font-display text-(length:--text-h3) font-semibold text-foreground">{e.title}</p>
            {current ? (
              <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-(length:--text-caption) font-semibold text-brand">
                Current role
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-(length:--text-small) font-semibold text-brand">
            {e.company} &middot; {e.location}
          </p>
          <p className="mt-3 max-w-xl text-(length:--text-small) leading-relaxed text-muted-foreground">
            {e.description}
          </p>
          {tags && tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-(length:--text-caption) text-secondary-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ),
    };
  });

  return (
    <Section id="experience" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          heading="Where I've worked."
          description="10+ years across freelance, agency, and in-house mobile and full-stack roles."
        />
      </Container>
      <Container>
        <Timeline data={timelineData} />
      </Container>
    </Section>
  );
}
