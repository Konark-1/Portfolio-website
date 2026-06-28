'use client';

import React from 'react';

export default function HeroBackgroundMobile() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050810]">
      {/* Primary cyan ambient glow (Static first frame) */}
      <div 
        className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(39, 203, 206, 0.15) 0%, rgba(39, 203, 206, 0.05) 40%, transparent 70%)',
        }}
      />
      
      {/* Secondary dark blue glow (Static first frame) */}
      <div 
        className="absolute bottom-[10%] right-[5%] w-[90vw] h-[90vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 28, 64, 0.4) 0%, rgba(16, 28, 64, 0.1) 50%, transparent 70%)',
        }}
      />
      
      {/* Extremely lightweight static noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}
