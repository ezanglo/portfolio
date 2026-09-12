"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/legacy/types";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { ENGINE_LABELS, isAiEngine } from "@/lib/portfolio/taxonomy";
import type { EngineKey } from "@/lib/portfolio/types";

type FeaturedProjectCardProps = Project & { index: number };

function narrowImageUrl(imageUrl: Project["imageUrl"]): string | null {
  if (imageUrl && typeof imageUrl === "object") return imageUrl.url ?? null;
  return null;
}

export default function FeaturedProjectCard({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  imageUrl,
  aiEngine,
  index,
}: FeaturedProjectCardProps) {
  const image = narrowImageUrl(imageUrl);
  const engine = (aiEngine ?? null) as EngineKey | null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="w-full"
    >
      <Card className="flex flex-col gap-0 h-full w-full bg-secondary/70 shadow-none border-none overflow-hidden pt-0">
        <div className="relative aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized={image.startsWith("http") || image.startsWith("/api/files/")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-semibold text-primary/40">{title.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <CardHeader className="pt-5">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-xl">{title}</CardTitle>
            {isAiEngine(engine) && engine && (
              <Badge className="rounded-full text-[0.6rem] tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 shrink-0 gap-1">
                <SparklesIcon className="w-3 h-3" />
                {ENGINE_LABELS[engine]}
              </Badge>
            )}
          </div>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-1">
            {tags?.map((tag: { tag: string }, tagIndex: number) => (
              <li key={tagIndex}>
                <Badge className="rounded-full text-[0.6rem] tracking-wider uppercase bg-primary/70">
                  {tag.tag}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
        {(liveUrl || githubUrl) && (
          <CardFooter className="mt-auto gap-2">
            {liveUrl && (
              <Button size="sm" variant="outline" className="rounded-full" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  Live demo <ArrowUpRightIcon className="opacity-70" />
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button size="sm" variant="outline" className="rounded-full" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  Code <GitHubLogoIcon className="opacity-70" />
                </a>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
