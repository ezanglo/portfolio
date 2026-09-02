import type { Metadata, Viewport } from "next";
import { spaceGrotesk } from "../_fonts/space-grotesk";
import { ibmPlexMono } from "../_fonts/ibm-plex-mono";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Ops Console",
  description: "The impact view: shipped projects, AI focus, at-a-glance stats.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function OpsDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="ops-dashboard" fontVars={[spaceGrotesk.variable, ibmPlexMono.variable]}>
      {children}
    </ViewShell>
  );
}
