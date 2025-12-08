"use client";

import Link from "next/link";
import React, { memo, useState, useEffect } from "react";
import { shouldDisableHeavyAnimations, detectDeviceCapabilities } from "@/lib/performance";

type LiquidGlassGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export const LiquidGlassGroup = memo(function LiquidGlassGroup({ children, className = "" }: LiquidGlassGroupProps) {
  // Start with simplified mode to avoid hydration mismatch (server always renders simplified)
  const [useSimplifiedMode, setUseSimplifiedMode] = useState(true);

  useEffect(() => {
    // Only check device capabilities on the client after mount
    const deviceCaps = detectDeviceCapabilities();
    const shouldSimplify = shouldDisableHeavyAnimations() || deviceCaps.isLowEndDevice;
    setUseSimplifiedMode(shouldSimplify);
  }, []);

  // Reduce blur for low-end devices
  const blurClass = useSimplifiedMode ? 'backdrop-blur-sm' : 'backdrop-blur-md';
  const bgBlurClass = useSimplifiedMode ? 'blur-xl' : 'blur-2xl';

  return (
    <div
      className={`liquid-animated relative inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5/\[.04\] px-0.5 py-0.5 ${blurClass} overflow-hidden ${className}`}
    >
      {!useSimplifiedMode && (
        <div className={`pointer-events-none absolute -inset-10 -z-10 opacity-40 ${bgBlurClass}`}>
          <div className="liquid-bg h-full w-full" />
        </div>
      )}
      {children}
    </div>
  );
});

type LiquidGlassItemProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const LiquidGlassItem = memo(function LiquidGlassItem({ children, href, onClick }: LiquidGlassItemProps) {
  const baseClasses =
    "zoom-on-hover relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
});

export default LiquidGlassGroup;

