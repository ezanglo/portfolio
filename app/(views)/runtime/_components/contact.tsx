import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";
import RuntimeContactForm from "./contact-form";

export default function RuntimeContact({ email, copy }: { email: string; copy: ViewCopy }) {
  return (
    <section id="contact" className="mx-auto max-w-[640px] scroll-mt-16 px-6 py-20 text-center sm:px-14">
      <SectionLabel>{copy.sectionLabels.contact}</SectionLabel>
      <h2 className="text-3xl font-bold text-view-fg">{copy.ctaHeading}</h2>
      <p className="mt-3 font-mono text-sm text-view-fg-subtle">
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <div className="mt-8 text-left">
        <RuntimeContactForm />
      </div>
    </section>
  );
}
