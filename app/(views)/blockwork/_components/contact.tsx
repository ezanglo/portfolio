import type { ViewCopy } from "@/lib/view-copy";
import BlockworkContactForm from "./contact-form";

export default function BlockworkContact({ email, copy }: { email: string; copy: ViewCopy }) {
  return (
    <section id="contact" className="mx-auto max-w-[640px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-16 text-center sm:px-12">
      <h2 className="text-3xl font-black uppercase text-view-fg sm:text-[38px]">{copy.ctaHeading}</h2>
      <p className="mt-3 text-sm font-medium text-view-fg-subtle">
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <div className="mt-8 text-left">
        <BlockworkContactForm />
      </div>
    </section>
  );
}
