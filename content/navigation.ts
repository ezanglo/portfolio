/** §19 navigation. One-page portfolio — every primary link scrolls to a homepage section
 * rather than navigating to a separate page. `/#id` (not a bare `#id`) so it still resolves
 * correctly from a case-study, article, or landing page. */
export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
]

export const NAV_CTA: NavLink = { label: "Let's Build Your App", href: "/#contact" }
