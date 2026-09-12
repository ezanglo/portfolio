import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import WorldMap from "@/components/ui/world-map";
import type { SiteContent } from "@/content/types";

/** Real remote engagements from `content/experience.ts` — Stream.TV (Cayman) and NET(net)
 * Inc. (Kentucky) — not invented client locations. */
const REMOTE_WORK_DOTS = [
  {
    start: { lat: 14.5995, lng: 120.9842, label: "Philippines" },
    end: { lat: 19.3133, lng: -81.2546, label: "Cayman Islands" },
  },
  {
    start: { lat: 14.5995, lng: 120.9842, label: "Philippines" },
    end: { lat: 38.2098, lng: -84.5586, label: "Kentucky, USA" },
  },
];

export function About({
  site,
  projectCount,
  companyCount,
}: {
  site: SiteContent;
  projectCount: number;
  companyCount: number;
}) {
  const stats = [
    { value: site.yearsExperience, label: "years of experience" },
    { value: "iOS + Android", label: "core platforms" },
    { value: String(projectCount), label: "real projects worked on" },
    { value: String(companyCount), label: "companies & clients worked with" },
  ];

  return (
    <Section id="about" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="About"
          heading="A little about me."
          description="I'm a mobile developer who moved into React Native through a full-stack background, not the other way around."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[17rem_1fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={site.portraitUrl}
                alt={`${site.name} Anglo`}
                width={400}
                height={500}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
            <div className="mt-3.5 text-center">
              <p className="font-display text-(length:--text-small) font-semibold">{site.name} Anglo</p>
              <p className="text-(length:--text-caption) text-muted-foreground">{site.role}</p>
              <p className="text-(length:--text-caption) text-muted-foreground">Philippines</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-(length:--text-h3) font-semibold">
              I care about how an app works and how it feels to use.
            </h3>
            <div className="mt-4 space-y-4 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground text-pretty">
              {site.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-9 border-t border-b border-border py-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-lg font-semibold">{stat.value}</p>
                  <p className="text-(length:--text-caption) text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4">
              <div className="flex items-center gap-2.5 text-(length:--text-small)">
                <span className="size-2 rounded-full bg-brand" />
                Currently: Freelance Software Engineer, Remote.
              </div>
            </div>

            <a
              href="#experience"
              className="mt-5 inline-flex items-center gap-1.5 text-(length:--text-small) font-semibold text-brand"
            >
              See my experience
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
          <GlowingEffect proximity={90} spread={35} borderWidth={2} />
          <p className="mb-4 text-(length:--text-small) font-semibold">Based in the Philippines, working globally.</p>
          <WorldMap dots={REMOTE_WORK_DOTS} lineColor="#f0924f" />
        </div>
      </Container>
    </Section>
  );
}
