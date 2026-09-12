"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { motion } from "framer-motion";
import SectionHeading from "@/components/legacy/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { FALLBACK_PITCH_INTRO, FALLBACK_PITCH_POINTS } from "@/lib/portfolio/narrative";
import { SiteConfig } from "@/lib/legacy/types";

interface WhyHireMeSectionProps {
  siteConfig: SiteConfig | null;
}

export default function WhyHireMeSection({ siteConfig }: WhyHireMeSectionProps) {
  const { ref } = useSectionInView("Why", 0.4);

  const whyHireMe = siteConfig?.whyHireMe;
  const intro = whyHireMe?.intro || FALLBACK_PITCH_INTRO;
  const points = whyHireMe?.points && whyHireMe.points.length > 0 ? whyHireMe.points : FALLBACK_PITCH_POINTS;

  const stats = siteConfig?.stats;
  const statItems = [
    { value: stats?.yearsExperience || "10+", label: "Years experience" },
    { value: stats?.tokenSavings || "92%", label: "Token cost reduction" },
    { value: stats?.enginesOrchestrated || "4", label: "AI engines orchestrated" },
  ];

  const [primary, ...secondary] = points;

  return (
    <motion.section
      id="why-hire-me"
      ref={ref}
      className="mb-28 max-w-[62rem] scroll-mt-28 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <SectionHeading>Why hire me</SectionHeading>
      <p className="mb-10 max-w-[42rem] mx-auto text-center leading-8 text-secondary-foreground/80">
        {intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        <Card className="md:col-span-3 bg-secondary/70 border-none shadow-md">
          <CardContent className="flex flex-col justify-center h-full py-8">
            <h3 className="text-xl font-medium mb-3">{primary.title}</h3>
            <p className="text-secondary-foreground/70 leading-relaxed">{primary.description}</p>
          </CardContent>
        </Card>
        <div className="md:col-span-2 flex flex-col gap-4">
          {secondary.map((point) => (
            <Card key={point.title} className="bg-secondary/70 border-none shadow-md flex-1">
              <CardContent className="py-5">
                <h3 className="font-medium mb-2">{point.title}</h3>
                <p className="text-sm text-secondary-foreground/70 leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center divide-y sm:divide-y-0 sm:divide-x divide-primary/15">
        {statItems.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center px-8 py-4 sm:py-0">
            <span className="text-2xl font-semibold text-primary">{stat.value}</span>
            <span className="text-xs text-secondary-foreground/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
