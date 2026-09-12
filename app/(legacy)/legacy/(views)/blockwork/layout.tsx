import type { Metadata, Viewport } from "next";
import { archivo } from "../_fonts/archivo";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Blockwork",
  description: "Ezra Anglo builds React Native + AI products.",
  alternates: {
    canonical: "/legacy/blockwork",
  },
  openGraph: {
    title: "Ezra Anglo | Blockwork",
    description: "Ezra Anglo builds React Native + AI products.",
    url: "/legacy/blockwork",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function BlockworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="blockwork" fontVars={[archivo.variable]}>
      {children}
    </ViewShell>
  );
}
