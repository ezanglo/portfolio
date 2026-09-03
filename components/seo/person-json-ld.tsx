import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { PortfolioIdentity } from "@/lib/portfolio/types";

export default function PersonJsonLd({ identity }: { identity: PortfolioIdentity }) {
  const sameAs = [identity.linkedinUrl, identity.githubUrl].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: identity.name,
        url: SITE_URL,
        jobTitle: identity.role,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
