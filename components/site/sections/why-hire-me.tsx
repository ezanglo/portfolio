import { Rocket, Smartphone, Layers, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    icon: Rocket,
    title: "10+ Years of Engineering Experience",
    description:
      "I've worked across software engineering, web, backend, mobile, infrastructure, and production systems.",
    span: "lg:col-span-2",
  },
  {
    icon: Smartphone,
    title: "React Native Focus",
    description: "I specialize in building mobile applications with React Native and Expo.",
    span: "lg:col-span-1",
  },
  {
    icon: Layers,
    title: "Full-Stack Capability",
    description: "I can work across the mobile app and the systems behind it.",
    span: "lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Production Mindset",
    description:
      "The goal isn't just to make something work. It's to build something maintainable, testable, deployable, and ready for real users.",
    span: "lg:col-span-1",
  },
  {
    icon: Sparkles,
    title: "AI-Accelerated Workflow",
    description: "Modern AI tools help me move faster while engineering judgment remains human-led.",
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
          eyebrow="Why Work With Me"
          heading="What I bring to a team."
          description="One person who can own a mobile product from the interface to the infrastructure behind it."
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
