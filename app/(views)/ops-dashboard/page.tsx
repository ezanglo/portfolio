import { getPortfolioData } from "@/lib/portfolio/data";
import { buildStats } from "@/lib/views/stats";
import OpsHeader from "./_components/header";
import OpsStatGrid from "./_components/stat-grid";
import OpsSpecsPanel from "./_components/specs-panel";
import OpsUptimeLog from "./_components/uptime-log";
import EngineRouter from "./_components/engine-router";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function OpsDashboardPage() {
  const data = await getPortfolioData();
  const stats = buildStats(data);

  return (
    <main id="main">
      <OpsHeader identity={data.identity} />
      <OpsStatGrid stats={stats} />
      <OpsSpecsPanel skills={data.skills} />
      <OpsUptimeLog experience={data.experience} />
      <EngineRouter projects={data.projects} />
    </main>
  );
}
