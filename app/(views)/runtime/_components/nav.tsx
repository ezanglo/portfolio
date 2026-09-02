import { TRADITIONAL_SECTIONS } from "@/lib/views/traditional";

export default function RuntimeNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-view-border bg-view-page/90 px-6 py-4 backdrop-blur-sm font-mono sm:px-14">
      <a href="#home" className="text-sm font-semibold text-view-fg">
        ezra.anglo()
      </a>
      <div className="hidden gap-6 text-sm text-view-fg-muted sm:flex">
        {TRADITIONAL_SECTIONS.filter((s) => s.id !== "home").map((s) => (
          <a key={s.id} href={`#${s.id}`} className="hover:text-view-accent">
            {s.label.toLowerCase()}
          </a>
        ))}
      </div>
    </nav>
  );
}
