import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SITE } from "@/content";
import PersonJsonLd from "@/components/seo/person-json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import SkipLink from "@/components/views/shared/skip-link";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ezra Anglo — Senior React Native & Full-Stack Developer",
  description:
    "Senior React Native and full-stack developer building production-ready iOS and Android applications with React Native, Expo, TypeScript, and full-stack engineering expertise.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ezra Anglo — Senior React Native & Full-Stack Developer",
    description:
      "Senior React Native and full-stack developer building production-ready iOS and Android applications with React Native, Expo, TypeScript, and full-stack engineering expertise.",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezra Anglo — Senior React Native & Full-Stack Developer",
    description:
      "Senior React Native and full-stack developer building production-ready iOS and Android applications with React Native, Expo, TypeScript, and full-stack engineering expertise.",
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <PersonJsonLd identity={SITE} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SkipLink />
          <SiteHeader name={SITE.name} cvUrl={SITE.cvUrl} />
          <main id="main">{children}</main>
          <SiteFooter
            linkedinUrl={SITE.linkedinUrl}
            githubUrl={SITE.githubUrl}
            email={SITE.email}
            cvUrl={SITE.cvUrl}
            copyright={SITE.copyright}
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
