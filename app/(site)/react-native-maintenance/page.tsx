import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, Layers, Wrench } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "React Native App Maintenance & Takeover | Ezra Anglo",
  description:
    "Already have a React Native app? I take over existing codebases (debugging, refactoring, modernizing, and extending them) without a rebuild from scratch.",
  alternates: { canonical: "/react-native-maintenance" },
};

export const dynamic = "force-static";

const CAPABILITIES = [
  {
    icon: Bug,
    title: "Debug what's broken",
    description: "Track down crashes, performance issues, and inconsistent behavior across devices in a codebase I didn't write.",
  },
  {
    icon: Wrench,
    title: "Refactor and modernize",
    description: "Bring an aging React Native codebase up to current patterns and dependencies without a full rewrite.",
  },
  {
    icon: Layers,
    title: "Extend safely",
    description: "Add new features and integrations, including full-stack and AI-powered ones, without destabilizing what already works.",
  },
];

/**
 * §21's one landing page with a genuinely distinct audience: companies with an existing app,
 * not a new build. Distinct content from /services rather than a thin duplicate.
 */
export default function ReactNativeMaintenancePage() {
  return (
    <>
      <Section size="lg">
        <Container size="narrow">
          <SectionHeading
            as="h1"
            eyebrow="Existing React Native Applications"
            heading="Already have a React Native app? I can take it from here."
            description="Taking over someone else's codebase is a different skill from greenfield development: reading the existing structure, understanding the decisions already made, and making changes that don't break what's already shipped. That's the work here, not a rebuild from scratch."
          />
          <Button size="lg" className="mt-8" asChild>
            <Link href="/#contact">
              Let&rsquo;s Talk About Your App
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SectionHeading eyebrow="What this looks like" heading="Three kinds of engagement." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="rounded-xl border border-border bg-card p-6">
                <cap.icon className="size-6 text-brand" />
                <h3 className="mt-4 text-(length:--text-h3) font-semibold">{cap.title}</h3>
                <p className="mt-2 text-(length:--text-small) text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
