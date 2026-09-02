import type { Metadata } from "next";
import ViewsGallery from "@/components/views/shared/views-gallery";
import { getPortfolioData } from "@/lib/portfolio/data";
import { VIEW_SLUGS } from "@/lib/views";
import { inter } from "./_fonts/inter";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Ezra Anglo | Portfolio",
  description: "A different way to browse the portfolio, every time you load it.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ezra Anglo | Portfolio",
    description: "A different way to browse the portfolio, every time you load it.",
    url: "/",
  },
};

const REDIRECT_SCRIPT = `(function(){try{
  if (location.search.indexOf('pick=1') !== -1) return;
  var views = ${JSON.stringify(VIEW_SLUGS)};
  var pick = views[Math.floor(Math.random() * views.length)];
  location.replace('/' + pick);
}catch(e){}})();`;

export default async function RouterPage() {
  const data = await getPortfolioData();

  return (
    <div className={`${inter.variable} font-sans`}>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
      <ViewsGallery identity={data.identity} />
    </div>
  );
}
