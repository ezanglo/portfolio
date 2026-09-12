import { ImageResponse } from "next/og";
import { getPortfolioData } from "@/lib/portfolio/data";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/components/seo/og-image";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ezra Anglo — Full-stack developer";

export default async function Image() {
  const data = await getPortfolioData();
  return new ImageResponse(renderOgImage(data.identity), { ...size });
}
