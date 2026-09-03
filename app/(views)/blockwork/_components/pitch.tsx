import type { PortfolioPitch, PortfolioStat } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function BlockworkPitch({
  pitch,
  stats,
  copy,
}: {
  pitch: PortfolioPitch;
  stats: PortfolioStat[];
  copy: ViewCopy;
}) {
  return (
    <section className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:px-12" id="why">
      <SectionLabel>{copy.sectionLabels.pitch}</SectionLabel>
      <p className="mb-6 max-w-2xl text-sm font-medium leading-relaxed text-view-fg-muted">
        {pitch.intro}
      </p>
      <div className="grid grid-cols-1 border-t-[3px] border-view-fg sm:grid-cols-2 sm:border-l-[3px]">
        {pitch.points.map((point) => (
          <div key={point.title} className="border-b-[3px] border-r-[3px] border-view-fg p-5">
            <h3 className="text-base font-black uppercase text-view-fg">{point.title}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-view-fg-muted">
              {point.description}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 border-[3px] border-t-0 border-view-fg sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="border-b-2 border-r-2 border-view-fg px-4 py-5 text-center last:border-r-0"
          >
            <div className="text-2xl font-black text-view-fg">{stat.value}</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-view-fg-subtle">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
