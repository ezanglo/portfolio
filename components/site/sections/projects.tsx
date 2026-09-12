import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { getCaseStudy } from "@/content/case-studies";
import type { Project } from "@/content/types";
import type { BuildCategory } from "@/content/what-i-build";

const FEATURED_SLUGS = ["reseebo", "opic-nightlife-app", "finn-ai-ops", "stratos-command"];
const FEATURED_SPANS = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

function projectLink(project: Project) {
  const caseStudy = getCaseStudy(project.slug);
  if (caseStudy) return { href: `/work/${project.slug}`, label: "Case study", external: false };
  if (project.liveUrl) return { href: project.liveUrl, label: "Website", external: true };
  return null;
}

function WordmarkHeader({ title, logoUrl }: { title: string; logoUrl: string | null }) {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex items-center gap-3 px-4">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-[14px] object-cover"
            aria-hidden
          />
        ) : null}
        <p className="text-center font-display text-xl font-bold tracking-tight text-balance sm:text-2xl">
          {title}
        </p>
      </div>
    </div>
  );
}

export function Projects({ projects, whatIBuild }: { projects: Project[]; whatIBuild: BuildCategory[] }) {
  const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => p !== undefined
  );
  const excluded = new Set(FEATURED_SLUGS);
  const remaining = projects.filter((p) => !excluded.has(p.slug));
  const more = remaining.slice(0, 4);

  return (
    <Section id="projects" size="lg" className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          heading="Apps I've built."
          description="A selection of mobile, full-stack, and AI-powered work, the complete list is one click away."
        />

        <ul className="mt-7 flex flex-wrap gap-2">
          {whatIBuild.map((category) => (
            <li
              key={category.slug}
              className="rounded-full border border-border px-3.5 py-1.5 text-(length:--text-caption) text-muted-foreground"
            >
              {category.title}
            </li>
          ))}
        </ul>

        <BentoGrid className="mt-12 max-w-none md:auto-rows-[24rem]">
          {featured.map((project, i) => {
            const link = projectLink(project);
            return (
              <div key={project.slug} className={`relative ${FEATURED_SPANS[i]}`}>
                <GlowingEffect proximity={90} spread={35} borderWidth={2} />
                <BentoGridItem
                  className="h-full overflow-hidden"
                  header={<WordmarkHeader title={project.title} logoUrl={project.logoUrl} />}
                  title={
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-(length:--text-h3)">{project.title}</span>
                      <span className="text-(length:--text-caption) font-semibold text-brand">
                        {project.categories[0] ?? project.platform}
                      </span>
                    </span>
                  }
                  description={
                    <div>
                      <p className="line-clamp-3 text-(length:--text-small) leading-relaxed">{project.description}</p>
                      {project.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-(length:--text-caption) text-secondary-foreground/80">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {link ? (
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                          className="mt-4 inline-flex items-center gap-1.5 text-(length:--text-small) font-semibold text-brand"
                        >
                          {link.label}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      ) : null}
                    </div>
                  }
                />
              </div>
            );
          })}
        </BentoGrid>

        {more.length > 0 ? (
          <div className="mt-16">
            <p className="mb-4 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
              More Projects
            </p>
            <div className="overflow-hidden rounded-2xl border border-border">
              {more.map((project) => {
                const link = projectLink(project);
                return (
                  <div
                    key={project.slug}
                    className="flex flex-wrap items-center gap-4 border-b border-border bg-card p-5 transition-colors duration-150 last:border-b-0 hover:bg-secondary/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <p className="font-display text-(length:--text-small) font-semibold">{project.title}</p>
                        <span className="text-(length:--text-caption) font-semibold text-brand">
                          {project.categories[0] ?? project.platform}
                        </span>
                      </div>
                      <p className="mt-1 text-(length:--text-caption) text-muted-foreground">{project.description}</p>
                    </div>
                    {link ? (
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className="inline-flex shrink-0 items-center gap-1 text-(length:--text-small) font-semibold text-brand"
                      >
                        {link.label}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {remaining.length > more.length ? (
              <Link
                href="/work"
                className="mt-5 inline-flex items-center gap-1.5 text-(length:--text-small) font-semibold text-brand"
              >
                View all projects
                <ArrowRight className="size-3.5" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
