import { Badge } from "@/components/ui/badge";

/** Plain text badges, deliberately — no decorative technology logos (brief §23 avoid-list),
 * and no real logo/icon assets exist to back an icon treatment anyway. */
export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="text-(length:--text-caption) font-normal">
      {children}
    </Badge>
  );
}

export function TechBadgeList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <TechBadge>{item}</TechBadge>
        </li>
      ))}
    </ul>
  );
}
