import { ImageResponse } from "next/og";
import { ARTICLES, getArticle } from "@/content";
import { renderOgImage, ogImageSize, ogImageContentType, truncate } from "@/components/seo/og-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Insights | Ezra Anglo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    renderOgImage({
      eyebrow: "Insights",
      title: article?.title ?? "Insights",
      description: article ? truncate(article.description, 180) : undefined,
    }),
    { ...size }
  );
}
