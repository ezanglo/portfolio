"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/content/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const NAV_IDS = NAV_LINKS.map((l) => l.id);

/** One IntersectionObserver watching every section, reporting whichever currently owns the
 * header's active underline — avoids a `scroll` listener (banned; re-renders every frame). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function SiteHeader({ name, cvUrl }: { name: string; cvUrl: string }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-brand font-display text-sm font-bold text-brand-foreground">
            EA
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-(length:--text-small) font-semibold">{name} Anglo</span>
            <span className="block text-(length:--text-caption) text-muted-foreground">React Native Developer</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-(length:--text-small) font-medium transition-colors",
                active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {active === link.id ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" className="rounded-full" asChild>
            <a href={cvUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="p-0">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-md px-2 py-3 text-(length:--text-body) text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <a href={cvUrl} target="_blank" rel="noreferrer">
                      Resume
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
