import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { PortfolioIdentity } from "@/lib/portfolio/types";

export default function GalleryHero({
  identity,
  eyebrow,
}: {
  identity: PortfolioIdentity;
  eyebrow: string | null;
}) {
  return (
    <header className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 sm:grid-cols-[1.3fr_0.7fr] sm:px-8 sm:pt-24">
      <div className="flex flex-col justify-center">
        {eyebrow && (
          <span className="mb-4 inline-block w-fit rounded-full bg-[#DDEDFF] px-3 py-1 text-xs font-semibold text-[#0465AF]">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">{identity.name}</h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600">
          {identity.role}. {identity.yearsExperience}+ years across web, mobile, and desktop, now focused on React
          Native and AI.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {identity.cvUrl && (
            <a
              href={identity.cvUrl}
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Download CV
            </a>
          )}
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            <LinkedInLogoIcon />
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            <GitHubLogoIcon />
          </a>
        </div>
      </div>

      <div className="order-first sm:order-last">
        <div
          className="mx-auto aspect-square w-full max-w-[280px] rounded-2xl border border-neutral-200 bg-neutral-100 sm:mx-0"
          style={
            identity.portraitUrl
              ? { backgroundImage: `url(${identity.portraitUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        />
      </div>
    </header>
  );
}
