import type { NormalizedExperience } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ExperienceRow({ experience }: { experience: NormalizedExperience }) {
  return (
    <div className="py-5">
      <h3 className="font-serif text-lg text-view-fg">
        {experience.title} at {experience.company}
      </h3>
      <p className="mt-1 text-[13px] text-view-accent">{experience.yearRange}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-view-fg-muted">{experience.description}</p>
    </div>
  );
}

export default function FieldNotesExperience({
  experience,
  copy,
}: {
  experience: NormalizedExperience[];
  copy: ViewCopy;
}) {
  return (
    <section id="experience" className="mx-auto max-w-[800px] scroll-mt-8 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.experience}</SectionLabel>
      <div className="divide-y divide-view-border">
        {experience.map((e) => (
          <ExperienceRow key={e.id} experience={e} />
        ))}
      </div>
    </section>
  );
}
