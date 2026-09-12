import { PROJECTS, SERVICES, SITE, SKILLS, WHAT_I_BUILD, WORK_EXPERIENCE } from "@/content";
import { Hero } from "@/components/site/sections/hero";
import { About } from "@/components/site/sections/about";
import { WhyHireMe } from "@/components/site/sections/why-hire-me";
import { Skills } from "@/components/site/sections/skills";
import { ExperienceSection } from "@/components/site/sections/experience";
import { Projects } from "@/components/site/sections/projects";
import { Contact } from "@/components/site/sections/contact";

export const dynamic = "force-static";

/** One-page portfolio: Hero, About, Why Hire Me, Skills, Experience, Projects, Contact. Nav and
 * footer live in the layout. */
export default function HomePage() {
  const companyCount = new Set(WORK_EXPERIENCE.map((e) => e.company)).size;

  return (
    <>
      <Hero site={SITE} />
      <About site={SITE} projectCount={PROJECTS.length} companyCount={companyCount} />
      <WhyHireMe />
      <Skills skills={SKILLS} aiStats={SITE.aiStats} />
      <ExperienceSection experience={WORK_EXPERIENCE} />
      <Projects projects={PROJECTS} whatIBuild={WHAT_I_BUILD} />
      <Contact site={SITE} services={SERVICES} />
    </>
  );
}
