"use client";

import { useRouter } from "next/navigation";
import { VIEW_SLUGS } from "@/lib/views";
import type { ViewSlug } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

export default function SurpriseMeButton({
  current,
  className,
}: {
  /** When set, the random pick never lands on the view you're already on. */
  current?: ViewSlug;
  className?: string;
}) {
  const router = useRouter();

  function handleClick() {
    const pool = current ? VIEW_SLUGS.filter((slug) => slug !== current) : VIEW_SLUGS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/${pick}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700",
        className
      )}
    >
      🎲 Surprise me
    </button>
  );
}
