"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Lightbulb } from "lucide-react";

export const dashboards = [
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

export const techHighlights = [
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
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 639px)').matches ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

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
          <div className="relative w-full" style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)' }}>
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              {isMounted && isMobile ? (
                <div className="absolute inset-0">
                  <img
                    src={previewImage}
                    alt={`${title} dashboard preview`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30" />
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
                <>
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

export default function ProjectsSection() {
  return (
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
            viewport={{ once: true, amount: 0.1 }}
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
  );
}
