"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, StarIcon } from "lucide-react";

export interface TimelineItem {
  title: string;
  subtitle: string;
  location?: string;
  year: string;
  description: string;
  details?: string[];
  icon?: LucideIcon;
}

const fadeInAnimationVariants = {
  initial: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
    },
  },
};

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const Icon = item.icon ?? StarIcon;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:p-[initial]">
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
              "p-3 flex items-center justify-center w-10 h-10 bg-primary-foreground rounded-full shadow-xl"
            )}
          >
            <Icon />
          </span>
        </div>
        <motion.section
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          custom={index}
          viewport={{
            once: true,
          }}
          className="md:max-w-[20rem]"
        >
          <Card
            className={cn(
              "flex flex-col gap-3 h-full bg-secondary/70 border-none shadow-md",
              "ml-5 md:ml-[initial] md:group-even:ml-5 md:group-odd:mr-10"
            )}
          >
            <CardHeader className="pb-0">
              <CardDescription className="text-xs opacity-70 uppercase md:hidden">
                {item.year}
              </CardDescription>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="text-xs">
                {item.subtitle}
                {item.location ? ` | ${item.location}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <p>{item.description}</p>
              {item.details && item.details.length > 0 && (
                <ul className="flex flex-col gap-1 list-disc pl-4 marker:text-primary/50">
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.section>
      </div>
      <div
        className={cn(
          "hidden md:flex mt-2 text-xs items-center justify-center h-6 text-secondary-foreground/50",
          "group-even:mr-10 group-even:justify-end",
          "group-odd:ml-10 group-odd:justify-start"
        )}
      >
        {item.year}
      </div>
    </div>
  );
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <>
      {items.map((item, index) => (
        <div className="group" key={index}>
          <TimelineEntry item={item} index={index} />
        </div>
      ))}
    </>
  );
}
