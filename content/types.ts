/** Static content shapes. Replaces the generated `payload-types.ts`. */

export type Platform = 'mobile' | 'web' | 'desktop' | 'iot'
export type ProjectCategory = 'Mobile' | 'Full-Stack' | 'AI' | 'Web' | 'SaaS'
export type MobileFramework = 'react-native' | 'expo' | 'xamarin' | null
export type AiPlatform = 'claude' | 'gemini' | 'vertex' | 'openrouter' | null
export type RepoStatus = 'public' | 'private-client' | 'unspecified'

export type SkillCategory =
  | 'mobile'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'integrations'
  | 'tools'
export type ExperienceIcon = 'star' | 'code' | 'monitor' | 'book' | 'graduation'

/** A project image. `images: []` everywhere until real screenshots exist — every
 * consumer must handle the empty case so adding assets later is a data-only change. */
export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
  kind: 'phone' | 'wide' | 'diagram'
}

export interface Project {
  slug: string
  title: string
  description: string
  platform: Platform
  categories: ProjectCategory[]
  mobileFramework: MobileFramework
  aiPlatform: AiPlatform
  tags: string[]
  featured: boolean
  personal: boolean
  repoStatus: RepoStatus
  liveUrl: string | null
  githubUrl: string | null
  images: ProjectImage[]
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

/** §9 case-study schema. Unknown narrative is a literal `[ADD REAL … HERE]` string, never a
 * plausible-sounding placeholder — visible in the UI until real detail is added. */
export interface CaseStudy {
  projectSlug: string
  overview: string
  problem: string
  role: string
  whatIBuilt: string[]
  architecture: string
  challenges: string
  solution: string
  technology: string[]
  /** `null` omits the section; `{ confidential: true }` states it plainly (§9) instead of
   * silently dropping it; a string is a real, verifiable result. */
  outcome: { confidential: true } | { result: string } | null
}

/** One numeric AI claim — used only in the AI section, never the hero trust row. */
export interface AiStat {
  value: string
  label: string
  /** Where the number comes from, shown alongside it so it isn't a bare claim. */
  context: string
}

export interface SiteContent {
  siteName: string
  name: string
  role: string
  /** §3 hero headline. */
  heroHeadline: string
  /** The emphasized object of "I build ___" under the headline (design brief hero §3). */
  heroSubline: string
  /** §3 supporting copy, one paragraph. */
  heroCopy: string
  email: string
  linkedinUrl: string
  githubUrl: string
  portraitUrl: string
  cvUrl: string
  bio: string[]
  yearsExperience: string
  /** §4 hero trust row — six short strings, no unsupported claims. */
  trustIndicators: string[]
  /** AI section only (§13); never surfaced as hero trust claims. */
  aiStats: AiStat[]
  processIntro: string
  pitchIntro: string
  aiEngineeringIntro: string
  copyright: string
}
