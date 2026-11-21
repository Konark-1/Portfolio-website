"use client";

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import Link from 'next/link';
import GlassButton from "@/components/ui/GlassButton";
import { Menu, X } from 'lucide-react';
import { detectDeviceCapabilities } from "@/lib/performance";
import { MagneticButton } from "@/components/ui/magnetic-button";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deviceCaps, setDeviceCaps] = useState<ReturnType<typeof detectDeviceCapabilities> | null>(null);
  const lastScrollY = useRef(0);
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
    };
  }, [isMobileMenuOpen]);

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

  // Detect device capabilities after initial mount so WebGL warmup in Hero runs unimpeded
  useEffect(() => {
    const timer = setTimeout(() => {
      const caps = detectDeviceCapabilities();
      setDeviceCaps(caps);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll and remove any blur effects when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Ensure no blur is applied to body or main content
      document.body.classList.remove('backdrop-blur', 'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg');
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.classList.remove('backdrop-blur', 'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg', 'blur', 'blur-sm', 'blur-md', 'blur-lg');
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    // 1. Force mount if section is lazy/dynamic
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mount-section', { detail: sectionId }));
    }

    // 2. Perform smooth scroll respecting header height offset
    const performScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        // Close mobile menu after navigation
        setIsMobileMenuOpen(false);
      }
    };

    performScroll();
    setTimeout(performScroll, 80);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToPortfolio = useCallback(() => {
    scrollToSection('projects');
  }, [scrollToSection]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out translate-y-0"
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      suppressHydrationWarning
    >
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'py-3 sm:py-4 px-4 sm:px-6'
            : 'py-5 sm:py-6 lg:py-7 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'w-full max-w-5xl px-4 sm:px-6 py-2 rounded-full bg-[#050810]/85 md:bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)]'
              : 'w-full bg-transparent border border-transparent'
          }`}
        >
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary font-serif tracking-tight"
                style={{ fontSize: 'clamp(1.25rem, 4.5vw, 2.5rem)' }}
              >
                Konark Parihar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <GlassButton
              width="auto"
              height={44}
              borderRadius={50}
              backgroundOpacity={0.08}
              blur={12}
              className="ring-1 ring-border px-1"
            >
              <div className="flex items-center gap-0.5">
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={scrollToTop}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </button>
                </MagneticButton>
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    About
                  </button>
                </MagneticButton>
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Experience
                  </button>
                </MagneticButton>
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={scrollToPortfolio}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Portfolio
                  </button>
                </MagneticButton>
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={() => scrollToSection('certificates')}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Certificates
                  </button>
                </MagneticButton>
                <MagneticButton intensity={0.4} range="p-1 sm:p-1.5">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </MagneticButton>
              </div>
            </GlassButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-primary hover:text-text-muted transition-all duration-200 hover:scale-105 active:scale-95 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay - no blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 z-50 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="relative px-4 py-6"
          style={{
            transform: isMobileMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)',
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {(() => {
            // Calculate blur settings based on device capabilities
            // Default to safe values (no blur) if device caps not detected yet
            if (!deviceCaps) {
              return (
                <div
                  className="w-full rounded-[20px] px-4 py-6 space-y-4 text-center relative overflow-hidden"
                  style={{
                    background: isMobileMenuOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
                    border: isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)',
                    boxShadow: isMobileMenuOpen ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 0px 0px 0 rgba(0, 0, 0, 0)',
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateZ(0)',
                  }}
                >
                  <button
                    onClick={scrollToTop}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    Experience
                  </button>
                  <button
                    onClick={scrollToPortfolio}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => scrollToSection('certificates')}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    Certificates
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                  >
                    Contact
                  </button>
                </div>
              );
            }

            const shouldDisableBlur = deviceCaps.isLowEndDevice || !deviceCaps.hasGPU || !deviceCaps.supportsWebGL;
            const isLowEnd = deviceCaps.isLowEndDevice;
            const isMobile = deviceCaps.isMobile;

            // Determine blur amount: 0px (disabled), 8px (low-end), 12px (mobile), 16px (high-end)
            let blurAmount = 16;
            let saturation = 180;

            if (shouldDisableBlur) {
              blurAmount = 0;
              saturation = 100;
            } else if (isLowEnd || isMobile) {
              blurAmount = 8;
              saturation = 150;
            } else if (deviceCaps.estimatedFPS && deviceCaps.estimatedFPS < 45) {
              blurAmount = 12;
              saturation = 160;
            }

            const blurValue = isMobileMenuOpen ? `blur(${blurAmount}px) saturate(${saturation}%)` : 'blur(0px) saturate(100%)';
            const bgOpacity = blurAmount === 0 ? (isMobileMenuOpen ? 0.5 : 0) : (isMobileMenuOpen ? 0.3 : 0);

            return (
              <div
                className="w-full rounded-[20px] px-4 py-6 space-y-4 text-center relative overflow-hidden"
                style={{
                  background: `rgba(0, 0, 0, ${bgOpacity})`,
                  backdropFilter: blurValue,
                  WebkitBackdropFilter: blurValue,
                  border: isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)',
                  boxShadow: isMobileMenuOpen ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 0px 0px 0 rgba(0, 0, 0, 0)',
                  transition: blurAmount > 0
                    ? 'backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: blurAmount > 0 ? 'backdrop-filter, background-color' : 'background-color',
                  transform: 'translateZ(0)',
                }}
              >
                <button
                  onClick={scrollToTop}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  Experience
                </button>
                <button
                  onClick={scrollToPortfolio}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => scrollToSection('certificates')}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  Certificates
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-white hover:text-accent-cyan transition-colors text-lg font-medium w-full font-sans py-3 min-h-[44px] rounded-xl active:bg-white/10 select-none"
                >
                  Contact
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
