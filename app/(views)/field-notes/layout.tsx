import type { Metadata, Viewport } from "next";
import { lora } from "../_fonts/lora";
import { inter } from "../_fonts/inter";
import ViewShell from "@/components/views/shared/view-shell";

export const metadata: Metadata = {
  title: "Ezra Anglo | Field Notes",
  description: "A decade of building for web, mobile, and desktop, now leaning into React Native and AI.",
  alternates: {
    canonical: "/classic",
  },
  openGraph: {
    title: "Ezra Anglo | Field Notes",
    description: "A decade of building for web, mobile, and desktop, now leaning into React Native and AI.",
    url: "/field-notes",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function FieldNotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewShell view="field-notes" fontVars={[lora.variable, inter.variable]}>
      {children}
    </ViewShell>
  );
}
