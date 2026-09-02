import type { Experience, Project, SiteConfig, Skill } from '@/payload-types'
import { gridTagsFor, iconBgFor, skillGroupFor, storeCategoryFor } from './taxonomy'
import { buildBioVariants, lexicalToParagraphs } from './bio'
import type {
  EngineKey,
  NormalizedExperience,
  NormalizedProject,
  PortfolioData,
  SkillGroupKey,
} from './types'

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function initials(title: string): string {
  const words = title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0] ?? '??').slice(0, 2).toUpperCase()
}

function narrowImageUrl(imageUrl: Project['imageUrl']): string | null {
  if (imageUrl && typeof imageUrl === 'object') return imageUrl.url ?? null
  return null
}

function normalizeProjects(projects: Project[]): NormalizedProject[] {
  const categoryCounters: Record<string, number> = {}

  return projects.map((p) => {
    const tags = (p.tags ?? []).map((t) => t.tag)
    const engine = (p.aiEngine ?? null) as EngineKey | null
    const personal = Boolean(p.personal)
    const store = {
      category: storeCategoryFor(p.type, engine),
      initials: initials(p.title),
      iconBg: '',
    }
    const idx = categoryCounters[store.category] ?? 0
    categoryCounters[store.category] = idx + 1
    store.iconBg = iconBgFor(store.category, idx)

    const grid = gridTagsFor({ type: p.type, tags, engine, personal })

    if (process.env.NODE_ENV !== 'production' && !engine) {
      console.warn(`[portfolio] project "${p.title}" has no aiEngine set — it will not appear on /ops-dashboard`)
    }

    return {
      id: p.id,
      slug: slugify(p.title),
      title: p.title,
      description: p.description,
      type: p.type,
      tags,
      featured: Boolean(p.featured),
      liveUrl: p.liveUrl ?? null,
      githubUrl: p.githubUrl ?? null,
      imageUrl: narrowImageUrl(p.imageUrl),
      personal,
      engine,
      store,
      grid,
    }
  })
}

function parseYearRange(yearRange: string): { dateStart: string; dateEnd: string } {
  const match = yearRange.match(/(\d{4})/g)
  const dateStart = match?.[0] ?? yearRange
  const isPresent = /present/i.test(yearRange)
  const dateEnd = isPresent ? 'Present' : (match?.[1] ?? dateStart)
  return { dateStart, dateEnd }
}

function normalizeExperience(experiences: Experience[]): NormalizedExperience[] {
  return experiences.map((e) => {
    const { dateStart, dateEnd } = parseYearRange(e.year)
    return {
      id: e.id,
      slug: slugify(`${e.title}-${e.company}`),
      title: e.title,
      company: e.company,
      location: e.location,
      dateStart,
      dateEnd,
      yearRange: e.year,
      description: e.description,
      responsibilities: (e.responsibilities ?? []).map((r) => r.responsibility),
    }
  })
}

function groupSkills(skills: Skill[]): Record<SkillGroupKey, string[]> {
  const grouped: Record<SkillGroupKey, string[]> = {
    core: [],
    mobile: [],
    ai: [],
    cloud: [],
    frontend: [],
    backend: [],
    other: [],
  }
  for (const skill of skills) {
    grouped[skillGroupFor(skill)].push(skill.name)
  }
  return grouped
}

export function buildPortfolioData(input: {
  experiences: Experience[]
  projects: Project[]
  skills: Skill[]
  siteConfig: SiteConfig | null
}): PortfolioData {
  const { experiences, projects, skills, siteConfig } = input

  const name = siteConfig?.hero?.name || 'Ezra Anglo'
  const yearsExperience = siteConfig?.stats?.yearsExperience || '10+'

  const identity = {
    name,
    role: siteConfig?.hero?.title || 'Full-stack developer',
    yearsExperience,
    email: siteConfig?.contact?.email || 'dev.ezraanglo@gmail.com',
    linkedinUrl: siteConfig?.hero?.linkedinUrl || 'https://www.linkedin.com/in/ezraanglo',
    githubUrl: siteConfig?.hero?.githubUrl || 'https://www.github.com/ezanglo',
    cvUrl: siteConfig?.hero?.cvDownloadUrl || '',
    initials: initials(name),
    portraitUrl: siteConfig?.hero?.photo || null,
    siteName: siteConfig?.siteName || 'Ezra Anglo Portfolio',
    copyrightText: siteConfig?.footer?.copyrightText || `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
    techStackDescription: siteConfig?.footer?.techStackDescription || '',
    mainStack: siteConfig?.about?.mainStack || 'React, Typescript, PostgreSQL and PHP',
    additionalTech: siteConfig?.about?.additionalTech || 'TailwindCSS, .NET, Prisma, and React Native',
    careerStatus: siteConfig?.about?.careerStatus || 'full-time position as a full-stack developer',
  }

  const bio = buildBioVariants({
    name,
    yearsExperience,
    mainStack: identity.mainStack,
    additionalTech: identity.additionalTech,
    careerStatus: identity.careerStatus,
    longParagraphs: lexicalToParagraphs(siteConfig?.about?.description),
  })

  const normalizedProjects = normalizeProjects(projects)
  const normalizedExperience = normalizeExperience(experiences)

  const stats = [
    { key: 'years', value: `${yearsExperience}`, label: 'YEARS EXPERIENCE', derived: false },
    { key: 'projects', value: String(normalizedProjects.length), label: 'PROJECTS SHIPPED', derived: true },
    {
      key: 'token-savings',
      value: siteConfig?.stats?.tokenSavings || '92%',
      label: 'TOKEN COST REDUCTION',
      derived: false,
    },
    {
      key: 'engines',
      value: siteConfig?.stats?.enginesOrchestrated || '4',
      label: 'AI ENGINES ORCHESTRATED',
      derived: false,
    },
  ]

  return {
    identity,
    bio,
    skills: { flat: skills.map((s) => s.name), grouped: groupSkills(skills) },
    projects: normalizedProjects,
    experience: normalizedExperience,
    stats,
  }
}
