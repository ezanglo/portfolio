import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/site/contact-form";

/** brief §18 — the final CTA and the project-inquiry form combined into one section, now
 * that `/contact` is no longer a separate page. */
export function Contact() {
  return (
    <Section id="contact" size="lg" className="border-t border-border">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Contact"
          heading="Have a mobile product in mind? Let's turn it into something real."
          description="Tell me about the project — I'll reply with next steps."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
