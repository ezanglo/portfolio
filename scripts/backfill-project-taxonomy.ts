import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * One-time backfill for the aiEngine/personal fields added to Projects.
 * Infers a reasonable default from title/tags for any project that doesn't already have
 * aiEngine set, so nobody has to hand-edit rows in /admin. Never overwrites an existing value.
 */

const AI_RE = /\b(ai|llm|gpt|vertex|generative|chat ?bot|orchestrat|claude|gemini)\b/i
const REACT_NATIVE_RE = /\b(react native|expo)\b/i

function inferEngine(title: string, tags: string[], type: string): 'claude' | 'gemini' | 'vertex' | 'native' | 'web' {
  const haystack = `${title} ${tags.join(' ')}`.toLowerCase()
  if (/gemini/.test(haystack)) return 'gemini'
  if (/vertex/.test(haystack)) return 'vertex'
  if (AI_RE.test(haystack)) return 'claude'
  if (REACT_NATIVE_RE.test(haystack) || type === 'mobile') return 'native'
  return 'web'
}

async function main() {
  const payload = await getPayload({ config })
  const { docs: projects } = await payload.find({ collection: 'projects', limit: 1000 })

  let updated = 0
  for (const project of projects) {
    if (project.aiEngine) continue
    const tags = (project.tags ?? []).map((t) => t.tag)
    const engine = inferEngine(project.title, tags, project.type)
    await payload.update({
      collection: 'projects',
      id: project.id,
      data: { aiEngine: engine },
    })
    console.log(`  ${project.title} -> aiEngine: ${engine}`)
    updated++
  }

  console.log(`\nBackfilled aiEngine on ${updated}/${projects.length} project(s).`)
  console.log('Review and adjust in /admin — this is a heuristic, not an editorial judgment.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
