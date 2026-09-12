import type { ViewCopy } from "@/lib/view-copy";
import FieldNotesContactForm from "./contact-form";

export default function FieldNotesContact({ email, copy }: { email: string; copy: ViewCopy }) {
  return (
    <section id="contact" className="mx-auto max-w-[640px] scroll-mt-8 px-6 py-20 text-center sm:px-14">
      <h2 className="font-serif text-3xl font-semibold text-view-fg">{copy.ctaHeading}</h2>
      <p className="mt-3 text-sm text-view-fg-subtle">
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <div className="mt-8 text-left">
        <FieldNotesContactForm />
      </div>
    </section>
  );
}
