import type { NormalizedExperience } from "@/lib/portfolio/types";

export default function OpsUptimeLog({ experience }: { experience: NormalizedExperience[] }) {
  return (
    <section className="mx-auto mt-4 max-w-[1100px] px-4 sm:px-12">
      <div className="rounded-xl border border-view-border bg-view-surface p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-view-fg-subtle">Uptime log</p>
        <div className="mt-3 flex flex-col gap-1.5 font-mono text-[13px] text-view-fg-muted">
          {experience.map((e) => (
            <p key={e.id}>
              <span className="text-view-accent">
                [{e.dateStart}-{e.dateEnd}]
              </span>{" "}
              {e.title} @ {e.company}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
