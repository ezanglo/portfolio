import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";
import CorporateContactForm from "./contact-form";

export default function CorporateContact({ email, copy }: { email: string; copy: ViewCopy }) {
  return (
    <section id="contact" className="mx-auto max-w-[640px] scroll-mt-16 px-6 py-20 text-center sm:px-14">
      <SectionLabel>{copy.sectionLabels.contact}</SectionLabel>
      <h2 className="text-3xl font-extrabold text-view-fg">{copy.ctaHeading}</h2>
      <p className="mt-3 text-sm text-view-fg-subtle">
        Reach out directly at{" "}
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>{" "}
        or use the form below.
      </p>
      <div className="mt-8 text-left">
        <CorporateContactForm />
      </div>
    </section>
  );
}
