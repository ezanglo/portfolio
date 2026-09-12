import type { Metadata, Viewport } from "next";
import { inter } from "../_fonts/inter";
import { ibmPlexMono } from "../_fonts/ibm-plex-mono";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | AI Chat",
  description: "The portfolio as a chat interface. Ask a question, get a grounded answer.",
  alternates: {
    canonical: "/legacy/ai-chat",
  },
  openGraph: {
    title: "Ezra Anglo | AI Chat",
    description: "The portfolio as a chat interface. Ask a question, get a grounded answer.",
    url: "/legacy/ai-chat",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function AiChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="ai-chat" fontVars={[inter.variable, ibmPlexMono.variable]} hideSwitcher>
      {children}
    </ViewShell>
  );
}
