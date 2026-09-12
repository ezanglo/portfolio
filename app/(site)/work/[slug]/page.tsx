import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy, PROJECTS } from "@/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { TechBadgeList } from "@/components/site/tech-badge";
import { CORE_STACK_LAYERS, StackDiagram } from "@/components/site/stack-diagram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/site";

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
  const title = `${project.title} — Case Study | Ezra Anglo`;
  return {
    title,
    description: caseStudy.overview,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description: caseStudy.overview, type: "article" },
  };
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
      <Container size="narrow">
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

        <div className="mt-6 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <Badge key={c} variant="outline">
              {c}
            </Badge>
          ))}
          {project.personal ? <Badge variant="secondary">Personal project</Badge> : null}
        </div>

        <h1 className="mt-4 text-(length:--text-h1) leading-(--text-h1-lh) tracking-(--text-h1-tracking) font-semibold text-balance">
          {project.title}
        </h1>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Overview</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.overview}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">The Problem</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.problem}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">My Role</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.role}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">What I Built</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.whatIBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Architecture</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.architecture}
          </p>
          <div className="mt-6">
            <StackDiagram layers={CORE_STACK_LAYERS} />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Engineering Challenges</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.challenges}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Solution</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.solution}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Technology</h2>
          <div className="mt-3">
            <TechBadgeList items={caseStudy.technology} />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-(length:--text-h3) font-semibold">Outcome</h2>
          <p className="mt-2 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground">
            {caseStudy.outcome === null
              ? "No verifiable outcome data is available for this project yet."
              : "confidential" in caseStudy.outcome
                ? "Outcome confidential — private client project."
                : caseStudy.outcome.result}
          </p>
        </section>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-1 text-(length:--text-small) font-medium text-brand hover:underline"
          >
            Visit the live product →
          </a>
        ) : null}
      </Container>
    </Section>
  );
}
