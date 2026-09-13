import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { SiteContent } from "@/content/types";

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
          description="A senior product engineer who moved into React Native through a full-stack background, not the other way around."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[22rem_1fr] lg:items-start">
          <div>
            <div className="relative rounded-2xl">
              <GlowingEffect disabled={false} proximity={80} spread={30} borderWidth={2} />
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <Image
                  src={site.portraitUrl}
                  alt={`${site.name} Anglo`}
                  width={440}
                  height={550}
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
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
                Open to senior engineering roles &amp; select product engagements, remote.
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
      </Container>
    </Section>
  );
}
