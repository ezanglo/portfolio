import type { Metadata, Viewport } from "next";
import { inter } from "../_fonts/inter";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | App Store",
  description: "10+ years shipping full-stack apps. Now featuring React Native + AI.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function AppStoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="app-store" fontVars={[inter.variable]}>
      {children}
    </ViewShell>
  );
}
