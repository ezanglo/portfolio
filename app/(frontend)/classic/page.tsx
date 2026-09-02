import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SectionDivider from "@/components/section-divider";
import SkillsSection from "@/components/skills-section";
import { 
  getExperiencesData, 
  getProjectsData, 
  getSkillsData,
  getSiteConfig
} from "@/lib/queries";

// Static Generation with ISR - Best of both worlds!
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour (1 hour)
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [experiences, projects, skills, siteConfig] = await Promise.all([
    getExperiencesData(),
    getProjectsData(),
    getSkillsData(),
    getSiteConfig(),
  ]);

  return (
    <main>
      <div className="flex flex-col items-center px-4">
        <HeroSection siteConfig={siteConfig} />
        <SectionDivider />
        <AboutSection siteConfig={siteConfig} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection siteConfig={siteConfig} />
        <Footer siteConfig={siteConfig} />
      </div>
    </main>
  );
}
