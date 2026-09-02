import type { PortfolioBio } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function BlockworkAbout({ bio, copy }: { bio: PortfolioBio; copy: ViewCopy }) {
  const paragraphs = bio[copy.bioVariant];
  return (
    <section id="about" className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:grid sm:grid-cols-[220px_1fr] sm:px-12">
      <SectionLabel>{copy.sectionLabels.about}</SectionLabel>
      <div className="grid gap-6 sm:grid-cols-2">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm font-medium leading-relaxed text-view-fg-muted">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
