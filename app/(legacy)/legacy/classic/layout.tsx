import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./legacy-classic.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/legacy/header";
import PortfolioCodeButton from "@/components/legacy/portfolio-code-button";
import { ModeToggle } from "@/components/mode-toggle";
import ViewSwitcher from "@/components/views/shared/view-switcher";
import SurpriseMeButton from "@/components/views/shared/surprise-me-button";
import { cn } from "@/lib/utils";
import { LEGACY_NAV_LINKS } from "@/lib/legacy/adapter";

const inter = Inter({ subsets: ["latin"] });

/**
 * Nested layout for the archived classic portfolio.
 *
 * This was a root layout when classic lived at /classic; under the shared /legacy root it
 * renders a wrapper instead of <html>/<body>. The top padding that used to sit on <body>
 * (to clear the floating pill nav) moved onto that wrapper.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ezra Anglo | Classic Portfolio (Archived)",
  description: "The original single-page portfolio, kept for reference.",
  alternates: {
    canonical: "/legacy/classic",
  },
  openGraph: {
    title: "Ezra Anglo | Classic Portfolio (Archived)",
    description: "The original single-page portfolio, kept for reference.",
    url: "/legacy/classic",
  },
};

export default function LegacyClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(inter.className, "bg-background text-foreground pt-28 sm:pt-36")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ActiveSectionContextProvider>
          <Header links={LEGACY_NAV_LINKS} />
          {children}
          <Toaster />
          <ViewSwitcher
            current="classic"
            extraActions={
              <>
                <PortfolioCodeButton />
                <ModeToggle />
                <SurpriseMeButton
                  current="classic"
                  className="border border-border bg-background py-2.5 text-foreground shadow-[0_6px_20px_rgba(0,0,0,.15)] hover:bg-accent"
                />
              </>
            }
          />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </div>
  );
}
