import { ARTICLES, EXPERIENCE, FAQ, PROJECTS, SITE, SKILLS, WHAT_I_BUILD } from "@/content";
import { Hero } from "@/components/site/sections/hero";
import { TrustRow } from "@/components/site/sections/trust-row";
import { WhatIBuild } from "@/components/site/sections/what-i-build";
import { FeaturedWork } from "@/components/site/sections/featured-work";
import { Services } from "@/components/site/sections/services";
import { FullStackDifferentiator } from "@/components/site/sections/full-stack-differentiator";
import { AiSection } from "@/components/site/sections/ai-section";
import { WhyWorkWithMe } from "@/components/site/sections/why-work-with-me";
import { Process } from "@/components/site/sections/process";
import { SocialProof } from "@/components/site/sections/social-proof";
import { About } from "@/components/site/sections/about";
import { InsightsTeaser } from "@/components/site/sections/insights-teaser";
import { Faq } from "@/components/site/sections/faq";
import { Contact } from "@/components/site/sections/contact";

export const dynamic = "force-static";

/**
 * One-page portfolio (brief §34 order, with Services/About/Insights/Contact folded in at the
 * positions the nav anchors to). Navigation and footer live in the layout.
 */
export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const aiProjects = PROJECTS.filter((p) => p.aiPlatform !== null);
  const companyCount = new Set(EXPERIENCE.map((e) => e.company)).size;

  return (
    <>
      <Hero headline={SITE.heroHeadline} copy={SITE.heroCopy} />
      <TrustRow indicators={SITE.trustIndicators} />
      <WhatIBuild items={WHAT_I_BUILD} />
      <FeaturedWork projects={featuredProjects} />
      <Services siteName={SITE.siteName} name={SITE.name} />
      <FullStackDifferentiator />
      <AiSection aiProjects={aiProjects} aiStats={SITE.aiStats} />
      <WhyWorkWithMe />
      <Process />
      <SocialProof yearsExperience={SITE.yearsExperience} projectCount={PROJECTS.length} companyCount={companyCount} />
      <About site={SITE} experience={EXPERIENCE} skills={SKILLS} />
      <InsightsTeaser articles={ARTICLES} />
      <Faq items={FAQ} />
      <Contact />
    </>
  );
}
