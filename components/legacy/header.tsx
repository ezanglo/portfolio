"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavigationLink } from "@/lib/legacy/types";

type SectionName = NavigationLink['name'];

interface HeaderProps {
  links: NavigationLink[];
}

export default function Header({ links }: HeaderProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-2 left-1/2 sm:top-6"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <nav
          className={cn(
            "bg-secondary border-seconday shadow-black/10",
            "flex h-12 items-center rounded-full border border-opacity-40 px-2",
            "bg-opacity-80 shadow-lg backdrop-blur-[0.5rem]",
            "sm:h-[3.25rem] sm:px-4",
            "max-w-[calc(100vw-2rem)]"
          )}
        >
          <ul
            className={cn(
              "text-secondary-foreground/50",
              "flex items-center gap-1 text-[0.9rem] font-medium",
              "sm:gap-5"
            )}
          >
            {links.map((link) => (
              <motion.li
                key={link.hash}
                className="h-3/4 flex items-center justify-center relative shrink-0"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  href={link.hash}
                  className={cn(
                    "hover:text-secondary-foreground",
                    "flex items-center justify-center px-3 py-3 transition whitespace-nowrap",
                    activeSection === link.name && "text-secondary-foreground"
                  )}
                  onClick={() => {
                    setActiveSection(link.name as SectionName);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}
                  {activeSection === link.name && (
                    <motion.span
                      className="bg-primary/10 rounded-full absolute inset-0 -z-10"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
