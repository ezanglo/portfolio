import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faq";

/** brief §17. Server component — shadcn's accordion is progressive enhancement over real
 * markup, not a client-only reveal. Carries its own `FAQPage` JSON-LD (§12 structured data). */
export function Faq({ items }: { items: FaqItem[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id="faq">
      <Container size="narrow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <SectionHeading eyebrow="FAQ" heading="Questions clients actually ask." align="center" className="mx-auto" />
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-(length:--text-small) font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
