import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

/**
 * brief §16 — no testimonials exist, so this uses only genuine, verifiable signals: years of
 * experience, the actual project and company count, and real production launches. Nothing
 * here is a manufactured metric.
 */
export function SocialProof({
  yearsExperience,
  projectCount,
  companyCount,
}: {
  yearsExperience: string;
  projectCount: number;
  companyCount: number;
}) {
  const stats = [
    { value: yearsExperience, label: "Years of software engineering experience" },
    { value: String(projectCount), label: "Real projects shipped, across mobile, web, and full-stack" },
    { value: String(companyCount), label: "Companies and clients worked with, including two remote engagements outside the Philippines" },
  ];

  return (
    <Section id="proof">
      <Container>
        <SectionHeading eyebrow="Track record" heading="Real experience, not manufactured proof." align="center" className="mx-auto" />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-(length:--text-display) font-semibold text-brand">{stat.value}</p>
              <p className="mt-2 text-(length:--text-small) text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
