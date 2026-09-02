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

export interface PortfolioData {
  identity: PortfolioIdentity
  bio: PortfolioBio
  skills: PortfolioSkills
  projects: NormalizedProject[]
  experience: NormalizedExperience[]
  stats: PortfolioStat[]
}
