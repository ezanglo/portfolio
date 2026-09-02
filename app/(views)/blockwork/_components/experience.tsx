import type { NormalizedExperience } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ExperienceRow({ experience }: { experience: NormalizedExperience }) {
  return (
    <div className="grid gap-2 border-t-2 border-view-fg py-6 first:border-t-0 first:pt-0 sm:grid-cols-[170px_1fr] sm:gap-6">
      <div className="text-sm font-black text-view-fg-subtle">{experience.yearRange}</div>
      <div>
        <h3 className="text-base font-black uppercase text-view-fg">{experience.title}</h3>
        <p className="text-sm font-bold text-view-accent">
          {experience.company}, {experience.location}
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-view-fg-muted">{experience.description}</p>
      </div>
    </div>
  );
}

export default function BlockworkExperience({
  experience,
  copy,
}: {
  experience: NormalizedExperience[];
  copy: ViewCopy;
}) {
  return (
    <section id="experience" className="mx-auto max-w-[1160px] scroll-mt-16 border-t-[3px] border-view-fg px-6 py-14 sm:px-12">
      <SectionLabel>{copy.sectionLabels.experience}</SectionLabel>
      <div>
        {experience.map((e) => (
          <ExperienceRow key={e.id} experience={e} />
        ))}
      </div>
    </section>
  );
}
