export default function SkipLink({ targetId = "main" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only-focusable fixed top-2 left-2 z-[9999] rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
    >
      Skip to content
    </a>
  );
}
