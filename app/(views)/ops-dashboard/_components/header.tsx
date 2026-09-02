import type { PortfolioIdentity } from "@/lib/portfolio/types";
import SocialLinks from "@/components/views/shared/social-links";

export default function OpsHeader({ identity }: { identity: PortfolioIdentity }) {
  return (
    <header className="mx-auto flex max-w-[1100px] flex-col gap-3 px-4 pt-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-view-accent">System online</p>
        <h1 className="mt-1 text-[28px] font-bold text-view-fg">{identity.name}: Ops Console</h1>
      </div>
      <div className="flex items-center gap-3">
        <a href={`mailto:${identity.email}`} className="font-mono text-sm text-view-accent hover:underline">
          contact →
        </a>
        <SocialLinks linkedinUrl={identity.linkedinUrl} githubUrl={identity.githubUrl} className="rounded-lg" />
      </div>
    </header>
  );
}
