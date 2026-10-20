"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Lightbulb, ExternalLink, Github, Maximize2, Play, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const dashboards = [
  {
    featured: true,
    badge: "In Active Development",
    title: "RescueShip: Autonomous RTO Reduction & Logistics Engine",
    subtitle: "D2C Shipping Intelligence, NDR Interception & Courier Fraud Defense",
    description:
      "Full-stack M.E.R.N. logistics intelligence engine architected to arrest Indian D2C's #1 profit bleed: 30%+ Cash-on-Delivery (COD) failure rates and fraudulent courier non-delivery reports (NDRs). Features high-throughput courier webhook pipelines, algorithmic fake-attempt detection, automated address hygiene, and 1-tap WhatsApp customer re-attempt recovery workflows.",
    liveUrl: "https://rescueship-frontend.onrender.com/",
    isDirectLaunchOnly: true,
    tech: ["MongoDB", "Express.js", "React 19", "Node.js", "Redis", "REST APIs", "Courier Webhooks", "WhatsApp Cloud API"],
    metrics: [
      { label: "Core Architecture", value: "M.E.R.N. Stack" },
      { label: "Data Pipeline", value: "Courier Webhooks" },
      { label: "Fraud Defense", value: "Fake-Attempt Audit" },
      { label: "Status", value: "Active Build (Alpha)" },
    ],
    insights: [
      "High-Throughput Courier Webhooks: Event-driven ingestion processing live transit status updates across Indian 3PL couriers (Delhivery, BlueDart, Shadowfax, Xpressbees)",
      "Courier Fake-Attempt Detection: Audits carrier non-delivery claims against driver geolocation, timestamp telemetry, and call logs to contest false 'Customer Unavailable' rejections",
      "Pre-Dispatch Address Hygiene: Automated parsing and correction of ambiguous street addresses and high-risk pincodes before shipping labels are generated",
      "WhatsApp NDR Recovery Automation: Interactive 1-tap customer workflows for real-time location re-pinning, delivery rescheduling, and COD-to-prepaid conversion",
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/0",
    previewImage: "/images/dashboard-previews/rescueship-preview.webp",
  },
  {
    featured: false,
    badge: "Executive Power BI",
    title: "Adaptive Weather Visuals",
    subtitle: "Real-Time Environmental Intelligence System",
    description:
      "Dynamic weather monitoring dashboard featuring adaptive visualizations that respond to environmental conditions. Tracks temperature forecasts, air quality indices, visibility metrics, and sunrise/sunset data across multiple Indian cities with contextual alerts.",
    embedUrl:
      "https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
    liveUrl:
      "https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9",
    tech: ["Power BI", "DAX", "Weather API", "Real-Time Data", "Advanced Visuals"],
    metrics: [
      { label: "Cities Tracked", value: "10+" },
      { label: "Weather Indices", value: "15+" },
      { label: "Visualization", value: "Adaptive" },
      { label: "Alert Engine", value: "Real-Time" },
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
    featured: false,
    badge: "Commercial Intelligence",
    title: "Macro & Micro Level Analysis",
    subtitle: "Executive & Operational Intelligence Platform",
    description:
      "Comprehensive dual-layer business analytics dashboard providing executive overview (macro) and granular operational insights (micro). Features geographic sales distribution, category profitability analysis, and segment-wise revenue breakdown with drill-through capabilities.",
    embedUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
    liveUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9",
    tech: ["Power BI", "DAX", "Data Modeling", "Geographic Viz", "KPI Design"],
    metrics: [
      { label: "Architecture", value: "Dual-Layer" },
      { label: "Target Metric", value: "Profit %" },
      { label: "Analysis Level", value: "Product/SKU" },
      { label: "Correlation", value: "Multivariate" },
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
    featured: false,
    badge: "Financial Operations",
    title: "Distribution & Trend Analysis",
    subtitle: "Profit Health Monitoring & Operational Control Platform",
    description:
      "Multi-dimensional business analysis dashboard examining quarterly performance, category distribution, expense ratios, and state-wise profit patterns. Features time-series profit trends, income categorization, and geographic bubble visualizations for India-specific insights.",
    embedUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19",
    liveUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9",
    tech: ["Power BI", "Time Series", "Statistical Analysis", "Map Visuals", "DAX Measures"],
    metrics: [
      { label: "PnL Tracking", value: "Monthly" },
      { label: "Cost Ratio", value: "0.99x" },
      { label: "Drill-Down", value: "Quarterly" },
      { label: "Map Visuals", value: "State-Level" },
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
    title: "Advanced DAX & Star Schema",
    description: "Complex business logic measures, dynamic time intelligence, and optimized dimensional data models.",
  },
  {
    icon: "⚡",
    title: "Full-Stack Logistics & APIs",
    description: "Autonomous engineering builds in MongoDB, Express.js, React, Node.js, and webhook-driven courier automation.",
  },
  {
    icon: "📊",
    title: "Commercial & Financial BI",
    description: "Executive and operational intelligence dashboards connecting granular SKU data to macro profitability.",
  },
];

type DashboardCardProps = {
  featured?: boolean;
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  embedUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  isExternalWebApp?: boolean;
  isDirectLaunchOnly?: boolean;
  previewImage: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  insights: string[];
  gradient: string;
};

function DashboardCard({
  featured,
  badge,
  title,
  subtitle,
  description,
  embedUrl,
  liveUrl,
  githubUrl,
  isExternalWebApp,
  isDirectLaunchOnly,
  previewImage,
  tech,
  metrics,
  insights,
  gradient,
}: DashboardCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showIframe, setShowIframe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [isFullScreenImageOpen, setIsFullScreenImageOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and register Escape key listener when full-screen image overlay is open
  useEffect(() => {
    if (isFullScreenImageOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsFullScreenImageOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isFullScreenImageOpen]);

  useEffect(() => {
    if (showIframe && isLoading) {
      const timer = setTimeout(() => {
        setLoadTimeout(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [showIframe, isLoading]);

  const loadIframe = () => {
    if (isDirectLaunchOnly && liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setShowIframe(true);
  };

  const handleFullScreen = () => {
    const container = dashboardRef.current;
    if (container) {
      const fullscreenSupported =
        document.fullscreenEnabled || (document as any).webkitFullscreenEnabled;

      if (fullscreenSupported) {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        } else {
          const requestFS =
            container.requestFullscreen || (container as any).webkitRequestFullscreen;
          if (requestFS) {
            requestFS.call(container).catch(() => {
              if (liveUrl || embedUrl) {
                window.open(liveUrl || embedUrl, "_blank", "noopener,noreferrer");
              }
            });
          }
        }
      } else if (liveUrl || embedUrl) {
        window.open(liveUrl || embedUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  const iframeSrc = embedUrl
    ? isExternalWebApp
      ? embedUrl
      : `${embedUrl}&navContentPaneEnabled=false&transparent=1`
    : "";

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl border overflow-hidden backdrop-blur-xl"
      style={{
        borderColor: "var(--border-color)",
        background:
          "linear-gradient(135deg, rgba(10, 14, 26, 0.7) 0%, rgba(15, 20, 25, 0.4) 100%)",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />
      <div className="relative z-10 p-8 sm:p-10 lg:p-12 space-y-8 sm:space-y-10">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            {featured && (
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold font-sans tracking-wide"
                style={{
                  backgroundColor: "rgba(39, 203, 206, 0.15)",
                  borderColor: "rgba(39, 203, 206, 0.4)",
                  color: "rgba(39, 203, 206, 1)",
                }}
              >
                <Star className="h-3.5 w-3.5 fill-accent-cyan/30 text-accent-cyan" />
                Featured Project
              </span>
            )}
            {badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-accent-cyan/90 font-sans font-medium">
                {badge}
              </span>
            )}
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-3 sm:mb-4 group-hover:text-accent-cyan transition-colors tracking-tight leading-[1.15]">
            {title}
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl text-accent-cyan/90 font-medium mb-4 sm:mb-5 font-sans leading-relaxed">
            {subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans">
            {description}
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(39, 203, 206, 0.3) 0%, rgba(32, 178, 170, 0.18) 100%)",
                  borderColor: "rgba(39, 203, 206, 0.6)",
                  borderWidth: "1px",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(39, 203, 206, 0.25)",
                }}
              >
                <ExternalLink className="h-4 w-4 text-accent-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                <span>{isDirectLaunchOnly ? "Launch Live Platform" : "Launch Live Application"}</span>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Github className="h-4 w-4 text-white/80" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          {/* Full Screen Action: Available across all platforms and dashboards */}
          {((!isDirectLaunchOnly && embedUrl) || isDirectLaunchOnly || previewImage) && (
            <button
              onClick={() => {
                if (isMobile || isDirectLaunchOnly) {
                  setIsFullScreenImageOpen(true);
                } else {
                  handleFullScreen();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation group/fs cursor-pointer"
              style={{
                backgroundColor: "rgba(10, 14, 26, 0.95)",
                borderColor: "rgba(39, 203, 206, 0.4)",
                color: "rgba(39, 203, 206, 1)",
                boxShadow: "0 2px 8px rgba(39, 203, 206, 0.15)",
              }}
              aria-label="View in full screen"
              title="View in Full Screen"
            >
              <Maximize2 className="h-4 w-4 group-hover/fs:rotate-12 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold font-sans tracking-wide">
                Full Screen
              </span>
            </button>
          )}
        </div>

        {/* Dashboard Preview / Embed Stage */}
        <div
          ref={dashboardRef}
          role="region"
          aria-label={`${title} Showcase`}
          className="rounded-2xl overflow-hidden border-2 transition-colors relative group/dashboard"
          style={{
            borderColor: "var(--border-color)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(39, 203, 206, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <div className="relative w-full" style={{ backgroundColor: "rgba(10, 14, 26, 0.95)" }}>
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden group/preview">
              {!showIframe ? (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    // On mobile phones, clicking the image ALWAYS opens the full-screen overlay for inspection!
                    // For direct-launch apps like RescueShip, clicking the image opens the full-screen overlay!
                    if (isMobile || isDirectLaunchOnly) {
                      setIsFullScreenImageOpen(true);
                    } else {
                      loadIframe();
                    }
                  }}
                >
                  <img
                    src={previewImage}
                    alt={`${title} preview`}
                    className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover/preview:scale-[1.02]"
                    loading="lazy"
                  />
                  {!isDirectLaunchOnly && !isMobile && (
                    <>
                      <div className="absolute inset-0 bg-black/40 group-hover/preview:bg-black/20 transition-colors duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-transform duration-300 active:scale-95 touch-manipulation">
                        <div
                          className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border backdrop-blur-md bg-background/80 hover:bg-background transition-all group-hover/preview:shadow-[0_0_30px_rgba(39,203,206,0.3)]"
                          style={{
                            borderColor: "rgba(39, 203, 206, 0.5)",
                            color: "rgba(39, 203, 206, 1)",
                          }}
                        >
                          <Play className="h-5 w-5 sm:h-6 sm:w-6 opacity-90 fill-accent-cyan/20" />
                          <span className="text-sm sm:text-base font-semibold font-sans tracking-wide">
                            {isExternalWebApp
                              ? "Load Interactive Analytics App"
                              : "Load Interactive Dashboard"}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-white/80 font-sans px-4 text-center">
                          {isExternalWebApp
                            ? "Embedded live React 19 app with real-time drill-downs"
                            : "Opens interactive Power BI report"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 p-6 text-center"
                      style={{
                        backgroundColor: "rgba(10, 14, 26, 0.95)",
                      }}
                    >
                      <div className="flex flex-col items-center gap-4 max-w-sm">
                        {!loadTimeout ? (
                          <>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan"></div>
                            <div className="text-accent-cyan text-sm sm:text-base font-sans tracking-wide">
                              Initializing {isExternalWebApp ? "Analytics Engine" : "Power BI"}...
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-text-muted font-sans mb-1">
                              The interactive report is taking longer than expected to connect.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center mt-2">
                              {liveUrl && (
                                <a
                                  href={liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-cyan text-[#050810] font-sans font-bold text-xs shadow-md hover:scale-105 transition-transform"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  Open in New Tab ↗
                                </a>
                              )}
                              <button
                                onClick={() => {
                                  setShowIframe(false);
                                  setIsLoading(true);
                                  setLoadTimeout(false);
                                }}
                                className="px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-sans hover:bg-white/10 transition-colors"
                              >
                                Back to Preview
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  <iframe
                    title={title}
                    src={iframeSrc}
                    className="absolute inset-0 h-full w-full border-0 z-0"
                    style={{
                      border: "none",
                      margin: 0,
                      padding: 0,
                      backgroundColor: "transparent",
                      display: "block",
                    }}
                    allowFullScreen
                    aria-label={description}
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsLoading(false)}
                  />
                  {liveUrl && (
                    <div className="absolute bottom-2 right-3 z-10 hidden sm:block">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 hover:bg-black text-[11px] text-accent-cyan/90 border border-accent-cyan/30 backdrop-blur-sm transition-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Open in new tab</span>
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-8 rounded-2xl border"
          style={{
            backgroundColor: "rgba(39, 203, 206, 0.05)",
            borderColor: "var(--border-color)",
          }}
        >
          {metrics.map(({ label, value }) => (
            <div key={label} className="text-center space-y-1.5 px-1 min-w-0">
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent-cyan font-serif leading-tight break-words sm:whitespace-normal">
                {value}
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-text-muted font-sans leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Insights & Features */}
        <div className="space-y-5 sm:space-y-6">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-3 text-text-primary font-serif tracking-tight">
            <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-300 flex-shrink-0" />
            Key insights &amp; features
          </h4>
          <ul className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {insights.map((insight) => (
              <li
                key={insight}
                className="flex items-start gap-3 text-sm sm:text-base text-text-muted leading-relaxed font-sans"
              >
                <span className="text-accent-cyan mt-1.5 flex-shrink-0 text-lg">▹</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Badges */}
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

      {/* Full-Screen Image Overlay Modal (Portaled directly to document.body for true edge-to-edge coverage above all headers) */}
      {mounted && typeof document !== "undefined" && isFullScreenImageOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
            onClick={() => setIsFullScreenImageOpen(false)}
          >
            {/* Top Bar: Title, Badge & Close Button */}
            <div 
              className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto z-10 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  {badge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-[10px] sm:text-xs text-accent-cyan font-sans font-medium">
                      {badge}
                    </span>
                  )}
                  <span className="text-xs text-white/50 font-sans">Fullscreen View</span>
                </div>
                <h4 className="text-base sm:text-xl font-serif font-bold text-white truncate">
                  {title}
                </h4>
              </div>

              <button
                onClick={() => setIsFullScreenImageOpen(false)}
                className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan cursor-pointer"
                aria-label="Close fullscreen overlay"
                title="Close (Esc)"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Center Stage: Fullscreen Image with touch pinch-zoom support */}
            <div 
              className="flex-1 flex items-center justify-center my-3 sm:my-4 overflow-auto max-w-7xl mx-auto w-full touch-pinch-zoom"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage}
                alt={`${title} fullscreen preview`}
                className="max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              />
            </div>

            {/* Bottom Bar: Action Buttons */}
            <div 
              className="flex flex-wrap items-center justify-center gap-3 w-full max-w-7xl mx-auto z-10 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(39, 203, 206, 0.4) 0%, rgba(32, 178, 170, 0.25) 100%)",
                    borderColor: "rgba(39, 203, 206, 0.8)",
                    borderWidth: "1px",
                    color: "#ffffff",
                    boxShadow: "0 4px 20px rgba(39, 203, 206, 0.35)",
                  }}
                >
                  <ExternalLink className="h-4 w-4 text-accent-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>{isDirectLaunchOnly ? "Launch Live Platform" : "Open Live Application"}</span>
                </a>
              )}
              <button
                onClick={() => setIsFullScreenImageOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer"
              >
                Close Fullscreen
              </button>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
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
    <div
      className="rounded-2xl border p-6 sm:p-7 backdrop-blur-md"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "rgba(39, 203, 206, 0.05)",
      }}
    >
      <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 font-serif tracking-tight">
        {title}
      </h4>
      <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
        {description}
      </p>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-20 pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 overflow-hidden border-t"
      style={{
        backgroundColor: "var(--background-projects)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Enhanced turquoise radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(39,203,206,0.12),transparent_60%)] pointer-events-none" />
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
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Data Intelligence &amp; Strategic Systems
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-muted leading-relaxed font-sans max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white font-medium">
              Production-grade operational intelligence, full-stack logistics automation, and executive BI platforms.
            </span>{" "}
            Featuring live web applications and real-time dashboards engineered to transform high-volume commercial data into measurable margin expansion.
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
