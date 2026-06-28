"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface LazyLoaderProps {
  children?: React.ReactNode;
  render?: () => React.ReactNode;
  minHeight?: string;
  delayMs?: number;
}

export default function LazyLoader({ children, render, minHeight = "100vh", delayMs = 150 }: LazyLoaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // margin: "200px 0px" triggers the load when the section is closer to viewport.
  // This prevents all sections from triggering simultaneously if the page collapses.
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  useEffect(() => {
    if (isInView) {
      // Add a small stagger delay to prevent multiple sections from rendering
      // in the exact same frame, which causes massive JS spikes and crashes iOS Safari
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delayMs + Math.random() * 50); // Add slight random stagger
      return () => clearTimeout(timer);
    }
  }, [isInView, delayMs]);

  return (
    <div 
      ref={ref} 
      className="w-full"
      style={{ 
        minHeight: isLoaded ? undefined : minHeight
      }}
    >
      {isLoaded ? (render ? render() : children) : null}
    </div>
  );
}
