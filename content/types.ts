/** Static content shapes. Replaces the generated `payload-types.ts`. */

export type ProjectType = 'web' | 'mobile' | 'desktop' | 'iot'
export type EngineKey = 'claude' | 'gemini' | 'vertex' | 'native' | 'web'
export type SkillCategory =
  | 'mobile'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'integrations'
  | 'tools'
export type ExperienceIcon = 'star' | 'code' | 'monitor' | 'book' | 'graduation'

export interface Project {
  slug: string
  title: string
  description: string
  type: ProjectType
  tags: string[]
  featured: boolean
  personal: boolean
  engine: EngineKey | null
  liveUrl: string | null
  githubUrl: string | null
  order: number | null
}

export interface Experience {
  slug: string
  title: string
  company: string
  location: string
  /** e.g. "2019 - 2023" */
  yearRange: string
  /** e.g. "January 2019 - July 2023" */
  dateRange: string
  description: string
  icon: ExperienceIcon
  responsibilities: string[]
  order: number | null
}

export interface Skill {
  name: string
  category: SkillCategory
  featured: boolean
  order: number | null
}

export interface SiteContent {
  siteName: string
  name: string
  role: string
  tagline: string
  taglineHighlight: string
  email: string
  linkedinUrl: string
  githubUrl: string
  portraitUrl: string
  cvUrl: string
  mainStack: string
  additionalTech: string
  careerStatus: string
  bio: string[]
  yearsExperience: string
  tokenSavings: string
  enginesOrchestrated: string
  processIntro: string
  pitchIntro: string
  aiEngineeringIntro: string
  copyright: string
  techStack: string
}
