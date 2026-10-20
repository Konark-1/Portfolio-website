"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { isIOS, useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  const ios = isIOS();

  // On iOS or mobile devices, avoid rasterizing text blur filters during scroll transitions
  const skipBlur = shouldReduceMotion || isMobile || ios;

  return (
    <motion.span
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : skipBlur
          ? { opacity: 0, y: 8 }
          : { opacity: 0, filter: "blur(8px)", y: 8 }
      }
      whileInView={
        shouldReduceMotion
          ? {}
          : skipBlur
          ? { opacity: 1, y: 0 }
          : { opacity: 1, filter: "blur(0px)", y: 0 }
      }
      viewport={{ once: true }}
      transition={shouldReduceMotion ? {} : { duration: 0.6, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export default BlurText;




