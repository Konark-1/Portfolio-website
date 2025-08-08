"use client";

import Link from "next/link";
import React, { memo } from "react";

type LiquidGlassGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export const LiquidGlassGroup = memo(function LiquidGlassGroup({ children, className = "" }: LiquidGlassGroupProps) {
  return (
    <div
      className={`liquid-animated relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5/\[.04\] px-1 py-1 backdrop-blur-md overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-2xl">
        <div className="liquid-bg h-full w-full" />
      </div>
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
    "zoom-on-hover relative z-10 rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";

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

