import { isViewSlug } from './views'
import type { ViewSlug } from './portfolio/types'

export const VIEW_STORAGE_KEY = 'ea:view'

export interface StoredView {
  view: ViewSlug
}

export function serializeStoredView(v: StoredView): string {
  return `2|${v.view}`
}

export function parseStoredView(raw: string | null | undefined): StoredView | null {
  if (!raw) return null
  const parts = raw.split('|')
  if (parts.length !== 2) return null
  const [version, view] = parts
  if (version !== '2') return null
  if (!isViewSlug(view)) return null
  return { view }
}

export function readStoredView(): StoredView | null {
  if (typeof window === 'undefined') return null
  try {
    return parseStoredView(window.localStorage.getItem(VIEW_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStoredView(v: StoredView): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(VIEW_STORAGE_KEY, serializeStoredView(v))
  } catch {
    // storage unavailable (private mode, quota) — persistence degrades gracefully
  }
}

export function clearStoredView(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(VIEW_STORAGE_KEY)
  } catch {
    // ignore
  }
}
