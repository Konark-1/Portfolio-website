"use client";

import React from "react";
import { motion } from "framer-motion";

export const experienceTimeline = [
  {
    title: "Bachelor of Commerce (Hons)",
    company: "Amity University, Noida",
    duration: "May 2019 – Nov 2022",
    summary:
      "Developed a strong foundation in business logic, accounting, and finance, which now informs my analytical approach to commerce-driven data insights.",
    achievements: [
      "Major in Accounting and Finance with a CGPA of 7.55/10.0.",
      "Built core competencies in financial modeling and business process understanding.",
    ],
    skillTags: ["Accounting", "Finance", "Business Logic"],
  },
  {
    title: "Marketing & Sales Trainee",
    company: "IFortis Corporate",
    duration: "May 2021 – Jul 2021",
    summary:
      "Built foundational business intelligence skills through consumer trend analysis, market segmentation, and the alignment of sales operations with corporate strategy.",
    achievements: [
      "Leveraged market segmentation analysis to refine targeting approaches for active campaigns.",
      "Managed sales operations to ensure seamless execution of strategic promotional plans.",
    ],
    skillTags: ["Market Analysis", "Consumer Behavior", "Stakeholder Ops"],
  },
  {
    title: "Claims Analyst",
    company: "Xceedance Consulting India Pvt. Ltd.",
    duration: "Jul 2023 – Feb 2024",
    summary:
      "Delivered high-velocity data processing and database maintenance for US-based healthcare clients, consistently outperforming production targets through rapid process adaptation.",
    achievements: [
      "Maintained 99.9% data integrity for the Medical Provider Network (MPN) database with zero compliance errors.",
      "Surpassed daily production KPIs by 15% within the first month of operations.",
    ],
    skillTags: ["Data Integrity", "SLA Management", "Healthcare Ops"],
  },
  {
    title: "Certified Data Analyst",
    company: "Ducat, Noida",
    duration: "Jul 2024 – Nov 2025",
    summary:
      "Undertook an intensive, practical upskilling program focused on modern data architecture, bridging the gap between business logic and technical execution using AI-augmented workflows.",
    achievements: [
      "Mastered the full data lifecycle: Extraction (SQL), Transformation (Python/Excel), and Visualization (Power BI).",
      "Developed AI-assisted coding protocols to accelerate query generation and complex DAX formulation.",
    ],
    skillTags: ["SQL", "Python", "Power BI", "Excel", "VBA", "Generative AI"],
  },
  {
    title: "AI-Analyst",
    company: "Innodata Inc., Noida (Remote)",
    duration: "Jan 2026 – Present",
    summary:
      "Spearheaded Multi-Modal Prompt Engineering across diverse AI models (text, image, audio, and video). Engineered and refined complex prompts, and conducted comparative evaluations to improve model performance.",
    achievements: [
      "Achieved an average quality score of 3.29/4.00, surpassing the target benchmark of 2.00 by over 64%, as independently verified by senior QA reviewers.",
      "Conducted rigorous comparative evaluations and A/B testing of AI-generated content to resolve factual and structural inconsistencies."
    ],
    skillTags: ["Prompt Engineering", "Quality Assurance", "AI Training", "Process Standardization"],
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative sm:pl-16 group/entry"
    >
      {/* Timeline dot - centered with the box (center at 31px) */}
      <div className="hidden sm:flex absolute sm:left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10 transition-colors duration-500 group-hover/entry:border-accent-cyan">
        <div 
          className="absolute inset-[-2px] rounded-full bg-accent-cyan shadow-[0_0_15px_#27CBCE] z-20 opacity-0 group-hover/entry:opacity-100 transition-opacity duration-300"
        />
        {/* Inner core to keep it looking sharp */}
        <div 
          className="absolute inset-[2px] rounded-full bg-white z-30 opacity-0 group-hover/entry:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Card */}
      <div
        className="rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-8 transition-all duration-300 hover:border-accent-cyan/40 group"
        style={{
          backgroundColor: 'var(--surface-elevated)',
          boxShadow: '0 4px 24px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top row: Number + Duration */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] sm:text-xs text-accent-cyan/60 font-mono tracking-widest uppercase">Entry {formattedIndex}</span>
          <span className="text-[10px] sm:text-xs text-text-muted/60 font-sans font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">{duration}</span>
        </div>

        {/* Title & Company */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-serif mb-1 group-hover:text-accent-cyan transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-accent-cyan/80 font-sans font-medium">{company}</p>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans mb-6 italic opacity-90">{summary}</p>

        {/* Achievements */}
        <div className="space-y-4 mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted/50 font-sans font-bold">Key Accomplishments</p>
          <ul className="space-y-3">
            {achievements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-text-muted/90 leading-relaxed font-sans">
                <span className="text-accent-cyan mt-1.5 flex-shrink-0 text-xs">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1.5 text-accent-cyan/70 font-sans font-semibold hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-colors duration-200"
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
  return (
    <section 
      id="experience" 
      className="relative z-20 text-foreground border-t" 
      style={{
        backgroundColor: 'var(--background-experience)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Subtle turquoise gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(39,203,206,0.02)] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Heading (Sticky on Desktop) */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-40 lg:h-fit space-y-4 sm:space-y-6">
              <motion.p 
                className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Professional Journey
              </motion.p>
              <motion.h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Hands-on history
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                A chronological overview of my professional journey, highlighting key achievements, responsibilities, and technical expertise gained at each position.
              </motion.p>
              <div className="pt-8 hidden lg:block">
                <div className="h-px w-24 bg-accent-cyan/30" />
              </div>
            </div>
          </div>
          
          {/* Right Column - Timeline */}
          <div className="lg:w-2/3">
            <div className="relative space-y-12 sm:space-y-16">
              {/* Timeline line - aligned with dots */}
              <div className="absolute left-[21px] sm:left-[31px] top-8 bottom-0 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-cyan/15 to-transparent hidden sm:block">
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
