import { cn } from "@/lib/utils";

const PADDING = {
  sm: "py-(--section-py-sm)",
  md: "py-(--section-py-md)",
  lg: "py-(--section-py-lg)",
} as const;

export function Section({
  id,
  size = "md",
  className,
  children,
}: {
  id?: string;
  size?: keyof typeof PADDING;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(PADDING[size], className)}>
      {children}
    </section>
  );
}
