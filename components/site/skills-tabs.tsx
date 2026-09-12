"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { toolLogoUrl } from "@/components/site/tool-logos";
import type { Skill } from "@/content/types";

export interface SkillCategoryTab {
  num: string;
  label: string;
  /** A rendered icon element, not a component reference — Server Components can't pass a
   * function/component reference as a prop to a Client Component like this one. */
  icon: ReactNode;
  skills?: Skill[];
  pointsToAi?: boolean;
}

export function SkillsTabs({ categories }: { categories: SkillCategoryTab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:items-stretch">
      <div className="flex flex-col gap-1.5">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
              i === activeIndex
                ? "border-brand bg-brand/10 text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
            )}
          >
            <span className={cn("flex size-4.5 shrink-0", i === activeIndex && "text-brand")}>{cat.icon}</span>
            <div>
              <p className="text-(length:--text-caption) text-muted-foreground">{cat.num}</p>
              <p className="text-(length:--text-small) font-semibold">{cat.label}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="relative flex min-h-64 flex-col justify-center rounded-2xl border border-border bg-card p-7">
        <GlowingEffect proximity={90} spread={35} borderWidth={2} />
        {active.pointsToAi ? (
          <div>
            <p className="font-display text-(length:--text-h3) font-semibold">
              Vertex AI and Generative AI live under Cloud.
            </p>
            <p className="mt-2 text-(length:--text-small) text-muted-foreground">
              See how I apply them in the AI-focus block below.
            </p>
            <a
              href="#ai-focus"
              className="mt-4 inline-flex items-center gap-1.5 text-(length:--text-small) font-semibold text-brand"
            >
              Jump to AI focus
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3.5">
            {active.skills?.map((skill) => {
              const logoUrl = toolLogoUrl(skill.name);
              return (
                <div
                  key={skill.name}
                  className="relative flex flex-1 basis-44 items-center gap-3.5 rounded-2xl border border-border bg-background px-4.5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <GlowingEffect proximity={60} spread={20} borderWidth={2} />
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand/10">
                    {logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logoUrl} alt="" aria-hidden className="size-4.5" />
                    ) : (
                      <span className="font-display text-(length:--text-caption) font-bold text-brand">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </span>
                  <span className="text-(length:--text-small) font-semibold">{skill.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
