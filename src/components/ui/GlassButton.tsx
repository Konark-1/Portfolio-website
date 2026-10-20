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
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    as?: 'button' | 'a' | 'div';
    role?: string;
    tabIndex?: number;
    href?: string;
    download?: boolean | string;
    target?: string;
    rel?: string;
}

/**
 * Lightweight CSS-only glass surface component.
 * Replaces the heavy SVG-filter-based GlassSurface for better performance.
 * Uses CSS backdrop-filter for glassmorphism effect on all devices.
 * Fully keyboard-accessible (WCAG 2.1 AA) with focus rings and active tactile compression.
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
    as: Component = 'div',
    role = 'button',
    tabIndex = 0,
    href,
    download,
    target,
    rel,
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
      inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
      0 4px 24px -4px rgba(0, 0, 0, 0.25)
    `,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault();
            onClick(e as unknown as React.MouseEvent<HTMLElement>);
        }
    };

    const elementProps: Record<string, any> = {
        className: `relative flex items-center justify-center overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-white/30 hover:bg-white/15 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810] select-none ${className}`,
        style: containerStyles,
        onClick,
        onKeyDown: handleKeyDown,
        role: Component === 'div' ? role : undefined,
        tabIndex: Component === 'div' ? tabIndex : undefined,
    };

    if (Component === 'a' && href) {
        elementProps.href = href;
        if (download) elementProps.download = download;
        if (target) elementProps.target = target;
        if (rel) elementProps.rel = rel;
    }

    return (
        <Component {...elementProps}>
            <div className="w-full h-full flex items-center justify-center relative z-10 pointer-events-none">
                {children}
            </div>
        </Component>
    );
};

export default GlassButton;
