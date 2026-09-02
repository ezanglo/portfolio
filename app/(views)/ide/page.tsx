import { getPortfolioData } from "@/lib/portfolio/data";
import { buildIdeTree } from "@/lib/views/ide/filesystem";
import { buildIdeContent } from "@/lib/views/ide/content";
import Workspace from "./_components/workspace";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function IdePage() {
  const data = await getPortfolioData();
  const tree = buildIdeTree(data);
  const content = buildIdeContent(data);

  return (
    <main id="main" className="flex h-full flex-col">
      <Workspace tree={tree} content={content} />
    </main>
  );
}
