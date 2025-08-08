"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LiquidGlassGroup, LiquidGlassItem } from "@/components/ui/liquid-glass-group";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="px-6 lg:px-8">
        <div className="flex h-20 lg:h-24 items-center justify-between">
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
        </div>
      </div>
    </header>
  );
}
