import type { Metadata, Viewport } from "next";
import { inter } from "../_fonts/inter";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Portfolio",
  description: "Full-stack developer with over 10 years of experience across Web, Mobile, and Desktop.",
  alternates: {
    canonical: "/legacy/corporate",
  },
  openGraph: {
    title: "Ezra Anglo | Portfolio",
    description: "Full-stack developer with over 10 years of experience across Web, Mobile, and Desktop.",
    url: "/legacy/corporate",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="corporate" fontVars={[inter.variable]}>
      {children}
    </ViewShell>
  );
}
