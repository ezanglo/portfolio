import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function PortfolioCodeButton() {
  return (
    <Button
      title="View code"
      size={"icon"}
      variant={"outline"}
      className="rounded-full border-border bg-background text-foreground shadow-[0_6px_20px_rgba(0,0,0,.15)] hover:bg-accent"
    >
      <Link
        href={"https://github.com/ezanglo/portfolio"}
        target="_blank"
        className="flex flex-row items-center"
      >
        <GitHubLogoIcon />
      </Link>
    </Button>
  );
}
