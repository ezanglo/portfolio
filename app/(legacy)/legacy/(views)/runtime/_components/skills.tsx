import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function RuntimeSkills({ skills, copy }: { skills: string[]; copy: ViewCopy }) {
  return (
    <section id="skills" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.skills}</SectionLabel>
      <div className="flex flex-wrap gap-2.5 font-mono">
        {skills.map((skill) => (
          <span key={skill} className="rounded bg-view-surface px-3 py-1.5 text-[13px] text-view-fg-muted">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
