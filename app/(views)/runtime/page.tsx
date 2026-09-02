import { getPortfolioData } from "@/lib/portfolio/data";
import { getViewCopy } from "@/lib/view-copy";
import RuntimeNav from "./_components/nav";
import RuntimeHero from "./_components/hero";
import RuntimeAbout from "./_components/about";
import RuntimeSkills from "./_components/skills";
import RuntimeProjects from "./_components/projects";
import RuntimeExperience from "./_components/experience";
import RuntimeContact from "./_components/contact";
import RuntimeFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function RuntimePage() {
  const data = await getPortfolioData();
  const copy = getViewCopy("runtime", data.identity);

  return (
    <>
      <RuntimeNav />
      <main id="main">
        <RuntimeHero identity={data.identity} copy={copy} />
        <RuntimeAbout bio={data.bio} copy={copy} />
        <RuntimeSkills skills={data.skills.flat} copy={copy} />
        <RuntimeProjects projects={data.projects} copy={copy} />
        <RuntimeExperience experience={data.experience} copy={copy} />
        <RuntimeContact email={data.identity.email} copy={copy} />
      </main>
      <RuntimeFooter copyrightText={data.identity.copyrightText} />
    </>
  );
}
