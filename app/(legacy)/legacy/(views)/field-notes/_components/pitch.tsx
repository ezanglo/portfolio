import type { PortfolioPitch, PortfolioStat } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function FieldNotesPitch({
  pitch,
  stats,
  copy,
}: {
  pitch: PortfolioPitch;
  stats: PortfolioStat[];
  copy: ViewCopy;
}) {
  return (
    <section id="why" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.pitch}</SectionLabel>
      <p className="mb-10 text-[17px] leading-[1.6] text-view-fg-muted">{pitch.intro}</p>
      <div className="flex flex-col gap-8">
        {pitch.points.map((point) => (
          <div key={point.title}>
            <h3 className="font-serif text-xl font-semibold text-view-fg">{point.title}</h3>
            <p className="mt-2 text-[15.5px] leading-relaxed text-view-fg-muted">{point.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col divide-y divide-view-border border-y border-view-border sm:flex-row sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.key} className="flex-1 px-4 py-5 text-center">
            <div className="font-serif text-2xl font-semibold text-view-fg">{stat.value}</div>
            <div className="mt-1 text-[12px] uppercase tracking-wide text-view-fg-subtle">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
