import Link from "next/link";
import { NAV_LINKS } from "@/content/navigation";
import { Container } from "./container";
import { LogoMark } from "./logo-mark";
import { SocialIcons } from "./social-icons";

/** Footer — primary nav mirror, plus the utility links that don't have a home in the brief's
 * fixed 7-item nav (long-form writing, the archived design). Redesigned (2026-09-12) from a
 * flat list of text links into a three-column layout, matching the icon-tile/brand-accent
 * language used in the header and hero. No CTA banner here — the Contact section directly
 * above already owns "Let's talk" (same /#contact destination), so repeating it in the
 * footer would just be noise. */
export function SiteFooter({
  linkedinUrl,
  githubUrl,
  email,
  cvUrl,
  copyright,
}: {
  linkedinUrl: string;
  githubUrl: string;
  email: string;
  cvUrl: string;
  copyright: string;
}) {
  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 text-(length:--text-small) sm:grid-cols-4">
          <div className="col-span-2 space-y-4 sm:col-span-2">
            <Link href="/" aria-label="Ezra Anglo — Home" className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <span aria-hidden="true" className="font-display font-semibold">Ezra Anglo</span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Senior React Native &amp; full-stack developer building production-ready mobile products.
            </p>
            <SocialIcons linkedinUrl={linkedinUrl} githubUrl={githubUrl} email={email} size="sm" />
          </div>

          <nav aria-label="Footer sections" className="space-y-3">
            <p className="font-display text-(length:--text-caption) font-semibold uppercase tracking-wide text-muted-foreground">
              Sections
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer resources" className="space-y-3">
            <p className="font-display text-(length:--text-caption) font-semibold uppercase tracking-wide text-muted-foreground">
              More
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/insights" className="text-muted-foreground transition-colors hover:text-foreground">
                  Insights
                </Link>
              </li>
              <li>
                <a href={cvUrl} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  Resume
                </a>
              </li>
              <li>
                <Link href="/legacy" className="text-muted-foreground/60 transition-colors hover:text-foreground">
                  Previous portfolio
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-(length:--text-caption) text-muted-foreground sm:flex-row sm:items-center">
          <p>{copyright}</p>
          <a href={`mailto:${email}`} className="hover:text-foreground">
            {email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
