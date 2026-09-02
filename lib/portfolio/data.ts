import { cache } from 'react'
import { getExperiencesData, getProjectsData, getSkillsDocs, getSiteConfig } from '@/lib/queries'
import { buildPortfolioData } from './derive'
import type { PortfolioData } from './types'

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const [experiences, projects, skills, siteConfig] = await Promise.all([
    getExperiencesData(),
    getProjectsData(),
    getSkillsDocs(),
    getSiteConfig(),
  ])
  return buildPortfolioData({ experiences, projects, skills, siteConfig })
})
