/** Nav — one-page portfolio, every link scrolls to a homepage section rather than navigating
 * to a separate page. `/#id` (not a bare `#id`) so it still resolves correctly from a
 * case-study, article, or landing page. The header's own "Resume" button (not listed here)
 * opens the CV, not a section. Education and FAQ were dropped from the homepage (2026-09-12),
 * so they're not nav entries either. */
export interface NavLink {
  label: string
  href: string
  id: string
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Capabilities", href: "/#why-hire-me", id: "why-hire-me" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
]
