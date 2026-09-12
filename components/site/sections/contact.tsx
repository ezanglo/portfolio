import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/site/contact-form";
import { SocialIcons } from "@/components/site/social-icons";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { SiteContent } from "@/content/types";

export function Contact({ site }: { site: SiteContent }) {
  return (
    <Section id="contact" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          heading="Let's talk."
          description="React Native, full-stack, and AI-powered work — open to freelance projects and full-time roles alike."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-7 sm:p-8">
            <GlowingEffect proximity={80} spread={30} borderWidth={2} />
            <div>
              <p className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
                Get in touch
              </p>
              <h3 className="mt-3 font-display text-(length:--text-h3) font-semibold">Got something in mind?</h3>
              <p className="mt-2.5 text-(length:--text-small) leading-relaxed text-muted-foreground">
                Send a message with a bit of detail about your project and I&rsquo;ll get back to you.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] border border-border text-brand">
                    <Mail className="size-4" />
                  </span>
                  <div>
                    <p className="text-(length:--text-caption) text-muted-foreground">Email</p>
                    <a href={`mailto:${site.email}`} className="text-(length:--text-small) font-medium hover:text-brand">
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] border border-border text-brand">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-(length:--text-caption) text-muted-foreground">Location</p>
                    <p className="text-(length:--text-small) font-medium">Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-border pt-5">
              <p className="mb-3 text-(length:--text-caption) text-muted-foreground">Connect</p>
              <SocialIcons linkedinUrl={site.linkedinUrl} githubUrl={site.githubUrl} email={site.email} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            <GlowingEffect proximity={80} spread={30} borderWidth={2} />
            <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-5 py-3.5">
              <span className="size-2.5 rounded-full bg-[#ee6a5f]" />
              <span className="size-2.5 rounded-full bg-[#f5bd4f]" />
              <span className="size-2.5 rounded-full bg-[#61c554]" />
              <span className="ml-1.5 text-(length:--text-caption) tracking-(--text-caption-tracking) text-muted-foreground uppercase">
                New message
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
