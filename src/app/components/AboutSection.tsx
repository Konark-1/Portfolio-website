"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Brain, Rocket, Target, ArrowRight } from "lucide-react";
import SpotlightCard, { SpotlightGroup } from "@/components/ui/spotlight-card";
import BlurText from "@/components/react-bits/BlurText/BlurText";

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      title: "Precision First",
      description: "100% accuracy rate maintained across healthcare databases. I don't just manage data; I ensure its integrity is absolute.",
      icon: Target,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      delay: 0.2
    },
    {
      title: "AI-Accelerated",
      description: "Leveraging custom AI workflows to process datasets 3x faster than industry standard. Efficiency isn't a buzzword; it's my baseline.",
      icon: Rocket,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      delay: 0.3
    },
    {
      title: "Strategic Insight",
      description: "Moving beyond 'what happened' to 'what's next'. My analysis is designed to trigger decisions, not just fill reports.",
      icon: Brain,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      delay: 0.4
    }
  ];

  return (
    <section id="about" className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden bg-black/20">
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Split Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-6">
          <div className="max-w-2xl">
            <BlurText className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">
              {"// My Origin Story"}
            </BlurText>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[0.9] font-heading">
              Curiosity Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Rigour.</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout Wrapped in SpotlightGroup */}
        <SpotlightGroup className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Main Identity Card - Spans 7 cols */}
          <div className="lg:col-span-7 h-full min-h-[500px]">
            <SpotlightCard className="h-full p-8 sm:p-12 flex flex-col justify-between group">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  AVAILABLE FOR WORK
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-heading">Konark Parihar</h3>
                <p className="text-xl text-cyan-200/80 mb-6 font-sans">Business Intelligence Specialist</p>
                
                <p className="text-gray-300 leading-relaxed max-w-lg mb-8 text-lg font-sans">
                  It wasn&apos;t enough to just see the numbers. I needed to know <span className="text-white italic font-serif">why</span>. 
                  From my first SQL query, I realized that data isn&apos;t just rows and columns—it&apos;s the voice of the business waiting to be heard. 
                  I don&apos;t just report on the past; I illuminate the path forward.
                </p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {["Power BI", "SQL", "Python", "Advanced Excel"].map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <a 
                  href="/Konark%20Resume.pdf" 
                  download
                  className="inline-flex items-center gap-3 text-white font-semibold text-lg group/link"
                >
                  <span className="border-b border-cyan-500/50 pb-1 group-hover/link:border-cyan-400 transition-colors">Download Resume</span>
                  <div className="p-2 rounded-full bg-white/10 group-hover/link:bg-cyan-500 group-hover/link:text-black transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
                  </div>
                </a>
              </div>

              {/* Decorative background */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 opacity-20 pointer-events-none">
                <Sparkles className="w-full h-full text-white/10 rotate-12" />
              </div>
            </SpotlightCard>
          </div>

          {/* Feature Stack - Spans 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className="flex-1"
              >
                <SpotlightCard className="h-full p-6 sm:p-8 flex items-start gap-5 hover:bg-white/[0.07] transition-colors">
                  <div className={`flex-shrink-0 p-3 rounded-xl ${feature.bg} ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </SpotlightGroup>
      </div>
    </section>
  );
}
