export const TRADITIONAL_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'why', label: 'Why' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type TraditionalSectionId = (typeof TRADITIONAL_SECTIONS)[number]['id']
