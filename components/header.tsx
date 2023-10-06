"use client";

import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from "framer-motion"
import { links } from '@/lib/data';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="z-[999] relative">
      <motion.div 
        className={cn(
          "bg-secondary border-seconday shadow-black/10",
          "fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-opacity-40",
          "bg-opacity-80 shadow-lg backdrop-blur-[0.5rem]",
          "sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full",
        )}
        initial={{ y: -100, x: "-50%", opacity: 0}}
        animate={{ y: 0, x: "-50%", opacity: 1}}
      ></motion.div>
      <nav className={cn(
        "flex fixed top-[0.15rem] left-1/2 -translate-x-1/2 h-12 py-2",
        "sm:top-[1.7rem] sm:h-[initial] sm:py-0"
      )}>
        <ul className={cn(
          "text-secondary-foreground/50",
          "flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium ",
          "sm:w-[initial] sm:flex-nowrap sm:gap-5"
        )}>
          {links.map(link => (
            <motion.li 
              key={link.hash} 
              className="h-3/4 flex items-center justify-center"
              initial={{ y: -100, opacity: 0}}
              animate={{ y: 0, opacity: 1}}
            >
              <Link 
                href={link.hash} 
                className={cn(
                  "hover:text-secondary-foreground",
                  "flex w-full items-center justify-center p-3 transition"
                )}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
