"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

export default function AboutSection() {
  return (
    <motion.section
      className="max-w-[45rem] text-center leading-8 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Graduating with a degree in{" "}
        <span className="font-medium">Computer Science</span>, I initially
        worked as a <span className="font-medium">.NET Developer</span> while
        also accepting freelance projects. Afterward, I started my journey into{" "}
        <span className="font-medium">full-stack web development</span>.
        Leveraging my experience with{" "}
        <span className="italic">.NET and Object Oriented Programming</span>, I
        easily <span className="italic">adapted and learned</span> their tech
        stack, despite lacking prior work experience in{" "}
        <span className="italic">PHP</span>. This opened up learning
        opportunities with web development for me. I{" "}
        <span className="underline">love</span> building applications and learn
        how to solve complex problems, whether in Desktop, Web or Mobile. As a
        result, I find myself in a{" "}
        <span className="font-medium">constant state of learning</span> and
        trying out new things
      </p>
      <p className="mb-3">
        My main stack is{" "}
        <span className="font-medium">
          React, Typescript, PostgreSQL and PHP
        </span>
        . I am also familiar with TailwindCSS, .NET, Prisma, and React Native to
        name a few. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a full-stack
        developer.
      </p>
    </motion.section>
  );
}
