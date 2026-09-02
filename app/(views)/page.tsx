import type { Metadata } from "next";
import ViewsGallery from "@/components/views/shared/views-gallery";
import { getPortfolioData } from "@/lib/portfolio/data";
import { VIEW_SLUGS } from "@/lib/views";
import { VIEW_STORAGE_KEY } from "@/lib/view-storage";
import { inter } from "./_fonts/inter";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Ezra Anglo | Portfolio",
  description: "Pick how you'd like to browse the portfolio.",
};

const REDIRECT_SCRIPT = `(function(){try{
  if (location.search.indexOf('pick=1') !== -1) return;
  var raw = localStorage.getItem(${JSON.stringify(VIEW_STORAGE_KEY)}) || '';
  var m = /^2\\|([a-z-]+)$/.exec(raw);
  var ok = ${JSON.stringify(VIEW_SLUGS)};
  if (m && ok.indexOf(m[1]) !== -1) location.replace('/' + m[1]);
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
