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
  /** Whether this view can be embedded in a live `<iframe>` preview thumbnail (gallery/switcher cards). */
  previewIframe: boolean
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
    previewIframe: true,
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
    previewIframe: true,
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
    previewIframe: true,
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
    previewIframe: true,
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
    previewIframe: false,
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
    previewIframe: true,
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
    previewIframe: true,
    previewLabel: 'EXPLORER',
    swatch: '#12161D',
    href: '/ide',
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
    previewIframe: true,
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
