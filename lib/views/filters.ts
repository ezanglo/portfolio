export function filterBySingle<T>(
  items: T[],
  selected: string,
  get: (item: T) => string | null,
  allKey: string = "all"
): T[] {
  if (selected === allKey) return items;
  return items.filter((item) => get(item) === selected);
}

/** OR filter: an item matches if it has ANY of the active tags. Empty active = show all. */
export function filterByAnyTag<T>(
  items: T[],
  active: string[],
  get: (item: T) => string[]
): T[] {
  if (active.length === 0) return items;
  return items.filter((item) => get(item).some((tag) => active.includes(tag)));
}

export function countLabel(shown: number, total: number, noun: string = "projects"): string {
  return `${shown} of ${total} ${noun}`;
}
