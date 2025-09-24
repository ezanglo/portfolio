"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { SiteConfig } from "@/payload-types";

interface AboutSectionProps {
  siteConfig: SiteConfig | null;
}

export default function AboutSection({ siteConfig }: AboutSectionProps) {
  const { ref } = useSectionInView("About", 0.75);

  // Get about data from site config with fallbacks
  const aboutData = siteConfig?.about;
  const mainStack = aboutData?.mainStack || 'React, Typescript, PostgreSQL and PHP';
  const additionalTech = aboutData?.additionalTech || 'TailwindCSS, .NET, Prisma, and React Native';
  const careerStatus = aboutData?.careerStatus || 'full-time position as a full-stack developer';

  // For now, we'll use the hardcoded description since rich text rendering is complex
  // In a real implementation, you'd want to render the rich text content properly
  const description = aboutData?.description || {
    root: {
      children: [
        {
          children: [
            { text: "Graduating with a degree in " },
            { text: "Computer Science", bold: true },
            { text: ", I initially worked as a " },
            { text: ".NET Developer", bold: true },
            { text: " while also accepting freelance projects. Afterward, I started my journey into " },
            { text: "full-stack web development", bold: true },
            { text: ". Leveraging my experience with " },
            { text: ".NET and Object Oriented Programming", italic: true },
            { text: ", I easily " },
            { text: "adapted and learned", italic: true },
            { text: " their tech stack, despite lacking prior work experience in " },
            { text: "PHP", italic: true },
            { text: ". This opened up learning opportunities with web development for me. I " },
            { text: "love", underline: true },
            { text: " building applications and learn how to solve complex problems, whether in Desktop, Web or Mobile. As a result, I find myself in a " },
            { text: "constant state of learning", bold: true },
            { text: " and trying out new things" }
          ],
          type: "paragraph"
        }
      ],
      type: "root"
    }
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Graduating with a degree in{" "}
        <span className="font-medium">Computer Science</span>, I initially
        worked as a <span className="font-medium">.NET Developer</span> while
        also accepting freelance projects. Afterward, I started my journey into{" "}
        <span className="font-medium">full-stack web development</span>.
        Leveraging my experience with{" "}
        <span className="italic">.NET and Object Oriented Programming</span>, I
        easily <span className="italic">adapted and learned</span> their tech
        stack, despite lacking prior work experience in{" "}
        <span className="italic">PHP</span>. This opened up learning
        opportunities with web development for me. I{" "}
        <span className="underline">love</span> building applications and learn
        how to solve complex problems, whether in Desktop, Web or Mobile. As a
        result, I find myself in a{" "}
        <span className="font-medium">constant state of learning</span> and
        trying out new things
      </p>
      <p className="mb-3">
        My main stack is{" "}
        <span className="font-medium">
          {mainStack}
        </span>
        . I am also familiar with {additionalTech} to
        name a few. I am currently looking for a{" "}
        <span className="font-medium">{careerStatus}</span>.
      </p>
    </motion.section>
  );
}
