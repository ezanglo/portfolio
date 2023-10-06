"use client";

import Image from 'next/image'
import { motion } from "framer-motion"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { AspectRatio } from './ui/aspect-ratio';

export default function Intro() {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center md:text-left justify-self-center md:justify-self-start"
        >
          <h1 className="text-secondary-foreground mb-4 text-4xl md:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Ezra 👋",
                1000,
                "a Full Stack Developer",
                1000,
                "a React Developer",
                1000,
                "a PHP Developer",
                1000,
                "a .NET Developer",
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-primary md:text-lg mb-6 lg:text-xl">
            with 9 years of development experience. I enjoy building applications for Web, Mobile, Desktop and IoT Devices.
            I currently focus on{" "}
            <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600'>
              React, PHP and .NET
            </span>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "tween",
            duration: 0.2
          }}
          
          className="col-span-4 place-self-center mt-4"
        >
          <Image
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1"
            alt="Ezra portrait"
            width={300}
            height={300}
            quality={95}
            priority
            className={cn(
              "rounded-full object-cover border-[0.35rem] border-secondary shadow-2xl shadow-black/50",
              "w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]"
            )}
          />
        </motion.div>
      </div>
    </section>
  )
}
