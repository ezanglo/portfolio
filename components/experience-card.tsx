import { experiencesData } from "@/lib/data";
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
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

type ExperienceCardProps = (typeof experiencesData)[number];

export default function ExperienceCard({
  company,
  title,
  location,
  description,
  icon,
  date,
  year,
}: ExperienceCardProps) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-2">
      <div
        className={cn(
          "flex flex-row relative border-primary/50 pb-5 pl-5 border-l md:pl-[initial] md:border-l-0",
          "md:group-even:border-l md:group-even:pl-5 md:group-even:order-1",
          "md:group-odd:border-r md:group-odd:pr-5 md:group-even:order-2",
          "group-last:border-none"
        )}
      >
        <div className="absolute flex flex-col justify-center items-center -left-5 md:left-[initial] md:group-even:-left-5 md:group-odd:-right-5">
          <span
            className={cn(
              "flex items-center justify-center w-10 h-10 bg-secondary rounded-full ring-8 ring-background"
            )}
          >
            {icon}
          </span>
          <span className="bg-background text-xs py-3">{year}</span>
        </div>
        <Card
          className={cn(
            "flex flex-col w-[20rem] gap-3 h-full bg-secondary/70 shadow-none border-none",
            "ml-10 md:ml-[initial] md:group-even:ml-10 md:group-odd:mr-10"
          )}
        >
          <CardHeader className="pb-0">
            <CardDescription className="text-xs uppercase">
              {date}
            </CardDescription>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{description}</CardContent>
          <CardFooter className="text-xs flex flex-wrap gap-2">
            <Badge
              variant={"outline"}
              className="rounded-full border-secondary-foreground/30"
            >
              {company}
            </Badge>
            <Badge
              variant={"outline"}
              className="rounded-full border-secondary-foreground/30"
            >
              {location}
            </Badge>
          </CardFooter>
        </Card>
      </div>
      <div></div>
    </div>
  );
}
