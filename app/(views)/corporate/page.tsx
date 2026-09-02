import { getPortfolioData } from "@/lib/portfolio/data";
import { getViewCopy } from "@/lib/view-copy";
import CorporateNav from "./_components/nav";
import CorporateHero from "./_components/hero";
import CorporateAbout from "./_components/about";
import CorporateSkills from "./_components/skills";
import CorporateProjects from "./_components/projects";
import CorporateExperience from "./_components/experience";
import CorporateContact from "./_components/contact";
import CorporateFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function CorporatePage() {
  const data = await getPortfolioData();
  const copy = getViewCopy("corporate", data.identity);

  return (
    <>
      <CorporateNav name={data.identity.name} />
      <main id="main">
        <CorporateHero identity={data.identity} copy={copy} />
        <CorporateAbout bio={data.bio} copy={copy} />
        <CorporateSkills skills={data.skills.flat} copy={copy} />
        <CorporateProjects projects={data.projects} copy={copy} />
        <CorporateExperience experience={data.experience} copy={copy} />
        <CorporateContact email={data.identity.email} copy={copy} />
      </main>
      <CorporateFooter copyrightText={data.identity.copyrightText} />
    </>
  );
}
