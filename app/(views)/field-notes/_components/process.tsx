import type { PortfolioProcess } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function FieldNotesProcess({
  process,
  copy,
}: {
  process: PortfolioProcess;
  copy: ViewCopy;
}) {
  return (
    <section id="process" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.process}</SectionLabel>
      <p className="mb-10 text-[17px] leading-[1.6] text-view-fg-muted">{process.intro}</p>
      <ol className="flex flex-col divide-y divide-view-border">
        {process.steps.map((step, i) => (
          <li key={step.label} className="py-6 first:pt-0">
            <h3 className="font-serif text-lg text-view-fg">
              <span className="text-view-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="mx-3 text-view-fg-subtle">—</span>
              {step.label}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-view-fg-muted">{step.description}</p>
            {step.tools.length > 0 && (
              <p className="mt-2 text-[13px] text-view-accent">
                {step.tools.map((tool) => tool.name).join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 border-t border-view-border pt-6">
        <h3 className="font-serif text-lg text-view-fg">{process.note.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-view-fg-muted">{process.note.body}</p>
      </div>
    </section>
  );
}
