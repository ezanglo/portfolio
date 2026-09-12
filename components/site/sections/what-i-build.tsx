import { Bot, Briefcase, Layers, Smartphone, Workflow } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import type { BuildCategory } from "@/content/what-i-build";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "consumer-mobile-apps": Smartphone,
  "saas-mobile-applications": Layers,
  "ai-powered-applications": Bot,
  "business-applications": Briefcase,
  "full-stack-products": Workflow,
};

/** brief §35 — "What I Build", distinct from `/services` (how the work is engaged). */
export function WhatIBuild({ items }: { items: BuildCategory[] }) {
  return (
    <Section id="what-i-build">
      <Container>
        <SectionHeading eyebrow="What I Build" heading="Production mobile products, end to end." align="center" className="mx-auto" />
        <BentoGrid className="mt-12 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[item.slug];
            return (
              <BentoGridItem
                key={item.slug}
                className={i === 0 || i === items.length - 1 ? "md:col-span-2" : ""}
                title={item.title}
                description={item.description}
                header={
                  <div className="flex h-full min-h-24 items-center justify-center rounded-lg bg-muted">
                    {Icon ? <Icon className="size-8 text-brand" /> : null}
                  </div>
                }
              />
            );
          })}
        </BentoGrid>
      </Container>
    </Section>
  );
}
