import type { Metadata, Viewport } from "next";
import { ibmPlexMono } from "../_fonts/ibm-plex-mono";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Terminal",
  description: "An interactive CLI portfolio. Type help to get started.",
  alternates: {
    canonical: "/legacy/terminal",
  },
  openGraph: {
    title: "Ezra Anglo | Terminal",
    description: "An interactive CLI portfolio. Type help to get started.",
    url: "/legacy/terminal",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="terminal" fontVars={[ibmPlexMono.variable]}>
      {children}
    </ViewShell>
  );
}
