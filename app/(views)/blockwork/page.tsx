import { getPortfolioData } from "@/lib/portfolio/data";
import { getViewCopy } from "@/lib/view-copy";
import BlockworkNav from "./_components/nav";
import BlockworkHero from "./_components/hero";
import BlockworkAbout from "./_components/about";
import BlockworkSkills from "./_components/skills";
import BlockworkProjects from "./_components/projects";
import BlockworkExperience from "./_components/experience";
import BlockworkContact from "./_components/contact";
import BlockworkFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function BlockworkPage() {
  const data = await getPortfolioData();
  const copy = getViewCopy("blockwork", data.identity);

  return (
    <>
      <BlockworkNav name={data.identity.name} />
      <main id="main">
        <BlockworkHero identity={data.identity} copy={copy} />
        <BlockworkAbout bio={data.bio} copy={copy} />
        <BlockworkSkills skills={data.skills.flat} copy={copy} />
        <BlockworkProjects projects={data.projects} copy={copy} />
        <BlockworkExperience experience={data.experience} copy={copy} />
        <BlockworkContact email={data.identity.email} copy={copy} />
      </main>
      <BlockworkFooter copyrightText={data.identity.copyrightText} />
    </>
  );
}
