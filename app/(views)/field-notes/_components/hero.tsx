import type { ViewCopy } from "@/lib/view-copy";
import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function FieldNotesHero({ identity, copy }: { identity: PortfolioIdentity; copy: ViewCopy }) {
  return (
    <section id="home" className="mx-auto max-w-[960px] scroll-mt-8 px-6 pt-8 text-center sm:px-14">
      <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-view-accent">{copy.eyebrow}</p>
      <h1 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.15] text-view-fg sm:text-[52px]">
        {copy.h1}
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-view-fg-muted">{copy.tagline}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="#contact" className="rounded-[2px] bg-view-accent px-5 py-2.5 text-sm font-semibold text-view-accent-fg">
          {copy.ctaButton}
        </a>
        {identity.cvUrl && (
          <a href={identity.cvUrl} className="rounded-[2px] border border-view-border px-5 py-2.5 text-sm font-semibold text-view-fg">
            Download CV
          </a>
        )}
        <SocialLinks linkedinUrl={identity.linkedinUrl} githubUrl={identity.githubUrl} className="rounded-[2px]" />
      </div>
    </section>
  );
}
