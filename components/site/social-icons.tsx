import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

/** brief §3/§21 — the icon row used in the hero and the contact panel. Plain bordered tiles,
 * one accent on hover, matching the icon-tile treatment used across the page. */
export function SocialIcons({
  linkedinUrl,
  githubUrl,
  email,
  size = "default",
  className,
}: {
  linkedinUrl: string;
  githubUrl: string;
  email: string;
  size?: "default" | "sm";
  className?: string;
}) {
  const dim = size === "sm" ? "size-9" : "size-10";
  const linkClass = cn(
    "flex items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand",
    dim,
    className
  );

  return (
    <div className="flex items-center gap-2.5">
      <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={linkClass}>
        <LinkedInLogoIcon className="size-4" />
      </a>
      <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className={linkClass}>
        <GitHubLogoIcon className="size-4" />
      </a>
      <a href={`mailto:${email}`} aria-label="Email" className={linkClass}>
        <Mail className="size-4" />
      </a>
    </div>
  );
}
