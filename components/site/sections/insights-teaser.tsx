import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import type { Article } from "@/content/insights";

/** brief §22 — a teaser on the one-page portfolio; the articles themselves stay full pages
 * (`/insights/[slug]`) since long-form writing doesn't belong inline on a scrolling page. */
export function InsightsTeaser({ articles }: { articles: Article[] }) {
  return (
    <Section id="insights" className="border-t border-border">
      <Container size="narrow">
        <SectionHeading eyebrow="Insights" heading="Notes from real projects." align="center" className="mx-auto" />
        <ul className="mt-10 space-y-6">
          {articles.map((article) => (
            <li key={article.slug} className="rounded-xl border border-border bg-card p-6">
              <Link href={`/insights/${article.slug}`} className="group">
                <h3 className="text-(length:--text-h3) font-semibold group-hover:underline">{article.title}</h3>
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
