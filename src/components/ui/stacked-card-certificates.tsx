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

        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
            const lastCardIndex = cards.length - 1;

            if (cards.length < 2) return;

            // Create ScrollTrigger for the last card to establish the end point
            const lastCardST = ScrollTrigger.create({
                trigger: cards[lastCardIndex],
                start: "center center",
            });

            // Iterate over each card
            cards.forEach((card, index) => {
                // Last card doesn't scale down
                const targetScale = index === lastCardIndex ? 1 : 0.85 + (0.15 * (index / lastCardIndex));

                const scaleDown = gsap.to(card, {
                    scale: targetScale,
                    opacity: index === lastCardIndex ? 1 : 0.6,
                    ease: "none",
                });

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 80px", // Account for header
                    end: () => lastCardST.start,
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                    animation: scaleDown,
                    toggleActions: "restart none none reverse",
                });
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, [certificates.length]);

    return (
        <section
            ref={sectionRef}
            id="certificates"
            className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
            </div>

            {/* Section Header */}
            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
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
            <div ref={cardsContainerRef} className="relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {certificates.map((cert, index) => (
                        <div
                            key={`${cert.title}-${index}`}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="c-card mb-16"
                            style={{ zIndex: index + 1 }}
                        >
                            <CertificateStackedCard certificate={cert} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Spacer for scroll space after last card */}
            <div className="spacer" style={{ height: "50vh" }} />
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
            className="group cursor-pointer rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-sm hover:border-accent-cyan/40 transition-all duration-300"
            onClick={handleClick}
        >
            {/* Certificate Image - 70% of card */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-800 to-gray-900">
                {showImage ? (
                    <Image
                        src={certificate.imagePath!}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        priority={index < 2}
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
                        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium font-sans">
                            {certificate.issuer}
                        </div>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <div className="flex items-center gap-2 text-white text-sm font-medium font-sans">
                            <ExternalLink className="h-4 w-4" />
                            <span>View Certificate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content - 20-30% of card */}
            <div className="p-6 space-y-4 bg-gradient-to-t from-slate-950 to-slate-900/80">
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
                    <div className="pt-4 border-t border-white/5">
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
