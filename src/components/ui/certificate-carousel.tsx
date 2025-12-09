"use client";

import { Award, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";

interface Certificate {
  title: string;
  description?: string;
  filePath: string;
  imagePath?: string;
  issuer?: string;
  date?: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  // Memoize duplicated certificates
  const duplicatedCertificates = useMemo(
    () => [...certificates, ...certificates, ...certificates, ...certificates],
    [certificates]
  );
  
  // Calculate animation duration
  const cardWidth = 344; // 320px + 24px gap
  const setWidth = cardWidth * certificates.length;
  const duration = Math.max(certificates.length * 20, 40);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling container - CSS animation for smooth performance */}
      <div className="flex w-max">
        {/* First set */}
        <div
          className="flex gap-6 flex-shrink-0 certificate-scroll"
          style={{
            '--scroll-distance': `-${setWidth}px`,
            '--scroll-duration': `${duration}s`,
          } as React.CSSProperties}
        >
          {duplicatedCertificates.map((cert, index) => (
            <CertificateItem
              key={`set1-${index}-${cert.title}`}
              certificate={cert}
            />
          ))}
        </div>

        {/* Second set */}
        <div
          className="flex gap-6 flex-shrink-0 certificate-scroll"
          style={{
            '--scroll-distance': `-${setWidth}px`,
            '--scroll-duration': `${duration}s`,
          } as React.CSSProperties}
        >
          {duplicatedCertificates.map((cert, index) => (
            <CertificateItem
              key={`set2-${index}-${cert.title}`}
              certificate={cert}
            />
          ))}
        </div>
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
      className="relative w-80 h-96 flex-shrink-0 group cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:-translate-y-1"
      style={{ minWidth: '320px', willChange: 'transform' }}
      onClick={() => window.open(certificate.filePath, '_blank')}
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card/80 border border-border shadow-lg hover:border-accent-cyan/30 transition-all duration-200">
        {/* Certificate Image/Preview */}
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
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
          <div className="relative z-10 p-5 space-y-3 bg-card/60">
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

          {/* Download Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(certificate.filePath, '_blank');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-accent-cyan/20 to-blue-500/20 border border-accent-cyan/30 text-accent-cyan text-xs font-medium hover:from-accent-cyan/30 hover:to-blue-500/30 transition-all duration-200 font-sans"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
