"use client";

import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { LiquidGlassGroup, LiquidGlassItem } from "@/components/ui/liquid-glass-group";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // Account for larger fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Reusable header content component
  const HeaderContent = () => (
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Container A - Top State: Full-width transparent */}
      <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
        !isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center justify-between w-full h-20 lg:h-24 px-6 lg:px-8">
          <HeaderContent />
        </div>
      </div>

      {/* Container B - Scrolled State: Centered GlassSurface */}
      <div className={`transition-opacity duration-300 ease-in-out py-3 ${
        isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`mx-auto transition-all duration-300 ease-in-out ${
          isScrolled ? 'w-4/5' : 'w-full'
        }`}>
          <GlassSurface
            width="100%"
            height={64}
            borderRadius={50}
            backgroundOpacity={0.1}
            saturation={1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className=""
          >
            <div className="flex items-center justify-between w-full h-full px-6">
              <HeaderContent />
            </div>
          </GlassSurface>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
