"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LiquidGlassGroup, LiquidGlassItem } from "@/components/ui/liquid-glass-group";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // Account for larger fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const HeaderContent = (
    <>
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl lg:text-4xl font-bold metallic-text">
            Konark Parihar
          </span>
        </Link>
      </div>
      <div className="hidden md:block">
        <LiquidGlassGroup className="ring-1 ring-white/10">
          <LiquidGlassItem href="/">Home</LiquidGlassItem>
          <LiquidGlassItem onClick={() => scrollToSection('about')}>About</LiquidGlassItem>
          <LiquidGlassItem href="/portfolio">Portfolio</LiquidGlassItem>
          <LiquidGlassItem onClick={() => scrollToSection('certificates')}>Certificates</LiquidGlassItem>
        </LiquidGlassGroup>
      </div>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-transparent">
      {isScrolled ? (
        <div className="py-3 transition-all duration-300 ease-in-out">
          <div className="mx-auto w-4/5 transition-all duration-300 ease-in-out">
            <GlassSurface
              width="100%"
              height={64}
              className="rounded-2xl transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between w-full h-full px-6">
                {HeaderContent}
              </div>
            </GlassSurface>
          </div>
        </div>
      ) : (
        <div className="px-6 lg:px-8">
          <div className="flex h-20 lg:h-24 items-center justify-between transition-all duration-300 ease-in-out">
            {HeaderContent}
          </div>
        </div>
      )}
    </header>
  );
}
