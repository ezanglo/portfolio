import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TechBadgeList } from "@/components/site/tech-badge";
import { getCaseStudy } from "@/content/case-studies";
import type { Project } from "@/content/types";

/** The typographic project-card treatment build-plan §5 calls for while every project's
 * `images` array is empty (§25 deferred) — reused by the homepage's Featured Work grid and
 * the full `/work` listing so both stay visually consistent. */
export function ProjectCard({ project }: { project: Project }) {
  const caseStudy = getCaseStudy(project.slug);
  const href = caseStudy ? `/work/${project.slug}` : project.liveUrl;

  return (
    <div className="relative rounded-xl border border-border bg-card p-6">
      <GlowingEffect disabled={false} proximity={80} spread={30} borderWidth={2} />
      <div className="flex flex-wrap gap-2">
        {project.categories.length > 0 ? (
          project.categories.map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))
        ) : (
          <Badge variant="outline" className="capitalize">
            {project.platform}
          </Badge>
        )}
        {project.personal ? <Badge variant="secondary">Personal project</Badge> : null}
      </div>
      <h3 className="mt-4 text-(length:--text-h3) leading-(--text-h3-lh) font-semibold">{project.title}</h3>
      <p className="mt-2 text-(length:--text-small) leading-relaxed text-muted-foreground">{project.description}</p>
      {project.tags.length > 0 ? (
        <div className="mt-4">
          <TechBadgeList items={project.tags} />
        </div>
      ) : null}
      {href ? (
        <Link
          href={href}
          target={caseStudy ? undefined : "_blank"}
          rel={caseStudy ? undefined : "noreferrer"}
          className="mt-5 inline-flex items-center gap-1 text-(length:--text-small) font-medium text-brand hover:underline"
        >
          {caseStudy ? "Read the case study" : "Visit the live product"}
          <ArrowUpRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
