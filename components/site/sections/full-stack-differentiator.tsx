import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CORE_STACK_LAYERS, StackDiagram } from "@/components/site/stack-diagram";

/** brief §5 — "More than a mobile developer." A business advantage, not a skills list. */
export function FullStackDifferentiator() {
  return (
    <Section id="full-stack" className="bg-muted/40">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="The core differentiator"
            heading="More than a mobile developer."
            description="A mobile application rarely exists on its own. Behind the interface are APIs, authentication, databases, integrations, infrastructure, analytics, notifications, and business logic. My full-stack background means I can work across that entire system — not just the mobile UI. I can own the product beyond the screen."
          />
        </div>
        <StackDiagram layers={CORE_STACK_LAYERS} />
      </Container>
    </Section>
  );
}
