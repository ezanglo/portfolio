import { cn } from "@/lib/utils";

const WIDTHS = {
  narrow: "max-w-(--container-narrow)",
  content: "max-w-(--container-content)",
  wide: "max-w-(--container-wide)",
} as const;

export function Container({
  size = "content",
  className,
  children,
  as: Comp = "div",
}: {
  size?: keyof typeof WIDTHS;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Comp className={cn("mx-auto w-full px-6 sm:px-8", WIDTHS[size], className)}>
      {children}
    </Comp>
  );
}
