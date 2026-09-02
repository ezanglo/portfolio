import { getPortfolioData } from "@/lib/portfolio/data";
import AppStoreHeader from "./_components/header";
import AppStoreBrowser from "./_components/browser";
import AppStoreFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function AppStorePage() {
  const data = await getPortfolioData();

  return (
    <main id="main">
      <AppStoreHeader name={data.identity.name} />
      <AppStoreBrowser projects={data.projects} />
      <AppStoreFooter identity={data.identity} bio={data.bio.short} />
    </main>
  );
}
