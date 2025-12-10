
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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef<number | null>(null);

  // Triple the certificates for smoother infinite scroll
  const extendedCertificates = [...certificates, ...certificates, ...certificates];

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 344; // card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      // Pause auto-scroll temporarily on interaction
      setIsAutoScrolling(false);
      setTimeout(() => {
        if (!isHovered) setIsAutoScrolling(true);
      }, 3000);
    }
  }, [isHovered]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardWidth = 344;
    const totalWidth = cardWidth * certificates.length;

    // Speed in pixels per second (e.g., 30px/s is slow and smooth)
    const pixelsPerSecond = 30;

    let lastTime = performance.now();
    let accumulatedScroll = scrollContainer.scrollLeft;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Auto-scroll logic
      if (isAutoScrolling && !isHovered) {
        // Calculate how many pixels to move based on time passed
        const moveAmount = (pixelsPerSecond * deltaTime) / 1000;
        accumulatedScroll += moveAmount;

        // Boundary checks - seamless loop
        if (accumulatedScroll >= totalWidth * 2) {
          accumulatedScroll -= totalWidth;
        } else if (accumulatedScroll <= 0) {
          accumulatedScroll += totalWidth;
        }

        scrollContainer.scrollLeft = accumulatedScroll;
      } else {
        // Sync accumulator with actual scroll position when paused/hovered
        // This ensures no jump when resuming
        accumulatedScroll = scrollContainer.scrollLeft;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize scroll position to the middle set if at start
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = totalWidth;
      accumulatedScroll = totalWidth;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoScrolling, isHovered, certificates.length]);

  return (
    <div
      className="relative w-full py-8 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsAutoScrolling(true);
      }}
      onTouchStart={() => setIsAutoScrolling(false)}
      onTouchEnd={() => {
        setTimeout(() => setIsAutoScrolling(true), 3000);
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

      {/* Scrolling container - Increased padding to clear gradients */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-12 sm:px-24 pb-8 pt-4 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: isAutoScrolling ? 'auto' : 'smooth'
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
