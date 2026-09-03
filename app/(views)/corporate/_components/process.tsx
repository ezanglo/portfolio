import type { PortfolioProcess } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import TechIcon from "@/components/tech-icon";
import SectionLabel from "./section-label";

export default function CorporateProcess({
  process,
  copy,
}: {
  process: PortfolioProcess;
  copy: ViewCopy;
}) {
  return (
    <section id="process" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.process}</SectionLabel>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-view-fg-muted">{process.intro}</p>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((step, i) => (
          <li key={step.label} className="rounded-xl border border-view-border bg-view-surface p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-view-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] font-bold text-view-fg">{step.label}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{step.description}</p>
            {step.tools.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {step.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="flex items-center gap-1 rounded-md bg-view-accent-soft px-1.5 py-0.5 text-[11px] font-semibold text-view-accent"
                  >
                    <TechIcon slug={tool.iconSlug} className="h-3 w-3" />
                    {tool.name}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
