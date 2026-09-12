import Link from "next/link";
import { NAV_LINKS } from "@/content/navigation";
import { Container } from "./container";

/** Footer — primary nav mirror, plus the utility links that don't have a home in the brief's
 * fixed 7-item nav (long-form writing, the archived design). */
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
      <Container className="py-12 text-(length:--text-small)">
        <div className="mb-8 border-b border-border pb-8">
          <p className="text-muted-foreground">
            Open to freelance projects and full-time roles.{" "}
            <Link href="/#contact" className="font-medium text-foreground hover:text-brand">
              Let&rsquo;s talk &rarr;
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
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
                Resume
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            ))}
            <Link href="/insights" className="text-muted-foreground hover:text-foreground">
              Insights
            </Link>
            <Link href="/legacy" className="text-muted-foreground/60 hover:text-foreground">
              Previous portfolio
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
