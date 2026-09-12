import type { StackLayer } from "@/content/types";
import { cn } from "@/lib/utils";

export type { StackLayer };

/**
 * The layered React Native/Expo -> API -> Auth -> Backend -> PostgreSQL -> AWS -> AI visual
 * (brief §5/§12, build-plan §9). Hand-built rather than an Aceternity component — nothing in
 * the registry models "one product, layered systems underneath" — reused on the homepage,
 * /services, /about, and case studies via the `layers` prop. A numbered vertical step list
 * rather than boxes-and-arrows: a horizontal flow wraps unevenly the moment the item count
 * doesn't divide cleanly into a row (ragged trailing row, no connector into it), and this
 * has no row count to break at any width.
 */
export function StackDiagram({ layers, className }: { layers: StackLayer[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {layers.map((layer, i) => {
        const isProduct = i === 0;
        const isLast = i === layers.length - 1;
        return (
          <li key={layer.label} className={cn("relative flex gap-4", !isLast && "pb-6")}>
            {!isLast ? (
              <span
                aria-hidden
                className="absolute top-8 left-4 -ml-px h-[calc(100%-1.75rem)] w-px bg-border"
              />
            ) : null}
            <div
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-(length:--text-caption) font-semibold",
                isProduct
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <div className="pt-1">
              <p
                className={cn(
                  "text-(length:--text-small) font-semibold",
                  isProduct && "text-brand"
                )}
              >
                {layer.label}
              </p>
              <p className="mt-0.5 text-(length:--text-caption) text-muted-foreground">{layer.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** The real stack, from the brief's §5 diagram — used wherever `StackDiagram` needs default
 * content instead of a case-study-specific layer set. */
export const CORE_STACK_LAYERS: StackLayer[] = [
  { label: "React Native / Expo", detail: "The mobile product" },
  { label: "API Layer", detail: "REST / GraphQL services" },
  { label: "Authentication", detail: "Session and identity" },
  { label: "Backend", detail: "PHP, Node.js, C#" },
  { label: "PostgreSQL", detail: "The data layer" },
  { label: "Cloud / Infrastructure", detail: "AWS, Google Cloud, Dokploy" },
  { label: "AI / Integrations", detail: "Claude, OpenRouter, ChatGPT" },
];
