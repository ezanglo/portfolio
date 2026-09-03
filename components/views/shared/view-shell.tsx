import { cn } from "@/lib/utils";
import { VIEWS } from "@/lib/views";
import type { ViewSlug } from "@/lib/portfolio/types";
import SkipLink from "./skip-link";
import SurpriseMeButton from "./surprise-me-button";
import ViewSwitcher from "./view-switcher";
import ViewToaster from "./view-toaster";

export default function ViewShell({
  view,
  fontVars,
  children,
}: {
  view: ViewSlug;
  fontVars: string[];
  children: React.ReactNode;
}) {
  const meta = VIEWS[view];
  return (
    <div
      data-view={view}
      data-view-theme={meta.theme}
      className={cn(
        ...fontVars,
        "font-sans bg-view-page text-view-fg",
        meta.fullHeight ? "h-dvh overflow-hidden" : "min-h-dvh"
      )}
    >
      <SkipLink />
      {children}
      <ViewSwitcher
        current={view}
        extraActions={
          <SurpriseMeButton
            current={view}
            className="bg-white/95 py-2.5 text-neutral-800 shadow-[0_6px_20px_rgba(0,0,0,.25)] backdrop-blur hover:bg-white"
          />
        }
      />
      <ViewToaster theme={meta.theme} />
    </div>
  );
}
