import type { ViewCopy } from "@/lib/view-copy";
import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function CorporateHero({
  identity,
  copy,
}: {
  identity: PortfolioIdentity;
  copy: ViewCopy;
}) {
  return (
    <section id="home" className="mx-auto grid max-w-[1100px] scroll-mt-16 gap-10 px-6 pt-16 sm:grid-cols-[1.3fr_0.7fr] sm:px-14 sm:pt-24">
      <div className="flex flex-col justify-center">
        {copy.eyebrow && (
          <span className="mb-4 inline-block w-fit rounded-full bg-view-accent-soft px-3 py-1 text-xs font-semibold text-view-accent">
            {copy.eyebrow}
          </span>
        )}
        <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-view-fg sm:text-[56px]">{copy.h1}</h1>
        <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-view-fg-muted">{copy.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-lg bg-view-accent px-5 py-2.5 text-sm font-semibold text-view-accent-fg transition hover:bg-[var(--view-accent-hover)]"
          >
            {copy.ctaButton}
          </a>
          {identity.cvUrl && (
            <a
              href={identity.cvUrl}
              className="rounded-lg border border-view-border px-5 py-2.5 text-sm font-semibold text-view-fg transition hover:border-view-fg-subtle"
            >
              Download CV
            </a>
          )}
          <SocialLinks linkedinUrl={identity.linkedinUrl} githubUrl={identity.githubUrl} className="rounded-lg" />
        </div>
      </div>
      <div className="order-first sm:order-last">
        <div
          className="aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-view-border bg-view-surface-2 mx-auto sm:mx-0"
          style={
            identity.portraitUrl
              ? { backgroundImage: `url(${identity.portraitUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        >
          {!identity.portraitUrl && (
            <div className="flex h-full items-center justify-center text-xs font-mono uppercase tracking-widest text-view-fg-subtle">
              Portrait Photo
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
