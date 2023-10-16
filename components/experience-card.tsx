import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiencesData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const fadeInAnimationVariants = {
  initial: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? 100 : -100,
  }),
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
  }),
};

type ExperienceCardProps = (typeof experiencesData)[number] & { index: number };

export default function ExperienceCard({
  company,
  title,
  location,
  description,
  icon,
  date,
  year,
  index,
}: ExperienceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
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
            {icon}
          </span>
        </div>
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          custom={index}
          viewport={{
            once: true,
          }}
        >
          <Card
            className={cn(
              "flex flex-col w-[20rem] gap-3 h-full bg-secondary/70 border-none shadow-md",
              "ml-10 md:ml-[initial] md:group-even:ml-10 md:group-odd:mr-10"
            )}
          >
            <CardHeader className="pb-0">
              <CardDescription className="text-xs opacity-70 uppercase md:hidden">
                {year}
              </CardDescription>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-xs">
                {company} | {location}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">{description}</CardContent>
          </Card>
        </motion.div>
      </div>
      <div
        className={cn(
          "hidden md:flex mt-2 text-xs items-center justify-center h-6 text-secondary-foreground/50",
          "group-even:mr-10 group-even:justify-end",
          "group-odd:ml-10 group-odd:justify-start"
        )}
      >
        {year}
      </div>
    </div>
  );
}
