import { getPayload } from 'payload'
import config from '../payload.config'
import { unstable_cache } from 'next/cache';

export const getExperiencesData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'experiences',
      sort: 'order',
      limit: 1000, // Get all experiences
    })
    
    return result.docs
  },
  ['experiences'],
  {
    revalidate: 3600, // 1 hour
    tags: ['experiences']
  }
)

export const getProjectsData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 1000, // Get all projects
    })
    
    return result.docs
  },
  ['projects'],
  {
    revalidate: 3600, // 1 hour
    tags: ['projects']
  }
)

export const getSkillsData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'skills',
      sort: 'order',
      limit: 1000, // Get all skills
    })
    
    return result.docs.map(skill => skill.name)
  },
  ['skills'],
  {
    revalidate: 3600, // 1 hour
    tags: ['skills']
  }
)

export const getNavigationLinks = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'navigation-links',
      where: {
        visible: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 1000, // Get all navigation links
    })
    
    return result.docs.map(link => ({
      name: link.name,
      hash: link.hash,
    }))
  },
  ['navigation-links'],
  {
    revalidate: 3600, // 1 hour
    tags: ['navigation-links']
  }
)

export const getSiteConfig = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'site-config',
    })
    
    return result.docs[0] || null
  },
  ['site-config'],
  {
    revalidate: 3600, // 1 hour
    tags: ['site-config']
  }
)
