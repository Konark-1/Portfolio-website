"use client";

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import Link from 'next/link';
import { LiquidGlassGroup, LiquidGlassItem } from "@/components/ui/liquid-glass-group";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import { Menu, X } from 'lucide-react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hideHeaderTimeout = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollUpdate = 0;
    const scrollThrottle = 16; // ~60fps but batched with RAF
    
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollUpdate < scrollThrottle) {
        return;
      }
      lastScrollUpdate = now;
      
      if (rafId) {
        return; // Already queued
      }
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrolledPastHero = currentScrollY > 50;

        // Update state for glass effect
        setIsScrolled(scrolledPastHero);

        // Close mobile menu if user starts scrolling
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }

        if (!scrolledPastHero) {
          if (hideHeaderTimeout.current) {
            clearTimeout(hideHeaderTimeout.current);
            hideHeaderTimeout.current = null;
          }
          setIsVisible(true);
          lastScrollY.current = currentScrollY;
          rafId = null;
          return;
        }

        if (currentScrollY < lastScrollY.current) {
          if (hideHeaderTimeout.current) {
            clearTimeout(hideHeaderTimeout.current);
            hideHeaderTimeout.current = null;
          }
          setIsVisible(true);
        } else if (!isHovered && window.innerWidth >= 768) {
          if (!hideHeaderTimeout.current) {
            hideHeaderTimeout.current = setTimeout(() => {
              setIsVisible(false);
              hideHeaderTimeout.current = null;
            }, 250);
          }
        }

        lastScrollY.current = currentScrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (hideHeaderTimeout.current) {
        clearTimeout(hideHeaderTimeout.current);
      }
    };
  }, [isHovered, isMobileMenuOpen]);

  // Handle clicking outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 90;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToPortfolio = useCallback(() => {
    const projectsSection = document.getElementById('projects');

    if (projectsSection) {
      scrollToSection('projects');
      return;
    }

    window.location.href = '/portfolio';
  }, [scrollToSection]);

  // Reusable header content component
  const HeaderContent = () => (
    <>
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-text-primary font-serif tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
          >
            Konark Parihar
          </span>
        </Link>
      </div>
      <div className="hidden md:block">
        <LiquidGlassGroup className="ring-1 ring-border">
          <LiquidGlassItem onClick={scrollToTop}>Home</LiquidGlassItem>
          <LiquidGlassItem onClick={() => scrollToSection('about')}>About</LiquidGlassItem>
          <LiquidGlassItem onClick={scrollToPortfolio}>Portfolio</LiquidGlassItem>
          <LiquidGlassItem onClick={() => scrollToSection('certificates')}>Certificates</LiquidGlassItem>
        </LiquidGlassGroup>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-text-primary hover:text-text-muted transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isScrolled && !isVisible ? '-translate-y-full' : 'translate-y-0'
        }`}
      suppressHydrationWarning
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
        if (isScrolled && window.scrollY > lastScrollY.current && !isMobileMenuOpen) {
          hideHeaderTimeout.current = setTimeout(() => {
            setIsVisible(false);
          }, 700);
        }
      }}
    >
      {/* Container A - Top State: Full-width transparent */}
      <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${!isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="flex items-center justify-between w-full h-20 sm:h-24 lg:h-28 px-4 sm:px-6 lg:px-8">
          <HeaderContent />
        </div>
      </div>

      {/* Container B - Scrolled State: Centered GlassSurface */}
      <div className={`transition-opacity duration-300 ease-in-out py-3.5 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className={`mx-auto transition-all duration-300 ease-in-out ${isScrolled ? 'w-4/5 md:w-4/5' : 'w-full'
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

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="relative px-4 py-6">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={20}
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
            className="w-full"
          >
            <div className="px-4 py-6 space-y-4 text-center">
              <button
                onClick={scrollToTop}
                className="block text-white hover:text-gray-300 transition-colors text-lg font-medium w-full font-sans"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-white hover:text-gray-300 transition-colors text-lg font-medium w-full font-sans"
              >
                About
              </button>
              <button
                onClick={scrollToPortfolio}
                className="block text-white hover:text-gray-300 transition-colors text-lg font-medium w-full font-sans"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('certificates')}
                className="block text-white hover:text-gray-300 transition-colors text-lg font-medium w-full font-sans"
              >
                Certificates
              </button>
            </div>
          </GlassSurface>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
