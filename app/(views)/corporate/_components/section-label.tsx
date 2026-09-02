export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-view-accent">{children}</p>
  );
}
