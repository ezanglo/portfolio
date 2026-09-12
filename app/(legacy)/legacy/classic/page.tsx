import AboutSection from "@/components/legacy/about-section";
import ContactSection from "@/components/legacy/contact-section";
import ExperienceSection from "@/components/legacy/experience-section";
import Footer from "@/components/legacy/footer";
import HeroSection from "@/components/legacy/hero-section";
import ProjectsSection from "@/components/legacy/projects-section";
import SectionDivider from "@/components/legacy/section-divider";
import SkillsSection from "@/components/legacy/skills-section";
import WhyHireMeSection from "@/components/legacy/why-hire-me-section";
import {
  LEGACY_EXPERIENCES,
  LEGACY_PROJECTS,
  LEGACY_SITE_CONFIG,
  LEGACY_SKILLS,
} from "@/lib/legacy/adapter";

// Content is static, so this prerenders with no revalidation window to manage.
export const dynamic = "force-static";

export default function LegacyClassicPage() {
  return (
    <main>
      <div className="flex flex-col items-center px-4">
        <HeroSection siteConfig={LEGACY_SITE_CONFIG} />
        <SectionDivider />
        <AboutSection siteConfig={LEGACY_SITE_CONFIG} />
        <WhyHireMeSection siteConfig={LEGACY_SITE_CONFIG} />
        <SkillsSection skills={LEGACY_SKILLS} projects={LEGACY_PROJECTS} siteConfig={LEGACY_SITE_CONFIG} />
        <ExperienceSection experiences={LEGACY_EXPERIENCES} />
        <ProjectsSection projects={LEGACY_PROJECTS} />
        <ContactSection siteConfig={LEGACY_SITE_CONFIG} />
        <Footer siteConfig={LEGACY_SITE_CONFIG} />
      </div>
    </main>
  );
}
