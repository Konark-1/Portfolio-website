"use client";

import { useState, useRef, useEffect, useDeferredValue, useTransition, useCallback } from "react";
import GlassButton from "@/components/ui/GlassButton";
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  Code2,
  Database,
  Download,
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

import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Dynamically import Silk background to reduce initial bundle size and avoid SSR issues
// Only load when in view to improve initial page load
const Silk = dynamic(
  () => import("@/components/Silk"),
  {
    ssr: false,
    loading: () => null, // No loading state needed for background
  }
);

// Dynamically import StackedCardCertificates (below the fold - lazy load)
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

// AboutSection can be SSR'd as it's above the fold
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: true,
});

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

  // Experience section scroll progress tracking
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(experienceProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sparkY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const sparkOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

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
      title: "Bachelor of Commerce (Hons)",
      company: "Amity University, Noida",
      duration: "May 2019 – Nov 2022",
      summary:
        "Developed a strong foundation in business logic, accounting, and finance, which now informs my analytical approach to commerce-driven data insights.",
      achievements: [
        "Major in Accounting and Finance with a CGPA of 7.55/10.0.",
        "Built core competencies in financial modeling and business process understanding.",
      ],
      skillTags: ["Accounting", "Finance", "Business Logic"],
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
    {
      title: "Claims Analyst",
      company: "Xceedance Consulting India Pvt. Ltd.",
      duration: "Jul 2023 – Feb 2024",
      summary:
        "Delivered high-velocity data processing and database maintenance for US-based healthcare clients, consistently outperforming production targets through rapid process adaptation.",
      achievements: [
        "Maintained 99.9% data integrity for the Medical Provider Network (MPN) database with zero compliance errors.",
        "Surpassed daily production KPIs by 15% within the first month of operations.",
      ],
      skillTags: ["Data Integrity", "SLA Management", "Healthcare Ops"],
    },
    {
      title: "Certified Data Analyst",
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
      title: "AI-Analyst",
      company: "Innodata Inc., Noida (Remote)",
      duration: "Jan 2026 – Present",
      summary:
        "Spearheaded Multi-Modal Prompt Engineering across diverse AI models (text, image, audio, and video). Engineered and refined complex prompts, and conducted comparative evaluations to improve model performance.",
      achievements: [
        "Achieved an average quality score of 3.29/4.00, surpassing the target benchmark of 2.00 by over 64%, as independently verified by senior QA reviewers.",
        "Conducted rigorous comparative evaluations and A/B testing of AI-generated content to resolve factual and structural inconsistencies."
      ],
      skillTags: ["Prompt Engineering", "Quality Assurance", "AI Training", "Process Standardization"],
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
      value: "Download PDF",
      href: "/KONARK_PARIHAR_RESUME.pdf",
      download: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Visit Profile",
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
      previewImage: "/images/dashboard-previews/Adaptive Weather Visuals.webp",
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
      previewImage: "/images/dashboard-previews/Macro & Micro Level Analysis.webp",
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
      previewImage: "/images/dashboard-previews/Distribution & Trend Analysis.webp",
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
    <main className="relative min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Connection warming handled via preconnect/dns-prefetch in layout */}

      {/* Sticky Full-Page Slides Container - Hero slides under About */}
      {/* Client-only rendering to prevent hydration mismatches from browser extensions */}
      {isMounted ? (
        <div className="relative" suppressHydrationWarning>
          {/* Hero section - Standard Flow */}
          <div
            className="relative min-h-screen z-0"
            suppressHydrationWarning
            style={{
              backgroundColor: 'var(--background-hero)',
            }}
          >
            {/* Silk Background */}
            {!shouldReduceMotion && (
              <div className="absolute inset-0 z-0">
                <Silk
                  speed={7.5}
                  scale={1}
                  color="#27CBCE"
                  noiseIntensity={5.9}
                  rotation={0}
                />
              </div>
            )}

            {/* Enhanced gradient overlay with turquoise tint */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(10,14,26,0.4)] pointer-events-none" />

            {/* Subtle turquoise ambient glow */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(39,203,206,0.08),transparent_70%)] pointer-events-none" />

            {/* Content container with proper spacing from header */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6" suppressHydrationWarning>
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
                    a.href = '/KONARK_PARIHAR_RESUME.pdf';
                    a.download = 'KONARK_PARIHAR_RESUME.pdf';
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

          {/* About Section - Standard Flow */}
          <AboutSection shouldReduceMotion={shouldReduceMotion} />
        </div>
      ) : (
        /* SSR Placeholder - matches client structure to minimize layout shift */
        <div className="relative">
          <div
            className="sticky top-0 min-h-screen z-0"
            style={{ backgroundColor: 'var(--background-hero)' }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6">
              <div className="text-center max-w-6xl mx-auto space-y-4 sm:space-y-6">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.1] text-white px-2">
                  Data Analyst & Business Intelligence Specialist
                </h1>
                <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/80 font-sans px-2">
                  I find the signal in the noise. Transforming complex data into actionable business intelligence.
                </p>
              </div>
              <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-xl mx-auto px-4">
                {/* Placeholder buttons with same dimensions */}
                <div className="w-[220px] h-[55px] rounded-[50px] bg-white/10 backdrop-blur-sm border border-white/15" />
                <div className="w-[220px] h-[55px] rounded-[50px] bg-white/10 backdrop-blur-sm border border-white/15" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills / Technical Expertise Section */}
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
            viewport={{ once: true, margin: "-50px" }}
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

      {/* Experience Section - Standard Flow */}
      <section 
        id="experience" 
        ref={experienceRef}
        className="relative z-20 text-foreground border-t" 
        style={{
          backgroundColor: 'var(--background-experience)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Subtle turquoise gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(39,203,206,0.02)] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Column - Heading (Sticky on Desktop) */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-40 lg:h-fit space-y-4 sm:space-y-6">
                <motion.p 
                  className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Professional Journey
                </motion.p>
                <motion.h2
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Hands-on history
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans max-w-md"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  A chronological overview of my professional journey, highlighting key achievements, responsibilities, and technical expertise gained at each position.
                </motion.p>
                <div className="pt-8 hidden lg:block">
                  <div className="h-px w-24 bg-accent-cyan/30" />
                </div>
              </div>
            </div>
            
            {/* Right Column - Timeline */}
            <div className="lg:w-2/3">
              <div className="relative space-y-12 sm:space-y-16">
                {/* Timeline line - aligned with dots */}
                <div className="absolute left-[21px] sm:left-[31px] top-8 bottom-0 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-cyan/15 to-transparent hidden sm:block">
                  {/* Dynamic Progress Spark */}
                  <motion.div
                    style={{ 
                      top: sparkY,
                      opacity: sparkOpacity
                    }}
                    className="absolute left-1/2 -translate-x-1/2 z-30"
                  >
                    {/* Glowing Spark */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent-cyan blur-[6px] rounded-full scale-150 animate-pulse" />
                      <div className="h-2.5 w-2.5 rounded-full bg-accent-cyan border border-white shadow-[0_0_15px_#27CBCE]" />
                      
                      {/* Trailing light effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-cyan/20 blur-xl rounded-full" />
                    </div>
                  </motion.div>
                </div>
                {experienceTimeline.map((item, index) => (
                  <ExperienceEntry
                    key={item.title + item.company}
                    {...item}
                    index={index}
                    isLast={index === experienceTimeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-20 pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 overflow-hidden border-t" style={{
        backgroundColor: 'var(--background-projects)',
        borderColor: 'var(--border-color)'
      }}>
        {/* Enhanced turquoise radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(39,203,206,0.12),transparent_45%)] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(10,14,26,0.8)] to-[var(--background-projects)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="text-center space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4">
            <motion.p
              className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected Works
            </motion.p>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#27CBCE] via-[#20B2AA] to-[#00D9FF] bg-clip-text text-transparent tracking-tight leading-[1.1] mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Data Intelligence & Strategic Dashboards
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-muted leading-relaxed font-sans max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white font-medium">A curated portfolio of high-impact Power BI solutions.</span> Featuring fully interactive, real-time visualizations engineered with advanced DAX, high-performance query optimization, and strategic storytelling to drive data-led business intelligence.
            </motion.p>
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

      {/* Certificates Section - GSAP Stacked Cards */}
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

      {/* Contact Section - Unified Communication Hub */}
      <section id="contact" className="relative z-20 text-foreground border-t" style={{
        backgroundColor: 'var(--background-contact)',
        borderColor: 'var(--border-color)'
      }}>
        {/* Subtle turquoise ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(39,203,206,0.06),transparent_60%)] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column: Context & Direct Channels */}
            <div className="space-y-10 sm:space-y-12">
              <div className="space-y-6">
                <motion.p 
                  className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Get in touch
                </motion.p>
                <motion.h2
                  className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Let&rsquo;s work together
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans max-w-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I&apos;m always open to discussing new opportunities, collaborations, or data analytics projects. Reach out via the form or through my direct channels.
                </motion.p>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary font-serif flex items-center gap-2">
                  <span className="w-8 h-px bg-accent-cyan/30" />
                  Direct Channels
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {contactChannels.map((channel) => (
                    <ContactChannelCard key={channel.label} {...channel} />
                  ))}
                </div>
              </div>


            </div>

            {/* Right Column: Contact Form */}
            <div className="relative">
              <Card className="border-border bg-card/80 shadow-glass-soft backdrop-blur-sm sticky top-32">
                <CardContent className="space-y-4 pt-6 p-6 sm:p-8">
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
                          Something went wrong. Please try again or use direct channels.
                        </div>
                      )}
                      <MagneticButton
                        intensity={0.5}
                        className="w-full"
                      >
                        <button 
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full rounded-2xl bg-accent-cyan/90 px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-bright/60 disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center"
                        >
                          {formStatus === "submitting" ? "Sending..." : "Send Message"}
                        </button>
                      </MagneticButton>
                    </form>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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

function SkillCard({ icon: Icon, title, level, description }: SkillCardProps): React.JSX.Element {
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
  isLast,
}: ExperienceEntryProps): React.JSX.Element {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const dotRef = useRef<HTMLDivElement>(null);

  // Individual dot activation tracking
  const { scrollYProgress: dotProgress } = useScroll({
    target: dotRef,
    offset: ["start center", "end center"]
  });

  // Activate when spark passes (progress hits center)
  const dotActivation = useSpring(useTransform(dotProgress, [0, 0.1], [0, 1]), {
    stiffness: 100,
    damping: 30
  });
  
  const dotScale = useTransform(dotActivation, [0, 1], [0.4, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative sm:pl-16"
    >
      {/* Timeline dot Ref for activation detection */}
      <div ref={dotRef} className="absolute sm:left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
      
      {/* Timeline dot - centered with the box (center at 31px) */}
      <div className="hidden sm:flex absolute sm:left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10 transition-colors duration-500">
        <motion.div 
          style={{ 
            opacity: dotActivation,
            scale: dotScale,
          }}
          className="absolute inset-[-2px] rounded-full bg-accent-cyan shadow-[0_0_15px_#27CBCE] z-20"
        />
        {/* Inner core to keep it looking sharp */}
        <motion.div 
          style={{ opacity: dotActivation }}
          className="absolute inset-[2px] rounded-full bg-white z-30"
        />
      </div>

      {/* Card */}
      <div
        className="rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-8 transition-all duration-300 hover:border-accent-cyan/40 group"
        style={{
          backgroundColor: 'var(--surface-elevated)',
          boxShadow: '0 4px 24px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top row: Number + Duration */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] sm:text-xs text-accent-cyan/60 font-mono tracking-widest uppercase">Entry {formattedIndex}</span>
          <span className="text-[10px] sm:text-xs text-text-muted/60 font-sans font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">{duration}</span>
        </div>

        {/* Title & Company */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-serif mb-1 group-hover:text-accent-cyan transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-accent-cyan/80 font-sans font-medium">{company}</p>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans mb-6 italic opacity-90">{summary}</p>

        {/* Achievements */}
        <div className="space-y-4 mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted/50 font-sans font-bold">Key Accomplishments</p>
          <ul className="space-y-3">
            {achievements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-text-muted/90 leading-relaxed font-sans">
                <span className="text-accent-cyan mt-1.5 flex-shrink-0 text-xs">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1.5 text-accent-cyan/70 font-sans font-semibold hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-colors duration-200"
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

function ContactChannelCard({ icon: Icon, label, value, href, download }: ContactChannelProps): React.JSX.Element {
  const content = (
    <div className="flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 shadow-glass-soft transition-all duration-300 hover:scale-[1.02] group/card" style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--card)',
    }}>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans font-medium">{label}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary font-sans truncate group-hover/card:text-accent-cyan transition-colors">{value}</p>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan group-hover/card:bg-accent-cyan/20 transition-colors">
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
  previewImage: string;
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
  previewImage,
  tech,
  metrics,
  insights,
  gradient,
}: DashboardCardProps): React.JSX.Element {
  const cardRef = useRef(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile only after mount to avoid hydration mismatch
  // Server renders desktop view (iframe placeholder), client detects mobile after hydration
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // Lazy load iframes only when they're about to enter viewport
  // Increased margin to preload slightly before user sees it
  const shouldLoad = useInView(cardRef, { once: true, margin: "300px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-3xl border overflow-hidden backdrop-blur-xl`}
      style={{
        borderColor: 'var(--border-color)',
        background: 'linear-gradient(135deg, rgba(10, 14, 26, 0.7) 0%, rgba(15, 20, 25, 0.4) 100%)',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative z-10 p-8 sm:p-10 lg:p-12 space-y-8 sm:space-y-10">
        <div className="space-y-4 sm:space-y-5">
          {featured && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold mb-2 font-sans tracking-wide" style={{
              backgroundColor: 'rgba(39, 203, 206, 0.1)',
              borderColor: 'rgba(39, 203, 206, 0.3)',
              color: 'rgba(39, 203, 206, 0.9)'
            }}>
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

        <div className="hidden sm:flex items-center justify-end mb-4">
          <button
            onClick={() => {
              const container = dashboardRef.current;
              if (container) {
                const fullscreenSupported = document.fullscreenEnabled ||
                  (document as any).webkitFullscreenEnabled;

                if (fullscreenSupported) {
                  if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if ((document as any).webkitExitFullscreen) {
                      (document as any).webkitExitFullscreen();
                    }
                  } else {
                    const requestFS = container.requestFullscreen ||
                      (container as any).webkitRequestFullscreen;
                    if (requestFS) {
                      requestFS.call(container).catch((err: any) => {
                        window.open(embedUrl, '_blank');
                      });
                    }
                  }
                } else {
                  window.open(embedUrl, '_blank');
                }
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation group/fs"
            style={{
              backgroundColor: 'rgba(10, 14, 26, 0.95)',
              borderColor: 'rgba(39, 203, 206, 0.4)',
              color: 'rgba(39, 203, 206, 1)',
              boxShadow: '0 2px 8px rgba(39, 203, 206, 0.15)',
            }}
            aria-label="View dashboard in full screen"
            title="View in Full Screen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover/fs:rotate-12 transition-transform"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <span className="text-sm font-semibold font-sans tracking-wide">Full Screen</span>
          </button>
        </div>

        <div
          ref={dashboardRef}
          role="region"
          aria-label={`${title} - Interactive Power BI Dashboard`}
          className="rounded-2xl overflow-hidden border-2 transition-colors relative group/dashboard"
          style={{
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(39, 203, 206, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          {/* Unified mobile interaction overlay */}
          {isMounted && isMobile && (
            <div className="sm:hidden absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <button
                onClick={() => window.open(embedUrl, '_blank')}
                className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-lg shadow-2xl active:scale-95 transition-all"
                style={{
                  backgroundColor: 'rgba(10, 14, 26, 0.9)',
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                <span className="text-xs font-bold uppercase tracking-wider">Full Screen</span>
              </button>
            </div>
          )}
          <div className="relative w-full" style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)' }}>
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              {isMounted && isMobile ? (
                /* Mobile: Show preview image with centered fullscreen button */
                <div className="absolute inset-0">
                  {/* Preview Image */}
                  <img
                    src={previewImage}
                    alt={`${title} dashboard preview`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Dark overlay for better button visibility */}
                  <div className="absolute inset-0 bg-black/30" />
                  {/* Centered Fullscreen Button */}
                  <button
                    onClick={() => window.open(embedUrl, '_blank')}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 active:scale-95 touch-manipulation"
                    aria-label="View dashboard in full screen"
                  >
                    <div
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border backdrop-blur-md"
                      style={{
                        backgroundColor: 'rgba(10, 14, 26, 0.9)',
                        borderColor: 'rgba(39, 203, 206, 0.6)',
                        color: 'rgba(39, 203, 206, 1)',
                        boxShadow: '0 4px 20px rgba(39, 203, 206, 0.3)',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                      </svg>
                      <span className="text-sm font-semibold font-sans tracking-wide">View Full Screen</span>
                    </div>
                    <span className="text-xs text-white/70 font-sans">Tap to open interactive dashboard</span>
                  </button>
                </div>
              ) : shouldLoad ? (
                /* Desktop: Show iframe */
                <>
                  {/* Loading placeholder with smooth transition */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                    style={{
                      backgroundColor: 'rgba(10, 14, 26, 0.95)',
                      opacity: 1,
                      pointerEvents: 'none'
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-cyan"></div>
                      <div className="text-text-muted text-sm font-sans">Loading interactive dashboard...</div>
                    </div>
                  </div>
                  <iframe
                    title={title}
                    src={embedUrl}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                    style={{
                      border: 'none',
                      margin: 0,
                      padding: 0,
                      backgroundColor: "transparent",
                      display: 'block'
                    }}
                    allowFullScreen
                    aria-label={description}
                    referrerPolicy="no-referrer-when-downgrade"
                    frameBorder="0"
                    scrolling="no"
                    onLoad={(e) => {
                      // Hide loading state when iframe loads
                      const loadingDiv = e.currentTarget.previousElementSibling as HTMLElement;
                      if (loadingDiv) {
                        setTimeout(() => {
                          loadingDiv.style.opacity = '0';
                          setTimeout(() => {
                            loadingDiv.style.display = 'none';
                          }, 500);
                        }, 300);
                      }
                    }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)' }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-pulse rounded-full h-10 w-10 bg-accent-cyan/20"></div>
                    <div className="text-text-muted text-sm font-sans">Preparing dashboard...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl border" style={{
          backgroundColor: 'rgba(39, 203, 206, 0.05)',
          borderColor: 'var(--border-color)',
        }}>
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

function TechHighlight({ icon, title, description }: TechHighlightProps): React.JSX.Element {
  return (
    <div className="rounded-2xl border p-6 sm:p-7 backdrop-blur-md" style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'rgba(39, 203, 206, 0.05)',
    }}>
      <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 font-serif tracking-tight">{title}</h4>
      <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">{description}</p>
    </div>
  );
}


