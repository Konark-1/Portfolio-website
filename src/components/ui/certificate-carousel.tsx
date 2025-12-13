
"use client";

import { Award, Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";

interface Certificate {
  title: string;
  description?: string;
  filePath: string;
  imagePath?: string;
  issuer?: string;
  date?: string;
  skills?: string[];
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isResettingRef = useRef(false);

  // Triple the certificates for seamless infinite scroll
  const extendedCertificates = [...certificates, ...certificates, ...certificates];

  const cardWidth = 344; // card width (320) + gap (24)
  const singleSetWidth = cardWidth * certificates.length;

  // Seamlessly reset scroll position when near boundaries - runs on EVERY scroll
  const checkAndResetBoundaries = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isResettingRef.current) return;

    const currentScroll = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Use a larger threshold - half of single set width for safety
    const threshold = singleSetWidth * 0.8;
    
    // When approaching the right end, jump back
    if (currentScroll >= maxScroll - threshold) {
      isResettingRef.current = true;
      scrollContainer.scrollLeft = currentScroll - singleSetWidth;
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
    // When approaching the left end, jump forward
    else if (currentScroll <= threshold) {
      isResettingRef.current = true;
      scrollContainer.scrollLeft = currentScroll + singleSetWidth;
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, [singleSetWidth]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Pause auto-scroll during manual interaction
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    const currentScroll = scrollContainer.scrollLeft;
    const targetScroll = direction === 'left'
      ? currentScroll - cardWidth
      : currentScroll + cardWidth;

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Resume auto-scroll after delay
    pauseTimeoutRef.current = setTimeout(() => {
      if (!isHovered) setIsPaused(false);
    }, 600);
  }, [isHovered, cardWidth]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Wait for layout then set initial position
    const initPosition = () => {
      if (scrollContainer.scrollWidth > 0) {
        scrollContainer.scrollLeft = singleSetWidth;
      }
    };
    
    // Multiple attempts to ensure it works after render
    requestAnimationFrame(initPosition);
    setTimeout(initPosition, 100);
  }, [singleSetWidth]);

  // Listen to scroll events and check boundaries continuously
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      checkAndResetBoundaries();
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [checkAndResetBoundaries]);

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const pixelsPerSecond = 30;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isHovered && !isResettingRef.current) {
        const moveAmount = (pixelsPerSecond * deltaTime) / 1000;
        scrollContainer.scrollLeft += moveAmount;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, isHovered]);

  // Handle manual scroll pause/resume
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleInteractionStart = () => {
      setIsPaused(true);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };

    const handleInteractionEnd = () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      
      pauseTimeoutRef.current = setTimeout(() => {
        if (!isHovered) setIsPaused(false);
      }, 1000);
    };

    const handleWheel = () => {
      handleInteractionStart();
      handleInteractionEnd();
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: true });
    scrollContainer.addEventListener('touchstart', handleInteractionStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleInteractionEnd, { passive: true });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('touchstart', handleInteractionStart);
      scrollContainer.removeEventListener('touchend', handleInteractionEnd);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isHovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full py-8 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPaused(false);
      }}
    >
      {/* Navigation Buttons */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="pointer-events-auto" onClick={() => scroll('left')}>
          <GlassSurface
            width={48}
            height={48}
            borderRadius={24}
            backgroundOpacity={0.1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            disableShadow
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </GlassSurface>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="pointer-events-auto" onClick={() => scroll('right')}>
          <GlassSurface
            width={48}
            height={48}
            borderRadius={24}
            backgroundOpacity={0.1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            disableShadow
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </GlassSurface>
        </div>
      </div>

      {/* Gradient fade edges - Reduced width and adjusted opacity for better visibility */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-gray-900 via-gray-900/60 to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-12 sm:px-24 pb-8 pt-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {extendedCertificates.map((cert, index) => (
          <div key={`${index}-${cert.title}`} className="snap-center">
            <CertificateItem certificate={cert} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateItem({
  certificate,
}: {
  certificate: Certificate;
}) {
  const [imageError, setImageError] = useState(false);

  // Always prefer images over PDFs
  const hasImage = certificate.imagePath &&
    (certificate.imagePath.endsWith('.png') ||
      certificate.imagePath.endsWith('.jpg') ||
      certificate.imagePath.endsWith('.jpeg') ||
      certificate.imagePath.endsWith('.webp') ||
      certificate.imagePath.endsWith('.PNG') ||
      certificate.imagePath.endsWith('.JPG') ||
      certificate.imagePath.endsWith('.JPEG'));

  const showImage = hasImage && !imageError;

  return (
    <div
      className="relative w-80 h-[480px] flex-shrink-0 group cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:-translate-y-1"
      style={{ minWidth: '320px', willChange: 'transform' }}
      onClick={() => window.open(certificate.filePath, '_blank')}
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card/80 border border-border shadow-lg hover:border-accent-cyan/30 transition-all duration-200 flex flex-col">
        {/* Certificate Image/Preview */}
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black flex-shrink-0">
          {showImage ? (
            <Image
              src={certificate.imagePath!}
              alt={certificate.title}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className="object-contain p-4 transition-transform duration-200 group-hover:scale-105"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="text-center space-y-2">
                <Award className="h-12 w-12 text-accent-cyan/30 mx-auto" />
                <p className="text-xs text-text-muted font-sans">Certificate Preview</p>
                <p className="text-xs text-text-muted font-sans">{certificate.title}</p>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Badge */}
          {certificate.issuer && (
            <div className="absolute top-3 right-3 z-10">
              <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium font-sans">
                {certificate.issuer}
              </div>
            </div>
          )}

          {/* Hover overlay - CSS only for performance */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <div className="flex items-center gap-2 text-text-primary text-sm font-medium font-sans">
                <ExternalLink className="h-4 w-4" />
                <span>View</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 space-y-3 bg-card/60 flex-1 flex flex-col">
          {/* Icon and Title */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-blue-500/20 border border-accent-cyan/30">
              <Award className="h-4 w-4 text-accent-cyan" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-200 line-clamp-2 leading-tight font-serif">
                {certificate.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          {certificate.description && (
            <p className="text-xs text-text-muted leading-relaxed line-clamp-2 font-sans">
              {certificate.description}
            </p>
          )}

          {/* Skills Tags */}
          {certificate.skills && (
            <div className="mt-auto pt-3 border-t border-white/5 min-h-[80px] flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-accent-cyan/5 border border-accent-cyan/20 text-[10px] uppercase tracking-wider text-accent-cyan font-semibold font-sans hover:bg-accent-cyan/10 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
