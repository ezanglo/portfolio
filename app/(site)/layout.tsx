import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getPortfolioData } from "@/lib/portfolio/data";
import PersonJsonLd from "@/components/seo/person-json-ld";

const inter = Inter({ subsets: ["latin"] });

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

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PersonJsonLd identity={data.identity} />
        {children}
      </body>
    </html>
  );
}
