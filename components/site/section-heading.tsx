import { cn } from "@/lib/utils";

/** Configurable `as` so sub-pages can carry a real `<h1>` while section headings elsewhere
 * stay `<h2>` — one heading hierarchy across the site (brief §27). */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  as: Comp = "h2",
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  as?: React.ElementType;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-(--container-narrow)", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Comp className="text-(length:--text-h2) leading-(--text-h2-lh) tracking-(--text-h2-tracking) font-semibold text-balance">
        {heading}
      </Comp>
      {description ? (
        <p className="mt-4 text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
