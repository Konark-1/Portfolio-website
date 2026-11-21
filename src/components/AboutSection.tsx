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
            title: "Executive",
            subtitle: "KPI Reporting",
            desc: "Star-schema Power BI models, DAX measures, and variance tracking tailored for leadership decisions."
        },
        {
            num: "02",
            title: "Data Audits",
            subtitle: "Quality & Integrity",
            desc: "Rigorous SQL querying, deduplication, and exception identification ensuring zero-compromise data integrity."
        },
        {
            num: "03",
            title: "Operational",
            subtitle: "Throughput & SLAs",
            desc: "Root-cause diagnostics and automated validation workflows that systematically eliminate bottlenecks."
        },
    ];

    const skills = ["Power BI", "DAX & Star Schema", "SQL (CTEs, Joins)", "Advanced Excel", "Python (Pandas)", "KPI Tracking", "SLA Throughput", "Root-Cause Analysis", "Data Quality Audits"];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative z-10 min-h-[100svh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-40 scroll-mt-24"
            style={{
                backgroundColor: 'var(--background)',
            }}
        >
            {/* Seamless Ambient Transition Glow from Hero */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(39, 203, 206, 0.15) 0%, transparent 70%)'
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
                        background: 'radial-gradient(circle, rgba(39, 203, 206, 0.16) 0%, rgba(39, 203, 206, 0.04) 45%, transparent 70%)',
                    }}
                />
            </div>

            <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full relative z-10">
                {/* Header with Dynamic Scaling */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <motion.p
                        className="text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] text-accent-cyan font-sans font-semibold mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        About Me
                    </motion.p>

                    {/* Dynamic Scaling Name - Semantically H2 to preserve single H1 per page */}
                    <motion.h2
                        ref={nameRef as any}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-[1.1] mb-6 sm:mb-8 origin-center px-2 tracking-tight"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        KONARK PARIHAR
                    </motion.h2>

                    {/* Parallax Description */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-text-muted font-sans max-w-3xl mx-auto leading-relaxed px-2"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                        Business Analyst combining corporate operations experience in Medical Provider Network (MPN) database quality assurance with quantitative AI quality evaluation — skilled in translating complex operational data into executive{" "}
                        <span className="text-accent-cyan">Power BI dashboards</span>,{" "}
                        <span className="text-accent-cyan">SQL queries</span>, and{" "}
                        <span className="text-accent-cyan">Excel workflows</span> that improve accuracy and throughput.
                    </motion.p>
                </div>

                {/* Key Capabilities - Staggered Slide In */}
                <div ref={cardsRef} className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(39, 203, 206, 0.08)' }}>
                        {capabilities.map(({ num, title, subtitle, desc }, index) => (
                            <motion.div
                                key={index}
                                className="relative group p-5 sm:p-7 lg:p-9 bg-[rgba(10,14,26,0.95)] overflow-hidden hover:bg-[rgba(39,203,206,0.05)] transition-colors duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <span className="text-xs sm:text-sm text-text-muted/60 font-mono tracking-wider">{num}</span>
                                <motion.h3
                                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-serif mt-3 mb-1.5 group-hover:text-accent-cyan transition-colors duration-300 tracking-tight"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {title}
                                </motion.h3>
                                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-accent-cyan/80 font-sans mb-3 font-medium">
                                    {subtitle}
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed font-sans">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills - Cascading Fade In */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, rgba(39, 203, 206, 0.2))' }} />
                        <p className="text-xs tracking-[0.4em] uppercase text-text-muted font-sans">Technical Stack</p>
                        <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, rgba(39, 203, 206, 0.2))' }} />
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-text-muted border rounded-full 
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
