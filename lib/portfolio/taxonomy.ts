import type { EngineKey, GridTag, SkillGroupKey, StoreCategory } from './types'
import type { SkillCategory } from '@/content/types'

export const ENGINE_LABELS: Record<EngineKey, string> = {
  claude: 'Claude / Orchestration',
  gemini: 'Gemini',
  vertex: 'Vertex AI',
  native: 'React Native',
  web: 'Web',
}

export const ENGINE_DOT_COLOR: Record<'all' | EngineKey, string> = {
  all: '#9B9EA5',
  claude: '#E88000',
  gemini: '#5C9CFF',
  vertex: '#4DB956',
  native: '#00BDBF',
  web: '#9B9EA5',
}

const AI_ENGINES: readonly EngineKey[] = ['claude', 'gemini', 'vertex']

export function isAiEngine(engine: EngineKey | null): boolean {
  return engine !== null && AI_ENGINES.includes(engine)
}

/** App-store display bucket. Engine wins over raw type when the project is AI-flavored. */
export function storeCategoryFor(type: 'web' | 'mobile' | 'desktop' | 'iot', engine: EngineKey | null): StoreCategory {
  if (isAiEngine(engine)) return 'AI'
  if (type === 'mobile') return 'Mobile'
  if (type === 'web') return 'Web'
  return 'Desktop'
}

const REACT_NATIVE_RE = /\b(react native|expo)\b/i

export function hasReactNativeSignal(tags: string[]): boolean {
  const haystack = tags.join(' ')
  return REACT_NATIVE_RE.test(haystack)
}

/** Filter-grid chips. Additive, never empty. */
export function gridTagsFor(opts: {
  type: 'web' | 'mobile' | 'desktop' | 'iot'
  tags: string[]
  engine: EngineKey | null
  personal: boolean
}): GridTag[] {
  const out = new Set<GridTag>()
  if (opts.type === 'web') out.add('Web')
  else if (opts.type === 'mobile') out.add('Mobile')
  else out.add('Desktop') // desktop | iot

  if (isAiEngine(opts.engine)) out.add('AI')
  if (hasReactNativeSignal(opts.tags)) {
    out.add('React Native')
    out.add('Mobile')
  }
  if (opts.personal) out.add('Personal')

  return [...out]
}

/** Fixed per-category icon palettes, from the App Store reference. Index is position WITHIN category. */
export const ICON_PALETTE: Record<StoreCategory, readonly string[]> = {
  AI: ['#9260DA', '#876FE4', '#6A69DB'],
  Mobile: ['#D64651', '#D75928', '#C6495B', '#CE5342', '#C14D66'],
  Web: ['#0089AB', '#0080AD', '#00969F', '#429C5A', '#4E72AC', '#2D76A3'],
  Desktop: ['#4E72AC', '#2D76A3', '#0080AD'],
}

export function iconBgFor(category: StoreCategory, indexInCategory: number): string {
  const palette = ICON_PALETTE[category]
  return palette[indexInCategory % palette.length]
}

/** Explicit per-skill overrides; anything not listed falls back to its CMS category. */
export const SKILL_NAME_GROUP: Record<string, SkillGroupKey> = {
  'react': 'core',
  'reactjs': 'core',
  'nextjs': 'core',
  'typescript': 'core',
  'postgresql': 'core',
  'php': 'core',
  'git': 'core',
  'openrouter': 'ai',
  'claude': 'ai',
  'chatgpt': 'ai',
  'gemini': 'ai',
  'grok': 'ai',
  'react native': 'mobile',
  'xamarin': 'mobile',
  'ionic framework': 'mobile',
  'aws': 'cloud',
  'firebase': 'cloud',
  'firestore': 'cloud',
  'node.js': 'backend',
  'laravel': 'backend',
  'symfony': 'backend',
  'codeigniter': 'backend',
  'asp.net': 'backend',
  'c#': 'backend',
  'mysql': 'backend',
  'sql server': 'backend',
  'mongodb': 'backend',
  'drizzle': 'backend',
  'prisma': 'backend',
}

/**
 * `content/skills.ts` groups by product function (mobile / interface / data / integrations /
 * cloud / delivery); the legacy view groups by tech type instead (`SkillGroupKey`). The two
 * taxonomies don't line up one-to-one, so most of that translation happens via the per-name
 * overrides above (e.g. the AI platforms and backend frameworks living inside "data" and
 * "integrations" still land in the right legacy group by name) rather than by category alone.
 */
export const SKILL_CATEGORY_GROUP: Record<SkillCategory, SkillGroupKey> = {
  mobile: 'mobile',
  interface: 'frontend',
  backend: 'backend',
  data: 'backend',
  integrations: 'other',
  cloud: 'cloud',
  delivery: 'other',
}

export function skillGroupFor(skill: { name: string; category: SkillCategory }): SkillGroupKey {
  const override = SKILL_NAME_GROUP[skill.name.toLowerCase()]
  if (override) return override
  return SKILL_CATEGORY_GROUP[skill.category]
}
