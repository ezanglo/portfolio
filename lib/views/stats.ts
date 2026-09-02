import type { PortfolioData } from "@/lib/portfolio/types";

export interface StatTile {
  key: string;
  value: string;
  label: string;
}

export function buildStats(data: PortfolioData): StatTile[] {
  return data.stats.map(({ key, value, label }) => ({ key, value, label }));
}
