import { getPortfolioData } from "@/lib/portfolio/data";
import { buildKnowledge, buildQuickReplies, CHAT_FALLBACK } from "@/lib/views/ai-chat/knowledge";
import AiChatHeader from "./_components/header";
import AiChatConsole from "./_components/console";
import SitePreview from "./_components/site-preview";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function AiChatPage() {
  const data = await getPortfolioData();
  const knowledge = buildKnowledge(data);
  const quickReplies = buildQuickReplies();

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      <div className="flex min-h-0 flex-1 flex-col lg:max-w-md lg:border-r lg:border-view-border xl:max-w-lg">
        <AiChatHeader initials={data.identity.initials} />
        <main id="main" className="flex min-h-0 flex-1 flex-col">
          <AiChatConsole knowledge={knowledge} fallback={CHAT_FALLBACK} quickReplies={quickReplies} />
        </main>
      </div>
      <SitePreview className="hidden min-h-0 flex-1 lg:flex" />
    </div>
  );
}
