"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { SiteConfig } from "@/payload-types";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

interface HeroSectionProps {
  siteConfig: SiteConfig | null;
}

export default function HeroSection({ siteConfig }: HeroSectionProps) {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  
  // Extract hero data from site configuration
  // This includes uploaded photo and CV URLs from the admin panel
  const heroData = siteConfig?.hero;
  const photoUrl = heroData?.photo || '';
  const name = heroData?.name || 'Ezra';
  const title = heroData?.title || 'Full Stack Developer';
  const description = heroData?.description || 'with 9 years of development experience. I enjoy building applications for Web, Mobile, Desktop. I currently focus on';
  const descriptionHighlight = heroData?.descriptionHighlight || 'React, PHP and .NET';
  const cvUrl = heroData?.cvDownloadUrl || '';
  const linkedinUrl = heroData?.linkedinUrl || 'https://www.linkedin.com/in/ezraanglo';
  const githubUrl = heroData?.githubUrl || 'https://www.github.com/ezanglo';
  
  return (
    <section
      id="home"
      ref={ref}
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="grid grid-cols-1">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "tween",
            duration: 0.2,
          }}
          className="col-span-4 place-self-center mt-4"
        >
          {/* Profile photo - uses uploaded image from admin panel */}
          {photoUrl && (
            <Image
              src={photoUrl}
              alt={`${name} portrait`}
              quality={95}
              priority
              width={100}
              height={100}
              className={cn(
                "rounded-full object-cover border-[0.35rem] border-secondary shadow-xl shadow-black/20",
                "w-[100px] h-[100px] mb-10"
              )}
              unoptimized={photoUrl.startsWith('http') || photoUrl.startsWith('/api/files/')}
              onError={(e) => {
                // Hide image if uploaded image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
        </motion.div>
        <div className="col-span-8 place-self-center text-center justify-self-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-secondary-foreground mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                Hello, I&apos;m{" "}
              </span>
              <br></br>
              <TypeAnimation
                sequence={[
                  `${name} 👋`,
                  1500,
                  `a ${title}`,
                  1500,
                  "a React Developer",
                  1000,
                  "a PHP Developer",
                  1000,
                  "a .NET Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-primary md:text-lg mb-6 lg:text-xl">
              {description}{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                {descriptionHighlight}
              </span>
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
            }}
          >
            <Button
              className={cn(
                "w-full sm:w-fit rounded-full flex items-center justify-center",
                "focus:scale-110 hover:scale-110 active:scale-105 transition-all"
              )}
              asChild
            >
              <Link
                href="#contact"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                Hire me <ArrowRightIcon className="opacity-70" />
              </Link>
            </Button>
            {/* CV Download button - uses uploaded CV from admin panel */}
            {cvUrl && (
              <Button
                className={cn(
                  "w-full sm:w-fit rounded-full border-primary/10 text-secondary-foreground",
                  "focus:scale-110 hover:scale-110 active:scale-105 transition-all"
                )}
                variant={"outline"}
                asChild
              >
                <Link 
                  href={cvUrl} 
                  download={cvUrl.startsWith('http') || cvUrl.startsWith('/api/files/') ? undefined : true}
                  target={cvUrl.startsWith('http') || cvUrl.startsWith('/api/files/') ? '_blank' : undefined}
                  rel={cvUrl.startsWith('http') || cvUrl.startsWith('/api/files/') ? 'noopener noreferrer' : undefined}
                >
                  Download CV
                  <DownloadIcon className="ml-2 opacity-70" />
                </Link>
              </Button>
            )}
            <div className="space-x-3">
              <Button
                size={"icon"}
                variant={"outline"}
                className={cn(
                  "rounded-full border-primary/10 text-secondary-foreground",
                  "focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all"
                )}
                asChild
              >
                <Link
                  href={linkedinUrl}
                  target="_blank"
                >
                  <LinkedInLogoIcon className="opacity-70" />
                </Link>
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className={cn(
                  "rounded-full border-primary/10 text-secondary-foreground",
                  "focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all"
                )}
                asChild
              >
                <Link href={githubUrl} target="_blank">
                  <GitHubLogoIcon className="opacity-70" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
