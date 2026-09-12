"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  /** Per-category display copy for the detail panel — distinct from the short nav `label`. */
  heading: string;
  description: string;
  skills: Skill[];
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
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-[11px] border",
                i === activeIndex ? "border-brand text-brand" : "border-border text-muted-foreground"
              )}
            >
              {cat.icon}
            </span>
            <div>
              <p className="text-(length:--text-caption) text-muted-foreground">{cat.num}</p>
              <p className="text-(length:--text-small) font-semibold">{cat.label}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="relative flex flex-col rounded-2xl border border-border bg-card p-7">
        <GlowingEffect proximity={90} spread={35} borderWidth={2} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-brand uppercase">
                  Category / {active.num}
                </p>
                <h3 className="mt-2 font-display text-(length:--text-h3) font-semibold text-balance">
                  {active.heading}
                </h3>
                <p className="mt-2 max-w-md text-(length:--text-small) leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] border border-brand text-brand">
                {active.icon}
              </span>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              {/* Fixed to ~2 rows so tabs with a dozen-plus skills (State & Data, Delivery) don't
                  blow out the panel height — the rest scrolls instead of pushing the page layout. */}
              <div className="grid max-h-56 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
                {active.skills.map((skill) => {
                  const logoUrl = toolLogoUrl(skill.name);
                  return (
                    <div
                      key={skill.name}
                      className="relative rounded-2xl border border-border bg-background p-4 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <GlowingEffect proximity={60} spread={20} borderWidth={2} />
                      <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand/10">
                        {logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={logoUrl} alt="" aria-hidden className="size-4.5" />
                        ) : (
                          <span className="font-display text-(length:--text-caption) font-bold text-brand">
                            {skill.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <p className="mt-3 text-(length:--text-small) font-semibold">{skill.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
              <span>{active.skills.length} tools and skills</span>
              <span className="hidden sm:inline">Select a category to explore</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
