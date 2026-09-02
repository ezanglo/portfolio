import type { ViewSlug } from './portfolio/types'

export interface ViewMeta {
  slug: ViewSlug
  label: string
  emoji: string
  blurb: string
  theme: 'light' | 'dark'
  fullHeight: boolean
  interactive: boolean
  gimmick: boolean
  previewLabel: string
  swatch: string
  href: string
}

export const VIEWS: Record<ViewSlug, ViewMeta> = {
  corporate: {
    slug: 'corporate',
    label: 'Corporate',
    emoji: '💼',
    blurb: 'Clean, scannable, recruiter-safe.',
    theme: 'light',
    fullHeight: false,
    interactive: false,
    gimmick: false,
    previewLabel: 'LIGHT / SANS',
    swatch: '#FCFAF6',
    href: '/corporate',
  },
  runtime: {
    slug: 'runtime',
    label: 'Runtime',
    emoji: '⚙️',
    blurb: 'Dark, technical, startup-modern.',
    theme: 'dark',
    fullHeight: false,
    interactive: false,
    gimmick: false,
    previewLabel: 'DARK / MONO',
    swatch: '#080B12',
    href: '/runtime',
  },
  'field-notes': {
    slug: 'field-notes',
    label: 'Field Notes',
    emoji: '📓',
    blurb: 'Warm editorial write-ups.',
    theme: 'light',
    fullHeight: false,
    interactive: false,
    gimmick: false,
    previewLabel: 'WARM / SERIF',
    swatch: '#FAF2E9',
    href: '/field-notes',
  },
  blockwork: {
    slug: 'blockwork',
    label: 'Blockwork',
    emoji: '🧱',
    blurb: 'Bold neubrutalist grid.',
    theme: 'light',
    fullHeight: false,
    interactive: false,
    gimmick: false,
    previewLabel: 'BOLD / GRID',
    swatch: '#FCFCFC',
    href: '/blockwork',
  },
  'ai-chat': {
    slug: 'ai-chat',
    label: 'AI Chat',
    emoji: '💬',
    blurb: 'Ask questions, get grounded answers.',
    theme: 'dark',
    fullHeight: true,
    interactive: true,
    gimmick: true,
    previewLabel: 'CHAT / GIMMICK',
    swatch: '#0E1218',
    href: '/ai-chat',
  },
  terminal: {
    slug: 'terminal',
    label: 'Terminal',
    emoji: '⌨️',
    blurb: 'An interactive CLI portfolio.',
    theme: 'dark',
    fullHeight: true,
    interactive: true,
    gimmick: false,
    previewLabel: '$ portfolio --help',
    swatch: '#060606',
    href: '/terminal',
  },
  ide: {
    slug: 'ide',
    label: 'IDE',
    emoji: '🗂️',
    blurb: 'A VS Code-style file explorer.',
    theme: 'dark',
    fullHeight: true,
    interactive: true,
    gimmick: false,
    previewLabel: 'EXPLORER',
    swatch: '#12161D',
    href: '/ide',
  },
  'ops-dashboard': {
    slug: 'ops-dashboard',
    label: 'Ops Dashboard',
    emoji: '📊',
    blurb: 'An AI-ops console with live stats.',
    theme: 'dark',
    fullHeight: false,
    interactive: true,
    gimmick: false,
    previewLabel: 'ROUTE BY ENGINE',
    swatch: '#090D16',
    href: '/ops-dashboard',
  },
  'filter-grid': {
    slug: 'filter-grid',
    label: 'Filter Grid',
    emoji: '🏷️',
    blurb: 'Multi-select tag filtering.',
    theme: 'light',
    fullHeight: false,
    interactive: true,
    gimmick: false,
    previewLabel: 'FILTER + EXPAND',
    swatch: '#FAF8F2',
    href: '/filter-grid',
  },
  classic: {
    slug: 'classic',
    label: 'Classic',
    emoji: '🏠',
    blurb: 'The original single-page portfolio.',
    theme: 'light',
    fullHeight: false,
    interactive: false,
    gimmick: false,
    previewLabel: 'ORIGINAL',
    swatch: '#FFFFFF',
    href: '/classic',
  },
}

export const VIEW_SLUGS = Object.keys(VIEWS) as ViewSlug[]

export const NEW_VIEW_SLUGS = VIEW_SLUGS.filter((slug) => slug !== 'classic')

export function isViewSlug(value: unknown): value is ViewSlug {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(VIEWS, value)
}
