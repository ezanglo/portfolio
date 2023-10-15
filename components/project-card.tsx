"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectsData } from "@/lib/data";
import { Badge } from "./ui/badge";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

type ProjectCardProps = (typeof projectsData)[number];

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scrollYProgress,
        position: scrollYProgress,
      }}
      className="h-full w-full sm:max-w-[20rem] text-start"
    >
      <section className="h-full w-full">
        <Card className="flex flex-col gap-3 h-full w-full bg-secondary/70 shadow-none border-none">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <ul className="flex flex-wrap mt-4 gap-1 sm:mt-auto">
              {tags.map((tag, index) => (
                <li key={index}>
                  <Badge className="rounded-full text-[0.6rem] tracking-wider uppercase bg-primary/70">
                    {tag}
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
