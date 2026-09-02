import { VIEWS, NEW_VIEW_SLUGS } from "@/lib/views";
import { getViewCopy } from "@/lib/view-copy";
import type { PortfolioIdentity } from "@/lib/portfolio/types";
import GalleryHero from "./gallery-hero";
import PreviewCard from "./preview-card";

const GALLERY_ORDER = ["classic", ...NEW_VIEW_SLUGS] as const;

export default function ViewsGallery({ identity }: { identity: PortfolioIdentity }) {
  const eyebrow = getViewCopy("corporate", identity).eyebrow;

  return (
    <>
      <GalleryHero identity={identity} eyebrow={eyebrow} />

      <main id="main" className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:px-8 sm:pt-16">
        <p className="text-neutral-500">Here are a few different ways to look at the same work.</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ORDER.map((slug) => (
            <PreviewCard key={slug} view={VIEWS[slug]} />
          ))}
        </div>
      </main>
    </>
  );
}
