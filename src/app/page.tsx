"use client";

import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  Code2,
  Database,
  FileText,
  Globe,
  Layers,
  Linkedin,
  Lightbulb,
  Mail,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import dynamic from "next/dynamic";

// Dynamically import LiquidChrome to reduce initial bundle size and avoid SSR issues
const LiquidChrome = dynamic(
  () => import("@/components/react-bits/LiquidChrome/LiquidChrome"),
  {
    ssr: false,
    loading: () => null, // No loading state needed for background
  }
);

export default function HomePage() {
  // Respect reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  const skillsShowcase = [
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

  const experienceTimeline = [
    {
      title: "Claims Analyst",
      company: "Xceedance Consulting India Pvt. Ltd.",
      duration: "Jul 2023 – Jan 2024",
      summary:
        "Delivered 100% accuracy while maintaining the Medical Provider Network database and daily executive reports.",
      achievements: [
        "Operationalised updates/creation of critical provider records.",
        "Produced daily reports for offshore managers on schedule.",
      ],
      skillTags: ["Data Management", "Excel", "Healthcare Ops"],
    },
    {
      title: "Marketing & Sales Trainee",
      company: "IFortis Corporate",
      duration: "May 2021 – Jul 2021",
      summary:
        "Built foundational business intelligence through consumer trend analysis and campaign alignment tasks.",
      achievements: [
        "Supported segmentation research for active campaigns.",
        "Helped sync sales ops with marketing experiments.",
      ],
      skillTags: ["Market Analysis", "Reporting", "Stakeholder Ops"],
    },
  ];

  const contactChannels = [
    {
      icon: Mail,
      label: "Email",
      value: "konarkofficial@gmail.com",
      href: "mailto:konarkofficial@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8800957178",
      href: "tel:+918800957178",
    },
    {
      icon: FileText,
      label: "Resume",
      value: "Download resume (PDF)",
      href: "/Konark%20Resume.pdf",
      download: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/konarkparihar",
      href: "https://www.linkedin.com/in/konarkparihar",
    },
  ];

  const dashboards = [
    {
      featured: true,
      title: "Adaptive Weather Visuals",
      subtitle: "Real-Time Environmental Intelligence System",
      description:
        "Dynamic weather monitoring dashboard featuring adaptive visualizations that respond to environmental conditions. Tracks temperature forecasts, air quality indices, visibility metrics, and sunrise/sunset data across multiple Indian cities with contextual alerts.",
      embedUrl:
        "https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
      tech: ["Power BI", "DAX", "Weather API", "Real-Time Data", "Advanced Visuals"],
      metrics: [
        { label: "Data Points", value: "Real-Time" },
        { label: "Cities", value: "4+ Indian" },
        { label: "Metrics", value: "15+ Environmental" },
        { label: "Update", value: "Hourly Sync" },
      ],
      insights: [
        "Conditional formatting for AQI severity levels",
        "Forecasted temperature trend analysis with 3-day predictions",
        "Context-aware safety alerts for visibility/fog risk",
        "Multi-city comparative weather visualization",
      ],
      gradient: "from-teal-500/20 via-cyan-500/10 to-cyan-400/0",
    },
    {
      title: "Macro & Micro Level Analysis",
      subtitle: "Executive & Operational Intelligence Platform",
      description:
        "Comprehensive dual-layer business analytics dashboard providing executive overview (macro) and granular operational insights (micro). Features geographic sales distribution, category profitability analysis, and segment-wise revenue breakdown with drill-through capabilities.",
      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
      tech: ["Power BI", "DAX", "Data Modeling", "Geographic Viz", "KPI Design"],
      metrics: [
        { label: "Total Sales", value: "2.30M" },
        { label: "Avg Order", value: "458.61" },
        { label: "Segments", value: "3 Business" },
        { label: "Categories", value: "Tech | Office | Furniture" },
      ],
      insights: [
        "Executive dashboard with 15+ KPIs for strategic decisions",
        "Geographic map visualization for regional performance",
        "Category profit margin comparison (46.7% tech)",
        "City-level order analysis with interactive filtering",
      ],
      gradient: "from-blue-500/20 via-indigo-500/10 to-indigo-400/0",
    },
    {
      title: "Distribution & Trend Analysis",
      subtitle: "Konark Business Intelligence System",
      description:
        "Multi-dimensional business analysis dashboard examining quarterly performance, category distribution, expense ratios, and state-wise profit patterns. Features time-series profit trends, income categorization, and geographic bubble visualizations for India-specific insights.",
      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
      tech: ["Power BI", "Time Series", "Statistical Analysis", "Map Visuals", "DAX Measures"],
      metrics: [
        { label: "Total Profit", value: "37K" },
        { label: "Expense Ratio", value: "0.99" },
        { label: "States", value: "Multiple" },
        { label: "Quarters", value: "4 Analyzed" },
      ],
      insights: [
        "Month-over-month profit trend identification (peaks in Jan, Aug, Nov)",
        "Clothing dominates sales at 62% of total quantity",
        "State-level profitability mapping with bubble chart",
        "Quarterly performance tracking with comparisons",
      ],
      gradient: "from-purple-500/20 via-pink-500/10 to-pink-400/0",
    },
  ];

  const techHighlights = [
    {
      icon: "🎯",
      title: "Advanced DAX",
      description: "Complex measures, time intelligence, and calculated columns for dynamic insights.",
    },
    {
      icon: "🔄",
      title: "Data Modeling",
      description: "Star schema design, relationship optimization, and query performance tuning.",
    },
    {
      icon: "📊",
      title: "Visual Storytelling",
      description: "Color psychology, hierarchy design, and interactive drill-through experiences.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Connection warming handled via preconnect/dns-prefetch in layout */}

      {/* Hero section */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Liquid Chrome Background */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 z-0">
            <LiquidChrome
              baseColor={[0, 0.05, 0.05]}
              speed={0.85}
              amplitude={0.3}
              frequencyX={3}
              frequencyY={2}
              interactive={true}
            />
          </div>
        )}
        
        {/* Subtle gradient overlay for text readability (lighter) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-gray-900/20 pointer-events-none" />
        
        {/* Content container with proper spacing from header */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6">
        {/* Main heading */}
        <div className="text-center max-w-7xl">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight leading-tight hero-chrome-text text-white min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] xl:min-h-[7rem] flex items-center justify-center px-2">
            Data Analyst & Business Intelligence Specialist
          </h1>
          <p className="mt-6 sm:mt-8 max-w-4xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium min-h-[2.5rem] sm:min-h-[3rem] px-2 text-white/80">
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
              disableShadow
            >
              <button className="px-6 sm:px-8 py-3 text-white font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
                Get Started
              </button>
            </GlassSurface>
          </div>
          <div
            className="w-[85%] sm:w-auto cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group"
            onClick={() => {
              const element = document.getElementById('projects');
              if (element) {
                const headerHeight = 115;
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                });
              } else {
                // Fallback: navigate if section not found
                window.location.href = '/portfolio';
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
              disableShadow
            >
              <span className="px-6 sm:px-8 py-3 text-white/80 font-medium w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
                MY PORTFOLIO
              </span>
            </GlassSurface>
          </div>
        </div>
      </div>
      </div>

      {/* About Section - Minimal single-screen layout */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 py-24 overflow-hidden"
      >
        {/* Gradient transition from hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/0 via-[#0A192F]/50 to-[#0A192F]" />
        {/* Ambient glows + accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[210px]" />
          <div className="absolute bottom-[-120px] right-1/4 h-[360px] w-[360px] rounded-full bg-sky-500/10 blur-[200px]" />
          <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto w-full text-center space-y-16 relative z-10">
          {/* 1. Section Label - Blur Text */}
          <BlurText
            className="text-xs tracking-[0.4em] uppercase text-gray-500"
            delay={0}
          >
            Get to Know Me
          </BlurText>

          {/* 2. Name - Simple fade */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? {} : { duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
          >
            KONARK PARIHAR
          </motion.h1>

          {/* 3. Role - Blur Text */}
          <BlurText
            className="text-xl md:text-2xl text-cyan-400/90 font-medium"
            delay={400}
          >
            Data Analyst &amp; Business Intelligence Specialist
          </BlurText>

          {/* 4. Availability Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-400/30 bg-emerald-400/5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-300">Available for opportunities</span>
            </div>
          </div>

          {/* 5. Bio - Static */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? {} : { duration: 1, delay: 0.6 }}
            className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto"
          >
            Data analyst with commerce background specializing in Power BI, SQL, and AI-powered workflows. 6+ months
            managing healthcare databases at Xceedance (100% accuracy). Recent certification focused on turning messy
            datasets into clear, decision-ready insights.
          </motion.p>

          <div className="rounded-[36px] border border-white/10 bg-white/5 px-6 sm:px-10 py-10 space-y-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            {/* 6. Metrics - Horizontal row */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-16">
              {[
                { value: "6+", label: "Months Experience" },
                { value: "100%", label: "Data Accuracy" },
                { value: "Nov 2025", label: "Certified" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center space-y-1">
                  <div className="text-4xl md:text-5xl font-semibold text-cyan-300/80">{value}</div>
                  <div className="text-xs uppercase tracking-[0.35em] text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* 7. Skills - Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {[
                "Power BI",
                "SQL",
                "Python",
                "Excel",
                "DAX",
                "AI Workflow",
                "Healthcare Analytics",
                "Business Intelligence",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 text-sm text-gray-200/90 border border-white/10 rounded-full hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Technical Expertise Section (base framework) */}
      <section id="skills" className="relative z-10 bg-slate-950/60 text-foreground border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.6em] text-text-muted">Technical expertise</p>
            <h2 className="heading-2 text-text-primary">Toolbox for insight generation</h2>
            <p className="max-w-2xl mx-auto text-text-muted">
              Rapid overview of the skills that future collaborators can expand on.
              Each card is ready for another agent to refine with richer copy or data.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillsShowcase.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>

          <div className="rounded-3xl border border-accent-cyan/40 bg-accent-cyan/10 p-8 shadow-glass-soft">
            <h3 className="text-2xl font-semibold text-text-primary mb-3 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent-cyan" />
              AI Workflow Advantage
            </h3>
            <p className="text-text-muted max-w-3xl">
              Agents focusing on this section can expand on use cases, tooling, or success metrics that prove the
              AI-first workflow. Copy intentionally lightweight so specialists can enrich it further.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section (base framework) */}
      <section id="experience" className="relative z-10 bg-background text-foreground border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="space-y-4 mb-12">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted">Experience</p>
            <h2 className="heading-2 text-text-primary">Hands-on history</h2>
            <p className="text-text-muted">
              Timeline structure gives other agents a place to add depth, logos, or metrics without rewriting layout code.
            </p>
          </div>
          <div className="relative border-l border-white/10 ml-4">
            {experienceTimeline.map((item, index) => (
              <ExperienceEntry key={item.title} {...item} isLast={index === experienceTimeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Premium minimalist redesign */}
      <section id="projects" className="relative py-24 sm:py-32 px-4 overflow-hidden border-t border-white/5">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee1a,transparent_45%)] ${shouldReduceMotion ? 'blur-xl' : 'blur-3xl'} pointer-events-none`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Interactive Analytics
            </h2>
            <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              A cinematic showcase of embedded Power BI dashboards. <span className="text-cyan-400">Fully interactive</span>,
              real-time data visualizations built with advanced DAX, optimized queries, and storytelling design principles.
            </p>
          </div>

          <div className="space-y-20">
            {dashboards.map((dashboard) => (
              <DashboardCard key={dashboard.title} {...dashboard} />
            ))}
          </div>

          <div className="mt-10 p-8 sm:p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent shadow-glass-soft">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-text-primary">
              <span className="text-cyan-400 text-3xl">⚡</span>
              Technical implementation highlights
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {techHighlights.map((highlight) => (
                <TechHighlight key={highlight.title} {...highlight} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="relative z-10 bg-gray-900 text-white py-16 sm:py-24 lg:py-32 cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl chrome-text">Professional Certificates</h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-300 px-2">
            This section will contain my professional certificates and qualifications. Content to be added soon.
          </p>
        </div>
      </section>

      {/* Contact CTA / Form framework */}
      <section id="contact" className="relative z-10 bg-slate-950 text-foreground border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted">Contact</p>
            <h2 className="heading-2 text-text-primary">Let&rsquo;s work together</h2>
            <p className="text-text-muted">
              Structured so another agent can plug in Formspree, Vercel functions, or Shadcn form validation.
              Currently plain inputs to keep the foundation light.
            </p>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>• Use this copy block for CTA messaging or availability updates.</li>
              <li>• Replace placeholder form with functional implementation when ready.</li>
              <li>• Keep referencing IDs for smooth-scroll navigation.</li>
            </ul>
          </div>
          <Card className="border-white/10 bg-white/5 shadow-glass-soft">
            <CardContent className="space-y-4 pt-6">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="contact-name" className="text-sm font-semibold text-text-primary">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-semibold text-text-primary">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-semibold text-text-primary">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-accent-cyan/90 px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-bright/60"
                >
                  Send message (wire backend later)
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connect Section requested */}
      <section id="connect" className="relative z-10 bg-background text-foreground border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.6em] text-text-muted">Connect to me</p>
            <h2 className="heading-2 text-text-primary">Direct lines & quick actions</h2>
            <p className="text-text-muted">
              Place this section right above the future footer so anyone can contact without scrolling back up.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactChannels.map((channel) => (
              <ContactChannelCard key={channel.label} {...channel} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type SkillCardProps = {
  icon: LucideIcon;
  title: string;
  level: string;
  description: string;
};

function SkillCard({ icon: Icon, title, level, description }: SkillCardProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-transparent to-transparent p-6 shadow-glass-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-text-muted">{level}</p>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-muted">{description}</p>
    </div>
  );
}

type ExperienceEntryProps = {
  title: string;
  company: string;
  duration: string;
  summary: string;
  achievements: string[];
  skillTags: string[];
  isLast?: boolean;
};

function ExperienceEntry({
  title,
  company,
  duration,
  summary,
  achievements,
  skillTags,
  isLast,
}: ExperienceEntryProps) {
  return (
    <div className="pl-10 pb-12 relative">
      <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(100,255,218,0.6)]" />
      {!isLast && <span className="absolute left-[ -1px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan/40 to-transparent" />}
      <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-glass-soft">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
            <p className="text-sm text-text-muted">{company}</p>
          </div>
          <p className="text-sm text-text-muted">{duration}</p>
        </div>
        <p className="mt-4 text-sm text-text-muted">{summary}</p>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          {achievements.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.3em] rounded-full border border-white/10 px-3 py-1 text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

type ContactChannelProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  download?: boolean;
};

function ContactChannelCard({ icon: Icon, label, value, href, download }: ContactChannelProps) {
  const content = (
    <div className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/5 px-5 py-4 shadow-glass-soft">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted">{label}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        download={download}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

type DashboardCardProps = {
  featured?: boolean;
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  insights: string[];
  gradient: string;
};

function DashboardCard({
  featured,
  title,
  subtitle,
  description,
  embedUrl,
  tech,
  metrics,
  insights,
  gradient,
}: DashboardCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-gray-900/70 to-gray-900/40 backdrop-blur-xl`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative z-10 p-8 sm:p-10 space-y-10">
        <div>
          {featured && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-4">
              <Star className="h-4 w-4" />
              Featured Project
            </span>
          )}
          <h3 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-lg text-cyan-300/80 font-medium mb-6">{subtitle}</p>
          <p className="text-text-muted leading-relaxed max-w-3xl">{description}</p>
        </div>

        <div
          role="region"
          aria-label={`${title} - Interactive Power BI Dashboard`}
          className="rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-cyan-400/40 transition-colors"
        >
          <div className="relative w-full bg-black">
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              <iframe
                title={title}
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                style={{ 
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  backgroundColor: "#000",
                  display: 'block'
                }}
                allowFullScreen
                aria-label={description}
                referrerPolicy="no-referrer-when-downgrade"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          {metrics.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-cyan-300">{value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 text-text-primary">
            <Lightbulb className="h-5 w-5 text-amber-300" />
            Key insights &amp; features
          </h4>
          <ul className="grid md:grid-cols-2 gap-3">
            {insights.map((insight) => (
              <li key={insight} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="text-cyan-400 mt-1">▹</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-200 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

type TechHighlightProps = {
  icon: string;
  title: string;
  description: string;
};

function TechHighlight({ icon, title, description }: TechHighlightProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">{title}</h4>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
