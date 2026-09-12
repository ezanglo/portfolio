import { Container } from "@/components/site/container";

/** brief §4 — six short, unsupported-claim-free indicators. Server component. */
export function TrustRow({ indicators }: { indicators: string[] }) {
  return (
    <div className="border-y border-border bg-muted/40">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 py-8 text-center sm:grid-cols-3 md:grid-cols-6 md:gap-x-4">
          {indicators.map((indicator) => (
            <li
              key={indicator}
              className="text-(length:--text-caption) font-medium tracking-(--text-caption-tracking) text-muted-foreground uppercase"
            >
              {indicator}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
