"use client";

import React, { useRef, useState, useEffect, createContext, useContext } from "react";

// Context to share the group's reference if needed, mostly for pattern consistency
const SpotlightContext = createContext<HTMLDivElement | null>(null);

export function SpotlightGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Set mouse position relative to the group container
      container.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      container.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <SpotlightContext.Provider value={containerRef.current}>
      <div
        ref={containerRef}
        className={`relative group/spotlight ${className}`}
      >
        {children}
      </div>
    </SpotlightContext.Provider>
  );
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOffset = () => {
      const card = cardRef.current;
      // Find the closest spotlight group parent
      const group = card?.closest(".group\\/spotlight") as HTMLElement;
      
      if (card && group) {
        const cardRect = card.getBoundingClientRect();
        const groupRect = group.getBoundingClientRect();
        
        // Calculate card's position relative to the group
        const offsetX = cardRect.left - groupRect.left;
        const offsetY = cardRect.top - groupRect.top;
        
        card.style.setProperty("--card-x", `${offsetX}px`);
        card.style.setProperty("--card-y", `${offsetY}px`);
      }
    };

    // Initial calculation
    updateOffset();
    
    // Recalculate on resize
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${className}`}
    >
      {/* The Unified Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(600px circle at calc(var(--mouse-x) - var(--card-x)) calc(var(--mouse-y) - var(--card-y)), ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
