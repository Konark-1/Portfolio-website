"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import BlurText from "@/components/react-bits/BlurText/BlurText";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        // Re-register in case context was lost
        gsap.registerPlugin(ScrollTrigger);

        // CRITICAL: Prevent iOS Safari viewport resize from causing ScrollTrigger recalculation
        ScrollTrigger.config({ ignoreMobileResize: true });

        // Detect mobile devices - DISABLE GSAP pinning completely on mobile to prevent crashes
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const isLowPowerDevice = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // On mobile, skip all GSAP animations to prevent crash
        // Cards will display as a simple scrollable list instead
        if (isMobile || isLowPowerDevice) {
            console.log("[Certificates] Mobile detected - GSAP pinning disabled for stability");
            return;
        }

        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
            const lastCardIndex = cards.length - 1;

            if (cards.length < 2) return;

            const lastCard = cards[lastCardIndex];

            // Desktop only: Iterate over each card (except last - it doesn't get pinned)
            cards.forEach((card, index) => {
                // Skip last card - it scrolls naturally, other cards stack on it
                if (index === lastCardIndex) return;

                // Scale down as cards stack
                const targetScale = 0.85 + (0.15 * (index / lastCardIndex));

                const scaleDown = gsap.to(card, {
                    scale: targetScale,
                    opacity: 0.6,
                    ease: "none",
                });

                ScrollTrigger.create({
                    trigger: card,
                    start: "center center",
                    endTrigger: lastCard,
                    end: "center center",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    scrub: 0.5,
                    animation: scaleDown,
                });
            });
        }, sectionRef);

        // Delayed refresh for first load stability
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(refreshTimeout);
            ctx.revert();
        };
    }, [certificates.length]);

    return (
        <section
            ref={sectionRef}
            id="certificates"
            className="relative text-white overflow-hidden border-t"
            style={{
                backgroundColor: 'var(--background-experience)',
                borderColor: 'var(--border-color)'
            }}
        >
            {/* Enhanced Background - Mobile-safe decorations (no heavy blur) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top gradient fade from previous section */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[rgba(39,203,206,0.06)] to-transparent" />
                {/* Subtle ambient glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[80%] bg-[radial-gradient(ellipse_at_center,rgba(39,203,206,0.05),transparent_70%)]" />
                {/* Bottom fade to contact section */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background-contact)] to-transparent" />
            </div>

            {/* Section Header */}
            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-7xl mx-auto"
                >
                    <BlurText
                        className="text-xs tracking-[0.4em] uppercase text-text-muted mb-4 font-sans"
                        delay={0}
                    >
                        Credentials & Achievements
                    </BlurText>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        Professional Certificates
                    </h2>
                    <p className="max-w-3xl mx-auto text-base sm:text-lg text-text-muted leading-relaxed font-sans">
                        Validated expertise in data analytics, business intelligence, and advanced Power BI techniques through industry-recognized certifications.
                    </p>
                </motion.div>
            </div>

            {/* Stacked Cards Container */}
            <div ref={cardsContainerRef} className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    {certificates.map((cert, index) => (
                        <div
                            key={`${cert.title}-${index}`}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className={`c-card w-full max-w-[90vw] sm:max-w-none ${index === certificates.length - 1 ? '' : 'mb-8'}`}
                            style={{
                                zIndex: index + 1,
                                backgroundColor: 'var(--background-experience)',
                            }}
                        >
                            <CertificateStackedCard certificate={cert} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CertificateStackedCard({
    certificate,
    index,
}: {
    certificate: Certificate;
    index: number;
}) {
    const [imageError, setImageError] = useState(false);

    const hasImage = certificate.imagePath &&
        (certificate.imagePath.endsWith('.png') ||
            certificate.imagePath.endsWith('.jpg') ||
            certificate.imagePath.endsWith('.jpeg') ||
            certificate.imagePath.endsWith('.webp') ||
            certificate.imagePath.endsWith('.PNG') ||
            certificate.imagePath.endsWith('.JPG') ||
            certificate.imagePath.endsWith('.JPEG'));

    const showImage = hasImage && !imageError;

    const handleClick = () => {
        window.open(certificate.filePath, '_blank');
    };

    return (
        <div
            className="group cursor-pointer rounded-3xl border shadow-2xl transition-all duration-300 will-change-transform"
            style={{
                backgroundColor: 'var(--surface-elevated)',
                borderColor: 'var(--border-color)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-glow)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            onClick={handleClick}
        >
            {/* Certificate Image - 70% of card */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl" style={{ backgroundColor: 'var(--background)' }}>
                {showImage ? (
                    <Image
                        src={certificate.imagePath!}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        priority={index < 4}
                        loading={index < 4 ? undefined : "lazy"}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-6">
                        <div className="text-center space-y-3">
                            <Award className="h-16 w-16 text-accent-cyan/30 mx-auto" />
                            <p className="text-sm text-text-muted font-sans">{certificate.title}</p>
                        </div>
                    </div>
                )}

                {/* Issuer Badge */}
                {certificate.issuer && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 rounded-full border text-sm font-medium font-sans" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                            {certificate.issuer}
                        </div>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="px-5 py-2.5 rounded-full border transform scale-90 group-hover:scale-100 transition-transform duration-300" style={{ backgroundColor: 'rgba(39, 203, 206, 0.15)', borderColor: 'var(--accent-cyan)' }}>
                        <div className="flex items-center gap-2 text-sm font-medium font-sans" style={{ color: 'var(--accent-cyan)' }}>
                            <ExternalLink className="h-4 w-4" />
                            <span>View Certificate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content - 20-30% of card */}
            <div className="p-6 space-y-4 rounded-b-3xl" style={{ background: 'linear-gradient(to top, var(--background), var(--surface-elevated))' }}>
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
                    <p className="text-sm text-text-muted leading-relaxed font-sans">
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
                                    className="px-3 py-1.5 rounded-full bg-accent-cyan/5 border border-accent-cyan/20 text-xs uppercase tracking-wider text-accent-cyan font-semibold font-sans hover:bg-accent-cyan/10 transition-colors duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
