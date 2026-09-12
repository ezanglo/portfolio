import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function FieldNotesSkills({ skills, copy }: { skills: string[]; copy: ViewCopy }) {
  return (
    <section id="skills" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.skills}</SectionLabel>
      <p className="flex flex-wrap gap-x-[22px] gap-y-2 text-[15px] leading-relaxed text-view-fg-muted">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </p>
    </section>
  );
}
