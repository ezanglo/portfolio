import Link from "next/link";
import { NAV_LINKS } from "@/content/navigation";
import { Container } from "./container";

/** §19/§30 footer — nav, contact, GitHub, CV, and the one discreet `/legacy` link. */
export function SiteFooter({
  githubUrl,
  email,
  cvUrl,
  copyright,
}: {
  githubUrl: string;
  email: string;
  cvUrl: string;
  copyright: string;
}) {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 text-(length:--text-small) sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-muted-foreground">{copyright}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
            <a href={`mailto:${email}`} className="hover:text-foreground">
              {email}
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <a href={cvUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
              CV
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Link href="/legacy" className="text-muted-foreground/60 hover:text-foreground">
            Previous portfolio
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
