"use client";

import { lazy, Suspense } from 'react';
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
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
              borderRadius={30}
              backgroundOpacity={0.2}
              blur={20}
              saturation={1.2}
              brightness={60}
              className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group"
            >
              <button className="px-8 py-3 text-white font-semibold w-full h-full text-sm tracking-wide flex items-center justify-center gap-2">
                Get Started
              </button>
            </GlassSurface>
          </Link>
          <GlassSurface
            width={160}
            height={55}
            borderRadius={30}
            backgroundOpacity={0.2}
            blur={20}
            saturation={1.2}
            brightness={60}
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
            <button className="px-8 py-3 text-white/80 font-medium w-full h-full text-sm tracking-wide flex items-center justify-center gap-2">
              Learn More
            </button>
          </GlassSurface>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative z-10 bg-black text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:mx-0">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl metallic-text">About Me</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              I am a detail-oriented Data Analyst with a Bachelor of Commerce (Honours) from Amity University. My professional journey began at Xceedance Consulting Pvt Ltd as a Claims Analyst, where I honed my skills in analyzing, modifying, and updating critical data. I am currently advancing my expertise through a dedicated Data Analyst course at Ducat, Noida.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl lg:max-w-none">
            <h3 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl metallic-text">Technical Expertise</h3>
            <p className="mt-4 text-gray-400">My toolkit is both powerful and flexible, with a special focus on integrating AI to enhance efficiency and unlock deeper insights.</p>
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="font-semibold text-white">Power BI</dt>
                <dd className="mt-1 text-gray-400">Crafting interactive and insightful dashboards to visualize complex data stories.</dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-semibold text-white">SQL</dt>
                <dd className="mt-1 text-gray-400">Querying and manipulating large datasets with precision and efficiency.</dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-semibold text-white">Advanced Excel</dt>
                <dd className="mt-1 text-gray-400">Leveraging advanced functions, pivot tables, and macros for in-depth analysis.</dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-semibold text-white">Statistical Analysis</dt>
                <dd className="mt-1 text-gray-400">Applying statistical methods to ensure data-driven decisions are sound and reliable.</dd>
              </div>
               <div className="flex flex-col">
                <dt className="font-semibold text-white">AI Integration</dt>
                <dd className="mt-1 text-gray-400">Enhancing analytical workflows with AI tools to deliver faster and more robust insights.</dd>
              </div>
            </dl>
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
