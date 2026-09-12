/**
 * Shapes the archived (`/legacy/*`) components expect.
 *
 * These mirror the old generated `payload-types.ts` closely enough that the legacy
 * components compile unchanged — only their import path moved here. They carry just the
 * fields those components actually read, not the full Payload surface. Nothing new should
 * be built against these; the live site uses `content/types.ts`.
 */

import type { EngineKey, ExperienceIcon, ProjectType, SkillCategory } from '@/content/types'

export interface Project {
  id: number
  title: string
  description: string
  type: ProjectType
  tags: { tag: string }[] | null
  imageUrl: { url: string | null } | null
  liveUrl: string | null
  githubUrl: string | null
  order: number | null
  featured: boolean | null
  aiEngine: EngineKey | null
  personal: boolean | null
}

export interface Experience {
  id: number
  title: string
  company: string
  year: string
  date: string
  location: string
  description: string
  icon: ExperienceIcon
  responsibilities: { responsibility: string }[] | null
  order: number | null
}

export interface Skill {
  id: number
  name: string
  category: SkillCategory
  order: number | null
  featured: boolean | null
}

export interface NavigationLink {
  name: string
  hash: string
  order: number
  visible: boolean | null
}

export interface SiteConfig {
  siteName: string
  hero: {
    photo: string
    name: string
    title: string
    description: string
    descriptionHighlight: string
    cvDownloadUrl: string
    linkedinUrl: string
    githubUrl: string
  }
  contact: { email: string }
  about: {
    mainStack: string
    additionalTech: string
    careerStatus: string
  }
  howIWork: {
    intro: string
    steps: { label: string; description: string; tools: { name: string; iconSlug: string }[] }[]
  }
  whyHireMe: {
    intro: string
    points: { title: string; description: string }[]
  }
  aiEngineering: { intro: string }
  stats: {
    yearsExperience: string
    tokenSavings: string
    enginesOrchestrated: string
  }
  footer: {
    copyrightText: string
    techStackDescription: string
  }
}
