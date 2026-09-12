import Link from "next/link";
import { ArrowRight, Download, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { SocialIcons } from "@/components/site/social-icons";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { HeroWorkflowPanel } from "@/components/site/sections/hero-workflow-panel";
import type { SiteContent } from "@/content/types";

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

          <p className="mb-3.5 text-(length:--text-caption) font-semibold tracking-(--text-caption-tracking) uppercase">
            <span className="text-brand">{site.name} Anglo</span> &middot; Based in the Philippines, working globally
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
              <Link href={site.cvUrl} target="_blank" rel="noreferrer">
                Download Resume
                <Download className="size-3.5" />
              </Link>
            </Button>
          </div>

          <Button size="sm" variant="ghost" className="rounded-full mt-2" asChild>
            <Link href="/#projects" className="text-xs">
              Check out my work
              <ArrowDownRight className="size-3.5" />
            </Link>
          </Button>

          <div className="mt-9 flex flex-wrap gap-8 border-t border-border pt-7">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-lg font-semibold">{stat.value}</p>
                <p className="max-w-40 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <SocialIcons linkedinUrl={site.linkedinUrl} githubUrl={site.githubUrl} email={site.email} />
          </div>
        </div>

        <HeroWorkflowPanel />
      </Container>
    </BackgroundBeamsWithCollision>
  );
}
