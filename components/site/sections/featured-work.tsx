import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/project-card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content/types";

/**
 * brief §7/§10 — the featured shortlist. No project here has a screenshot yet (§25 is
 * deferred), so this uses the typographic `ProjectCard` treatment build-plan §5 calls for.
 */
export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <Section id="work">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured Work" heading="React Native, shipped." />
          <Button variant="ghost" asChild>
            <Link href="/work">
              View all work
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
