import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Final nav structure for the React Native / AI Engineering repositioning: 7 sections.
 * AI Engineering folded into Skills as a subsection, Education dropped entirely.
 * Matches by hash (the anchor stays stable), not by the old display name, so this is
 * safe to rerun.
 */

const DESIRED_SEQUENCE: { hash: string; name: string }[] = [
  { hash: '#home', name: 'Home' },
  { hash: '#about', name: 'About' },
  { hash: '#why-hire-me', name: 'Why Hire Me' },
  { hash: '#skills', name: 'Skills' },
  { hash: '#experience', name: 'Experience' },
  { hash: '#projects', name: 'Projects' },
  { hash: '#contact', name: 'Contact' },
]

const REMOVED_HASHES = ['#ai-engineering', '#education']

async function main() {
  const payload = await getPayload({ config })
  const { docs: existing } = await payload.find({ collection: 'navigation-links', limit: 1000 })

  const byHash = new Map(existing.map((doc) => [doc.hash, doc]))
  const known = new Set([...DESIRED_SEQUENCE.map((entry) => entry.hash), ...REMOVED_HASHES])

  for (const [index, entry] of DESIRED_SEQUENCE.entries()) {
    const order = (index + 1) * 10
    const current = byHash.get(entry.hash)

    if (current) {
      await payload.update({ collection: 'navigation-links', id: current.id, data: { name: entry.name, order } })
      console.log(`  updated ${entry.hash} -> name: "${entry.name}", order: ${order}`)
    } else {
      await payload.create({
        collection: 'navigation-links',
        data: { name: entry.name, hash: entry.hash, order, visible: true },
      })
      console.log(`  created ${entry.hash} -> name: "${entry.name}", order: ${order}`)
    }
  }

  for (const hash of REMOVED_HASHES) {
    const current = byHash.get(hash)
    if (current) {
      await payload.delete({ collection: 'navigation-links', id: current.id })
      console.log(`  deleted ${hash}`)
    }
  }

  const unrecognized = existing.filter((doc) => !known.has(doc.hash))
  if (unrecognized.length > 0) {
    console.log(`\nLeft untouched (not part of this migration): ${unrecognized.map((d) => d.hash).join(', ')}`)
  }

  console.log('\nNavigation links updated.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
