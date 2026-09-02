"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Project } from "@/payload-types";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRightIcon } from "lucide-react";

type ProjectCardProps = Project;

export default function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="h-full w-full sm:max-w-[20rem] text-start"
    >
      <section className="h-full w-full">
        <Card className="flex flex-col gap-3 h-full w-full bg-secondary/70 shadow-none border-none min-h-[16rem]">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle>{title}</CardTitle>
              <div className="flex items-center gap-2 shrink-0 text-secondary-foreground/50">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} live demo`}
                    className="hover:text-secondary-foreground transition-colors"
                  >
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} repository`}
                    className="hover:text-secondary-foreground transition-colors"
                  >
                    <GitHubLogoIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <ul className="flex flex-wrap mt-4 gap-1 sm:mt-auto">
              {tags?.map((tag: { tag: string }, index: number) => (
                <li key={index}>
                  <Badge className="rounded-full text-[0.6rem] tracking-wider uppercase bg-primary/70">
                    {tag.tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      </section>
    </motion.div>
  );
}
