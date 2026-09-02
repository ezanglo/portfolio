import { cn } from "@/lib/utils";
import { VIEWS } from "@/lib/views";
import type { ViewSlug } from "@/lib/portfolio/types";
import SkipLink from "./skip-link";
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
      <ViewSwitcher current={view} />
      <ViewToaster theme={meta.theme} />
    </div>
  );
}
