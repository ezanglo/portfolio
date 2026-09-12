import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StackLayer {
  label: string;
  detail: string;
}

/**
 * The layered React Native/Expo -> API -> Auth -> Backend -> PostgreSQL -> AWS -> AI visual
 * (brief §5/§12, build-plan §9). Hand-built rather than an Aceternity component — nothing in
 * the registry models "one product, layered systems underneath" — reused on the homepage,
 * /services, /about, and case studies via the `layers` prop.
 */
export function StackDiagram({ layers, className }: { layers: StackLayer[]; className?: string }) {
  return (
    <ol className={cn("mx-auto flex w-full max-w-sm flex-col items-stretch", className)}>
      {layers.map((layer, i) => {
        const isProduct = i === 0;
        return (
          <li key={layer.label} className="flex flex-col items-center">
            <div
              className={cn(
                "w-full rounded-lg border px-5 py-3 text-center",
                isProduct
                  ? "border-brand bg-brand/5"
                  : "border-border bg-card"
              )}
            >
              <p
                className={cn(
                  "text-(length:--text-small) font-semibold",
                  isProduct && "text-brand"
                )}
              >
                {layer.label}
              </p>
              <p className="text-(length:--text-caption) text-muted-foreground">{layer.detail}</p>
            </div>
            {i < layers.length - 1 ? (
              <ChevronDown aria-hidden className="my-1 size-4 shrink-0 text-muted-foreground/60" />
            ) : null}
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
  { label: "AWS / Infrastructure", detail: "Lambda, API Gateway, deployment" },
  { label: "AI / Integrations", detail: "Claude, Gemini, Vertex AI" },
];
