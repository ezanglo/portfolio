import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

function safeRevalidate(tag: string) {
  try {
    // Next 16 requires a cacheLife profile as the second argument; 'max' forces
    // full expiration of the tagged entries on the next request.
    revalidateTag(tag, 'max')
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
