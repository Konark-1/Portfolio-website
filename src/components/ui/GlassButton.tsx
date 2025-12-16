"use client";

import React from "react";

export interface GlassButtonProps {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    backgroundOpacity?: number;
    blur?: number;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Lightweight CSS-only glass surface component.
 * Replaces the heavy SVG-filter-based GlassSurface for better performance.
 * Uses CSS backdrop-filter for glassmorphism effect.
 */
const GlassButton: React.FC<GlassButtonProps> = ({
    children,
    width = 200,
    height = 55,
    borderRadius = 50,
    backgroundOpacity = 0.1,
    blur = 12,
    className = "",
    style = {},
    onClick,
}) => {
    const containerStyles: React.CSSProperties = {
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        background: `rgba(255, 255, 255, ${backgroundOpacity})`,
        backdropFilter: `blur(${blur}px) saturate(1.2)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(1.2)`,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: `
      inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
      0 4px 24px -4px rgba(0, 0, 0, 0.15)
    `,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    return (
        <div
            className={`relative flex items-center justify-center overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-white/25 active:scale-[0.98] ${className}`}
            style={containerStyles}
            onClick={onClick}
        >
            <div className="w-full h-full flex items-center justify-center relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlassButton;
