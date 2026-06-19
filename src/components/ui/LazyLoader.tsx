"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface LazyLoaderProps {
  children?: React.ReactNode;
  render?: () => React.ReactNode;
  minHeight?: string;
}

export default function LazyLoader({ children, render, minHeight = "100vh" }: LazyLoaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // margin: "800px 0px" triggers the load when the section is 800px away from entering the viewport.
  // This gives it enough time to fetch the JS chunk and render before the user scrolls to it.
  const isInView = useInView(ref, { once: true, margin: "800px 0px" });

  useEffect(() => {
    if (isInView) {
      setIsLoaded(true);
    }
  }, [isInView]);

  return (
    <div 
      ref={ref} 
      className="w-full"
      style={{ 
        minHeight: isLoaded ? 'auto' : minHeight
      }}
    >
      {isLoaded ? (render ? render() : children) : null}
    </div>
  );
}
