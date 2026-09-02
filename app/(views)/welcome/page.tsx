import type { Metadata } from "next";
import ViewsGallery from "@/components/views/shared/views-gallery";
import { getPortfolioData } from "@/lib/portfolio/data";
import { inter } from "../_fonts/inter";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Ezra Anglo | All versions",
  description: "Every version of the portfolio, in one place.",
  alternates: {
    canonical: "/welcome",
  },
  openGraph: {
    title: "Ezra Anglo | All versions",
    description: "Every version of the portfolio, in one place.",
    url: "/welcome",
  },
};

export default async function WelcomePage() {
  const data = await getPortfolioData();
  return (
    <div className={`${inter.variable} font-sans`}>
      <ViewsGallery identity={data.identity} />
    </div>
  );
}
