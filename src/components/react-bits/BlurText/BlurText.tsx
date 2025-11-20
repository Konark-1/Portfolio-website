"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BlurTextProps = {
  children: ReactNode;
  className?: string;
  /**
   * Delay in milliseconds before the animation starts
   */
  delay?: number;
};

export function BlurText({ children, className = "", delay = 0 }: BlurTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export default BlurText;




