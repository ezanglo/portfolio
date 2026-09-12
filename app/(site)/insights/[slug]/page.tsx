import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Ezra Anglo`,
    description: article.description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Insights", item: `${SITE_URL}/insights` },
          { "@type": "ListItem", position: 2, name: article.title, item: `${SITE_URL}/insights/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        url: `${SITE_URL}/insights/${slug}`,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <Section size="lg">
      <Container size="narrow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/insights">Insights</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-6 text-(length:--text-h1) leading-(--text-h1-lh) tracking-(--text-h1-tracking) font-semibold text-balance">
          {article.title}
        </h1>

        <div className="mt-8 space-y-5 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
