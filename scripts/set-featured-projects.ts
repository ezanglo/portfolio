import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Picks the 3 projects that best demonstrate React Native + AI engineering work and flags
 * them featured (bigger cards on /classic). Scores mobile type and an AI-flavored aiEngine
 * highest, then falls back to existing `order`. Idempotent: unsets featured on everything else.
 */

const AI_ENGINES = new Set(['claude', 'gemini', 'vertex'])

function scoreProject(project: { type: string; aiEngine?: string | null }): number {
  let score = 0
  if (project.type === 'mobile') score += 2
  if (project.aiEngine && AI_ENGINES.has(project.aiEngine)) score += 2
  if (project.aiEngine === 'native') score += 1
  return score
}

async function main() {
  const payload = await getPayload({ config })
  const { docs: projects } = await payload.find({ collection: 'projects', sort: 'order', limit: 1000 })

  const ranked = [...projects].sort((a, b) => scoreProject(b) - scoreProject(a))
  const featuredIds = new Set(ranked.slice(0, 3).map((p) => p.id))

  for (const project of projects) {
    const shouldBeFeatured = featuredIds.has(project.id)
    if (Boolean(project.featured) === shouldBeFeatured) continue
    await payload.update({
      collection: 'projects',
      id: project.id,
      data: { featured: shouldBeFeatured },
    })
    console.log(`  ${project.title} -> featured: ${shouldBeFeatured}`)
  }

  console.log(`\nFeatured: ${ranked.slice(0, 3).map((p) => p.title).join(', ')}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
