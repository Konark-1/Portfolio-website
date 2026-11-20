"use client";

import { useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import GlassButton from "@/components/ui/GlassButton";
import HeroBackgroundMobile from "@/components/HeroBackgroundMobile";
import Silk from "@/components/Silk";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import DynamicSections from "@/components/DynamicSections";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-[100svh]" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sticky Full-Page Slides Container - Hero slides under About */}
      <div className="relative" suppressHydrationWarning>
        {/* Hero section - Standard Flow */}
        <div
          className="relative min-h-[100svh] z-0 overflow-hidden"
          suppressHydrationWarning
          style={{
            backgroundColor: 'var(--background-hero)',
          }}
        >
          {/* Instant Background Engine: 0ms perceived load time */}
          <div className="absolute inset-0 z-0 pointer-events-none" suppressHydrationWarning>
            {/* Immediate ambient glow base: renders at frame 0 in SSR HTML, eliminating black screen */}
            <HeroBackgroundMobile />

            {/* Progressive Premultiplied WebGL Silk Waves: transitions smoothly once Frame 0 verified */}
            <Silk
              color="#27c4ff"
              sheenColor="#8cf6f7"
              speed={shouldReduceMotion ? 0 : 2.5}
              scale={1.0}
              sheen={0.5}
              depth={0.5}
              glow={0.3}
              noiseIntensity={1.2}
            />
          </div>

          {/* Enhanced gradient overlay with turquoise tint */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(10,14,26,0.4)] pointer-events-none" />

          {/* Subtle turquoise ambient glow */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(39,203,206,0.08),transparent_70%)] pointer-events-none" />

          {/* Content container with proper spacing from header */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6" suppressHydrationWarning>
            {/* Main heading */}
            <div className="text-center max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-4 sm:space-y-6" suppressHydrationWarning>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.1] text-white px-2" suppressHydrationWarning>
                Business Analyst &amp; KPI Specialist
              </h1>
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-white/85 font-sans px-2" suppressHydrationWarning>
                Translating complex operational data into executive Power BI dashboards, SQL queries, and automated workflows that drive throughput and quality.
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row justify-center items-center gap-0 w-full max-w-xl mx-auto px-4" suppressHydrationWarning>
              <MagneticButton
                intensity={0.6}
                className="cursor-pointer pointer-events-auto group"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = '/KONARK_PARIHAR.pdf';
                  a.download = 'KONARK_PARIHAR.pdf';
                  a.click();
                }}
              >
                <GlassButton
                  width={220}
                  height={55}
                  borderRadius={50}
                  backgroundOpacity={0.1}
                  blur={12}
                >
                  <span className="px-6 py-3 text-text-primary font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans uppercase">
                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    Resume
                  </span>
                </GlassButton>
              </MagneticButton>
              <MagneticButton
                intensity={0.6}
                className="cursor-pointer pointer-events-auto group"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('mount-section', { detail: 'projects' }));
                  }
                  const element = document.getElementById('projects');
                  if (element) {
                    const headerHeight = 90;
                    const rect = element.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = Math.max(0, rect.top + scrollTop - headerHeight);
                    window.scrollTo({
                      top: targetY,
                      behavior: 'smooth'
                    });
                  } else {
                    window.location.href = '/portfolio';
                  }
                }}
              >
                <GlassButton
                  width={220}
                  height={55}
                  borderRadius={50}
                  backgroundOpacity={0.1}
                  blur={12}
                >
                  <span className="px-6 py-3 text-text-primary font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans uppercase">
                    My Portfolio
                  </span>
                </GlassButton>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* About Section */}
        <AboutSection />
      </div>

      <SkillsSection />
      
      <ExperienceSection />
      
      <DynamicSections />
    </main>
  );
}
