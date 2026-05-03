"use client";

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"div">, "animate" | "onMouseMove" | "onMouseLeave"> {
  children: React.ReactNode;
  intensity?: number;
  range?: string;
}

export function MagneticButton({ 
  children, 
  intensity = 0.3, 
  range = "p-4 sm:p-6",
  className, 
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <div
      className={`relative inline-block ${range}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
