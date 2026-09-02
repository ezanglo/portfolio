import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function SocialLinks({
  linkedinUrl,
  githubUrl,
  className = "rounded-full",
}: {
  linkedinUrl: string;
  githubUrl: string;
  className?: string;
}) {
  const linkClass = cn(
    "flex h-9 w-9 items-center justify-center border border-view-border text-view-fg-muted transition hover:border-view-fg-subtle hover:text-view-fg",
    className
  );

  return (
    <div className="flex items-center gap-2">
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={linkClass}>
        <LinkedInLogoIcon />
      </a>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={linkClass}>
        <GitHubLogoIcon />
      </a>
    </div>
  );
}
