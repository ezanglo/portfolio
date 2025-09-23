import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SectionDivider from "@/components/section-divider";
import SkillsSection from "@/components/skills-section";
import { 
  getExperiencesData, 
  getProjectsData, 
  getSkillsData
} from "@/lib/queries";

// Static Generation with ISR - Best of both worlds!
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour (1 hour)
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [experiences, projects, skills] = await Promise.all([
    getExperiencesData(),
    getProjectsData(),
    getSkillsData(),
  ]);

  return (
    <main>
      <div className="flex flex-col items-center px-4">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection />
      </div>
    </main>
  );
}
