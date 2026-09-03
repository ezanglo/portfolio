import { getPortfolioData } from "@/lib/portfolio/data";
import { getViewCopy } from "@/lib/view-copy";
import FieldNotesNav from "./_components/nav";
import FieldNotesHero from "./_components/hero";
import PortraitBand from "./_components/portrait-band";
import FieldNotesAbout from "./_components/about";
import FieldNotesSkills from "./_components/skills";
import FieldNotesProjects from "./_components/projects";
import FieldNotesExperience from "./_components/experience";
import FieldNotesContact from "./_components/contact";
import FieldNotesFooter from "./_components/footer";

export const dynamic = "force-static";
export const revalidate = 3600;
export const runtime = "nodejs";

export default async function FieldNotesPage() {
  const data = await getPortfolioData();
  const copy = getViewCopy("field-notes", data.identity);

  return (
    <>
      <FieldNotesNav name={data.identity.name} />
      <main id="main">
        <FieldNotesHero identity={data.identity} copy={copy} />
        <PortraitBand portraitUrl="/images/landscape.png" />
        <FieldNotesAbout bio={data.bio} copy={copy} />
        <FieldNotesSkills skills={data.skills.flat} copy={copy} />
        <FieldNotesProjects projects={data.projects} copy={copy} />
        <FieldNotesExperience experience={data.experience} copy={copy} />
        <FieldNotesContact email={data.identity.email} copy={copy} />
      </main>
      <FieldNotesFooter copyrightText={data.identity.copyrightText} />
    </>
  );
}
