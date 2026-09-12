import { TRADITIONAL_SECTIONS } from "@/lib/views/traditional";

export default function FieldNotesNav({ name }: { name: string }) {
  return (
    <nav className="flex items-center justify-between px-6 py-6 sm:px-12">
      <a href="#home" className="font-serif text-lg font-semibold text-view-fg">
        {name}
      </a>
      <div className="hidden gap-6 text-sm text-view-fg-muted sm:flex">
        {TRADITIONAL_SECTIONS.filter((s) => s.id !== "home").map((s) => (
          <a key={s.id} href={`#${s.id}`} className="hover:text-view-accent">
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
