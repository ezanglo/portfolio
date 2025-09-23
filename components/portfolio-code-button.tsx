import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function PortfolioCodeButton() {
  return (
    <Button
      title="View code"
      size={"icon"}
      variant={"outline"}
      className="bg-background text-foreground"
    >
      <Link
        href={"https://github.com/ezanglo/portfolio"}
        target="_blank"
        className="flex flex-row items-center"
      >
        <GitHubLogoIcon className="opacity-70" />
      </Link>
    </Button>
  );
}
