import { getPortfolioData } from "@/lib/portfolio/data";
import FilterGridHeader from "./_components/header";
import FilterGridBrowser from "./_components/browser";
import FilterGridFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function FilterGridPage() {
  const data = await getPortfolioData();

  return (
    <>
      <FilterGridHeader name={data.identity.name} />
      <FilterGridBrowser projects={data.projects} />
      <FilterGridFooter identity={data.identity} bio={data.bio.short} />
    </>
  );
}
