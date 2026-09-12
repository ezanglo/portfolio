"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-foreground/5 my-24 h-16 w-1 rounded-full hidden sm:block"
    ></motion.div>
  );
}
