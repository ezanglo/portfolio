import type { PortfolioBio } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function FieldNotesAbout({ bio, copy }: { bio: PortfolioBio; copy: ViewCopy }) {
  const paragraphs = bio[copy.bioVariant];
  return (
    <section id="about" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.about}</SectionLabel>
      <div className="flex flex-col gap-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[17px] leading-[1.6] text-view-fg-muted">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
