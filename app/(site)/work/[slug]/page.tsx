import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Lightbulb,
  Lock,
  Target,
  TrendingUp,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { CASE_STUDIES, getCaseStudy, PROJECTS } from "@/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { TechBadgeList } from "@/components/site/tech-badge";
import { StackDiagram } from "@/components/site/stack-diagram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.projectSlug }));
}

function findEntry(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug);
  const caseStudy = getCaseStudy(slug);
  if (!project || !caseStudy) return null;
  return { project, caseStudy };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};
  const { project, caseStudy } = entry;
  const title = `${project.title} Case Study | Ezra Anglo`;
  return {
    title,
    description: caseStudy.overview,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description: caseStudy.overview, type: "article" },
  };
}

/** A narrative section anchored by an icon + label, matching the "context" pair and the
 * challenge/solution flow below — the visual rhythm that replaces the old identical h2 stack. */
function StoryBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-brand">
        <Icon aria-hidden className="size-4" />
        <h2 className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) uppercase">
          {label}
        </h2>
      </div>
      <div className="mt-3 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();
  const { project, caseStudy } = entry;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 2, name: project.title, item: `${SITE_URL}/work/${slug}` },
    ],
  };

  return (
    <Section size="lg">
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/work">Work</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          {/* Left column — the primary read: hero hook, then the linear narrative (context,
              build, architecture, the hard part, the payoff). Reading order stays the same
              at every width. */}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
              {project.personal ? <Badge variant="secondary">Personal project</Badge> : null}
            </div>

            <h1 className="mt-4 max-w-3xl text-(length:--text-h1) leading-(--text-h1-lh) tracking-(--text-h1-tracking) font-semibold text-balance">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-foreground text-pretty">
              {caseStudy.overview}
            </p>

            <article className="mt-10 space-y-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <StoryBlock icon={Target} label="The Problem">
                  <p>{caseStudy.problem}</p>
                </StoryBlock>
                <StoryBlock icon={UserRound} label="My Role">
                  <p>{caseStudy.role}</p>
                </StoryBlock>
              </div>

              <Separator />

              <StoryBlock icon={CheckCircle2} label="What I Built">
                <ul className="mt-1 grid gap-3 sm:grid-cols-2">
                  {caseStudy.whatIBuilt.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-(length:--text-small) leading-relaxed"
                    >
                      <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StoryBlock>

              <Separator />

              <StoryBlock icon={Layers} label="Architecture">
                <div
                  className={cn(
                    "grid gap-8",
                    caseStudy.architectureLayers && "md:grid-cols-[22rem_minmax(0,1fr)] md:items-start"
                  )}
                >
                  {caseStudy.architectureLayers ? (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <StackDiagram layers={caseStudy.architectureLayers} />
                    </div>
                  ) : null}
                  <p className="max-w-2xl">{caseStudy.architecture}</p>
                </div>
              </StoryBlock>

              <Separator />

              {/* Challenge → Solution: the engineering payoff of the piece, deliberately
                  paired and visually connected rather than two more identical paragraphs. */}
              <div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TriangleAlert aria-hidden className="size-4" />
                    <h2 className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) uppercase">
                      Engineering Challenge
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
                    {caseStudy.challenges}
                  </p>
                </div>

                <div className="flex justify-center py-2">
                  <ChevronDown aria-hidden className="size-5 text-muted-foreground/60" />
                </div>

                <div className="rounded-xl border border-brand bg-brand/5 p-6">
                  <div className="flex items-center gap-2 text-brand">
                    <Lightbulb aria-hidden className="size-4" />
                    <h2 className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) uppercase">
                      Solution
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-(length:--text-body) leading-(--text-body-lh) text-foreground/90">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Outcome — omitted entirely when there's nothing verifiable to report (§9:
                  `null` omits the section) rather than a placeholder that reads as a gap.
                  Shown only for a real result or an explicit "confidential" statement. */}
              {caseStudy.outcome ? (
                <div
                  className={cn(
                    "rounded-xl border p-6",
                    "result" in caseStudy.outcome ? "border-brand bg-brand/5" : "border-border"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      "result" in caseStudy.outcome ? "text-brand" : "text-muted-foreground"
                    )}
                  >
                    {"result" in caseStudy.outcome ? (
                      <TrendingUp aria-hidden className="size-4" />
                    ) : (
                      <Lock aria-hidden className="size-4" />
                    )}
                    <h2 className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) uppercase">
                      Outcome
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
                    {"confidential" in caseStudy.outcome
                      ? "Outcome confidential: private client project."
                      : caseStudy.outcome.result}
                  </p>
                </div>
              ) : null}
            </article>
          </div>

          {/* Aside — quick facts, top-aligned with the hero rather than pushed down below
              it, and kept out of the narrative's DOM order so screen-reader and keyboard
              order still matches the visual reading path. */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
                  At a glance
                </p>
                {project.logoUrl ? (
                  <Image
                    src={project.logoUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-[9px] object-cover"
                    aria-hidden
                  />
                ) : null}
              </div>
              <dl className="mt-4 space-y-3 text-(length:--text-small)">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Platform</dt>
                  <dd>
                    <Badge variant="outline" className="capitalize">
                      {project.platform}
                    </Badge>
                  </dd>
                </div>
              </dl>

              <Separator className="my-5" />

              <p className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
                Technology
              </p>
              <div className="mt-3">
                <TechBadgeList items={caseStudy.technology} />
              </div>

              {project.liveUrl ? (
                <Button asChild className="mt-6 w-full">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Visit the live product
                    <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </aside>
        </div>

        <Separator className="mt-12" />

        <div className="mt-8 flex items-center justify-between gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-(length:--text-small) font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to all work
          </Link>
        </div>
      </Container>
    </Section>
  );
}
