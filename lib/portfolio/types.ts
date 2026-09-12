export type ViewSlug =
  | 'corporate'
  | 'runtime'
  | 'field-notes'
  | 'blockwork'
  | 'ai-chat'
  | 'terminal'
  | 'ide'
  | 'classic'

export type EngineKey = 'claude' | 'gemini' | 'vertex' | 'native' | 'web'

export type GridTag = 'AI' | 'React Native' | 'Web' | 'Mobile' | 'Desktop' | 'Personal'

export type StoreCategory = 'AI' | 'Mobile' | 'Web' | 'Desktop'

export type SkillGroupKey = 'core' | 'mobile' | 'ai' | 'cloud' | 'frontend' | 'backend' | 'other'

/**
 * The flat project/site shape every archived `/legacy/*` view was written against — `type` +
 * `engine`, not the §2 re-classified `platform`/`categories`/`mobileFramework`/`aiPlatform`
 * model in `content/types.ts`. `lib/portfolio/data.ts` builds these from the frozen
 * `lib/legacy/strings.ts` values so the legacy views keep rendering exactly as they did.
 */
export interface LegacySourceProject {
  slug: string
  title: string
  description: string
  type: 'web' | 'mobile' | 'desktop' | 'iot'
  tags: string[]
  featured: boolean
  personal: boolean
  engine: EngineKey | null
  liveUrl: string | null
  githubUrl: string | null
  order: number | null
}

export interface LegacySourceSite {
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

export interface NormalizedProject {
  id: number
  slug: string
  title: string
  description: string
  type: 'web' | 'mobile' | 'desktop' | 'iot'
  tags: string[]
  featured: boolean
  liveUrl: string | null
  githubUrl: string | null
  imageUrl: string | null
  personal: boolean
  engine: EngineKey | null
  store: { category: StoreCategory; initials: string; iconBg: string }
  grid: GridTag[]
}

export interface NormalizedExperience {
  id: number
  slug: string
  title: string
  company: string
  location: string
  dateStart: string
  dateEnd: string
  yearRange: string
  description: string
  responsibilities: string[]
}

export interface PortfolioIdentity {
  name: string
  role: string
  yearsExperience: string
  email: string
  linkedinUrl: string
  githubUrl: string
  cvUrl: string
  initials: string
  portraitUrl: string | null
  siteName: string
  copyrightText: string
  techStackDescription: string
  mainStack: string
  additionalTech: string
  careerStatus: string
}

export interface PortfolioBio {
  long: string[]
  short: string[]
  thirdPerson: string[]
}

export interface PortfolioSkills {
  flat: string[]
  grouped: Record<SkillGroupKey, string[]>
}

export interface PortfolioStat {
  key: string
  value: string
  label: string
  derived: boolean
}

export interface ProcessTool {
  name: string
  iconSlug: string
}

/** One step of the "How I work" process flow (Discover → Plan → Build → …). */
export interface ProcessStep {
  label: string
  description: string
  tools: ProcessTool[]
}

/** A callout attached to the process — currently how AI coding agents run inside the loop. */
export interface ProcessNote {
  title: string
  body: string
}

export interface PortfolioProcess {
  intro: string
  steps: ProcessStep[]
  note: ProcessNote
}

/** One "Why hire me" selling point. */
export interface PitchPoint {
  title: string
  description: string
}

export interface PortfolioPitch {
  intro: string
  points: PitchPoint[]
}

export interface PortfolioData {
  identity: PortfolioIdentity
  bio: PortfolioBio
  skills: PortfolioSkills
  projects: NormalizedProject[]
  experience: NormalizedExperience[]
  stats: PortfolioStat[]
  process: PortfolioProcess
  pitch: PortfolioPitch
}
