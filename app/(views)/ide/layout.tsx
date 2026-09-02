import type { Metadata, Viewport } from "next";
import { ibmPlexMono } from "../_fonts/ibm-plex-mono";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | IDE",
  description: "A VS Code-style file explorer for the portfolio.",
  alternates: {
    canonical: "/ide",
  },
  openGraph: {
    title: "Ezra Anglo | IDE",
    description: "A VS Code-style file explorer for the portfolio.",
    url: "/ide",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function IdeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="ide" fontVars={[ibmPlexMono.variable]}>
      {children}
    </ViewShell>
  );
}
