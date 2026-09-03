import type { PortfolioPitch, PortfolioStat } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function RuntimePitch({
  pitch,
  stats,
  copy,
}: {
  pitch: PortfolioPitch;
  stats: PortfolioStat[];
  copy: ViewCopy;
}) {
  return (
    <section id="why" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.pitch}</SectionLabel>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-view-fg-muted">{pitch.intro}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {pitch.points.map((point, i) => (
          <div key={point.title} className="rounded-lg border border-view-border bg-view-surface p-5">
            <p className="font-mono text-[11.5px] text-view-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-[15px] font-semibold text-view-fg">{point.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-view-fg-muted">{point.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-view-border pt-6 font-mono">
        {stats.map((stat) => (
          <div key={stat.key} className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-view-accent">{stat.value}</span>
            <span className="text-[11px] lowercase text-view-fg-subtle">{stat.label.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
