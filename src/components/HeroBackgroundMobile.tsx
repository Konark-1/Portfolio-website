'use client';

import React from 'react';

export default function HeroBackgroundMobile() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050810]"
      suppressHydrationWarning
    >
      {/* Primary cyan diagonal silk aura (always visible SSR + instant frame 0) */}
      <div
        className="absolute -top-1/4 -left-1/4 h-[140%] w-[140%] opacity-85 will-change-transform animate-[pulse_10s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 40% at 32% 45%, rgba(39, 203, 206, 0.22) 0%, rgba(11, 77, 89, 0.14) 42%, rgba(5, 8, 16, 0) 75%)',
        }}
      />

      {/* Secondary counter-wave glow */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 72% 58%, rgba(39, 203, 206, 0.18) 0%, rgba(13, 92, 99, 0.10) 48%, rgba(5, 8, 16, 0) 78%)',
        }}
      />

      {/* Soft obsidian vignette to keep header & typography perfectly crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5, 8, 16, 0.5) 0%, transparent 25%, transparent 75%, rgba(5, 8, 16, 0.8) 100%)',
        }}
      />
    </div>
  );
}
