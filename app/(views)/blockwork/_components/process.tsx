import type { PortfolioProcess } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function BlockworkProcess({
  process,
  copy,
}: {
  process: PortfolioProcess;
  copy: ViewCopy;
}) {
  return (
    <section className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:px-12" id="process">
      <SectionLabel>{copy.sectionLabels.process}</SectionLabel>
      <p className="mb-6 max-w-2xl text-sm font-medium leading-relaxed text-view-fg-muted">
        {process.intro}
      </p>
      <ol className="grid grid-cols-1 border-t-[3px] border-view-fg sm:grid-cols-3 sm:border-l-[3px]">
        {process.steps.map((step, i) => (
          <li key={step.label} className="border-b-[3px] border-r-[3px] border-view-fg p-5">
            <div className="flex items-center gap-2">
              <span className="border-2 border-view-fg px-1.5 text-[13px] font-black text-view-fg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-black uppercase text-view-fg">{step.label}</h3>
            </div>
            <p className="mt-2 text-sm font-medium leading-relaxed text-view-fg-muted">
              {step.description}
            </p>
            {step.tools.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {step.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="border-2 border-view-fg px-1.5 py-0.5 text-[11px] font-bold uppercase text-view-fg"
                  >
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
