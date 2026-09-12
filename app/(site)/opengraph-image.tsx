import { ImageResponse } from "next/og";
import { SITE } from "@/content";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/components/seo/og-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ezra Anglo — Senior React Native & Full-Stack Developer";

export default function Image() {
  return new ImageResponse(renderOgImage({ name: SITE.name, role: SITE.role }), { ...size });
}
