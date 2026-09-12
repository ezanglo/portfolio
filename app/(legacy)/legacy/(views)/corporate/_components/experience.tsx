import type { NormalizedExperience } from "@/lib/portfolio/types";
import type { ViewCopy } from "@/lib/view-copy";
import SectionLabel from "./section-label";

function ExperienceRow({ experience }: { experience: NormalizedExperience }) {
  return (
    <div className="grid gap-2 border-t border-view-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[160px_1fr] sm:gap-6">
      <div className="text-sm font-medium text-view-fg-subtle">{experience.yearRange}</div>
      <div>
        <h3 className="text-base font-bold text-view-fg">{experience.title}</h3>
        <p className="text-sm font-medium text-view-accent">
          {experience.company} · {experience.location}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-view-fg-muted">{experience.description}</p>
      </div>
    </div>
  );
}

export default function CorporateExperience({
  experience,
  copy,
}: {
  experience: NormalizedExperience[];
  copy: ViewCopy;
}) {
  return (
    <section id="experience" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 py-16 sm:px-14">
      <SectionLabel>{copy.sectionLabels.experience}</SectionLabel>
      <div>
        {experience.map((e) => (
          <ExperienceRow key={e.id} experience={e} />
        ))}
      </div>
    </section>
  );
}
