import type { PortfolioSkills } from "@/lib/portfolio/types";

const GROUP_ORDER: (keyof PortfolioSkills["grouped"])[] = ["core", "ai", "cloud", "mobile", "frontend", "backend", "other"];
const GROUP_LABELS: Record<string, string> = {
  core: "CORE",
  ai: "AI",
  cloud: "CLOUD",
  mobile: "MOBILE",
  frontend: "FRONTEND",
  backend: "BACKEND",
  other: "OTHER",
};

export default function OpsSpecsPanel({ skills }: { skills: PortfolioSkills }) {
  return (
    <section className="mx-auto mt-8 max-w-[1100px] px-4 sm:px-12">
      <div className="rounded-xl border border-view-border bg-view-surface p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-view-fg-subtle">Specs</p>
        <div className="mt-3 flex flex-col gap-2 font-mono text-sm">
          {GROUP_ORDER.filter((g) => skills.grouped[g]?.length).map((group) => (
            <div key={group} className="flex flex-wrap gap-x-2">
              <span className="text-view-accent">{GROUP_LABELS[group]}:</span>
              <span className="text-view-fg-muted">{skills.grouped[group].join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
