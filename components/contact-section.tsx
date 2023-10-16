"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import React from "react";
import SectionHeading from "./section-heading";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

export default function ContactSection() {
  const { ref } = useSectionInView("Contact", 0.5);
  return (
    <section
      id="contact"
      ref={ref}
      className="scroll-mt-28 mb-28 sm:mb-40 px-5 sm:px-16"
    >
      <SectionHeading>Contact me</SectionHeading>
      <p className="-mt-6 text-secondary-foreground/50 text-sm">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:dev.ezraanglo@gmail.com">
          dev.ezraanglo@gmail.com
        </a>{" "}
        or through this form.
      </p>
      <form className="flex flex-col gap-3 pt-10">
        <Input placeholder="Your email" />
        <Textarea placeholder="Your message" className="h-56" />
        <Button className="rounded-full">
          Submit <SendHorizonal className="ml-2 w-4 h-4" />{" "}
        </Button>
      </form>
    </section>
  );
}
