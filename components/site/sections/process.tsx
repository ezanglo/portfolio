import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { TracingBeam } from "@/components/ui/tracing-beam";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand the product, users, requirements, constraints, and technical goals.",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Define the mobile architecture, backend requirements, data model, APIs, integrations, and infrastructure.",
  },
  {
    number: "03",
    title: "Development",
    description: "Build the application using React Native, Expo, TypeScript, and the appropriate backend technologies.",
  },
  {
    number: "04",
    title: "Testing & Refinement",
    description: "Test functionality, edge cases, devices, performance, integrations, and production behavior.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Prepare builds, deployment, App Store / Google Play submission, production infrastructure, and launch.",
  },
];

/** brief §14 — reinforces ownership of the whole product, not just UI code. */
export function Process() {
  return (
    <Section id="process">
      <Container>
        <SectionHeading eyebrow="Development process" heading="From idea to App Store." align="center" className="mx-auto" />
        <div className="mt-12">
          <TracingBeam>
            <div className="space-y-10 pl-8 md:pl-4">
              {STEPS.map((step) => (
                <div key={step.number}>
                  <p className="text-(length:--text-caption) font-semibold text-brand">{step.number}</p>
                  <h3 className="mt-1 text-(length:--text-h3) font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-(--container-narrow) text-(length:--text-small) text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </Container>
    </Section>
  );
}
