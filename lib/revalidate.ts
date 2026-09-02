import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

function safeRevalidate(tag: string) {
  try {
    revalidateTag(tag)
  } catch {
    // no Next.js request context (e.g. a standalone script run via the local API) — nothing to revalidate
  }
}

export function revalidateCollection(tag: string) {
  const afterChange: CollectionAfterChangeHook = ({ doc }) => {
    safeRevalidate(tag)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
    safeRevalidate(tag)
    return doc
  }
  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}
