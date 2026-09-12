/**
 * Adapts static `content/*` into the Payload-ish shapes the archived components expect.
 *
 * This exists so the `/legacy/*` surfaces keep rendering exactly as they did on the CMS
 * without editing nine components that are now frozen. It is a one-way compatibility
 * shim — delete it when the legacy routes go.
 */

import { EXPERIENCE, PROJECTS, SITE, SKILLS } from '@/content'
import { FALLBACK_PITCH_POINTS, FALLBACK_PROCESS_STEPS } from '@/lib/portfolio/narrative'
import type { Experience, NavigationLink, Project, SiteConfig, Skill } from './types'

export const LEGACY_PROJECTS: Project[] = PROJECTS.map((p, i) => ({
  id: i + 1,
  title: p.title,
  description: p.description,
  type: p.type,
  tags: p.tags.map((tag) => ({ tag })),
  // `media` was empty in every environment; no project ever had an image.
  imageUrl: null,
  liveUrl: p.liveUrl,
  githubUrl: p.githubUrl,
  order: p.order,
  featured: p.featured,
  aiEngine: p.engine,
  personal: p.personal,
}))

export const LEGACY_EXPERIENCES: Experience[] = EXPERIENCE.map((e, i) => ({
  id: i + 1,
  title: e.title,
  company: e.company,
  year: e.yearRange,
  date: e.dateRange,
  location: e.location,
  description: e.description,
  icon: e.icon,
  responsibilities: e.responsibilities.map((responsibility) => ({ responsibility })),
  order: e.order,
}))

export const LEGACY_SKILLS: Skill[] = SKILLS.map((s, i) => ({
  id: i + 1,
  name: s.name,
  category: s.category,
  order: s.order,
  featured: s.featured,
}))

/**
 * The old `navigation-links` collection, frozen. These are the exact rows the CMS held —
 * hash links into the single-page classic layout. The live site uses
 * `lib/content/navigation.ts` instead.
 */
export const LEGACY_NAV_LINKS: NavigationLink[] = [
  { name: 'Home', hash: '#home', order: 10, visible: true },
  { name: 'About', hash: '#about', order: 20, visible: true },
  { name: 'Why Hire Me', hash: '#why-hire-me', order: 30, visible: true },
  { name: 'Skills', hash: '#skills', order: 40, visible: true },
  { name: 'Experience', hash: '#experience', order: 50, visible: true },
  { name: 'Projects', hash: '#projects', order: 60, visible: true },
  { name: 'Contact', hash: '#contact', order: 70, visible: true },
]

export const LEGACY_SITE_CONFIG: SiteConfig = {
  siteName: SITE.siteName,
  hero: {
    photo: SITE.portraitUrl,
    name: SITE.name,
    title: SITE.role,
    description: SITE.tagline,
    descriptionHighlight: SITE.taglineHighlight,
    cvDownloadUrl: SITE.cvUrl,
    linkedinUrl: SITE.linkedinUrl,
    githubUrl: SITE.githubUrl,
  },
  contact: { email: SITE.email },
  about: {
    mainStack: SITE.mainStack,
    additionalTech: SITE.additionalTech,
    careerStatus: SITE.careerStatus,
  },
  howIWork: { intro: SITE.processIntro, steps: FALLBACK_PROCESS_STEPS },
  whyHireMe: { intro: SITE.pitchIntro, points: FALLBACK_PITCH_POINTS },
  aiEngineering: { intro: SITE.aiEngineeringIntro },
  stats: {
    yearsExperience: SITE.yearsExperience,
    tokenSavings: SITE.tokenSavings,
    enginesOrchestrated: SITE.enginesOrchestrated,
  },
  footer: {
    copyrightText: SITE.copyright,
    techStackDescription: SITE.techStack,
  },
}
