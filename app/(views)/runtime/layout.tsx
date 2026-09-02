import type { Metadata, Viewport } from "next";
import { spaceGrotesk } from "../_fonts/space-grotesk";
import { ibmPlexMono } from "../_fonts/ibm-plex-mono";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Runtime",
  description: "Building for React Native & AI, at runtime.",
  alternates: {
    canonical: "/classic",
  },
  openGraph: {
    title: "Ezra Anglo | Runtime",
    description: "Building for React Native & AI, at runtime.",
    url: "/runtime",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RuntimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="runtime" fontVars={[spaceGrotesk.variable, ibmPlexMono.variable]}>
      {children}
    </ViewShell>
  );
}
