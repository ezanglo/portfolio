import Link from "next/link";
import { SITE } from "@/content";

/**
 * Holding page. The real homepage is Phase 4 of docs/rebuild-plan.md; this exists so "/"
 * resolves now that the views gallery moved to /legacy, and so the redirects from the old
 * public view URLs have somewhere to land.
 */
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "1rem",
          }}
        >
          Senior React Native & Full-Stack Developer
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: 1.15, margin: "0 0 1rem" }}>
          {SITE.name} Anglo
        </h1>
        <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6, margin: "0 0 2rem" }}>
          A new site is being built here. In the meantime, the previous portfolio is still
          available.
        </p>
        <Link
          href="/legacy"
          style={{
            display: "inline-block",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            padding: "0.65rem 1.25rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          View the previous portfolio →
        </Link>
      </div>
    </main>
  );
}
