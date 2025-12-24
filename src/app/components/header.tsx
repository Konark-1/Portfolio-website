"use client";

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import Link from 'next/link';
import GlassButton from "@/components/ui/GlassButton";
import { Menu, X } from 'lucide-react';
import { detectDeviceCapabilities } from "@/lib/performance";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deviceCaps, setDeviceCaps] = useState<ReturnType<typeof detectDeviceCapabilities> | null>(null);
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

  // Detect device capabilities on mount
  useEffect(() => {
    const caps = detectDeviceCapabilities();
    setDeviceCaps(caps);
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
        <GlassButton
          width="auto"
          height={44}
          borderRadius={50}
          backgroundOpacity={0.08}
          blur={12}
          className="ring-1 ring-border px-1"
        >
          <div className="flex items-center gap-0.5">
            <button
              onClick={scrollToTop}
              className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              About
            </button>
            <button
              onClick={scrollToPortfolio}
              className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('certificates')}
              className="relative z-10 rounded-full px-3 py-1.5 text-base font-medium text-white/80 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              Certificates
            </button>
          </div>
        </GlassButton>
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
          <div className="relative h-[52px]">
            {/* Lightweight CSS-only glass header */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center overflow-hidden"
              style={{
                width: '114%',
                height: '52px',
                borderRadius: '45px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px) saturate(1.2)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
                  inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
                  0 4px 24px -4px rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              <div className="flex items-center justify-between w-full h-full px-4">
                <HeaderContent />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay - no blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
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
            );
          })()}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
