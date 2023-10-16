import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { ModeToggle } from '@/components/mode-toggle'
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ezra Anglo | Personal Portfolio",
  description: "Ezra is a full-stack developer with 8 years of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "pt-28 sm:pt-36")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <ModeToggle />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
