"use client";

import { useState } from "react";
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

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace("contact-", "")]: value }));
    // Clear error when user starts typing
    if (formErrors[id.replace("contact-", "") as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [id.replace("contact-", "")]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    // Using mailto for form submission (works without backend)
    // To upgrade: Replace with Formspree, Resend, or Vercel Functions
    try {
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:konarkofficial@gmail.com?subject=${subject}&body=${body}`;

      // Show success message
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      // Reset form after 3 seconds
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

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
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6">
          {/* Main heading */}
          <div className="text-center max-w-6xl mx-auto space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] text-white">
              Data Analyst & Business Intelligence Specialist
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-white/80 font-sans">
              I find the signal in the noise. Transforming complex data into actionable business intelligence.
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-lg mx-auto">
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
                <button className="px-6 sm:px-8 py-3 text-white font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans">
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
                <span className="px-6 sm:px-8 py-3 text-white/80 font-medium w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans">
                  MY PORTFOLIO
                </span>
              </GlassSurface>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Centered Layout */}
      <section
        id="about"
        className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Gradient transition from hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/0 via-[#0A192F]/50 to-[#0A192F]" />
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[180px]" />
          <div className="absolute bottom-[-80px] right-1/4 h-[320px] w-[320px] rounded-full bg-sky-500/8 blur-[160px]" />
        </div>

        <div className="max-w-4xl mx-auto w-full text-center space-y-12 relative z-10">
          {/* Section Label */}
          <p className="about-fade-in text-xs tracking-[0.4em] uppercase text-text-muted font-sans">
            Get to Know Me
          </p>

          {/* Name */}
          <h1 className="about-fade-in about-delay-100 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            KONARK PARIHAR
          </h1>

          {/* Role */}
          <p className="about-fade-in about-delay-150 text-lg sm:text-xl md:text-2xl text-accent-cyan font-normal font-sans">
            Data Analyst &amp; Business Intelligence Specialist
          </p>

          {/* Bio with Keyword Highlighting */}
          <p className="about-fade-in about-delay-200 text-text-muted leading-relaxed text-base sm:text-lg max-w-2xl mx-auto px-4 font-sans">
            Data analyst with commerce background specializing in{" "}
            <span className="text-accent-cyan font-medium">Power BI</span>,{" "}
            <span className="text-accent-cyan font-medium">SQL</span>, and{" "}
            <span className="text-accent-cyan font-medium">AI-powered workflows</span>.
            Transforming complex datasets into{" "}
            <span className="text-white font-medium">clear, decision-ready insights</span>.
          </p>

          {/* Key Term Highlights - Horizontal Row */}
          <div className="about-fade-in about-delay-250 flex flex-col md:flex-row justify-center gap-8 md:gap-12 lg:gap-16 pt-4">
            {[
              { big: "Dynamic", small: "Stakeholder Views" },
              { big: "Automated", small: "Intelligence" },
              { big: "Targeted", small: "Decision Support" },
            ].map(({ big, small }) => (
              <div key={big} className="text-center group cursor-default">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-cyan group-hover:text-white transition-colors duration-300 font-serif">
                  {big}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-text-muted mt-2 font-sans">
                  {small}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Card */}
          <div className="about-fade-in about-delay-300 rounded-[32px] border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] px-6 sm:px-10 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-500 hover:border-white/15 max-w-2xl mx-auto">
            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
                  className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-text-primary border border-white/10 rounded-full 
                             hover:text-accent-cyan hover:border-accent-cyan/40 hover:shadow-[0_0_15px_rgba(100,255,218,0.15)]
                             transition-all duration-300 cursor-default font-sans"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Technical Expertise Section */}
      <section id="skills" className="relative z-10 bg-slate-950/60 text-foreground border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.6em] text-text-muted font-sans">Technical expertise</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Toolbox for insight generation
            </h2>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              A comprehensive overview of my technical expertise and proficiency levels across key data analytics tools and methodologies.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillsShowcase.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>

          <div className="rounded-3xl border border-accent-cyan/40 bg-accent-cyan/10 p-8 shadow-glass-soft">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-4 flex items-center gap-3 tracking-tight leading-tight">
              <Sparkles className="h-5 w-5 text-accent-cyan" />
              AI Workflow Advantage
            </h3>
            <p className="text-base text-text-muted leading-relaxed font-sans">
              Leveraging AI-powered workflows to accelerate data analysis by 3x, enabling faster insights delivery and enhanced decision-making capabilities through intelligent automation and prompt-driven tooling.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 bg-background text-foreground border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="space-y-4 mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted font-sans">Experience</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Hands-on history
            </h2>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              A chronological overview of my professional journey, highlighting key achievements, responsibilities, and technical expertise gained at each position.
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
      <section id="projects" className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-white/5">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee1a,transparent_45%)] ${shouldReduceMotion ? 'blur-xl' : 'blur-3xl'} pointer-events-none`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight leading-tight">
              Interactive Analytics
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed font-sans">
              A cinematic showcase of embedded Power BI dashboards. <span className="text-accent-cyan">Fully interactive</span>,
              real-time data visualizations built with advanced DAX, optimized queries, and storytelling design principles.
            </p>
          </div>

          <div className="space-y-20">
            {dashboards.map((dashboard) => (
              <DashboardCard key={dashboard.title} {...dashboard} />
            ))}
          </div>

          <div className="mt-10 p-8 sm:p-10 rounded-3xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/5 to-transparent shadow-glass-soft">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3 text-text-primary tracking-tight leading-tight">
              <span className="text-accent-cyan text-3xl">⚡</span>
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
      <section id="certificates" className="relative z-10 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <BlurText
              className="text-xs tracking-[0.4em] uppercase text-text-muted mb-4 font-sans"
              delay={0}
            >
              Credentials & Achievements
            </BlurText>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
              Professional Certificates
            </h2>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              Validated expertise in data analytics, business intelligence, and advanced Power BI techniques through industry-recognized certifications.
            </p>
          </motion.div>
        </div>

      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 bg-slate-950 text-foreground border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted font-sans">Contact</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Let&rsquo;s work together
            </h2>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              I'm always open to discussing new opportunities, collaborations, or data analytics projects. Feel free to reach out using the form below or through any of my direct contact channels.
            </p>
            <p className="text-sm text-text-muted leading-relaxed font-sans">
              I typically respond within 24-48 hours. For urgent matters, please use the direct contact channels in the Connect section below.
            </p>
          </div>
          <Card className="border-white/10 bg-white/5 shadow-glass-soft">
            <CardContent className="space-y-4 pt-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={`w-full rounded-2xl border ${formErrors.name ? "border-red-500/50" : "border-white/10"
                      } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 font-sans`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full rounded-2xl border ${formErrors.email ? "border-red-500/50" : "border-white/10"
                      } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 font-sans`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={`w-full rounded-2xl border ${formErrors.message ? "border-red-500/50" : "border-white/10"
                      } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 resize-none font-sans`}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.message}</p>
                  )}
                </div>
                {formStatus === "success" && (
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300 font-sans">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300 font-sans">
                    Something went wrong. Please try again or use the direct contact channels.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full rounded-2xl bg-accent-cyan/90 px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-bright/60 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="relative z-10 bg-background text-foreground border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.6em] text-text-muted font-sans">Connect to me</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Direct lines & quick actions
            </h2>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans">
              Quick access to direct contact channels. Choose your preferred method to get in touch—I'm always open to connecting with potential collaborators, employers, or fellow data professionals.
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
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-text-muted font-sans">{level}</p>
          <h3 className="text-lg font-semibold text-text-primary font-serif">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-text-muted leading-relaxed font-sans">{description}</p>
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
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary font-serif">{title}</h3>
            <p className="text-sm text-text-muted font-sans mt-1">{company}</p>
          </div>
          <p className="text-sm text-text-muted font-sans">{duration}</p>
        </div>
        <p className="text-sm text-text-muted leading-relaxed font-sans mb-4">{summary}</p>
        <ul className="space-y-2 text-sm text-text-muted leading-relaxed font-sans mb-4">
          {achievements.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-accent-cyan mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.3em] rounded-full border border-white/10 px-3 py-1 text-text-muted font-sans">
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
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans">{label}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary font-sans">{value}</p>
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
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 group-hover:text-accent-cyan transition-colors tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-accent-cyan/90 font-normal mb-6 font-sans">{subtitle}</p>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl font-sans">{description}</p>
        </div>

        <div
          role="region"
          aria-label={`${title} - Interactive Power BI Dashboard`}
          className="rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-accent-cyan/40 transition-colors"
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
              <p className="text-xl sm:text-2xl font-bold text-accent-cyan font-serif">{value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mt-1.5 font-sans">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-text-primary font-serif">
            <Lightbulb className="h-5 w-5 text-amber-300" />
            Key insights &amp; features
          </h4>
          <ul className="grid md:grid-cols-2 gap-3">
            {insights.map((insight) => (
              <li key={insight} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed font-sans">
                <span className="text-accent-cyan mt-1">▹</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-xs sm:text-sm font-medium font-sans"
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
      <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-2 font-serif">{title}</h4>
      <p className="text-sm text-text-muted leading-relaxed font-sans">{description}</p>
    </div>
  );
}
