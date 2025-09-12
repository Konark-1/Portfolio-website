"use client";

import { lazy, Suspense, useState } from 'react';
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import SkillsTimeline from "@/components/ui/skills-timeline";
import Link from 'next/link';

// Lazy load the heavy WebGL component
const LiquidChrome = lazy(() => import("@/components/react-bits/LiquidChrome/LiquidChrome"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background component positioned fixed so header can blur it */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <Suspense fallback={<LoadingSkeleton className="absolute inset-0" />}>
          <LiquidChrome
            baseColor={[0, 0.05, 0.05]}
            speed={0.85}
            amplitude={0.3}
            frequencyX={3}
            frequencyY={2}
            interactive={true}
          />
        </Suspense>
      </div>

      {/* Content container with proper spacing from header */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6">
        {/* Main heading */}
        <div className="text-center max-w-7xl">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight leading-tight hero-chrome-text min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] xl:min-h-[7rem] flex items-center justify-center px-2">
            Data Analyst & Business Intelligence Specialist
          </h1>
          <p className="mt-6 sm:mt-8 max-w-4xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium min-h-[2.5rem] sm:min-h-[3rem] px-2">
            Specializing in transforming complex data into actionable insights with Power BI, SQL, and advanced Excel to drive business growth.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-nowrap justify-center items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          <div
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group w-[85%] sm:w-auto"
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                const headerHeight = 115;
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <GlassSurface
              width="100%"
              height={55}
              borderRadius={50}
              backgroundOpacity={0.1}
              saturation={1}
              borderWidth={0.07}
              brightness={50}
              opacity={0.93}
              blur={11}
              displace={0.5}
              distortionScale={-180}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
            >
              <button className="px-6 sm:px-8 py-3 text-white font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
                Get Started
              </button>
            </GlassSurface>
          </div>
          <Link href="/portfolio" className="w-[85%] sm:w-auto">
            <GlassSurface
              width="100%"
              height={55}
              borderRadius={50}
              backgroundOpacity={0.1}
              saturation={1}
              borderWidth={0.07}
              brightness={50}
              opacity={0.93}
              blur={11}
              displace={0.5}
              distortionScale={-180}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
            >
              <button className="px-6 sm:px-8 py-3 text-white/80 font-medium w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
                MY PORTFOLIO
              </button>
            </GlassSurface>
          </Link>
        </div>
      </div>

      {/* Combined About & Technical Expertise Section */}
      <section id="about" className="relative z-10 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-24">
          {/* Content blocks */}
          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:gap-16 items-start">

            {/* Left Column - Two service-style blocks */}
            <div className="order-1">
              {/* Block: About Me (reference-style) */}
              <div className="border-t border-white/20 pt-8 sm:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl metallic-text">About Me</h2>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
                      I am a detail-oriented Data Analyst with a Bachelor of Commerce (Honours) from Amity University. My professional journey began at Xceedance Consulting Pvt Ltd as a Claims Analyst, where I honed my skills in analyzing, modifying, and updating critical data. I am currently advancing my expertise through a dedicated Data Analyst course at Ducat, Noida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 sm:my-12 border-t border-white/20" />

              {/* Block: Technical Expertise (reference-style) */}
              <div className="border-t border-transparent pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  <div>
                    <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl metallic-text">Technical Expertise</h3>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-400">
                      My toolkit is both powerful and flexible, with a focus on analytics and AI to enhance efficiency and unlock deeper insights. Explore the interactive timeline to discover my skills and experience across tools and domains.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Orbital timeline below the section */}
          <div className="mt-12 sm:mt-16">
            <div className="w-full max-w-4xl mx-auto">
              <SkillsTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Flow-inspired tabs) */}
      <section id="projects" className="relative z-10 bg-black text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl chrome-text">Projects</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-300 max-w-3xl mx-auto px-2">
              A cinematic showcase of interactive analytics. Explore embedded Power BI dashboards with smooth, polished interactions.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="sticky top-20 sm:top-24 z-20 bg-gradient-to-b from-black via-black/95 to-transparent pb-6 sm:pb-8 pt-4 pointer-events-none">
            <ProjectsTabs />
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="relative z-10 bg-gray-900 text-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl chrome-text">Professional Certificates</h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-300 px-2">
            This section will contain my professional certificates and qualifications. Content to be added soon.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState<'consistent' | 'seamless' | 'cinematic'>("cinematic");
  const [hoverTab, setHoverTab] = useState<null | 'consistent' | 'seamless' | 'cinematic'>(null);

  const descriptionByTab: Record<'consistent' | 'seamless' | 'cinematic', string> = {
    consistent: "Bring your own assets, or generate them. Then manage and reference them as you build.",
    seamless: "An interface designed for creative, iterative story-building — from ideation to iteration.",
    cinematic: "State-of-the-art visuals presented beautifully. Interactive PowerBI dashboard showcasing advanced analytics.",
  };

  const tabs = [
    { key: 'cinematic' as const, label: 'Cinematic' },
    { key: 'seamless' as const, label: 'Seamless' },
    { key: 'consistent' as const, label: 'Consistent' },
  ];

  const displayed = hoverTab ?? activeTab;

  return (
    <div className="mt-6 sm:mt-12 pointer-events-auto">
      {/* Full-width titles row with blur like reference */}
      <div className="ml-[calc(50%-50vw)] w-screen">
        <div className="border-t border-white/15 bg-gradient-to-b from-white/5 via-white/0 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 sm:gap-4">
            {tabs.map(({ key, label }) => {
              const isDisplayed = displayed === key;
              return (
                <h3
                  key={key}
                  onMouseEnter={() => setHoverTab(key)}
                  onMouseLeave={() => setHoverTab(null)}
                  onClick={() => setActiveTab(key)}
                  className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-pointer select-none text-center
                    transition-all duration-300 ease-in-out
                    ${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}
                    ${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}
                    py-2 px-4 rounded-lg w-full sm:w-auto
                    ${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/8'}
                    shadow-md
                  `}
                  style={{ 
                    fontSize: 'clamp(0.875rem, 1rem, 2.5rem)' 
                  }}
                >
                  {label}
                </h3>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub description - based on active selection */}
      <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 max-w-3xl mx-auto text-center px-4 leading-relaxed">
        {descriptionByTab[activeTab]}
      </p>

      {/* Content area */}
      <div className="mt-6 sm:mt-10">
        {/* Keep DOM of all three iframes mounted to preload and avoid switching lag */}
        <div className="mx-auto w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[74vw] px-0">
          <div className="relative rounded-[22px] md:rounded-[24px] overflow-hidden bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            {/* Turquoise glow border */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -inset-2 rounded-[28px] bg-teal-400/20 blur-xl" />
              <div className="absolute inset-0 rounded-[22px] ring-1 ring-teal-400/20" />
            </div>

            {/* Shared aspect-ratio container */}
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              {/* Cinematic */}
              <iframe
                title="Project 3"
                src="https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', zIndex: activeTab === 'cinematic' ? 2 : 1, opacity: activeTab === 'cinematic' ? 1 : 0, transform: activeTab === 'cinematic' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'cinematic' ? 'auto' : 'none', visibility: 'visible' }}
                allowFullScreen
                loading="lazy"
              />

              {/* Seamless */}
              <iframe
                title="Project2"
                src="https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlLCJoaWRlQW5nbGVQYW5lbCI6dHJ1ZSwiaGlkZUZvb3RlciI6dHJ1ZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', zIndex: activeTab === 'seamless' ? 2 : 1, opacity: activeTab === 'seamless' ? 1 : 0, transform: activeTab === 'seamless' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'seamless' ? 'auto' : 'none', visibility: 'visible' }}
                allowFullScreen
                loading="lazy"
              />

              {/* Consistent */}
              <iframe
                title="project"
                src="https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlLCJoaWRlQW5nbGVQYW5lbCI6dHJ1ZSwiaGlkZUZvb3RlciI6dHJ1ZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', zIndex: activeTab === 'consistent' ? 2 : 1, opacity: activeTab === 'consistent' ? 1 : 0, transform: activeTab === 'consistent' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'consistent' ? 'auto' : 'none', visibility: 'visible' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
