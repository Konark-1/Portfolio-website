'use client';

import React from 'react';

export default function HeroBackgroundMobile() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050810]" suppressHydrationWarning>
      {/* Primary cyan ambient glow */}
      <div 
        className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(39, 203, 206, 0.15) 0%, rgba(39, 203, 206, 0.05) 40%, transparent 70%)',
        }}
      />
      
      {/* Secondary dark blue glow */}
      <div 
        className="absolute bottom-[10%] right-[5%] w-[90vw] h-[90vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 28, 64, 0.4) 0%, rgba(16, 28, 64, 0.1) 50%, transparent 70%)',
        }}
      />
    </div>
  );
}
