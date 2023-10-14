import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";
import SectionDivider from "@/components/section-divider";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center px-4">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
      </div>
    </main>
  );
}
