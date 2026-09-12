import type { Metadata } from "next";
import ViewsGallery from "@/components/views/shared/views-gallery";
import { getPortfolioData } from "@/lib/portfolio/data";
import { inter } from "./_fonts/inter";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Ezra Anglo | Portfolio Archive",
  description: "The same portfolio, presented eight different ways. Pick a style, or hit Surprise me.",
  alternates: {
    canonical: "/legacy",
  },
  openGraph: {
    title: "Ezra Anglo | Portfolio Archive",
    description: "The same portfolio, presented eight different ways. Pick a style, or hit Surprise me.",
    url: "/legacy",
  },
};

export default async function RouterPage() {
  const data = await getPortfolioData();

  return (
    <div className={`${inter.variable} font-sans`}>
      <ViewsGallery identity={data.identity} />
    </div>
  );
}
