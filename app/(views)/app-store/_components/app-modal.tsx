"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { NormalizedProject } from "@/lib/portfolio/types";
import AppIcon from "./app-icon";

export default function AppModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: NormalizedProject | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[440px] rounded-[20px] p-8 max-[768px]:fixed max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:top-auto max-[768px]:max-h-[85dvh] max-[768px]:w-full max-[768px]:max-w-none max-[768px]:translate-x-0 max-[768px]:translate-y-0 max-[768px]:overflow-y-auto max-[768px]:rounded-t-[20px] max-[768px]:rounded-b-none">
        {project && (
          <>
            <VisuallyHidden>
              <DialogTitle>{project.title}</DialogTitle>
            </VisuallyHidden>
            <AppIcon initials={project.store.initials} bg={project.store.iconBg} size={60} radius={15} />
            <h2 className="mt-4 text-[22px] font-extrabold text-view-fg">{project.title}</h2>
            <p className="text-[12.5px] font-semibold uppercase text-[var(--view-tag-fg)]">{project.store.category}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-view-fg-muted">{project.description}</p>
            {project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-view-accent-soft px-2.5 py-1 text-xs font-semibold text-[var(--view-tag-fg)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6 flex items-center justify-between border-t border-view-border pt-4">
              <button type="button" onClick={onPrev} className="text-sm font-medium text-view-fg-muted hover:text-view-fg">
                ← Prev
              </button>
              <button type="button" onClick={onNext} className="text-sm font-medium text-view-fg-muted hover:text-view-fg">
                Next →
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
