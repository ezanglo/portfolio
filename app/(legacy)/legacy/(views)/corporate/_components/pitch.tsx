import type { PortfolioPitch, PortfolioStat } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function CorporatePitch({
  pitch,
  stats,
  copy,
}: {
  pitch: PortfolioPitch;
  stats: PortfolioStat[];
  copy: ViewCopy;
}) {
  const [primary, ...secondary] = pitch.points;

  return (
    <section id="why" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.pitch}</SectionLabel>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-view-fg-muted">{pitch.intro}</p>

      <div className="grid gap-4 md:grid-cols-5">
        {primary && (
          <div className="rounded-xl border border-view-border bg-view-surface p-6 md:col-span-3">
            <h3 className="text-lg font-bold text-view-fg">{primary.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{primary.description}</p>
          </div>
        )}
        <div className="flex flex-col gap-4 md:col-span-2">
          {secondary.map((point) => (
            <div
              key={point.title}
              className="flex-1 rounded-xl border border-view-border bg-view-surface p-5"
            >
              <h3 className="text-[15px] font-bold text-view-fg">{point.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-view-fg-muted">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-view-border bg-view-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.key} className="bg-view-page px-5 py-6 text-center">
            <dt className="text-2xl font-extrabold text-view-accent">{stat.value}</dt>
            <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-view-fg-subtle">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
