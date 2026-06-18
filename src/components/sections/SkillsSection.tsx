"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Database, Code2, Layers, Brain, Globe, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const skillsShowcase = [
  {
    icon: BarChart3,
    title: "Power BI",
    level: "Advanced",
    description: "Interactive dashboards, DAX modeling, storytelling layouts.",
  },
  {
    icon: Database,
    title: "SQL",
    level: "Developing",
    description: "Query optimisation, stored procedures, audit-ready outputs.",
  },
  {
    icon: Code2,
    title: "Python",
    level: "Developing",
    description: "Pandas, NumPy, data-cleaning automations with AI copilots.",
  },
  {
    icon: Layers,
    title: "Excel",
    level: "Advanced",
    description: "Complex formulas, Power Query, executive reporting packs.",
  },
  {
    icon: Brain,
    title: "AI Workflow",
    level: "Expert",
    description: "Prompt-driven tooling to accelerate analysis 3x.",
  },
  {
    icon: Globe,
    title: "Business Insight",
    level: "Strong",
    description: "Commerce + marketing understanding for grounded insights.",
  },
];

type SkillCardProps = {
  icon: LucideIcon;
  title: string;
  level: string;
  description: string;
};

function SkillCard({ icon: Icon, title, level, description }: SkillCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="rounded-3xl border border-border bg-card/80 p-6 shadow-glass-soft hover:border-accent-cyan/30 hover:bg-card/90 transition-colors duration-300"
    >
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan"
          whileHover={{
            scale: 1.15,
            rotate: 360,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <div>
          <motion.p
            className="text-xs uppercase tracking-[0.35em] text-text-muted font-sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {level}
          </motion.p>
          <motion.h3
            className="text-lg font-semibold text-text-primary font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>
      <motion.p
        className="text-sm text-text-muted leading-relaxed font-sans"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative z-20 text-foreground border-t" style={{
      backgroundColor: 'var(--background-skills)',
      borderColor: 'var(--border-color)'
    }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(39,203,206,0.03)] via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 space-y-12 sm:space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technical expertise
          </motion.p>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Toolbox for insight generation
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A comprehensive overview of my technical expertise and proficiency levels across key data analytics tools and methodologies.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillsShowcase.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>

        <motion.div
          className="rounded-3xl border border-accent-cyan/40 bg-accent-cyan/10 p-8 shadow-glass-soft"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.02,
            borderColor: "rgba(39, 203, 206, 0.5)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h3
            className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-4 flex items-center gap-3 tracking-tight leading-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-5 w-5 text-accent-cyan" />
            </motion.span>
            AI Workflow Advantage
          </motion.h3>
          <motion.p
            className="text-base text-text-muted leading-relaxed font-sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Leveraging AI-powered workflows to accelerate data analysis by 3x, enabling faster insights delivery and enhanced decision-making capabilities through intelligent automation and prompt-driven tooling.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
