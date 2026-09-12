import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { Container } from "@/components/site/container";

/** brief §3 — the hero. Server component: the headline is the five-second test (§43), so it
 * renders instantly with no client JS or text animation gating it. */
export function Hero({ headline, copy }: { headline: string; copy: string }) {
  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-24 left-0 md:left-40" fill="var(--brand)" />
      <Container className="relative py-(--section-py-lg) text-center">
        <h1 className="mx-auto max-w-(--container-narrow) text-(length:--text-display) leading-(--text-display-lh) tracking-(--text-display-tracking) font-semibold text-balance">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-(--container-narrow) text-(length:--text-body) leading-(--text-body-lh) text-muted-foreground text-pretty">
          {copy}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/#contact">
              Let&rsquo;s Build Your App
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#work">View My Work ↓</a>
          </Button>
        </div>
      </Container>
    </div>
  );
}
