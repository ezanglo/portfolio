import { getPortfolioData } from "@/lib/portfolio/data";
import { buildTerminalProgram } from "@/lib/views/terminal/commands";
import TerminalFrame from "./_components/frame";
import TerminalTitleBar from "./_components/title-bar";
import TerminalConsole from "./_components/console";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function TerminalPage() {
  const data = await getPortfolioData();
  const program = buildTerminalProgram(data);

  return (
    <TerminalFrame>
      <TerminalTitleBar />
      <main id="main" className="flex min-h-0 flex-1 flex-col">
        <TerminalConsole program={program} />
      </main>
    </TerminalFrame>
  );
}
