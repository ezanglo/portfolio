import type { StatTile } from "@/lib/views/stats";

export default function OpsStatGrid({ stats }: { stats: StatTile[] }) {
  return (
    <dl className="mx-auto mt-8 grid max-w-[1100px] grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-12">
      {stats.map((stat) => (
        <div key={stat.key} className="rounded-xl border border-view-border bg-view-surface p-5">
          <dd className="text-[26px] font-bold text-view-accent">{stat.value}</dd>
          <dt className="mt-1 font-mono text-xs uppercase tracking-wide text-view-fg-subtle">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
