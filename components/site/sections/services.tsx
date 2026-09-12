import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SITE_URL } from "@/lib/site";

/** brief §6 — five service lines, folded into the one-page portfolio. Carries its own
 * `ProfessionalService` JSON-LD now that `/services` is no longer a standalone indexable
 * page (§12 structured data). */
export function Services({ siteName, name }: { siteName: string; name: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    provider: { "@type": "Person", name, url: SITE_URL },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.description },
      })),
    },
  };

  return (
    <Section id="services" className="border-t border-border">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <SectionHeading
          eyebrow="Services"
          heading="Five ways to work with me."
          description="React Native and Expo stay the center of gravity. Full-stack is the capability that lets me deliver a complete product, not a hand-off between specialists — and AI is a supporting line, added where it earns its place."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.slug} className="relative rounded-xl border border-border bg-card p-6">
              <GlowingEffect disabled={false} proximity={80} spread={30} borderWidth={2} />
              <h3 className="text-(length:--text-h3) font-semibold">{service.title}</h3>
              <p className="mt-2 text-(length:--text-small) leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <Button variant="link" className="mt-3 px-0" asChild>
                <Link href="/#contact">
                  Start a project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
