"use client";

import { useState, useRef, useEffect, useDeferredValue, useTransition, useCallback } from "react";
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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
import { CertificateCarousel } from "@/components/ui/certificate-carousel";
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
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Use deferred value for form data to reduce input lag
  const deferredFormData = useDeferredValue(formData);
  
  // Debounce timer ref for error clearing
  const errorClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized input handler with debouncing for error clearing
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("contact-", "") as keyof typeof formErrors;
    
    // Update form data immediately for responsive UI
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    
    // Debounce error clearing to reduce state updates
    if (errorClearTimeoutRef.current) {
      clearTimeout(errorClearTimeoutRef.current);
    }
    
    if (formErrors[fieldName]) {
      errorClearTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          setFormErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        });
      }, 150);
    }
  }, [formErrors]);

  const validateForm = useCallback(() => {
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
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    startTransition(() => {
      setFormStatus("submitting");
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Log the error for debugging
        console.error("Contact form error:", data);
        throw new Error(data.error || "Failed to send message");
      }

      startTransition(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      });
      setTimeout(() => {
        startTransition(() => setFormStatus("idle"));
      }, 3000);
    } catch (error: any) {
      // Log error for debugging
      console.error("Contact form submission error:", error);
      startTransition(() => {
        setFormStatus("error");
      });
      setTimeout(() => {
        startTransition(() => setFormStatus("idle"));
      }, 3000);
    }
  }, [validateForm]);

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
      title: "Certified Data Analyst Trainee",
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
      title: "Claims Analyst",
      company: "Xceedance Consulting India Pvt. Ltd.",
      duration: "Jul 2023 – Jan 2024",
      summary:
        "Delivered high-velocity data processing and database maintenance for US-based healthcare clients, consistently outperforming production targets through rapid process adaptation.",
      achievements: [
        "Maintained 99% data integrity for the Medical Provider Network (MPN) database with zero compliance errors.",
        "Surpassed daily production KPIs by 15% within the first month of operations.",
      ],
      skillTags: ["Data Integrity", "SLA Management", "Healthcare Ops"],
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
      href: "/Konark Resume.pdf",
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
        { label: "Visualizations", value: "Adaptive Display" },
        { label: "Cities", value: "10+ Indian" },
        { label: "Metrics", value: "15+ Environmental" },
        { label: "Intelligence", value: "Actionable Insights" },
      ],
      insights: [
        "Adaptive visualizations that dynamically change color and formatting based on environmental data severity (e.g., AQI levels, visibility warnings)",
        "Actionable safety insights: Context-aware alerts convert raw metrics into practical guidance (e.g., 'Visibility reduced—drive slowly, use fog lights')",
        "Multi-city comparative analysis across 10+ Indian cities with synchronized environmental metrics for strategic planning",
        "Comprehensive environmental intelligence: 15+ metrics including air quality (PM10, PM2.5, O3), visibility, humidity, wind speed, and UV index",
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
        { label: "Architecture", value: "Dual-Layer Intelligence" },
        { label: "Focus", value: "Profit-Driven Decision Making" },
        { label: "Analysis", value: "Product Level Performance" },
        { label: "Logic", value: "Multi-Variate Correlation" },
      ],
      insights: [
        "Dual-layer intelligence architecture: Executive overview for strategic decisions and granular product-level analysis for operational managers",
        "Profit-driven decision making: Prioritizes profitability metrics (Total Profit by Category, Profit Margin %) over revenue to guide bottom-line optimization",
        "Product-level performance analysis: Drill-down from categories to individual products to identify winning products and underperformers",
        "Multi-variate correlation analysis: Advanced scatter plots and combo charts correlate Profit, Sales, and Quantity to uncover hidden patterns",
      ],
      gradient: "from-blue-500/20 via-indigo-500/10 to-indigo-400/0",
    },
    {
      title: "Distribution & Trend Analysis",
      subtitle: "Profit Health Monitoring & Operational Control Platform",
      description:
        "Multi-dimensional business analysis dashboard examining quarterly performance, category distribution, expense ratios, and state-wise profit patterns. Features time-series profit trends, income categorization, and geographic bubble visualizations for India-specific insights.",
      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
      tech: ["Power BI", "Time Series", "Statistical Analysis", "Map Visuals", "DAX Measures"],
      metrics: [
        { label: "Tracking", value: "Profit & Loss Monthly" },
        { label: "Analytics", value: "Cost Efficiency Ratio" },
        { label: "Dynamics", value: "Volume vs. Value Category" },
        { label: "Analysis", value: "Quarterly Drill-Down" },
      ],
      insights: [
        "Profit & Loss monthly tracking: Color-coded bar chart (Green/Red) instantly identifies loss months (May, July, Sept) for proactive health monitoring",
        "Cost efficiency ratio analytics: Expense ratio of 0.99 indicates tight margins, enabling operational control to prevent expenses from overtaking revenue",
        "Volume vs. Value category dynamics: Reveals high-effort vs. high-value product lines (e.g., Clothing: 62% volume but only 37% income share)",
        "Trend spotting seasonal patterns: Timeline analysis identifies seasonal dips and peaks to optimize inventory and marketing strategies",
        "State-level profitability mapping: Geographic bubble visualization pinpoints high-performing regions for strategic expansion",
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
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
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
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  const headerHeight = 115;
                  const elementPosition = element.offsetTop - headerHeight;
                  // Use requestAnimationFrame for smoother scroll
                  requestAnimationFrame(() => {
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
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
                <button className="px-6 sm:px-8 py-3 text-text-primary font-semibold w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans">
                  Get Started
                </button>
              </GlassSurface>
            </div>
            <div
              className="w-[85%] sm:w-auto cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg pointer-events-auto group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  const headerHeight = 115;
                  const elementPosition = element.offsetTop - headerHeight;
                  // Use requestAnimationFrame for smoother scroll
                  requestAnimationFrame(() => {
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
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
                <span className="px-6 sm:px-8 py-3 text-text-primary font-medium w-full h-full text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 font-sans">
                  MY PORTFOLIO
                </span>
              </GlassSurface>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Dynamic Scroll Animations */}
      <AboutSection shouldReduceMotion={shouldReduceMotion} />

      {/* Skills / Technical Expertise Section */}
      <section id="skills" className="relative z-10 bg-slate-950 text-foreground border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 space-y-16">
          <motion.div
            className="text-center space-y-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.6em] text-text-muted font-sans"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Technical expertise
            </motion.p>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Toolbox for insight generation
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-text-muted leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A comprehensive overview of my technical expertise and proficiency levels across key data analytics tools and methodologies.
            </motion.p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillsShowcase.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>

          <motion.div
            className="rounded-3xl border border-accent-cyan/40 bg-accent-cyan/10 p-8 shadow-glass-soft"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(6, 182, 212, 0.6)",
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

      {/* Experience Section */}
      <section id="experience" className="relative z-10 bg-background text-foreground border-t border-border">
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
          {/* Stacked cards container - needs extra bottom padding for sticky effect */}
          <div className="relative" style={{ paddingBottom: `${(experienceTimeline.length - 1) * 132}px` }}>
            {experienceTimeline.map((item, index) => (
              <ExperienceEntry
                key={item.title}
                {...item}
                index={index}
                isLast={index === experienceTimeline.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Premium minimalist redesign */}
      <section id="projects" className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-border">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee1a,transparent_45%)] ${shouldReduceMotion ? 'blur-xl' : 'blur-3xl'} pointer-events-none`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          <div className="text-center space-y-8 max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight leading-[1.1] mb-4">
              Interactive Analytics
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-muted leading-relaxed font-sans max-w-5xl mx-auto">
              A cinematic showcase of embedded Power BI dashboards. <span className="text-accent-cyan font-medium whitespace-nowrap">Fully interactive</span>, real-time data visualizations built with advanced DAX, optimized queries, and storytelling design principles.
            </p>
          </div>

          <div className="space-y-20">
            {dashboards.map((dashboard) => (
              <DashboardCard key={dashboard.title} {...dashboard} />
            ))}
          </div>

          <div className="mt-12 sm:mt-16 p-8 sm:p-10 lg:p-12 rounded-3xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/5 to-transparent shadow-glass-soft">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 flex items-center gap-3 text-text-primary tracking-tight leading-tight">
              <span className="text-accent-cyan text-3xl sm:text-4xl">⚡</span>
              Technical implementation highlights
            </h3>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
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

        {/* Certificate Carousel */}
        <CertificateCarousel
          certificates={[
            {
              title: "Data Analyst Professional",
              description: "Professional certification validating core data analysis skills and methodologies.",
              filePath: "/Certificates/Data Analyst-Certificate Data Analyst.pdf",
              imagePath: "/Certificates/Data Analyst-Certificate Data Analyst-1.png",
              issuer: "OneRoadMap",
              date: "2024",
              skills: ["Data Analysis", "SQL", "Python", "Visualization"],
            },
            {
              title: "Professional Training Certificate",
              description: "Comprehensive training program in data analytics and business intelligence tools.",
              filePath: "/Certificates/Konark Parihar ducat certificate.pdf",
              imagePath: "/Certificates/Konark Parihar ducat certificate.png",
              issuer: "DUCAT",
              date: "2024",
              skills: ["Data Analytics", "BI Tools", "Business Intelligence"],
            },
            {
              title: "Excel Specialist",
              description: "Advanced proficiency in Microsoft Excel for complex data management and analysis.",
              filePath: "/Certificates/Excel certificate.pdf",
              imagePath: "/Certificates/Excel certificate-1.png",
              issuer: "OneRoadMap",
              date: "2024",
              skills: ["Advanced Excel", "Data Management", "Pivot Tables"],
            },
            {
              title: "Create Visual Calculation",
              description: "Advanced Power BI visual calculations and DAX formulations for dynamic reporting.",
              filePath: "/Certificates/Create Visual Calculation.pdf",
              imagePath: "/Certificates/Create Visual Calculation.png",
              issuer: "Microsoft",
              date: "2024",
              skills: ["Power BI", "DAX", "Visual Calculations"],
            },
            {
              title: "Python for Data Science",
              description: "Certification in Python programming for data analysis, manipulation, and visualization.",
              filePath: "/Certificates/Python.pdf",
              imagePath: "/Certificates/Python.png",
              issuer: "OneRoadMap",
              date: "2024",
              skills: ["Python", "Pandas", "NumPy", "Data Visualization"],
            },
            {
              title: "DAX Time Intelligence",
              description: "Mastering time-based calculations and analysis using DAX functions in Power BI.",
              filePath: "/Certificates/Dax time Intelligence.pdf",
              imagePath: "/Certificates/Dax time Intelligence.png",
              issuer: "Microsoft",
              date: "2024",
              skills: ["Power BI", "DAX", "Time Intelligence"],
            },
            {
              title: "SQL Advanced",
              description: "Advanced SQL query writing, database management, and performance optimization.",
              filePath: "/Certificates/sql certificate.pdf",
              imagePath: "/Certificates/sql certificate-1.png",
              issuer: "OneRoadMap",
              date: "2024",
              skills: ["SQL", "Database Management", "Query Optimization"],
            },
            {
              title: "End to End Analytics",
              description: "Complete data analytics workflow from data extraction to visualization and insights.",
              filePath: "/Certificates/end to end analytics.pdf",
              imagePath: "/Certificates/end to end analytics.png",
              issuer: "Microsoft",
              date: "2024",
              skills: ["Data Workflow", "ETL", "Visualization", "Insights"],
            },
          ]}
        />

      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 bg-slate-950 text-foreground border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted font-sans">Contact</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-tight">
              Let&rsquo;s work together
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed font-sans">
              I&apos;m always open to discussing new opportunities, collaborations, or data analytics projects. Feel free to reach out using the form below or through any of my direct contact channels.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
              I typically respond within 24-48 hours. For urgent matters, please use the direct contact channels in the Connect section below.
            </p>
          </div>
          <Card className="border-border bg-card/80 shadow-glass-soft">
            <CardContent className="space-y-4 pt-6">
              {/* Suppress hydration warnings inside the form because some browser extensions (password managers, Grammarly, etc.) inject inline styles/attributes before React hydrates, which can trigger noisy hydration mismatches in dev. */}
              {/* Render form only on client to avoid hydration mismatches from extensions */}
              {isMounted ? (
                <form className="space-y-5" onSubmit={handleSubmit} suppressHydrationWarning>
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
                      suppressHydrationWarning
                      className={`w-full rounded-2xl border ${formErrors.name ? "border-red-500/50" : "border-border"
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
                      suppressHydrationWarning
                      className={`w-full rounded-2xl border ${formErrors.email ? "border-red-500/50" : "border-border"
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
                      suppressHydrationWarning
                      className={`w-full rounded-2xl border ${formErrors.message ? "border-red-500/50" : "border-border"
                        } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 resize-none font-sans`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.message}</p>
                    )}
                  </div>
                  {formStatus === "success" && (
                    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300 font-sans">
                      Message sent successfully! I&apos;ll get back to you soon.
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
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="relative z-10 bg-background text-foreground border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.6em] text-text-muted font-sans">Connect to me</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-tight">
              Direct lines & quick actions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed font-sans">
              Quick access to direct contact channels. Choose your preferred method to get in touch—I&apos;m always open to connecting with potential collaborators, employers, or fellow data professionals.
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
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
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
}: ExperienceEntryProps) {
  // Format index as 01, 02, 03
  const formattedIndex = String(index + 1).padStart(2, '0');

  // Calculate z-index - higher cards (later in list) should be on top
  const zIndex = index + 1;

  // All cards stick at the SAME position - this creates the "cover" effect
  // where each new card scrolls up and completely overlaps the previous one
  const topOffset = 100; // Same for all cards

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="sticky mb-8"
      style={{
        top: `${topOffset}px`,
        zIndex: zIndex,
      }}
    >
      {/* Card container with solid background to cover previous card */}
      <div
        className="rounded-3xl border border-border bg-background p-6 sm:p-8 transition-all duration-500 hover:border-accent-cyan/30"
        style={{
          boxShadow: `0 -20px 50px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        {/* Numbered prefix - validgraphs.com style */}
        <div className="mb-4">
          <span className="text-sm text-accent-cyan/70 font-mono tracking-wide">« {formattedIndex}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary font-serif mb-2 group-hover:text-accent-cyan transition-colors duration-300">
          {title}
        </h3>

        {/* Company and Duration */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <p className="text-sm sm:text-base text-text-muted font-sans">{company}</p>
          <span className="text-text-muted/40">|</span>
          <p className="text-sm text-text-muted/70 font-sans">{duration}</p>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans mb-6">{summary}</p>

        {/* Achievements */}
        <ul className="space-y-3 text-sm text-text-muted leading-relaxed font-sans mb-6">
          {achievements.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-accent-cyan mt-0.5 flex-shrink-0">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-[0.2em] rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1.5 text-accent-cyan/80 font-sans hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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
  const cardRef = useRef(null);
  const shouldLoad = useInView(cardRef, { once: true, margin: "200px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-gray-900/70 to-gray-900/40 backdrop-blur-xl`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative z-10 p-8 sm:p-10 lg:p-12 space-y-8 sm:space-y-10">
        <div className="space-y-4 sm:space-y-5">
          {featured && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-2 font-sans tracking-wide">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Featured Project
            </span>
          )}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-3 sm:mb-4 group-hover:text-accent-cyan transition-colors tracking-tight leading-[1.15]">
            {title}
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl text-accent-cyan/90 font-medium mb-4 sm:mb-5 font-sans leading-relaxed">{subtitle}</p>
          <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans">{description}</p>
        </div>

        <div
          role="region"
          aria-label={`${title} - Interactive Power BI Dashboard`}
          className="rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-accent-cyan/40 transition-colors"
        >
          <div className="relative w-full bg-black">
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              {shouldLoad ? (
                <iframe
                  title={title}
                  src={embedUrl}
                  loading="lazy"
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
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-text-muted text-sm font-sans">Loading dashboard...</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
          {metrics.map(({ label, value }) => (
            <div key={label} className="text-center space-y-2">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-cyan font-serif leading-tight">{value}</p>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-text-muted font-sans leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-5 sm:space-y-6">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-3 text-text-primary font-serif tracking-tight">
            <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-300 flex-shrink-0" />
            Key insights &amp; features
          </h4>
          <ul className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {insights.map((insight) => (
              <li key={insight} className="flex items-start gap-3 text-sm sm:text-base text-text-muted leading-relaxed font-sans">
                <span className="text-accent-cyan mt-1.5 flex-shrink-0 text-lg">▹</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-sm sm:text-base font-medium font-sans tracking-wide"
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-md">
      <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 font-serif tracking-tight">{title}</h4>
      <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">{description}</p>
    </div>
  );
}

// About Section with Dynamic Scroll Animations
type AboutSectionProps = {
  shouldReduceMotion: boolean | null;
};

function AboutSection({ shouldReduceMotion }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the section - optimized for better INP
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring-based transforms - reduced precision for better performance
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.01 // Increased from 0.001 to reduce calculations
  });

  // Scale animation for the name (scales up as you scroll)
  const nameScale = useTransform(smoothProgress, [0, 0.3], [0.92, 1]);
  const nameOpacity = useTransform(smoothProgress, [0, 0.25], [0.4, 1]);
  const nameY = useTransform(smoothProgress, [0, 0.3], [30, 0]);

  // Parallax for description
  const descY = useTransform(smoothProgress, [0, 0.5], [60, 0]);
  const descOpacity = useTransform(smoothProgress, [0.1, 0.35], [0, 1]);

  // Cards stagger effect
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  const capabilities = [
    {
      num: "01",
      title: "Dynamic",
      subtitle: "Stakeholder Views",
      desc: "Multi-user dashboards tailored for different decision-makers"
    },
    {
      num: "02",
      title: "Automated",
      subtitle: "Intelligence",
      desc: "AI-driven workflows that accelerate insight delivery"
    },
    {
      num: "03",
      title: "Targeted",
      subtitle: "Decision Support",
      desc: "Focused analytics that drive actionable outcomes"
    },
  ];

  const skills = ["Power BI", "SQL", "DAX", "Python", "Excel", "VBA", "AI Workflow", "Healthcare Analytics"];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="sticky top-0 z-0 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Gradient transition from hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/0 via-[#0A192F]/60 to-[#0A192F]" />

      {/* Subtle ambient glow - monochromatic */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-cyan-500/10 blur-[250px]"
          style={{ opacity: smoothProgress }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header with Dynamic Scaling */}
        <div className="text-center mb-20">
          <motion.p
            className="text-xs tracking-[0.5em] uppercase text-text-muted font-sans mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.p>

          {/* Dynamic Scaling Name */}
          <motion.h1
            ref={nameRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 origin-center whitespace-nowrap"
            style={shouldReduceMotion ? {} : {
              scale: nameScale,
              opacity: nameOpacity,
              y: nameY
            }}
          >
            KONARK PARIHAR
          </motion.h1>

          {/* Parallax Description */}
          <motion.p
            className="text-lg sm:text-xl text-text-muted font-sans max-w-2xl mx-auto leading-relaxed"
            style={shouldReduceMotion ? {} : { y: descY, opacity: descOpacity }}
          >
            Data Analyst specializing in{" "}
            <span className="text-accent-cyan">Power BI</span>,{" "}
            <span className="text-accent-cyan">SQL</span>, and{" "}
            <span className="text-accent-cyan">AI-powered workflows</span> —
            transforming complex data into strategic business decisions.
          </motion.p>
        </div>

        {/* Key Capabilities - Staggered Slide In */}
        <div ref={cardsRef} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {capabilities.map(({ num, title, subtitle, desc }, index) => (
              <motion.div
                key={num}
                className="bg-[#0A192F] p-8 sm:p-10 group hover:bg-white/[0.02] transition-colors duration-500"
                initial={{ opacity: 0, x: index === 0 ? -60 : index === 2 ? 60 : 0, y: index === 1 ? 40 : 0 }}
                animate={cardsInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <span className="text-xs text-text-muted/50 font-mono tracking-wider">{num}</span>
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-white font-serif mt-4 mb-1 group-hover:text-accent-cyan transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {title}
                </motion.h3>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan/70 font-sans mb-4">
                  {subtitle}
                </p>
                <p className="text-sm text-text-muted leading-relaxed font-sans">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills - Cascading Fade In */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white/10" />
            <p className="text-xs tracking-[0.4em] uppercase text-text-muted font-sans">Technical Stack</p>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white/10" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 text-sm text-text-muted border border-white/10 rounded-full 
                           hover:text-white hover:border-white/30
                           transition-all duration-300 cursor-default font-sans"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 20px rgba(100,255,218,0.2)",
                  borderColor: "rgba(100,255,218,0.5)"
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
