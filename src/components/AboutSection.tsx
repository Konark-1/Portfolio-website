"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

type AboutSectionProps = {
    shouldReduceMotion: boolean | null;
};

export default function AboutSection({ shouldReduceMotion }: AboutSectionProps): React.JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Scroll progress for the section - optimized for better INP
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth spring-based transforms - optimized for better INP performance
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80, // Reduced from 100 for smoother, less frequent updates
        damping: 35, // Increased from 30 for better stability
        restDelta: 0.02 // Increased from 0.01 to further reduce calculations
    });

    // Reduced number of transforms - combine similar ones for better performance
    // Scale and opacity combined into single transform where possible
    const nameScale = useTransform(smoothProgress, [0, 0.3], [0.92, 1]);
    const nameOpacity = useTransform(smoothProgress, [0, 0.25], [0.4, 1]);
    // Combine Y transform with scale to reduce calculations
    const nameY = useTransform(smoothProgress, [0, 0.3], [30, 0]);

    // Simplified parallax - reduced range for better performance
    const descY = useTransform(smoothProgress, [0, 0.4], [40, 0]); // Reduced from 60 to 40
    const descOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]); // Narrowed range

    // Cards stagger effect
    const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

    const capabilities = [
        {
            num: "01",
            title: "Dynamic",
            subtitle: "Stakeholder Views",
            desc: "Multi-user dashboards tailored for different decision-makers"
        },
        {
            num: "02",
            title: "Automated",
            subtitle: "Intelligence",
            desc: "AI-driven workflows that accelerate insight delivery"
        },
        {
            num: "03",
            title: "Targeted",
            subtitle: "Decision Support",
            desc: "Focused analytics that drive actionable outcomes"
        },
    ];

    const skills = ["Power BI", "SQL", "DAX", "Python", "Excel", "VBA", "AI Workflow", "Healthcare Analytics"];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="sticky top-0 z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
            style={{
                backgroundColor: 'var(--background-about)',
                willChange: 'transform', // GPU hint for smoother sticky
                transform: 'translateZ(0)' // Force GPU layer
            }}
        >
            {/* Solid background to cover hero section */}
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--background-about)' }} />

            {/* Top shadow for smooth overlay transition effect */}
            <div
                className="absolute top-0 left-0 right-0 h-32 sm:h-24 pointer-events-none z-[1]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)',
                    boxShadow: '0 -20px 60px 20px rgba(0,0,0,0.5)'
                }}
            />

            {/* Enhanced turquoise ambient glow - uses CSS containment for performance */}
            <div className="pointer-events-none absolute inset-0" style={{ contain: 'paint' }}>
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
                    style={{
                        opacity: smoothProgress,
                        background: 'radial-gradient(circle, rgba(39,203,206,0.15) 0%, transparent 70%)',
                        filter: 'blur(200px)', // Slightly reduced blur for better performance
                        willChange: 'opacity'
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Header with Dynamic Scaling */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <motion.p
                        className="text-xs tracking-[0.5em] uppercase text-text-muted font-sans mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        About
                    </motion.p>

                    {/* Dynamic Scaling Name */}
                    <motion.h1
                        ref={nameRef}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6 sm:mb-8 origin-center px-2"
                        style={shouldReduceMotion ? {} : {
                            scale: nameScale,
                            opacity: nameOpacity,
                            y: nameY
                        }}
                    >
                        KONARK PARIHAR
                    </motion.h1>

                    {/* Parallax Description */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-text-muted font-sans max-w-2xl mx-auto leading-relaxed px-2"
                        style={shouldReduceMotion ? {} : { y: descY, opacity: descOpacity }}
                    >
                        Data Analyst specializing in{" "}
                        <span className="text-accent-cyan">Power BI</span>,{" "}
                        <span className="text-accent-cyan">SQL</span>, and{" "}
                        <span className="text-accent-cyan">AI-powered workflows</span> —
                        transforming complex data into strategic business decisions.
                    </motion.p>
                </div>

                {/* Key Capabilities - Staggered Slide In */}
                <div ref={cardsRef} className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(39, 203, 206, 0.08)' }}>
                        {capabilities.map(({ num, title, subtitle, desc }, index) => (
                            <motion.div
                                key={num}
                                className="p-8 sm:p-10 group transition-colors duration-500"
                                style={{
                                    backgroundColor: 'var(--background-about)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(39, 203, 206, 0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--background-about)';
                                }}
                                initial={{ opacity: 0, x: index === 0 ? -60 : index === 2 ? 60 : 0, y: index === 1 ? 40 : 0 }}
                                animate={cardsInView ? { opacity: 1, x: 0, y: 0 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <span className="text-xs text-text-muted/50 font-mono tracking-wider">{num}</span>
                                <motion.h3
                                    className="text-2xl sm:text-3xl font-bold text-white font-serif mt-4 mb-1 group-hover:text-accent-cyan transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {title}
                                </motion.h3>
                                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan/70 font-sans mb-4">
                                    {subtitle}
                                </p>
                                <p className="text-sm text-text-muted leading-relaxed font-sans">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills - Cascading Fade In */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, rgba(39, 203, 206, 0.2))' }} />
                        <p className="text-xs tracking-[0.4em] uppercase text-text-muted font-sans">Technical Stack</p>
                        <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, rgba(39, 203, 206, 0.2))' }} />
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                className="px-4 py-2 text-sm text-text-muted border rounded-full 
                           hover:text-white
                           transition-all duration-300 cursor-default font-sans"
                                style={{
                                    borderColor: 'var(--border-color)',
                                }}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.05 * index,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0 0 20px rgba(39, 203, 206, 0.25)",
                                    borderColor: "rgba(39, 203, 206, 0.5)"
                                }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
