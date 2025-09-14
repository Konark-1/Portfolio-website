"use client";

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import Link from 'next/link';
import { LiquidGlassGroup, LiquidGlassItem } from "@/components/ui/liquid-glass-group";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);
  const hideHeaderTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledPastHero = currentScrollY > 50;

      // Update the glass effect state
      setIsScrolled(scrolledPastHero);

      // Clear any existing timer on scroll activity
      if (hideHeaderTimeout.current) {
        clearTimeout(hideHeaderTimeout.current);
      }

      // Determine visibility based on scroll direction and position
      if (!scrolledPastHero) {
        // Always show header in the hero section
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Show header immediately on scroll up
        setIsVisible(true);
      } else {
        // When scrolling down past the hero, set a timer to hide the header
        // But only if not hovered
        if (!isHovered) {
          hideHeaderTimeout.current = setTimeout(() => {
            setIsVisible(false);
          }, 700); // Hide after 0.7 seconds of inactivity
        }
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideHeaderTimeout.current) {
        clearTimeout(hideHeaderTimeout.current);
      }
    };
  }, [isHovered]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 90;
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
          <span className="text-2xl lg:text-4xl font-bold metallic-text">
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isScrolled && !isVisible ? '-translate-y-full' : 'translate-y-0'
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        // Clear any existing hide timer when hovering
        if (hideHeaderTimeout.current) {
          clearTimeout(hideHeaderTimeout.current);
          hideHeaderTimeout.current = null;
        }
        // Show header immediately when hovering
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        // If scrolled past hero, start the hide timer again
        if (isScrolled && window.scrollY > lastScrollY.current) {
          hideHeaderTimeout.current = setTimeout(() => {
            setIsVisible(false);
          }, 700);
        }
      }}
    >
      {/* Container A - Top State: Full-width transparent */}
      <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
        !isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center justify-between w-full h-20 lg:h-24 px-6 lg:px-8">
          <HeaderContent />
        </div>
      </div>

      {/* Container B - Scrolled State: Centered GlassSurface */}
      <div className={`transition-opacity duration-300 ease-in-out py-3.5 ${
        isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`mx-auto transition-all duration-300 ease-in-out ${
          isScrolled ? 'w-4/5' : 'w-full'
        }`}>
          <div className="relative">
            <GlassSurface
              width="114%"
              height={52}
              borderRadius={45}
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
              className="absolute left-1/2 transform -translate-x-1/2"
            >
            <div className="flex items-center justify-between w-full h-full px-4">
              <HeaderContent />
            </div>
          </GlassSurface>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
