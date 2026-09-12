import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REACT_NATIVE_PROJECTS, SITE } from "@/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/project-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Senior React Native Developer for Hire — Ezra Anglo",
  description:
    "Hire a senior React Native developer with 10+ years of software engineering experience and a full-stack background — for new apps, MVPs, or existing codebases.",
  alternates: { canonical: "/react-native-developer" },
};

export const dynamic = "force-static";

/**
 * §21 SEO landing page for "React Native Developer" / "React Native Developer for Hire" —
 * built with genuine content (real project proof, real positioning), not a thin keyword page.
 */
export default function ReactNativeDeveloperPage() {
  return (
    <>
      <Section size="lg">
        <Container size="narrow">
          <SectionHeading
            as="h1"
            eyebrow="React Native Developer"
            heading="A senior React Native developer for hire, with a full-stack background."
            description={`${SITE.yearsExperience} years of software engineering experience, now focused on building production-ready iOS and Android applications with React Native, Expo, and TypeScript. The full-stack background means the app doesn't stop at the screen — I can work across the API, database, and infrastructure behind it too.`}
          />
          <Button size="lg" className="mt-8" asChild>
            <Link href="/#contact">
              Let&rsquo;s Build Your App
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SectionHeading eyebrow="Proof" heading="Real React Native projects." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REACT_NATIVE_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
