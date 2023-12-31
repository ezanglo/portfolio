import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SectionDivider from "@/components/section-divider";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center px-4">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}
