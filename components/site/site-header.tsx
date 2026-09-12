"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_CTA, NAV_LINKS } from "@/content/navigation";
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
import { Container } from "./container";

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-(length:--text-small) text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ModeToggle />
          <Button asChild>
            <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
          </Button>
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
                    <Link
                      href={link.href}
                      className="rounded-md px-2 py-3 text-(length:--text-body) text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
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
