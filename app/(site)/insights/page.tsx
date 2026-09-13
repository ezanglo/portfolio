import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Insights | Ezra Anglo, Senior Product Engineer",
  description: "Notes on React Native, full-stack mobile development, and building with AI-assisted engineering.",
  alternates: { canonical: "/insights" },
};

export const dynamic = "force-static";

export default function InsightsPage() {
  return (
    <Section size="lg">
      <Container size="narrow">
        <SectionHeading as="h1" eyebrow="Insights" heading="Notes from real projects, not generic SEO content." />
        <ul className="mt-10 space-y-6">
          {ARTICLES.map((article) => (
            <li key={article.slug} className="rounded-xl border border-border bg-card p-6">
              <Link href={`/insights/${article.slug}`} className="group">
                <h2 className="text-(length:--text-h3) font-semibold group-hover:underline">{article.title}</h2>
                <p className="mt-2 text-(length:--text-small) text-muted-foreground">{article.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-(length:--text-small) font-medium text-brand">
                  Read the article
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
