/**
 * Adapts static `content/*` into the Payload-ish shapes the archived components expect.
 *
 * This exists so the `/legacy/*` surfaces keep rendering exactly as they did on the CMS
 * without editing nine components that are now frozen. It is a one-way compatibility
 * shim — delete it when the legacy routes go.
 */

import { EXPERIENCE, PROJECTS, SITE, SKILLS } from '@/content'
import { FALLBACK_PITCH_POINTS, FALLBACK_PROCESS_STEPS } from '@/lib/portfolio/narrative'
import {
  LEGACY_ADDITIONAL_TECH,
  LEGACY_CAREER_STATUS,
  LEGACY_COPYRIGHT,
  LEGACY_ENGINES_ORCHESTRATED,
  LEGACY_MAIN_STACK,
  LEGACY_PROJECT_CLASSIFICATION,
  LEGACY_PROJECT_SLUG_ORDER,
  LEGACY_TAGLINE,
  LEGACY_TAGLINE_HIGHLIGHT,
  LEGACY_TECH_STACK_DESCRIPTION,
  LEGACY_TOKEN_SAVINGS,
} from './strings'
import type { Experience, NavigationLink, Project, SiteConfig, Skill } from './types'

const projectsBySlug = new Map(PROJECTS.map((p) => [p.slug, p]))

export const LEGACY_PROJECTS: Project[] = LEGACY_PROJECT_SLUG_ORDER.map((slug, i) => {
  const p = projectsBySlug.get(slug)
  const classification = LEGACY_PROJECT_CLASSIFICATION[slug]
  if (!p || !classification) {
    throw new Error(`Legacy project classification missing for slug "${slug}"`)
  }
  return {
    id: i + 1,
    title: p.title,
    description: p.description,
    type: classification.type,
    tags: p.tags.map((tag) => ({ tag })),
    // `media` was empty in every environment; no project ever had an image.
    imageUrl: null,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    order: classification.order,
    featured: p.featured,
    aiEngine: classification.engine,
    personal: p.personal,
  }
})

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
 * `content/navigation.ts` instead.
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
    // The CMS's original "Full Stack Developer" title and Web/Mobile/Desktop tagline —
    // content/site.ts now carries the rewritten §1/§3 positioning instead.
    title: "Full Stack Developer",
    description: LEGACY_TAGLINE,
    descriptionHighlight: LEGACY_TAGLINE_HIGHLIGHT,
    cvDownloadUrl: SITE.cvUrl,
    linkedinUrl: SITE.linkedinUrl,
    githubUrl: SITE.githubUrl,
  },
  contact: { email: SITE.email },
  about: {
    mainStack: LEGACY_MAIN_STACK,
    additionalTech: LEGACY_ADDITIONAL_TECH,
    careerStatus: LEGACY_CAREER_STATUS,
  },
  howIWork: { intro: SITE.processIntro, steps: FALLBACK_PROCESS_STEPS },
  whyHireMe: { intro: SITE.pitchIntro, points: FALLBACK_PITCH_POINTS },
  aiEngineering: { intro: SITE.aiEngineeringIntro },
  stats: {
    yearsExperience: SITE.yearsExperience,
    tokenSavings: LEGACY_TOKEN_SAVINGS,
    enginesOrchestrated: LEGACY_ENGINES_ORCHESTRATED,
  },
  footer: {
    copyrightText: LEGACY_COPYRIGHT,
    techStackDescription: LEGACY_TECH_STACK_DESCRIPTION,
  },
}
