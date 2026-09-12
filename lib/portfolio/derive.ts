import type { Experience, Skill } from '@/content/types'
import { gridTagsFor, iconBgFor, skillGroupFor, storeCategoryFor } from './taxonomy'
import { buildBioVariants } from './bio'
import { buildPitch, buildProcess } from './narrative'
import type {
  LegacySourceProject,
  LegacySourceSite,
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

function normalizeProjects(projects: LegacySourceProject[]): NormalizedProject[] {
  const categoryCounters: Record<string, number> = {}

  return projects.map((p, index) => {
    const store = {
      category: storeCategoryFor(p.type, p.engine),
      initials: initials(p.title),
      iconBg: '',
    }
    const idx = categoryCounters[store.category] ?? 0
    categoryCounters[store.category] = idx + 1
    store.iconBg = iconBgFor(store.category, idx)

    return {
      // Stable synthetic id: content is a static ordered array, so position is the identity.
      id: index + 1,
      slug: p.slug,
      title: p.title,
      description: p.description,
      type: p.type,
      tags: p.tags,
      featured: p.featured,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      imageUrl: null,
      personal: p.personal,
      engine: p.engine,
      store,
      grid: gridTagsFor({ type: p.type, tags: p.tags, engine: p.engine, personal: p.personal }),
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
  return experiences.map((e, index) => {
    const { dateStart, dateEnd } = parseYearRange(e.yearRange)
    return {
      id: index + 1,
      slug: e.slug,
      title: e.title,
      company: e.company,
      location: e.location,
      dateStart,
      dateEnd,
      yearRange: e.yearRange,
      description: e.description,
      responsibilities: e.responsibilities,
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
  projects: LegacySourceProject[]
  skills: Skill[]
  site: LegacySourceSite
}): PortfolioData {
  const { experiences, projects, skills, site } = input

  const identity = {
    name: site.name,
    role: site.role,
    yearsExperience: site.yearsExperience,
    email: site.email,
    linkedinUrl: site.linkedinUrl,
    githubUrl: site.githubUrl,
    cvUrl: site.cvUrl,
    initials: initials(site.name),
    portraitUrl: site.portraitUrl,
    siteName: site.siteName,
    copyrightText: site.copyright,
    techStackDescription: site.techStack,
    mainStack: site.mainStack,
    additionalTech: site.additionalTech,
    careerStatus: site.careerStatus,
  }

  const bio = buildBioVariants({
    name: site.name,
    yearsExperience: site.yearsExperience,
    mainStack: site.mainStack,
    additionalTech: site.additionalTech,
    careerStatus: site.careerStatus,
    longParagraphs: site.bio,
  })

  const normalizedProjects = normalizeProjects(projects)
  const normalizedExperience = normalizeExperience(experiences)

  const stats = [
    { key: 'years', value: site.yearsExperience, label: 'YEARS EXPERIENCE', derived: false },
    { key: 'projects', value: String(normalizedProjects.length), label: 'PROJECTS SHIPPED', derived: true },
    { key: 'token-savings', value: site.tokenSavings, label: 'TOKEN COST REDUCTION', derived: false },
    { key: 'engines', value: site.enginesOrchestrated, label: 'AI ENGINES ORCHESTRATED', derived: false },
  ]

  return {
    identity,
    bio,
    skills: { flat: skills.map((s) => s.name), grouped: groupSkills(skills) },
    projects: normalizedProjects,
    experience: normalizedExperience,
    stats,
    process: buildProcess(site),
    pitch: buildPitch(site),
  }
}
