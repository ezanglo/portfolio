import type { Metadata, Viewport } from "next";
import { inter } from "../_fonts/inter";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Filter Grid",
  description: "Full-stack developer, 10+ years. Filter the work by what you're hiring for.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function FilterGridLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="filter-grid" fontVars={[inter.variable]}>
      {children}
    </ViewShell>
  );
}
