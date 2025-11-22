"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.span
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", y: 8 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? {} : { duration: 0.6, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export default BlurText;




