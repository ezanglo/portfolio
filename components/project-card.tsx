import { projectsData } from "@/lib/data";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

type ProjectCardProps = (typeof projectsData)[number];

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
}: ProjectCardProps) {
  return (
    <article>
      <Card className="grid grid-cols-1 sm:grid-cols-2 text-start h-auto sm:h-[18rem] max-w-[42rem] bg-secondary/70 shadow-none border-none overflow-hidden gap-3">
        <div className="flex flex-col ">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ul className="flex flex-wrap mt-4 gap-1 sm:mt-auto">
              {tags.map((tag, index) => (
                <li key={index}>
                  <Badge className="rounded-full text-[0.6rem] tracking-wider uppercase bg-primary/70">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
        <Image
          src={imageUrl}
          alt={title}
          quality={95}
          className="w-[28.25rem] hidden sm:block rounded-t-xl shadow-2xl mt-auto"
        />
      </Card>
    </article>
  );
}
