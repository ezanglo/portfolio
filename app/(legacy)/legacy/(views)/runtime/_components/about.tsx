import type { PortfolioBio } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function RuntimeAbout({ bio, copy }: { bio: PortfolioBio; copy: ViewCopy }) {
  const paragraphs = bio[copy.bioVariant];
  return (
    <section id="about" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.about}</SectionLabel>
      <div className="grid gap-8 sm:grid-cols-2">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-view-fg-muted">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
