"use client";

import { useState, useEffect } from "react";
import GlassButton from "@/components/ui/GlassButton";
import { useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/magnetic-button";

import { useIsMobile } from '@/hooks/useIsMobile';
import HeroBackgroundMobile from '@/components/HeroBackgroundMobile';

// Dynamically import Silk background
const Silk = dynamic(
  () => import("@/components/Silk"),
  {
    ssr: false,
    loading: () => null,
  }
);

// Dynamically import below the fold sections
const LazyLoader = dynamic(() => import("@/components/ui/LazyLoader"));

const StackedCardCertificates = dynamic(
  () => import("@/components/ui/stacked-card-certificates").then(mod => ({ default: mod.StackedCardCertificates })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
      </div>
    ),
  }
);

const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [isIdle, setIsIdle] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Defer heavy components (like WebGL) until the main thread is idle
    const idle = (cb: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: Function }).requestIdleCallback(() => cb(), { timeout: 1500 });
      } else {
        setTimeout(cb, 500);
      }
    };
    idle(() => setIsIdle(true));
  }, []);

  return (
    <main className="relative min-h-[100dvh]" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sticky Full-Page Slides Container - Hero slides under About */}
      <div className="relative" suppressHydrationWarning>
        {/* Hero section - Standard Flow */}
        <div
          className="relative min-h-[100dvh] z-0"
          suppressHydrationWarning
          style={{
            backgroundColor: 'var(--background-hero)',
          }}
        >
          {/* Background - Deferred until idle to prevent main thread blocking */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {isIdle && (
              isMobile === true ? (
                <HeroBackgroundMobile />
              ) : isMobile === false ? (
                <Silk
                  speed={shouldReduceMotion ? 0 : 7.5}
                  scale={1}
                  color="#27CBCE"
                  noiseIntensity={5.9}
                  rotation={0}
                />
              ) : null
            )}
          </div>

          {/* Enhanced gradient overlay with turquoise tint */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(10,14,26,0.4)] pointer-events-none" />

          {/* Subtle turquoise ambient glow */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(39,203,206,0.08),transparent_70%)] pointer-events-none" />

          {/* Content container with proper spacing from header */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6" suppressHydrationWarning>
            {/* Main heading */}
            <div className="text-center max-w-6xl mx-auto space-y-4 sm:space-y-6" suppressHydrationWarning>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.1] text-white px-2" suppressHydrationWarning>
                Data Analyst & Business Intelligence Specialist
              </h1>
              <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/80 font-sans px-2" suppressHydrationWarning>
                I find the signal in the noise. Transforming complex data into actionable business intelligence.
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
                  const element = document.getElementById('projects');
                  if (element) {
                    const headerHeight = 115;
                    const elementPosition = element.offsetTop - headerHeight;
                    requestAnimationFrame(() => {
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
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
        <LazyLoader 
          minHeight="100vh" 
          render={() => <AboutSection />} 
        />
      </div>

      <LazyLoader minHeight="100vh" render={() => <SkillsSection />} />
      
      <LazyLoader minHeight="150vh" render={() => <ExperienceSection />} />
      
      <LazyLoader minHeight="200vh" render={() => <ProjectsSection />} />
      
      <LazyLoader minHeight="100vh" render={() => (
        <StackedCardCertificates
        certificates={[
          {
            title: "Professional Training Certificate",
            description: "Comprehensive training program in data analytics and business intelligence tools.",
            filePath: "/Certificates/Konark Parihar ducat certificate.pdf",
            imagePath: "/Certificates/Konark Parihar ducat certificate.webp",
            issuer: "DUCAT",
            date: "2025",
            skills: ["Data Analytics", "BI Tools", "Business Intelligence"],
          },
          {
            title: "Data Analyst Professional",
            description: "Professional certification validating core data analysis skills and methodologies.",
            filePath: "/Certificates/Data Analyst-Certificate Data Analyst.pdf",
            imagePath: "/Certificates/Data Analyst-Certificate Data Analyst.webp",
            issuer: "OneRoadMap",
            date: "2025",
            skills: ["Data Analysis", "SQL", "Python", "Visualization"],
          },
          {
            title: "Excel Specialist",
            description: "Advanced proficiency in Microsoft Excel for complex data management and analysis.",
            filePath: "/Certificates/Excel certificate.pdf",
            imagePath: "/Certificates/Excel certificate.webp",
            issuer: "OneRoadMap",
            date: "2025",
            skills: ["Advanced Excel", "Data Management", "Pivot Tables"],
          },
          {
            title: "Create Visual Calculation",
            description: "Advanced Power BI visual calculations and DAX formulations for dynamic reporting.",
            filePath: "/Certificates/Create Visual Calculation.pdf",
            imagePath: "/Certificates/Create Visual Calculation.webp",
            issuer: "Microsoft",
            date: "2025",
            skills: ["Power BI", "DAX", "Visual Calculations"],
          },
          {
            title: "Python for Data Science",
            description: "Certification in Python programming for data analysis, manipulation, and visualization.",
            filePath: "/Certificates/Python.pdf",
            imagePath: "/Certificates/Python.webp",
            issuer: "OneRoadMap",
            date: "2025",
            skills: ["Python", "Pandas", "NumPy", "Data Visualization"],
          },
          {
            title: "DAX Time Intelligence",
            description: "Mastering time-based calculations and analysis using DAX functions in Power BI.",
            filePath: "/Certificates/Dax time Intelligence.pdf",
            imagePath: "/Certificates/Dax time Intelligence.webp",
            issuer: "Microsoft",
            date: "2025",
            skills: ["Power BI", "DAX", "Time Intelligence"],
          },
          {
            title: "SQL Advanced",
            description: "Advanced SQL query writing, database management, and performance optimization.",
            filePath: "/Certificates/sql certificate.pdf",
            imagePath: "/Certificates/sql certificate.webp",
            issuer: "OneRoadMap",
            date: "2025",
            skills: ["SQL", "Database Management", "Query Optimization"],
          },
          {
            title: "End to End Analytics",
            description: "Complete data analytics workflow from data extraction to visualization and insights.",
            filePath: "/Certificates/end to end analytics.pdf",
            imagePath: "/Certificates/end to end analytics.webp",
            issuer: "Microsoft",
            date: "2025",
            skills: ["Data Workflow", "ETL", "Visualization", "Insights"],
          },
        ]}
        />
      )} />

      <ContactSection />
    </main>
  );
}
