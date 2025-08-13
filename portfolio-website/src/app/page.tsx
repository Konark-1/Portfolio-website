"use client";

import { lazy, Suspense } from 'react';
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import SkillsTimeline from "@/components/ui/skills-timeline";
import Link from 'next/link';

// Lazy load the heavy WebGL component
const LiquidChrome = lazy(() => import("@/components/react-bits/LiquidChrome/LiquidChrome"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background component positioned absolutely */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 lg:pt-28 px-4">
        {/* Main heading */}
        <div className="text-center max-w-7xl">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-tight hero-chrome-text min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] xl:min-h-[7rem] flex items-center justify-center">
            Data Analyst & Business Intelligence Specialist
          </h1>
          <p className="mt-8 max-w-4xl mx-auto text-lg text-gray-300 md:text-xl lg:text-2xl leading-relaxed font-medium min-h-[3rem]">
            Specializing in transforming complex data into actionable insights with Power BI, SQL, and advanced Excel to drive business growth.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/portfolio">
            <GlassSurface
              width={160}
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
              className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group"
            >
              <button className="px-8 py-3 text-white font-semibold w-full h-full text-sm tracking-wide flex items-center justify-center gap-2">
                Get Started
              </button>
            </GlassSurface>
          </Link>
          <div
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group"
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                const headerHeight = 100;
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <GlassSurface
              width={160}
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
              <button className="px-8 py-3 text-white/80 font-medium w-full h-full text-sm tracking-wide flex items-center justify-center gap-2">
                Learn More
              </button>
            </GlassSurface>
          </div>
        </div>
      </div>

      {/* Combined About & Technical Expertise Section */}
      <section id="about" className="relative z-10 bg-black text-white min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

            {/* Left Column - Content */}
            <div className="space-y-16">
              {/* About Me Content */}
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl metallic-text">About Me</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  I am a detail-oriented Data Analyst with a Bachelor of Commerce (Honours) from Amity University. My professional journey began at Xceedance Consulting Pvt Ltd as a Claims Analyst, where I honed my skills in analyzing, modifying, and updating critical data. I am currently advancing my expertise through a dedicated Data Analyst course at Ducat, Noida.
                </p>
              </div>

              {/* Technical Expertise Content */}
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl metallic-text">Technical Expertise</h3>
                <p className="mt-4 text-lg leading-7 text-gray-400">
                  My toolkit is both powerful and flexible, with a special focus on integrating AI to enhance efficiency and unlock deeper insights. Explore the interactive timeline to discover my skills and experience.
                </p>
              </div>
            </div>

            {/* Right Column - Interactive Component */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="w-full max-w-3xl">
                <SkillsTimeline />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="relative z-10 bg-gray-900 text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl chrome-text">Professional Certificates</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            This section will contain my professional certificates and qualifications. Content to be added soon.
          </p>
        </div>
      </section>
    </main>
  );
}
