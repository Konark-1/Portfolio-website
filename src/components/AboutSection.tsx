"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection(): React.JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Cards stagger effect
    const cardsInView = useInView(cardsRef, { once: true, margin: "50px" });

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
            className="relative z-10 min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
            style={{
                backgroundColor: 'var(--background-about)',
            }}
        >
            {/* Ambient Transition Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-accent-cyan/10 blur-[100px] pointer-events-none" />
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

            {/* Enhanced turquoise ambient glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    style={{
                        background: 'radial-gradient(circle, rgba(39,203,206,0.15) 0%, transparent 70%)',
                        filter: 'blur(200px)'
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Header with Dynamic Scaling */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <motion.p
                        className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        About Me
                    </motion.p>

                    {/* Dynamic Scaling Name */}
                    <motion.h1
                        ref={nameRef}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6 sm:mb-8 origin-center px-2"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        KONARK PARIHAR
                    </motion.h1>

                    {/* Parallax Description */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-text-muted font-sans max-w-2xl mx-auto leading-relaxed px-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
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
                                key={index}
                                className="relative group p-6 sm:p-8 bg-[rgba(10,14,26,0.95)] backdrop-blur-md overflow-hidden hover:bg-[rgba(39,203,206,0.05)] transition-colors duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
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
