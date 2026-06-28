'use client';

import React from 'react';

export default function HeroBackgroundMobile() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0A0E1A]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientMove {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}} />
      
      {/* Primary cyan blob */}
      <div 
        className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(39, 203, 206, 0.4) 0%, rgba(39, 203, 206, 0) 70%)',
          animation: 'gradientMove 15s ease-in-out infinite alternate',
        }}
      />
      
      {/* Secondary blue blob */}
      <div 
        className="absolute bottom-[20%] right-[10%] w-[70vw] h-[70vw] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
          animation: 'gradientMove 20s ease-in-out infinite alternate-reverse',
        }}
      />
      
      {/* Ambient noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}
