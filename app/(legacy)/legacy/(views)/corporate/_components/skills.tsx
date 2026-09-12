import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function CorporateSkills({ skills, copy }: { skills: string[]; copy: ViewCopy }) {
  return (
    <section id="skills" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.skills}</SectionLabel>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-view-border px-3 py-1.5 text-sm text-view-fg-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
