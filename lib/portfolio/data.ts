import { cache } from 'react'
import { EXPERIENCE, PROJECTS, SITE, SKILLS } from '@/content'
import { buildPortfolioData } from './derive'
import type { PortfolioData } from './types'

/**
 * The single read path for portfolio content.
 *
 * Content is static TypeScript in `content/`, so this is a pure in-process build with no
 * IO — `cache()` only dedupes the work within a single render. It stays `async` because
 * every caller awaits it; that was true when this hit Payload and there is no reason to
 * churn seven view pages over it.
 */
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  return buildPortfolioData({
    experiences: EXPERIENCE,
    projects: PROJECTS,
    skills: SKILLS,
    site: SITE,
  })
})
