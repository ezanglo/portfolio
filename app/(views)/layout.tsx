import type { Metadata } from "next";
import "./views.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getPortfolioData } from "@/lib/portfolio/data";
import PersonJsonLd from "@/components/seo/person-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function ViewsRootLayout({
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
