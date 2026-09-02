import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function AppStoreFooter({
  identity,
  bio,
}: {
  identity: PortfolioIdentity;
  bio: string[];
}) {
  return (
    <footer className="mx-auto mt-4 max-w-[1000px] border-t border-view-border px-6 py-10 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-md">
          <p className="text-sm leading-relaxed text-view-fg-muted">{bio.join(" ")}</p>
          <a href={`mailto:${identity.email}`} className="mt-2 inline-block text-sm font-semibold text-view-accent hover:underline">
            {identity.email}
          </a>
        </div>
        <SocialLinks linkedinUrl={identity.linkedinUrl} githubUrl={identity.githubUrl} className="rounded-full" />
      </div>
    </footer>
  );
}
