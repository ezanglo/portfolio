"use client";

import { useRouter } from "next/navigation";
import { VIEW_SLUGS } from "@/lib/views";

export default function SurpriseMeButton() {
  const router = useRouter();

  function handleClick() {
    const pick = VIEW_SLUGS[Math.floor(Math.random() * VIEW_SLUGS.length)];
    router.push(`/${pick}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
    >
      🎲 Surprise me
    </button>
  );
}
