'use client';

import React from 'react';

export default function HeroBackgroundMobile() {
  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050810]" 
      suppressHydrationWarning
      style={{ contain: 'strict' }}
    >
      {/* Compositor-accelerated primary cyan ambient wave - active on frame 0 before JS executes */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] opacity-25"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(39, 203, 206, 0.35) 0%, rgba(39, 203, 206, 0.12) 40%, transparent 70%)',
          animation: 'hero-wave-drift 18s ease-in-out infinite alternate',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      />
      
      {/* Secondary turquoise/teal flow mesh */}
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[110vw] h-[110vw] max-w-[850px] max-h-[850px] rounded-[55%_45%_40%_60%/45%_60%_40%_55%] opacity-20"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(32, 178, 170, 0.3) 0%, rgba(16, 28, 64, 0.2) 50%, transparent 75%)',
          animation: 'hero-wave-drift-reverse 22s ease-in-out infinite alternate',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      />

      {/* Tertiary deep navy grounding depth */}
      <div 
        className="absolute top-[25%] left-[20%] w-[80vw] h-[80vw] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(10, 20, 45, 0.6) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
