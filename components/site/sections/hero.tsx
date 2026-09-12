import Link from "next/link";
import { ArrowRight, Download, Sparkles, Code2, Server, ShieldCheck, Search, GitBranch, Layers, Wifi, BatteryFull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SocialIcons } from "@/components/site/social-icons";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import type { SiteContent } from "@/content/types";

const CODE_LINES: React.ReactNode[] = [
  <>
    <span className="text-brand">import</span> {"{ api }"} <span className="text-brand">from</span>{" "}
    <span className="text-emerald-400/80">&apos;./lib/api&apos;</span>;
  </>,
  <>&nbsp;</>,
  <>
    <span className="text-brand">export function</span> <span className="text-amber-200/90">useProjects</span>() {"{"}
  </>,
  <>
    &nbsp;&nbsp;<span className="text-brand">const</span> [data, setData] = useState([]);
  </>,
  <>&nbsp;</>,
  <>&nbsp;&nbsp;useEffect(() =&gt; {"{"}</>,
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;api.get(<span className="text-emerald-400/80">&apos;/projects&apos;</span>).then(setData);
  </>,
  <>&nbsp;&nbsp;{"}, []);"}</>,
  <>&nbsp;</>,
  <>
    &nbsp;&nbsp;<span className="text-brand">return</span> data;
  </>,
  <>{"}"}</>,
];

const HERO_STATS = [
  { value: "10+ years", label: "building mobile & full-stack products" },
  { value: "iOS + Android", label: "cross-platform delivery" },
  { value: "Full-stack", label: "app to backend, one person" },
];

/** Design brief hero (no nav entry). Server component: the headline is the five-second test,
 * so it renders instantly with no client JS gating it. */
export function Hero({ site }: { site: SiteContent }) {
  return (
    <BackgroundBeamsWithCollision>
      <Container className="relative grid gap-14 pt-20 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-(length:--text-caption) text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand" />
            Shipping with React Native, Expo &amp; AI-native workflows
          </div>

          <p className="mb-3.5 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-brand uppercase">
            {site.name} Anglo &middot; Based in the Philippines, working globally
          </p>

          <h1 className="max-w-xl font-display text-(length:--text-display) leading-(--text-display-lh) tracking-(--text-display-tracking) font-semibold text-balance">
            Senior
            <br />
            React Native &amp;
            <br />
            <span className="text-brand">Full-Stack Developer.</span>
          </h1>

          <p className="mt-4 text-(length:--text-h3) font-medium text-foreground/90">
            I build <span className="font-semibold text-foreground">{site.heroSubline}</span>
          </p>

          <p className="mt-4 max-w-lg text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground text-pretty">
            {site.heroCopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button size="lg" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90" asChild>
              <Link href="/#contact">
                Let&rsquo;s Build Your App
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="#projects">View My Work &darr;</a>
            </Button>
          </div>

          <a
            href={site.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-(length:--text-small) font-medium text-muted-foreground hover:text-brand"
          >
            Download CV
            <Download className="size-3.5" />
          </a>

          <div className="mt-9 flex flex-wrap gap-8 border-t border-border pt-7">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-lg font-semibold">{stat.value}</p>
                <p className="max-w-36 text-(length:--text-caption) text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <SocialIcons linkedinUrl={site.linkedinUrl} githubUrl={site.githubUrl} email={site.email} />
          </div>
        </div>

        <div className="relative pb-32 sm:pb-40 lg:pb-56">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) text-muted-foreground uppercase">
              <Sparkles aria-hidden className="size-3.5 text-brand" />
              From editor to experience
            </div>
            <span className="rounded-full border border-border px-2.5 py-1 text-(length:--text-caption) text-muted-foreground">
              React Native
            </span>
          </div>

          <div className="mb-3.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-(length:--text-caption) font-semibold text-brand">
              <Code2 className="size-3.5" />
              Build
            </span>
            <ArrowRight aria-hidden className="size-3.5 text-muted-foreground/50" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) font-semibold text-muted-foreground">
              <Server className="size-3.5" />
              Ship
            </span>
            <ArrowRight aria-hidden className="size-3.5 text-muted-foreground/50" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-(length:--text-caption) font-semibold text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Own it
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ee6a5f]" />
              <span className="size-2.5 rounded-full bg-[#f5bd4f]" />
              <span className="size-2.5 rounded-full bg-[#61c554]" />
              <span className="ml-1.5 text-(length:--text-caption) text-muted-foreground">Visual Studio Code</span>
            </div>
            <div className="flex">
              <div className="hidden flex-col items-center gap-4 border-r border-border bg-secondary/40 px-2.5 py-4 sm:flex">
                <Layers aria-hidden className="size-4 text-muted-foreground" />
                <Search aria-hidden className="size-4 text-muted-foreground/60" />
                <GitBranch aria-hidden className="size-4 text-muted-foreground/60" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
                  <span className="rounded-t-md border-t-2 border-brand bg-background px-2.5 py-1 text-(length:--text-caption) text-foreground">
                    useProjects.ts
                  </span>
                  <span className="ml-auto text-(length:--text-caption) font-semibold text-brand">FULL-STACK</span>
                </div>
                <div className="px-4 pt-2 text-(length:--text-caption) text-muted-foreground/70">
                  src &rsaquo; hooks &rsaquo; useProjects
                </div>
                <div className="overflow-x-auto px-4 py-3.5 font-mono text-[11px] leading-[1.85] text-foreground/85">
                  {CODE_LINES.map((line, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="w-3 shrink-0 select-none text-muted-foreground/40">{i + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-border bg-secondary/40 px-4 py-2 text-(length:--text-caption) text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <GitBranch className="size-3" /> main
              </span>
              <span>TypeScript</span>
            </div>
          </div>

          <div className="absolute -right-20 -bottom-20 aspect-9/19.5 w-48 overflow-hidden rounded-[3rem] border-10 border-[#060607] bg-[#060607] shadow-2xl shadow-black/40 sm:w-56 lg:w-64">
            <div className="absolute inset-x-0 top-2.5 z-10 flex justify-center">
              <span className="h-5 w-16 rounded-full bg-[#060607]" />
            </div>
            <div className="flex h-full flex-col gap-2.5 rounded-[2.5rem] bg-card px-4 pt-5 pb-4">
              <div className="flex items-center justify-between px-1 text-foreground">
                <span className="text-[8px] font-semibold">9:41</span>
                <span className="flex items-center gap-1">
                  <Wifi className="size-2" />
                  <BatteryFull className="size-2" />
                </span>
              </div>
              <div className="mt-1.5">
                <p className="text-[8px] font-semibold tracking-(--text-caption-tracking) text-brand uppercase">
                  Live preview
                </p>
                <p className="font-display text-sm font-semibold">Ready to ship.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 rounded-xl bg-secondary/70 p-1.5">
                  <span className="size-4 shrink-0 rounded-md bg-brand/20" />
                  <div>
                    <p className="text-[10px] font-semibold">OPIC</p>
                    <p className="text-[8px] text-muted-foreground">Nightlife discovery</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-secondary/70 p-1.5">
                  <span className="size-4 shrink-0 rounded-md bg-brand/20" />
                  <div>
                    <p className="text-[10px] font-semibold">WIN(win) AI</p>
                    <p className="text-[8px] text-muted-foreground">AI chat assistant</p>
                  </div>
                </div>
              </div>
              <p className="text-[8px] text-muted-foreground">Mobile UI + API + database &middot; iOS &amp; Android</p>
              <div className="mt-auto rounded-full bg-brand py-2 text-center text-[10px] font-semibold text-brand-foreground">
                See the code
              </div>
              <div className="flex justify-center pb-0.5">
                <span className="h-1 w-24 rounded-full bg-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </BackgroundBeamsWithCollision>
  );
}
