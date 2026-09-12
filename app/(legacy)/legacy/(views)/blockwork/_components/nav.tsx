import { TRADITIONAL_SECTIONS } from "@/lib/views/traditional";

export default function BlockworkNav({ name }: { name: string }) {
  return (
    <nav className="flex items-center justify-between border-b-[3px] border-view-fg px-6 py-4 sm:px-12">
      <a href="#home" className="text-sm font-black uppercase tracking-wide text-view-fg">
        {name}
      </a>
      <div className="hidden gap-6 text-sm font-bold uppercase sm:flex">
        {TRADITIONAL_SECTIONS.filter((s) => s.id !== "home").map((s) => (
          <a key={s.id} href={`#${s.id}`} className="text-view-fg hover:text-view-accent">
            {s.id === "experience" ? "Exp" : s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
