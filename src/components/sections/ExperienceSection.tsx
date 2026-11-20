"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const experienceTimeline = [
  {
    title: "AI Analyst — Multimodal Evaluation & Prompt Engineering",
    company: "Innodata Inc., Noida (Remote)",
    duration: "Jan 2026 – Present",
    summary:
      "Assessed multimodal model performance against defined business and quality rubrics to identify output gaps and logic failures.",
    achievements: [
      "Delivered a 3.29/4.00 verified quality benchmark, exceeding the 2.00 operational baseline across evaluated prompt workflows.",
      "Synthesized recurring failure patterns into actionable diagnostic notes to guide prompt refinement and accuracy improvements.",
    ],
    skillTags: ["Quality Benchmarking", "Evaluation Rubrics", "Prompt Engineering", "Root-Cause Analysis"],
  },
  {
    title: "Certified Data Analyst (Full-Time 16-Month Program)",
    company: "Ducat, Noida (Full-Time Classroom Curriculum)",
    duration: "Jul 2024 – Nov 2025",
    summary:
      "Completed full-time 16-month curriculum covering Advanced SQL, Power BI (DAX, Star Schema), Python, and Excel business reporting.",
    achievements: [
      "Executed end-to-end data pipelines and KPI monitoring models, translating business requirements into automated reporting.",
      "Mastered the full data lifecycle: Extraction (SQL), Transformation (Python/Pandas/Excel), and Visualization (Power BI).",
    ],
    skillTags: ["Advanced SQL", "Power BI & DAX", "Star Schema", "Advanced Excel", "Python (Pandas)"],
  },
  {
    title: "Data Operations Analyst — Medical Provider Network (MPN)",
    company: "Xceedance Consulting, Noida",
    duration: "Jul 2023 – Feb 2024",
    summary:
      "Audited and maintained the Medical Provider Network (MPN) database, verifying doctor credentials, clinic locations, contact numbers, and healthcare provider specializations.",
    achievements: [
      "Streamlined batch validation by designing master Excel deduplication trackers with XLOOKUP and Pivot Tables to eliminate redundant provider listings.",
      "Surpassed daily operational throughput targets by 15% while maintaining zero-compromise record accuracy and directory compliance.",
    ],
    skillTags: ["MPN Database Audit", "Excel Deduplication", "SLA Throughput (+15%)", "Directory Compliance"],
  },
  {
    title: "Bachelor of Commerce (Honours) in Accounting & Finance",
    company: "Amity University, Noida",
    duration: "May 2019 – Nov 2022",
    summary:
      "Graduated with a Major in Accounting and Finance (CGPA: 7.55/10.0), establishing core competencies in corporate accounting, financial variance analysis, and operational business logic.",
    achievements: [
      "Applied financial logic and accounting principles directly to commercial data modeling and KPI architectures.",
      "Built foundational quantitative skills in cost accounting, P&L reporting, and variance identification.",
    ],
    skillTags: ["Accounting & Finance", "Variance Analysis", "Business Logic", "P&L Reporting"],
  },
];

type ExperienceEntryProps = {
  title: string;
  company: string;
  duration: string;
  summary: string;
  achievements: string[];
  skillTags: string[];
  index: number;
  isLast?: boolean;
};

function ExperienceEntry({
  title,
  company,
  duration,
  summary,
  achievements,
  skillTags,
  index,
  isLast,
}: ExperienceEntryProps): React.JSX.Element {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const dotRef = useRef<HTMLDivElement>(null);

  // Individual dot activation tracking as the scroll passes each position
  const { scrollYProgress: dotProgress } = useScroll({
    target: dotRef,
    offset: ["start center", "end center"]
  });

  // Activate when spark passes (progress hits center)
  const dotActivation = useSpring(useTransform(dotProgress, [0, 0.1], [0, 1]), {
    stiffness: 100,
    damping: 30
  });
  
  const dotScale = useTransform(dotActivation, [0, 1], [0.4, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="relative sm:pl-16 group/entry"
    >
      {/* Timeline dot Ref for activation detection */}
      <div ref={dotRef} className="absolute sm:left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />

      {/* Timeline dot - centered with the box (center at 31px) */}
      <div className="hidden sm:flex absolute sm:left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10 transition-colors duration-500 group-hover/entry:border-accent-cyan">
        <motion.div 
          style={{ 
            opacity: dotActivation,
            scale: dotScale,
          }}
          className="absolute inset-[-2px] rounded-full bg-accent-cyan shadow-[0_0_15px_#27CBCE] z-20 group-hover/entry:opacity-100 transition-opacity duration-300"
        />
        {/* Inner core to keep it looking sharp */}
        <motion.div 
          style={{ opacity: dotActivation }}
          className="absolute inset-[2px] rounded-full bg-white z-30 group-hover/entry:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Card */}
      <div
        className="rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 lg:p-10 transition-all duration-300 hover:border-accent-cyan/40 group"
        style={{
          backgroundColor: 'var(--surface-elevated)',
          boxShadow: '0 4px 24px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top row: Number + Duration */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <span className="text-xs sm:text-sm text-accent-cyan font-mono tracking-widest uppercase font-semibold">Entry {formattedIndex}</span>
          <span className="text-xs sm:text-sm text-text-primary/95 font-sans font-medium px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10">{duration}</span>
        </div>

        {/* Title & Company */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary font-serif mb-1.5 sm:mb-2 group-hover:text-accent-cyan transition-colors duration-300 tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-accent-cyan font-sans font-medium">{company}</p>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed font-sans mb-5 sm:mb-7 italic opacity-95">{summary}</p>

        {/* Achievements */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-text-muted font-sans font-bold">Key Accomplishments</p>
          <ul className="space-y-2.5 sm:space-y-3.5">
            {achievements.map((item) => (
              <li key={item} className="flex items-start gap-2.5 sm:gap-3.5 text-xs sm:text-base lg:text-lg text-text-primary/90 leading-relaxed font-sans">
                <span className="text-accent-cyan mt-1 flex-shrink-0 text-sm">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-5 sm:pt-6 border-t border-white/5">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] sm:text-sm uppercase tracking-wider rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-accent-cyan/80 font-sans font-semibold hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-colors duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const isMobile = useIsMobile();
  const experienceRef = useRef<HTMLElement>(null);

  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(experienceProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sparkY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const sparkOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="experience" 
      ref={experienceRef}
      className="relative z-20 text-foreground border-t" 
      style={{
        backgroundColor: 'var(--background-experience)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Subtle turquoise gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(39,203,206,0.02)] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-14 sm:py-24 lg:py-36 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column - Heading (Sticky on Desktop) */}
          <div className="lg:w-[35%] xl:w-[32%]">
            <div className="lg:sticky lg:top-40 lg:h-fit space-y-3 sm:space-y-6">
              <motion.p 
                className="text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Professional Journey
              </motion.p>
              <motion.h2
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Hands-on history
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-lg md:text-xl text-text-muted leading-relaxed font-sans max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                A reverse-chronological overview of my professional journey, highlighting key achievements, responsibilities, and technical expertise gained at each position.
              </motion.p>
              <div className="pt-8 hidden lg:block">
                <div className="h-px w-24 bg-accent-cyan/30" />
              </div>
            </div>
          </div>
          
          {/* Right Column - Timeline */}
          <div className="lg:w-[65%] xl:w-[68%]">
            <div className="relative space-y-6 sm:space-y-12 sm:space-y-16">
              {/* Timeline line - aligned with dots */}
              <div className="absolute left-[21px] sm:left-[31px] top-8 bottom-0 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-cyan/15 to-transparent hidden sm:block">
                {/* Dynamic Progress Spark */}
                {isMobile === false && (
                  <motion.div
                    style={{ 
                      top: sparkY,
                      opacity: sparkOpacity
                    }}
                    className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                  >
                    {/* Glowing Spark */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent-cyan blur-[6px] rounded-full scale-150 animate-pulse" />
                      <div className="h-2.5 w-2.5 rounded-full bg-accent-cyan border border-white shadow-[0_0_15px_#27CBCE]" />
                      
                      {/* Trailing light effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-cyan/20 blur-xl rounded-full" />
                    </div>
                  </motion.div>
                )}
              </div>
              {experienceTimeline.map((item, index) => (
                <ExperienceEntry
                  key={item.title + item.company}
                  {...item}
                  index={index}
                  isLast={index === experienceTimeline.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
