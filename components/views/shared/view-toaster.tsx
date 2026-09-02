"use client";

import { Toaster as Sonner } from "sonner";

export default function ViewToaster({ theme }: { theme: "light" | "dark" }) {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  );
}
