import type { ViewCopy } from "@/lib/view-copy";
import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function BlockworkHero({ identity, copy }: { identity: PortfolioIdentity; copy: ViewCopy }) {
  return (
    <section id="home" className="mx-auto grid max-w-[1160px] scroll-mt-16 px-6 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:px-12 sm:pt-16">
      <div className="border-b-[3px] border-view-fg pb-10 sm:border-b-0 sm:border-r-[3px] sm:pb-0 sm:pr-10">
        <h1 className="text-4xl font-black uppercase leading-[0.98] tracking-tight text-view-fg sm:text-[62px]">
          {copy.h1}
        </h1>
        <p className="mt-5 max-w-xl text-base font-medium text-view-fg-muted">{copy.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="border-[3px] border-view-fg bg-view-accent px-5 py-2.5 text-sm font-black uppercase text-view-accent-fg"
          >
            {copy.ctaButton}
          </a>
          {identity.cvUrl && (
            <a href={identity.cvUrl} className="border-[3px] border-view-fg px-5 py-2.5 text-sm font-black uppercase text-view-fg">
              Download CV
            </a>
          )}
          <SocialLinks
            linkedinUrl={identity.linkedinUrl}
            githubUrl={identity.githubUrl}
            className="rounded-none border-[3px]"
          />
        </div>
      </div>
      <div className="pt-10 sm:pt-0 sm:pl-10">
        <div
          className="aspect-square w-full border-[3px] border-view-fg bg-view-surface-2"
          style={
            identity.portraitUrl
              ? { backgroundImage: `url(${identity.portraitUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        >
          {!identity.portraitUrl && (
            <div className="flex h-full items-center justify-center text-xs font-black uppercase tracking-widest text-view-fg-subtle">
              Portrait Photo
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
