import type { PortfolioProcess } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function RuntimeProcess({
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
      <ol className="flex flex-col border-y border-view-border divide-y divide-view-border">
        {process.steps.map((step, i) => (
          <li key={step.label} className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
            <div className="font-mono text-[12.5px] text-view-fg-subtle">
              {String(i + 1).padStart(2, "0")} / {String(process.steps.length).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-mono text-sm text-view-accent">{step.label.toLowerCase()}()</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-view-fg-muted">{step.description}</p>
              {step.tools.length > 0 && (
                <p className="mt-2 font-mono text-[11.5px] text-view-fg-subtle">
                  {step.tools.map((tool) => tool.iconSlug).join(" · ")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 border-l-2 border-view-accent bg-view-surface px-5 py-4">
        <p className="font-mono text-[11.5px] text-view-accent">
          {`// ${process.note.title.toLowerCase()}`}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{process.note.body}</p>
      </div>
    </section>
  );
}
