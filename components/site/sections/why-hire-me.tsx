import { ShieldCheck, Smartphone, Layers, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Technical & Product Ownership",
    description:
      "10+ years across engineering roles, independently taking a product from requirements and architecture through implementation, deployment, and production support.",
    span: "lg:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile Product Development",
    description: "Production iOS and Android apps built with React Native and Expo, from architecture to app store release.",
    span: "lg:col-span-1",
  },
  {
    icon: Layers,
    title: "Full-Stack Product Development",
    description: "The APIs, databases, and infrastructure behind the app (React/Next.js, PostgreSQL, and AWS), not just the mobile interface.",
    span: "lg:col-span-1",
  },
  {
    icon: RefreshCw,
    title: "Product Modernization",
    description:
      "Migrated legacy stacks to modern architectures in production, introducing Next.js, typed APIs, and Dockerized deployments into existing systems.",
    span: "lg:col-span-1",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Products",
    description: "AI models integrated as production features: routing, retrieval, and cost-aware model selection wired into real products.",
    span: "lg:col-span-1",
  },
];

const SHIP_STEPS = ["Discovery", "Architecture", "Development", "Testing", "Launch"];

/** Design brief "Why Hire Me" — the pull-quote states the philosophy, the step row shows the
 * concrete process behind it (folded in from the old standalone Process section), the cards
 * make the concrete case. One panel, one message told three ways. */
export function WhyHireMe() {
  return (
    <Section id="why-hire-me" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          heading="Full ownership, from product to production."
          description="One senior engineer who can own a mobile product from the interface to the infrastructure behind it."
        />

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="border-b border-border pb-6 text-right font-display text-(length:--text-h3) font-medium text-foreground/90">
            Ship in short, verifiable loops. Review every line. Keep improving after launch.
          </p>

          <div className="flex flex-wrap items-center gap-2 py-6">
            {SHIP_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) font-medium text-muted-foreground">
                  {step}
                </span>
                {i < SHIP_STEPS.length - 1 ? (
                  <ArrowRight aria-hidden className="size-3.5 text-muted-foreground/40" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className={cn(
                  "relative rounded-2xl border border-border bg-background p-5 transition-transform duration-200 hover:-translate-y-1",
                  card.span
                )}
              >
                <GlowingEffect proximity={70} spread={25} borderWidth={2} />
                <div className="mb-4 flex size-10 items-center justify-center rounded-[11px] border border-border text-brand">
                  <card.icon className="size-4.5" />
                </div>
                <h3 className="font-display text-(length:--text-small) font-semibold">{card.title}</h3>
                <p className="mt-1.5 text-(length:--text-small) leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
