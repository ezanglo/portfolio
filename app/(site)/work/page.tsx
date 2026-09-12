import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/content";
import type { ProjectCategory } from "@/content/types";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/project-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work — Ezra Anglo | Senior React Native & Full-Stack Developer",
  description:
    "React Native, full-stack, and AI-powered projects built by Ezra Anglo — a senior React Native and full-stack developer.",
  alternates: { canonical: "/work" },
};

const CATEGORIES: (ProjectCategory | "All")[] = ["Mobile", "Full-Stack", "AI", "Web", "SaaS", "All"];

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const category = (CATEGORIES.find((c) => c === rawCategory) ?? "Mobile") as ProjectCategory | "All";

  const projects =
    category === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(category));

  return (
    <Section size="lg">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Work"
          heading="Real projects, organized by capability."
          description="Mobile is the default view — the current specialization — with the full-stack and AI breadth behind it one click away."
        />

        <nav aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const href = c === "Mobile" ? "/work" : `/work?category=${encodeURIComponent(c)}`;
            const active = c === category;
            return (
              <Link
                key={c}
                href={href}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-(length:--text-small) font-medium transition-colors",
                  active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {c}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
