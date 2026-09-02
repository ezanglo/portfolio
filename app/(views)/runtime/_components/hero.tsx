import type { ViewCopy } from "@/lib/view-copy";
import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function RuntimeHero({ identity, copy }: { identity: PortfolioIdentity; copy: ViewCopy }) {
  return (
    <section id="home" className="mx-auto max-w-[1100px] scroll-mt-16 px-6 pt-20 sm:px-14 sm:pt-28">
      <p className="mb-4 font-mono text-sm text-view-accent">{copy.eyebrow}</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.02em] text-view-fg sm:text-[64px]">{copy.h1}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-view-fg-muted">{copy.tagline}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#contact" className="rounded px-5 py-2.5 text-sm font-semibold text-view-accent-fg bg-view-accent">
          {copy.ctaButton}
        </a>
        {identity.cvUrl && (
          <a href={identity.cvUrl} className="rounded border border-view-border px-5 py-2.5 text-sm font-semibold text-view-fg">
            download cv
          </a>
        )}
        <SocialLinks linkedinUrl={identity.linkedinUrl} githubUrl={identity.githubUrl} className="rounded" />
      </div>
    </section>
  );
}
