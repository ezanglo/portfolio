import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getPortfolioData } from "@/lib/portfolio/data";
import PersonJsonLd from "@/components/seo/person-json-ld";

/**
 * Root layout for the archived portfolio surfaces at /legacy/*.
 *
 * `robots: noindex` is set here and inherited by every child — none of them override it.
 * These pages stay reachable so the work isn't lost, but they must never compete with the
 * live site for ranking: much of their copy is identical to it.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: false, follow: false },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function LegacyRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PersonJsonLd identity={data.identity} />
        {children}
      </body>
    </html>
  );
}
