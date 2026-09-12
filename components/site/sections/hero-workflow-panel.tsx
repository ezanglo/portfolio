"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Code2,
  Store,
  Activity,
  ArrowRight,
  GitBranch,
  Layers,
  Search,
  Wifi,
  BatteryFull,
  Star,
  House,
  Receipt,
  Camera,
  Bell,
  Settings,
  Sparkles,
  Gamepad2,
  LayoutGrid,
} from "lucide-react";

type StageKind = "code" | "monitor";

type StageBase = {
  key: string;
  label: string;
  icon: typeof Code2;
  windowLabel: string;
  tag: string;
  branchLabel: string;
  languageLabel: string;
  phone: React.ReactNode;
};

type Stage =
  | (StageBase & { kind: "code"; fileTab: string; breadcrumb: string; lines: React.ReactNode[] })
  | (StageBase & { kind: "monitor" });

const BUILD_LINES: React.ReactNode[] = [
  <>
    <span className="text-brand">&lt;HeroCard</span>
  </>,
  <>
    &nbsp;&nbsp;label={"{`Spend this month · ${month}`}"}
  </>,
  <>
    &nbsp;&nbsp;amount={"{formatAmountFromCents(totalCents)}"}
  </>,
  <>
    &nbsp;&nbsp;meta={"{`${receiptsThisMonth} receipts`}"}
  </>,
  <>
    &nbsp;&nbsp;onAction={"{() => router.navigate('/stats')}"}
  </>,
  <>&nbsp;&nbsp;showMascot</>,
  <>
    <span className="text-brand">/&gt;</span>
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-brand">&lt;QuickActions /&gt;</span>
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-brand">&lt;RecentReceipts</span> sections={"{sections}"} /&gt;
  </>,
];

const SHIP_LINES: React.ReactNode[] = [
  <>
    <span className="text-muted-foreground/70">$</span> eas build --platform all --profile production
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-emerald-400/80">&#10003;</span> Type-check passed
  </>,
  <>
    <span className="text-emerald-400/80">&#10003;</span> iOS build succeeded
  </>,
  <>
    <span className="text-emerald-400/80">&#10003;</span> Android build succeeded
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-muted-foreground/70">$</span> eas submit --platform all --profile production
  </>,
  <>
    <span className="text-emerald-400/80">&#10003;</span> Submitted com.projectez.reseebo to App Store Connect
  </>,
  <>
    <span className="text-emerald-400/80">&#10003;</span> Submitted com.projectez.reseebo to Google Play Console
  </>,
];

const RECENT_RECEIPTS = [
  { name: "Starbucks", amount: "₱210", color: "#6B4A32" },
  { name: "SM Supermarket", amount: "₱1,845", color: "#3E7A66" },
  { name: "Grab", amount: "₱185", color: "#2C5A75" },
];

const BUILD_TABS = [
  { icon: House, label: "Home", active: true },
  { icon: Receipt, label: "Receipts" },
  { icon: Bell, label: "Reminders" },
  { icon: Settings, label: "Settings" },
];

const RATING_BREAKDOWN = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const APP_STORE_TABS = [
  { icon: Sparkles, label: "Today" },
  { icon: Gamepad2, label: "Games" },
  { icon: LayoutGrid, label: "Apps", active: true },
  { icon: Search, label: "Search" },
];

const MONITOR_EVENTS = [
  { event: "receipt_scanned", device: "iPhone 15 Pro · iOS 18", time: "2m ago" },
  { event: "reminder_created", device: "Pixel 8 · Android 15", time: "6m ago" },
  { event: "export_completed", device: "iPhone 13 · iOS 17", time: "11m ago" },
];

const SESSION_SPARKLINE = [30, 45, 38, 60, 52, 70, 82];

const VERSION_ADOPTION = [
  { version: "1.1.1", pct: 92 },
  { version: "1.1.0", pct: 8 },
];

const STAGES: Stage[] = [
  {
    key: "build",
    label: "Build",
    icon: Code2,
    windowLabel: "Visual Studio Code",
    tag: "OFFLINE-FIRST",
    kind: "code",
    fileTab: "home-screen.tsx",
    breadcrumb: "src › screens › home",
    lines: BUILD_LINES,
    branchLabel: "feature/home-dashboard",
    languageLabel: "TypeScript",
    phone: (
      <>
        <div className="mt-1.5 flex items-center justify-between px-0.5">
          <div>
            <p className="text-[8px] text-muted-foreground">Good evening</p>
            <p className="font-display text-sm font-semibold">Ezra</p>
          </div>
          <Search aria-hidden className="size-3 text-muted-foreground" />
        </div>
        <div className="rounded-sm bg-[#14151A] p-2.5 text-white">
          <p className="text-[7px] font-semibold tracking-(--text-caption-tracking) text-white/50 uppercase">
            Spend this month &middot; Sept
          </p>
          <p className="font-display text-base font-semibold">&#8369;18,450</p>
          <p className="mt-1 text-[8px] text-white/60">12 receipts &middot; See details</p>
        </div>
        <div className="flex gap-1.5">
          {["Scan", "Manual", "Ask"].map((label) => (
            <div key={label} className="flex-1 rounded-lg bg-secondary/70 py-1.5 text-center text-[7px] font-semibold">
              {label}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[7px] font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
            Recent receipts
          </p>
          <p className="text-[7px] font-semibold text-brand">See all</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {RECENT_RECEIPTS.map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-lg bg-secondary/50 p-1.5">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full" style={{ backgroundColor: `${r.color}33` }} />
                <p className="text-[9px] font-semibold">{r.name}</p>
              </div>
              <p className="text-[8px] text-muted-foreground">{r.amount}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between px-2 pt-2">
          {BUILD_TABS.slice(0, 2).map(({ icon: Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className={active ? "size-3.5 text-brand" : "size-3.5 text-muted-foreground/60"} />
              <p className={active ? "text-[6px] font-semibold text-brand" : "text-[6px] text-muted-foreground/60"}>{label}</p>
            </div>
          ))}
          <div className="-mt-5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/30">
            <Camera className="size-3.5 text-brand-foreground" />
          </div>
          {BUILD_TABS.slice(2).map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className="size-3.5 text-muted-foreground/60" />
              <p className="text-[6px] text-muted-foreground/60">{label}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    key: "ship",
    label: "Ship",
    icon: Store,
    windowLabel: "Terminal",
    tag: "CI/CD",
    kind: "code",
    fileTab: "terminal",
    breadcrumb: "~/resiboo · main",
    lines: SHIP_LINES,
    branchLabel: "main",
    languageLabel: "Shell",
    phone: (
      <>
        <div className="mt-1.5 flex items-center gap-2">
          <Image
            src="/images/resiboo-icon.png"
            alt="Resiboo app icon"
            width={30}
            height={30}
            className="shrink-0 rounded-[9px]"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold">Resiboo!</p>
            <p className="text-[7px] text-muted-foreground">Receipts &amp; Expenses</p>
          </div>
          <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[7px] font-semibold text-brand-foreground">
            GET
          </span>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-2 fill-current" />
          ))}
          <span className="ml-1 text-[7px] text-muted-foreground">4.9 &middot; 128 Ratings</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-14 w-9 shrink-0 rounded-lg bg-[#14151A]" />
          <div className="h-14 w-9 shrink-0 rounded-lg bg-secondary" />
          <div className="h-14 w-9 shrink-0 rounded-lg bg-secondary/70" />
        </div>
        <p className="text-[8px] text-muted-foreground">Live on the App Store &amp; Google Play</p>
        <div className="flex flex-col gap-0.5">
          {RATING_BREAKDOWN.map((r) => (
            <div key={r.stars} className="flex items-center gap-1">
              <span className="w-1.5 text-[6px] text-muted-foreground">{r.stars}</span>
              <div className="h-1 flex-1 rounded-full bg-secondary">
                <div className="h-1 rounded-full bg-amber-400" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-secondary/50 p-1.5">
          <p className="text-[7px] font-semibold">What&rsquo;s New &middot; 1.1.1</p>
          <p className="text-[7px] text-muted-foreground">Faster scanning and a few bug fixes.</p>
        </div>
        <div className="mt-auto flex items-center justify-between px-1 pt-1">
          {APP_STORE_TABS.map(({ icon: Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className={active ? "size-3.5 text-brand" : "size-3.5 text-muted-foreground/60"} />
              <p className={active ? "text-[6px] font-semibold text-brand" : "text-[6px] text-muted-foreground/60"}>{label}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    key: "own",
    label: "Own it",
    icon: Activity,
    windowLabel: "PostHog",
    tag: "MONITORING",
    kind: "monitor",
    branchLabel: "posthog-react-native",
    languageLabel: "Autocapture on",
    phone: (
      <>
        <div className="mt-1.5">
          <p className="text-[8px] font-semibold tracking-(--text-caption-tracking) text-brand uppercase">
            Own it &middot; Status
          </p>
          <p className="font-display text-sm font-semibold">Healthy in production</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-sm bg-secondary/70 p-1.5">
          <Activity aria-hidden className="size-3.5 shrink-0 text-emerald-400" />
          <div>
            <p className="text-[10px] font-semibold">99.9% crash-free</p>
            <p className="text-[8px] text-muted-foreground">All systems operational</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-sm bg-secondary/70 p-1.5">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          <p className="text-[8px] text-muted-foreground">Session replay recording &middot; posthog-react-native</p>
        </div>
        <div className="rounded-sm bg-secondary/70 p-1.5">
          <p className="text-[7px] font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
            Sessions &middot; 7 days
          </p>
          <div className="mt-1.5 flex h-8 items-end gap-1">
            {SESSION_SPARKLINE.map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-brand/60" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-sm bg-secondary/70 p-1.5">
          <p className="text-[7px] font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
            Version adoption
          </p>
          <div className="mt-1 flex flex-col gap-1">
            {VERSION_ADOPTION.map((v) => (
              <div key={v.version} className="flex items-center gap-1.5">
                <span className="w-8 text-[7px] text-muted-foreground">{v.version}</span>
                <div className="h-1 flex-1 rounded-full bg-secondary">
                  <div className="h-1 rounded-full bg-emerald-400" style={{ width: `${v.pct}%` }} />
                </div>
                <span className="w-6 text-right text-[7px] text-muted-foreground">{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-auto text-[8px] text-muted-foreground">
          I ship it, then I&rsquo;m the one who keeps it running
        </p>
      </>
    ),
  },
];

const ROTATE_MS = 5000;

function CodePanel({
  fileTab,
  breadcrumb,
  tag,
  lines,
}: {
  fileTab: string;
  breadcrumb: string;
  tag: string;
  lines: React.ReactNode[];
}) {
  return (
    <div className="flex">
      <div className="hidden flex-col items-center gap-4 border-r border-border bg-secondary/40 px-2.5 py-4 sm:flex">
        <Layers aria-hidden className="size-4 text-muted-foreground" />
        <Search aria-hidden className="size-4 text-muted-foreground/60" />
        <GitBranch aria-hidden className="size-4 text-muted-foreground/60" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
          <span className="border-t-2 border-brand bg-background px-2.5 py-1 text-(length:--text-caption) text-foreground">
            {fileTab}
          </span>
          <span className="ml-auto text-(length:--text-caption) font-semibold text-brand">{tag}</span>
        </div>
        <div className="px-4 pt-2 text-(length:--text-caption) text-muted-foreground/70">{breadcrumb}</div>
        <div className="animate-in fade-in slide-in-from-bottom-1 overflow-x-auto px-4 py-3.5 font-mono text-[11px] leading-[1.85] text-foreground/85 duration-500">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-3 shrink-0 select-none text-muted-foreground/40">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonitorPanel() {
  return (
    <div>
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
        <span className="border-t-2 border-brand bg-background px-2.5 py-1 text-(length:--text-caption) text-foreground">
          Session replay
        </span>
        <span className="hidden px-2.5 py-1 text-(length:--text-caption) text-muted-foreground sm:inline">
          Error tracking
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-(length:--text-caption) font-semibold text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3">
        <div className="rounded-sm bg-secondary/60 p-3">
          <p className="text-(length:--text-caption) text-muted-foreground">Crash-free sessions</p>
          <p className="font-display text-lg font-semibold text-emerald-400">99.9%</p>
        </div>
        <div className="rounded-sm bg-secondary/60 p-3">
          <p className="text-(length:--text-caption) text-muted-foreground">Sessions today</p>
          <p className="font-display text-lg font-semibold">482</p>
        </div>
        <div className="hidden rounded-sm bg-secondary/60 p-3 sm:block">
          <p className="text-(length:--text-caption) text-muted-foreground">Autocapture</p>
          <p className="font-display text-lg font-semibold text-brand">On</p>
        </div>
      </div>
      <div className="space-y-1.5 px-4 pb-4 font-mono text-[11px] text-foreground/85">
        {MONITOR_EVENTS.map((row) => (
          <div key={row.event} className="flex items-center justify-between gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <span className="text-brand">{row.event}</span>
            <span className="hidden text-muted-foreground/70 sm:inline">{row.device}</span>
            <span className="text-muted-foreground/50">{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StageFooter({ kind, branchLabel, languageLabel }: { kind: StageKind; branchLabel: string; languageLabel: string }) {
  return (
    <div className="flex items-center gap-4 border-t border-border bg-secondary/40 px-4 py-2 text-(length:--text-caption) text-muted-foreground/70">
      <span className="flex items-center gap-1.5">
        {kind === "code" && <GitBranch className="size-3" />}
        {branchLabel}
      </span>
      <span>{languageLabel}</span>
    </div>
  );
}

export function HeroWorkflowPanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % STAGES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const stage = STAGES[active];

  return (
    <div className="relative pb-32 sm:pb-40 lg:pb-56">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          My workflow, on repeat
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-(length:--text-caption) text-muted-foreground">
          {stage.tag}
        </span>
      </div>

      <div className="mb-3.5 flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Workflow stage">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === active;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={
                isActive
                  ? "inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-(length:--text-caption) font-semibold text-brand transition-colors"
                  : "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) font-semibold text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              <Icon className="size-3.5" />
              {s.label}
              {i < STAGES.length - 1 && (
                <ArrowRight aria-hidden className="ml-1 size-3.5 text-muted-foreground/50" />
              )}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ee6a5f]" />
          <span className="size-2.5 rounded-full bg-[#f5bd4f]" />
          <span className="size-2.5 rounded-full bg-[#61c554]" />
          <span className="ml-1.5 text-(length:--text-caption) text-muted-foreground">{stage.windowLabel}</span>
        </div>
        <div key={stage.key} className="animate-in fade-in duration-500">
          {stage.kind === "code" && (
            <CodePanel fileTab={stage.fileTab} breadcrumb={stage.breadcrumb} tag={stage.tag} lines={stage.lines} />
          )}
          {stage.kind === "monitor" && <MonitorPanel />}
        </div>
        <StageFooter kind={stage.kind} branchLabel={stage.branchLabel} languageLabel={stage.languageLabel} />
      </div>

      <div className="absolute -right-20 -bottom-20 aspect-9/19.5 w-48 overflow-hidden rounded-[3rem] border-10 border-[#060607] bg-[#060607] shadow-2xl shadow-black/40 sm:w-56 lg:w-64">
        <div className="absolute inset-x-0 top-2.5 z-10 flex justify-center">
          <span className="h-5 w-16 rounded-full bg-[#060607]" />
        </div>
        <div
          key={stage.key}
          className="animate-in fade-in flex h-full flex-col gap-2.5 rounded-[2.5rem] bg-card px-4 pt-5 pb-4 duration-500"
        >
          <div className="flex items-center justify-between px-1 text-foreground">
            <span className="text-[8px] font-semibold">9:41</span>
            <span className="flex items-center gap-1">
              <Wifi className="size-2" />
              <BatteryFull className="size-2" />
            </span>
          </div>
          {stage.phone}
          <div className="flex justify-center pb-0.5">
            <span className="h-1 w-24 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
