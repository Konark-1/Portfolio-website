"use client";

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  intensity?: number;
  range?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  "aria-label"?: string;
}

export function MagneticButton({ 
  children, 
  intensity = 0.3, 
  range = "p-4 sm:p-6",
  className, 
  href,
  target,
  rel,
  download,
  onClick,
  "aria-label": ariaLabel,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const containerClassName = `relative inline-block ${range} ${className || ""}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={containerClassName}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        onClick={onClick as any}
        aria-label={ariaLabel}
      >
        <motion.div
          ref={ref}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          {children}
        </motion.div>
      </a>
    );
  }

  return (
    <div
      className={containerClassName}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(props as any)}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
