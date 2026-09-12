import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

export default function BlockworkSkills({ skills, copy }: { skills: string[]; copy: ViewCopy }) {
  return (
    <section id="skills" className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:px-12">
      <SectionLabel>{copy.sectionLabels.skills}</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="border-2 border-view-fg px-3 py-1.5 text-sm font-bold uppercase text-view-fg">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
