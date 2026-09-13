import { ImageResponse } from "next/og";
import { CASE_STUDIES, PROJECTS, getCaseStudy } from "@/content";
import { renderOgImage, ogImageSize, ogImageContentType, truncate } from "@/components/seo/og-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Case study | Ezra Anglo";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.projectSlug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const caseStudy = getCaseStudy(slug);

  return new ImageResponse(
    renderOgImage({
      eyebrow: "Case Study",
      title: project?.title ?? "Case Study",
      description: caseStudy ? truncate(caseStudy.overview, 180) : undefined,
    }),
    { ...size }
  );
}
