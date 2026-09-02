import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/header";
import PortfolioCodeButton from "@/components/portfolio-code-button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { getNavigationLinks } from "@/lib/queries";
import { NavigationLink } from "@/payload-types";
import ViewSwitcher from "@/components/views/shared/view-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ezra Anglo | Personal Portfolio",
  description: "Ezra is a full-stack developer with 10 years of experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationLinks = await getNavigationLinks();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "pt-28 sm:pt-36")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ActiveSectionContextProvider>
            <Header links={navigationLinks as NavigationLink[]} />
            {children}
            <Toaster />
            <ViewSwitcher
              current="classic"
              extraActions={
                <>
                  <PortfolioCodeButton />
                  <ModeToggle />
                </>
              }
            />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
