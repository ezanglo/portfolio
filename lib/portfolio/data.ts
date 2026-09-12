import { cache } from 'react'
import { EXPERIENCE, PROJECTS, SITE, SKILLS } from '@/content'
import {
  LEGACY_ADDITIONAL_TECH,
  LEGACY_BIO,
  LEGACY_CAREER_STATUS,
  LEGACY_COPYRIGHT,
  LEGACY_ENGINES_ORCHESTRATED,
  LEGACY_EXPERIENCE_DESCRIPTIONS,
  LEGACY_MAIN_STACK,
  LEGACY_PROJECT_CLASSIFICATION,
  LEGACY_PROJECT_SLUG_ORDER,
  LEGACY_ROLE,
  LEGACY_TAGLINE,
  LEGACY_TAGLINE_HIGHLIGHT,
  LEGACY_TECH_STACK_DESCRIPTION,
  LEGACY_TOKEN_SAVINGS,
} from '@/lib/legacy/strings'
import { buildPortfolioData } from './derive'
import type { LegacySourceProject, LegacySourceSite, PortfolioData } from './types'
import type { Experience } from '@/content/types'

const projectsBySlug = new Map(PROJECTS.map((p) => [p.slug, p]))

/**
 * The 8 archived `/legacy/*` views (and the ai-chat API route behind one of them) all read
 * through this pipeline. It has to keep producing the CMS-era shape and copy — `content/*`
 * was rewritten for the new positioning (docs/build-plan.md §2), so this rebuilds the old
 * flat `type`/`engine` project shape and pre-rewrite site strings from the frozen values in
 * `lib/legacy/strings.ts`, composed with the facts that never changed (slug, description,
 * tags, links, personal, email, portrait, CV).
 */
const LEGACY_PROJECTS: LegacySourceProject[] = LEGACY_PROJECT_SLUG_ORDER.map((slug) => {
  const p = projectsBySlug.get(slug)
  const classification = LEGACY_PROJECT_CLASSIFICATION[slug]
  if (!p || !classification) {
    throw new Error(`Legacy project classification missing for slug "${slug}"`)
  }
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    type: classification.type,
    tags: p.tags,
    featured: p.featured,
    personal: p.personal,
    engine: classification.engine,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    order: classification.order,
  }
})

const LEGACY_EXPERIENCE: Experience[] = EXPERIENCE.map((e) =>
  e.slug in LEGACY_EXPERIENCE_DESCRIPTIONS ? { ...e, description: LEGACY_EXPERIENCE_DESCRIPTIONS[e.slug] } : e
)

const LEGACY_SITE: LegacySourceSite = {
  siteName: SITE.siteName,
  name: SITE.name,
  role: LEGACY_ROLE,
  tagline: LEGACY_TAGLINE,
  taglineHighlight: LEGACY_TAGLINE_HIGHLIGHT,
  email: SITE.email,
  linkedinUrl: SITE.linkedinUrl,
  githubUrl: SITE.githubUrl,
  portraitUrl: SITE.portraitUrl,
  cvUrl: SITE.cvUrl,
  mainStack: LEGACY_MAIN_STACK,
  additionalTech: LEGACY_ADDITIONAL_TECH,
  careerStatus: LEGACY_CAREER_STATUS,
  bio: LEGACY_BIO,
  yearsExperience: SITE.yearsExperience,
  tokenSavings: LEGACY_TOKEN_SAVINGS,
  enginesOrchestrated: LEGACY_ENGINES_ORCHESTRATED,
  processIntro: SITE.processIntro,
  pitchIntro: SITE.pitchIntro,
  aiEngineeringIntro: SITE.aiEngineeringIntro,
  copyright: LEGACY_COPYRIGHT,
  techStack: LEGACY_TECH_STACK_DESCRIPTION,
}

/**
 * The legacy read path. Content is static TypeScript, so this is a pure in-process build
 * with no IO — `cache()` only dedupes the work within a single render.
 */
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  return buildPortfolioData({
    experiences: LEGACY_EXPERIENCE,
    projects: LEGACY_PROJECTS,
    skills: SKILLS,
    site: LEGACY_SITE,
  })
})
