export function filterBySingle<T>(
  items: T[],
  selected: string,
  get: (item: T) => string | null,
  allKey: string = "all"
): T[] {
  if (selected === allKey) return items;
  return items.filter((item) => get(item) === selected);
}

export function countLabel(shown: number, total: number, noun: string = "projects"): string {
  return `${shown} of ${total} ${noun}`;
}
