"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./magnetic-button";

interface Certificate {
    title: string;
    description?: string;
    filePath: string;
    imagePath?: string;
    issuer?: string;
    date?: string;
    skills?: string[];
}

interface StackedCardCertificatesProps {
    certificates: Certificate[];
}

export function StackedCardCertificates({ certificates }: StackedCardCertificatesProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const goToNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % certificates.length);
    }, [certificates.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    }, [certificates.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNext, goToPrev]);

    // Auto-scroll logic: only when in view and not hovered
    useEffect(() => {
        if (!isInView || isHovered) return;
        const interval = setInterval(() => {
            goToNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [isInView, isHovered, goToNext]);

    const activeCert = certificates[activeIndex];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <section
            id="certificates"
            className="relative z-20 text-white border-t"
            style={{
                backgroundColor: 'var(--background-experience)',
                borderColor: 'var(--border-color)'
            }}
        >
            {/* Ambient Transition Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-accent-cyan/10 blur-[100px] pointer-events-none" />
            {/* Subtle background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[rgba(39,203,206,0.04)] to-transparent" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[300px] w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(39,203,206,0.04),transparent_70%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
                {/* Section Header — always visible */}
                <div className="text-center space-y-4 max-w-4xl mx-auto px-4 mb-12 sm:mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                    >
                        Validation & Excellence
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight"
                    >
                        Professional Certificates
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base sm:text-lg text-text-muted leading-relaxed font-sans"
                    >
                        Validated expertise in data analytics, business intelligence, and advanced Power BI techniques through industry-recognized certifications.
                    </motion.p>
                </div>

                {/* Carousel */}
                <div 
                    ref={containerRef} 
                    className="relative group px-1 sm:px-14 md:px-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation arrows — Positioned on opposite sides */}
                    <div className="absolute left-0 sm:-left-6 md:-left-12 top-1/2 -translate-y-1/2 z-20">
                        <MagneticButton intensity={0.4} range="p-4 sm:p-8">
                            <button
                                onClick={goToPrev}
                                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                                style={{
                                    backgroundColor: 'rgba(10, 14, 26, 0.9)',
                                    borderColor: 'rgba(39, 203, 206, 0.4)',
                                    color: 'rgba(39, 203, 206, 1)',
                                }}
                                aria-label="Previous certificate"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                        </MagneticButton>
                    </div>

                    <div className="absolute right-0 sm:-right-6 md:-right-12 top-1/2 -translate-y-1/2 z-20">
                        <MagneticButton intensity={0.4} range="p-4 sm:p-8">
                            <button
                                onClick={goToNext}
                                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                                style={{
                                    backgroundColor: 'rgba(10, 14, 26, 0.9)',
                                    borderColor: 'rgba(39, 203, 206, 0.4)',
                                    color: 'rgba(39, 203, 206, 1)',
                                }}
                                aria-label="Next certificate"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </MagneticButton>
                    </div>

                    {/* Main card area */}
                    <div className="relative w-full overflow-hidden rounded-3xl border" style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'var(--surface-elevated)',
                        minHeight: '420px',
                    }}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.35,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            >
                                <CertificateCard certificate={activeCert} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots indicator + counter */}
                    <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
                        <span className="text-xs text-text-muted font-mono">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2">
                            {certificates.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > activeIndex ? 1 : -1);
                                        setActiveIndex(idx);
                                    }}
                                    className={`transition-all duration-300 rounded-full ${
                                        idx === activeIndex
                                            ? 'w-4 h-1.5 sm:w-6 sm:h-2 bg-accent-cyan'
                                            : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text-muted/30 hover:bg-text-muted/50'
                                    }`}
                                    aria-label={`Go to certificate ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
    const [imageError, setImageError] = useState(false);

    const hasImage = certificate.imagePath &&
        /\.(png|jpg|jpeg|webp)$/i.test(certificate.imagePath);

    const showImage = hasImage && !imageError;

    const handleClick = () => {
        window.open(certificate.filePath, '_blank');
    };

    return (
        <div className="flex flex-col md:flex-row cursor-pointer group" onClick={handleClick}>
            {/* Certificate Image — left side on desktop, top on mobile */}
            <div
                className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden"
                style={{ backgroundColor: 'var(--background)' }}
            >
                {showImage ? (
                    <Image
                        src={certificate.imagePath!}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        priority
                        loading="eager"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 min-h-[280px]">
                        <div className="text-center space-y-3">
                            <Award className="h-16 w-16 text-accent-cyan/30 mx-auto" />
                            <p className="text-sm text-text-muted font-sans">{certificate.title}</p>
                        </div>
                    </div>
                )}

                {/* Issuer Badge */}
                {certificate.issuer && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 rounded-full border text-sm font-medium font-sans" style={{
                            backgroundColor: 'var(--surface)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                        }}>
                            {certificate.issuer}
                        </div>
                    </div>
                )}

                {/* View overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="px-5 py-2.5 rounded-full border transform scale-90 group-hover:scale-100 transition-transform duration-300" style={{
                        backgroundColor: 'rgba(39, 203, 206, 0.15)',
                        borderColor: 'var(--accent-cyan)'
                    }}>
                        <div className="flex items-center gap-2 text-sm font-medium font-sans" style={{ color: 'var(--accent-cyan)' }}>
                            <ExternalLink className="h-4 w-4" />
                            <span>View Certificate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Details — right side on desktop, bottom on mobile */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center space-y-5"
                style={{ background: 'linear-gradient(135deg, var(--surface-elevated), var(--background))' }}
            >
                {/* Title */}
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-blue-500/20 border border-accent-cyan/30">
                        <Award className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-200 font-serif">
                            {certificate.title}
                        </h3>
                        {certificate.date && (
                            <p className="text-xs text-text-muted font-sans mt-1">{certificate.date}</p>
                        )}
                    </div>
                </div>

                {/* Description */}
                {certificate.description && (
                    <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
                        {certificate.description}
                    </p>
                )}

                {/* Skills Tags */}
                {certificate.skills && certificate.skills.length > 0 && (
                    <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex flex-wrap gap-2">
                            {certificate.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 rounded-full bg-accent-cyan/5 border border-accent-cyan/20 text-xs uppercase tracking-wider text-accent-cyan font-semibold font-sans"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA hint */}
                <p className="text-xs text-text-muted/50 font-sans flex items-center gap-1.5 mt-auto pt-2">
                    <ExternalLink className="h-3 w-3" />
                    Click to view full certificate
                </p>
            </div>
        </div>
    );
}
