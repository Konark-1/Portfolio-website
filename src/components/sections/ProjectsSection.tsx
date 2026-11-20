'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  CloudLightning,
  TrendingUp,
  ShieldAlert,
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Layers,
  Activity,
  Sparkles,
  Database,
  Webhook,
  MessageSquare,
  Cpu,
  MonitorPlay,
  Play,
  GitBranch,
  X,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface PipelineNode {
  step: string;
  title: string;
  detail: string;
  icon: 'webhook' | 'cpu' | 'database' | 'message';
}

export interface ProjectSpec {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  domain: string;
  type: 'powerbi' | 'fullstack';
  isCapstone?: boolean;
  badgeText: string;
  headlineMetric: ProjectMetric;
  problem: string;
  solution: string;
  impactBullets?: string[];
  stack: string[];
  previewImage: string;
  embedUrl?: string;
  liveUrl: string;
  liveCtaLabel: string;
  pipelineNodes?: PipelineNode[];
}

export const PROJECTS: ProjectSpec[] = [
  {
    id: 'macro-micro-analysis',
    index: '01',
    title: 'Macro & Micro Level Analysis',
    shortTitle: 'Macro & Micro BI',
    domain: 'Commercial Intelligence & Executive P&L Analytics',
    type: 'powerbi',
    badgeText: 'Operational BI',
    headlineMetric: {
      value: 'SKU-Level',
      label: 'Margin & Volume Drilldown',
      context: 'Executive P&L to micro-unit profitability',
    },
    problem:
      'Enterprise sales reports often aggregate high-level revenue figures, masking localized margin leakage. High-volume, low-margin SKUs and regional distributor discounting quietly eroded net operating profit without alerting executive leadership until month-end financial reconciliations.',
    solution:
      'Engineered a high-performance Star-Schema dimensional model in Power BI paired with custom DAX margin-attribution measures and synchronized geographic drill-throughs. The system enables executive leadership to seamlessly transition from macro P&L summaries down to granular micro-unit SKU profitability in two clicks.',
    stack: ['Power BI', 'DAX Measures', 'Dimensional Modeling', 'Geographic Viz'],
    previewImage: '/images/dashboard-previews/Macro & Micro Level Analysis.webp',
    embedUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection',
    liveUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
    liveCtaLabel: 'Open Full BI Report',
  },
  {
    id: 'adaptive-weather-visuals',
    index: '02',
    title: 'Adaptive Weather Visuals',
    shortTitle: 'Adaptive Weather',
    domain: 'Real-Time Environmental & Operational Intelligence',
    type: 'powerbi',
    badgeText: 'Real-Time APIs',
    headlineMetric: {
      value: 'Live API',
      label: 'Context-Aware Alert State Telemetry',
      context: 'Dynamic DAX styling across multi-city feeds',
    },
    problem:
      'Static operational dashboards force dispatch teams to manually cross-reference external weather feeds against delivery schedules, delaying proactive rerouting and staffing decisions during severe disruptions.',
    solution:
      'Automated a real-time REST API ingestion pipeline in Power BI paired with context-aware DAX rules. The interface autonomously mutates visual state, alert hierarchies, and SVG indicators the second environmental severity thresholds are breached.',
    stack: ['Power BI', 'Dynamic DAX', 'REST API Ingestion', 'SVG & Visual Formatting'],
    previewImage: '/images/dashboard-previews/Adaptive Weather Visuals.webp',
    embedUrl:
      'https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
    liveUrl:
      'https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
    liveCtaLabel: 'Open Live Telemetry',
  },
  {
    id: 'distribution-trend-analysis',
    index: '03',
    title: 'Distribution & Trend Analysis',
    shortTitle: 'Distribution & PnL',
    domain: 'Regional P&L Leakage & Seasonal Variance Analytics',
    type: 'powerbi',
    badgeText: 'Profitability & P&L',
    headlineMetric: {
      value: '₹2.13M OpEx',
      label: 'Multi-State Margin Audit',
      context: 'Diagnosing cyclical loss spikes and regional margin compression across ₹2.13M operating volume',
    },
    problem:
      'Despite ₹2.13M in operating volume, annual net profit was compressed to just ₹37K. Aggregated monthly reporting masked acute cyclical loss spikes (May, July, September, December) and hid which state-level distribution nodes and product categories were silently draining operating margins.',
    solution:
      'Engineered a multi-dimensional Power BI diagnostic model dissecting product mix (Clothing 62.62%, Electronics 20.55%, Furniture 16.83%) against state-level P&L geography and monthly variance curves—pinpointing unprofitable distribution nodes for immediate margin intervention.',
    stack: ['Power BI', 'DAX Measures', 'P&L Variance Modeling', 'Geographic Audit'],
    previewImage: '/images/dashboard-previews/Distribution & Trend Analysis.webp',
    embedUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection',
    liveUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
    liveCtaLabel: 'Open Financial Model',
  },
  {
    id: 'rescueship-capstone',
    index: '04',
    title: 'RescueShip: Autonomous RTO Reduction & Logistics Engine',
    shortTitle: 'RescueShip Engine',
    domain: 'D2C Shipping Intelligence & Courier NDR Fraud Defense',
    type: 'fullstack',
    isCapstone: true,
    badgeText: 'CAPSTONE • FULL-STACK',
    headlineMetric: {
      value: '30%+',
      label: 'COD RTO Failure Interception',
      context: 'Autonomous courier NDR telemetry audit & WhatsApp recovery',
    },
    problem:
      'Indian D2C brands lose 25–35% of Cash-on-Delivery GMV to Return-to-Origin (RTO) failures caused by bogus courier Non-Delivery Reports ("Door Locked"), invalid customer phone data, and slow manual re-attempt workflows.',
    solution:
      'Architected an event-driven MERN + Redis autonomous intercept engine that ingests live carrier webhooks (Delhivery, BlueDart), audits scan telemetry for fake-delivery anomalies, and triggers 1-tap WhatsApp location recovery directly with the buyer.',
    stack: [
      'MongoDB',
      'Express.js',
      'React 19',
      'Node.js',
      'Redis',
      'Courier Webhooks',
      'WhatsApp Cloud API',
    ],
    previewImage: '/images/dashboard-previews/rescueship-preview.webp',
    liveUrl: 'https://rescueship.netlify.app',
    liveCtaLabel: 'Launch Live Production App',
    pipelineNodes: [
      {
        step: 'STAGE 01',
        title: 'Courier Webhook Ingestion',
        detail: 'Real-time NDR & scan telemetry from Delhivery / BlueDart webhooks',
        icon: 'webhook',
      },
      {
        step: 'STAGE 02',
        title: 'Fake-NDR Fraud Telemetry Audit',
        detail: 'Detects anomalous scan timestamps, geo-mismatch & unattempted dropoffs',
        icon: 'cpu',
      },
      {
        step: 'STAGE 03',
        title: 'Redis Priority Recovery Queue',
        detail: 'Sub-second deduplication & rate-limited dispatch orchestration',
        icon: 'database',
      },
      {
        step: 'STAGE 04',
        title: '1-Tap WhatsApp Cloud Recovery',
        detail: 'Automated buyer re-verification, pin drop & re-attempt scheduling',
        icon: 'message',
      },
    ],
  },
];

export const techHighlights = [
  {
    icon: '🎯',
    title: 'Semantic Modeling & DAX Engineering',
    description:
      'Production Star-Schema models, context-transition measures, dynamic ranking, and time-intelligence variance analysis.',
  },
  {
    icon: '⚡',
    title: 'REST APIs & Automated Ingestion',
    description:
      'Automated Power Query (M) pipelines, live webhook ingestion, and real-time operational alert state telemetry.',
  },
  {
    icon: '📦',
    title: 'Event-Driven Full-Stack Systems',
    description:
      'Full-stack MERN + Redis architecture, carrier logistics webhook integration, and automated WhatsApp Cloud API recovery.',
  },
];

function getProjectIcon(index: string, className = 'w-4 h-4') {
  switch (index) {
    case '01':
      return <BarChart3 className={className} />;
    case '02':
      return <CloudLightning className={className} />;
    case '03':
      return <TrendingUp className={className} />;
    case '04':
    default:
      return <ShieldAlert className={className} />;
  }
}

function getPipelineIcon(icon: PipelineNode['icon']) {
  switch (icon) {
    case 'webhook':
      return <Webhook className="w-4 h-4 text-[#8CF6F7]" />;
    case 'cpu':
      return <Cpu className="w-4 h-4 text-[#8CF6F7]" />;
    case 'database':
      return <Database className="w-4 h-4 text-[#8CF6F7]" />;
    case 'message':
      return <MessageSquare className="w-4 h-4 text-[#8CF6F7]" />;
  }
}

export default function ProjectsSection() {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInteractiveIframe, setShowInteractiveIframe] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [rescueViewMode, setRescueViewMode] = useState<'architecture' | 'embed'>('architecture');

  const activeIndex = PROJECTS.findIndex((p) => p.id === activeId);
  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];

  const handleSelectProject = useCallback((id: string) => {
    setActiveId(id);
    setShowInteractiveIframe(false);
    setIframeLoaded(false);
    setRescueViewMode('architecture');
  }, []);

  // Keyboard navigation across the 4-tab index + Escape key for fullscreen
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  // Prevent background scroll when Fullscreen Sandbox is open
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = PROJECTS[(idx + 1) % PROJECTS.length];
      handleSelectProject(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
      handleSelectProject(prev.id);
    }
  };

  const renderInteractiveStage = (fullscreenMode = false) => {
    // CASE A: Project 04 — RescueShip Capstone
    if (activeProject.type === 'fullstack') {
      return (
        <div
          className={`relative flex flex-col bg-[#070B14] border border-[#27CBCE]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_-15px_rgba(39,203,206,0.22)] ${
            fullscreenMode ? 'h-full w-full' : 'h-[460px] sm:h-[520px] lg:h-full lg:min-h-[540px]'
          }`}
        >
          {/* Chrome Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0B1220]/95 border-b border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#8CF6F7] truncate">
                Capstone Autonomous Engine • RescueShip
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-white/5 p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setRescueViewMode('architecture')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    rescueViewMode === 'architecture'
                      ? 'bg-[#27CBCE]/20 text-[#8CF6F7] border border-[#27CBCE]/40 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  System Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIframeLoaded(false);
                    setRescueViewMode('embed');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    rescueViewMode === 'embed'
                      ? 'bg-[#27CBCE]/20 text-[#8CF6F7] border border-[#27CBCE]/40 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Web App
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label={fullscreenMode ? 'Exit fullscreen preview' : 'Expand fullscreen preview'}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#8CF6F7] border border-white/10 transition-colors cursor-pointer"
              >
                {fullscreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Stage Body */}
          {rescueViewMode === 'architecture' ? (
            <div className="relative flex-1 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,rgba(39,203,206,0.14),transparent_65%)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#27CBCE] font-semibold">
                    Autonomous NDR Recovery Loop
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                    Event-Driven RTO Interception Pipeline
                  </h4>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                  <Activity className="w-3.5 h-3.5" />
                  Production Live
                </span>
              </div>

              {/* 4-Stage Pipeline Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
                {activeProject.pipelineNodes?.map((node) => (
                  <div
                    key={node.step}
                    className="group relative p-4 rounded-xl bg-[#0C1424]/90 border border-white/10 hover:border-[#27CBCE]/50 transition-all hover:bg-[#0E1729]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono tracking-widest text-[#27CBCE] font-semibold">
                        {node.step}
                      </span>
                      <div className="p-1.5 rounded-lg bg-[#27CBCE]/10 border border-[#27CBCE]/25">
                        {getPipelineIcon(node.icon)}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white">{node.title}</p>
                    <p className="text-xs text-slate-300/85 mt-1 leading-relaxed">{node.detail}</p>
                  </div>
                ))}
              </div>

              {/* Direct Production Launch Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <GitBranch className="w-4 h-4 text-[#27CBCE] shrink-0" />
                  <span className="truncate font-mono text-xs text-slate-300">
                    rescueship.netlify.app
                  </span>
                </div>
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7] text-[#050810] hover:brightness-110 shadow-[0_0_25px_-5px_rgba(39,203,206,0.65)] transition-all cursor-pointer"
                >
                  Launch RescueShip Live
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="relative flex-1 bg-[#050810]">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070B14] z-10 p-6 text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#27CBCE]/30 border-t-[#8CF6F7] animate-spin" />
                  <p className="text-xs font-mono text-slate-300">
                    Connecting to RescueShip production instance...
                  </p>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#8CF6F7] hover:underline"
                  >
                    Open in new tab <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
              <iframe
                src={activeProject.liveUrl}
                title={activeProject.title}
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );
    }

    // CASE B: Projects 01-03 — Power BI Sandbox Stage
    return (
      <div
        className={`relative flex flex-col bg-[#070B14] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] ${
          fullscreenMode ? 'h-full w-full' : 'h-[460px] sm:h-[520px] lg:h-full lg:min-h-[540px]'
        }`}
      >
        {/* Sandbox Chrome Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0B1220]/95 border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#27CBCE] shadow-[0_0_8px_#27CBCE]" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 truncate font-medium">
              Interactive Power BI Fabric Sandbox • {activeProject.index}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={fullscreenMode ? 'Exit fullscreen preview' : 'Expand fullscreen preview'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27CBCE]/10 hover:bg-[#27CBCE]/20 text-xs font-medium text-[#8CF6F7] border border-[#27CBCE]/30 transition-colors cursor-pointer"
            >
              {fullscreenMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Image or Interactive Iframe */}
        <div className="relative flex-1 bg-[#050810] overflow-hidden">
          {showInteractiveIframe && activeProject.embedUrl ? (
            <>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070B14] z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-[#27CBCE]/30 border-t-[#8CF6F7] animate-spin" />
                  <p className="text-xs font-mono text-slate-400">
                    Initializing Power BI interactive canvas...
                  </p>
                </div>
              )}
              <iframe
                key={activeProject.id}
                title={`${activeProject.title} — Power BI Report`}
                src={`${activeProject.embedUrl}&navContentPaneEnabled=false&transparent=1`}
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </>
          ) : (
            <div
              className="group/stage relative w-full h-full flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                if (isMobile) {
                  window.open(activeProject.liveUrl, '_blank', 'noopener,noreferrer');
                } else {
                  setShowInteractiveIframe(true);
                }
              }}
            >
              {/* Preview Image */}
              <img
                src={activeProject.previewImage}
                alt={`${activeProject.title} preview`}
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover/stage:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/45 group-hover/stage:bg-black/25 transition-colors duration-500" />

              {/* Center Launch CTA Pill */}
              <div className="relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-accent-cyan/50 bg-[#0a0e1a]/95 text-accent-cyan shadow-[0_0_25px_rgba(39,203,206,0.3)] group-hover/stage:shadow-[0_0_35px_rgba(39,203,206,0.55)] group-hover/stage:scale-105 transition-all">
                <Play className="h-4 w-4 fill-accent-cyan/30 text-accent-cyan" />
                <span className="text-xs sm:text-sm font-semibold font-sans tracking-wide">
                  <span className="inline md:hidden">Tap to view live report</span>
                  <span className="hidden md:inline">Click to launch interactive view</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#050810] text-slate-100 overflow-hidden border-t scroll-mt-24"
      style={{
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[380px] bg-[#27CBCE]/10 blur-[150px] rounded-full"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#27CBCE]/10 border border-[#27CBCE]/25 text-[#8CF6F7] text-xs sm:text-sm font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineered Systems Catalog</span>
          </div>
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] font-serif max-w-5xl"
          >
            Data Intelligence &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27CBCE] via-[#20B2AA] to-[#8CF6F7]">
              Autonomous Systems
            </span>
          </h2>
        </div>

        {/* =====================================================================
            ZONE 1: THE 10-SECOND INDEX (All 4 Projects Visible Without Scrolling)
           ===================================================================== */}
        <div
          role="tablist"
          aria-label="Portfolio Projects Index"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8"
        >
          {PROJECTS.map((project, idx) => {
            const isActive = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${project.id}`}
                id={`tab-${project.id}`}
                onClick={() => handleSelectProject(project.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CF6F7] ${
                  isActive
                    ? project.isCapstone
                      ? 'bg-[#0B1526]/95 border-[#8CF6F7]/80 shadow-[0_0_36px_-6px_rgba(39,203,206,0.45)]'
                      : 'bg-[#0B1220]/95 border-[#27CBCE]/70 shadow-[0_0_28px_-8px_rgba(39,203,206,0.35)]'
                    : project.isCapstone
                    ? 'bg-[#09101D]/80 border-[#27CBCE]/35 hover:border-[#8CF6F7]/60 hover:bg-[#0D1628]'
                    : 'bg-[#090E1A]/80 border-white/10 hover:border-white/30 hover:bg-[#0D1424]'
                }`}
              >
                {/* Top Row: Number + Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${
                      isActive ? 'text-[#8CF6F7]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {getProjectIcon(project.index, 'w-3.5 h-3.5')}
                    <span>{project.index}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#27CBCE]/20 text-[#8CF6F7] border border-[#27CBCE]/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8CF6F7] animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider truncate font-semibold ${
                        project.isCapstone
                          ? 'bg-[#27CBCE]/20 text-[#8CF6F7] border border-[#27CBCE]/40'
                          : isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {project.badgeText}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-base sm:text-lg font-bold leading-snug line-clamp-1 ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {project.shortTitle}
                </h3>

                {/* Quick Recruiter Metric */}
                <div className="mt-2.5 flex items-baseline gap-2 text-xs">
                  <span className="font-mono font-bold text-[#8CF6F7] text-sm tabular-nums">
                    {project.headlineMetric.value}
                  </span>
                  <span className="text-slate-300 truncate text-xs">
                    {project.headlineMetric.label}
                  </span>
                </div>

                {/* Active Seamless Inset Contour (Eliminates Glitchy Exterior Bottom Line) */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="activeProjectPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#27CBCE] bg-gradient-to-b from-[#27CBCE]/12 via-[#27CBCE]/[0.02] to-transparent pointer-events-none shadow-[0_0_28px_-6px_rgba(39,203,206,0.35)]"
                    />
                    <div className="absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#8CF6F7] to-transparent pointer-events-none" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            ZONE 2: MASTER-DETAIL EXECUTIVE STAGE
           ===================================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            role="tabpanel"
            id={`panel-${activeProject.id}`}
            aria-labelledby={`tab-${activeProject.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8 rounded-3xl border backdrop-blur-xl ${
              activeProject.isCapstone
                ? 'bg-[#091221]/95 border-[#27CBCE]/45 shadow-[0_0_80px_-20px_rgba(39,203,206,0.3)]'
                : 'bg-[#0A101D]/90 border-white/10 shadow-[0_25px_70px_-25px_rgba(0,0,0,0.85)]'
            }`}
          >
            {/* LEFT PANEL (5 Cols): 10-Second Recruiter Business Brief */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                {/* Domain + Capstone Callout */}
                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#27CBCE] font-semibold">
                    {activeProject.domain}
                  </span>
                  {activeProject.isCapstone && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#27CBCE]/25 to-[#8CF6F7]/15 border border-[#8CF6F7]/40 text-[#8CF6F7] text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      CAPSTONE SHOWCASE
                    </span>
                  )}
                </div>

                {/* Full Project Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-serif">
                  {activeProject.title}
                </h3>

                {/* Hero KPI Banner */}
                <div className="mt-5 p-4 rounded-2xl bg-[#060B14]/90 border border-[#27CBCE]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7]">
                        {activeProject.headlineMetric.value}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {activeProject.headlineMetric.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      {activeProject.headlineMetric.context}
                    </p>
                  </div>
                </div>

                {/* Expanded Problem & Resolution Cards (Spacious, Clear, Authoritative) */}
                <div className="mt-5 space-y-4">
                  {/* Business Problem Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 hover:border-amber-500/35 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400/90 mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Business Problem</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans">
                      {activeProject.problem}
                    </p>
                  </div>

                  {/* Engineered Resolution Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#27CBCE]/[0.04] border border-[#27CBCE]/25 hover:border-[#27CBCE]/40 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8CF6F7] mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#27CBCE] shrink-0" />
                      <span>Engineered Resolution</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Stack + Single Primary Action CTA */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.05] text-slate-300 border border-white/10 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7] text-[#050810] hover:brightness-110 shadow-[0_0_24px_-6px_rgba(39,203,206,0.7)] transition-all cursor-pointer"
                  >
                    <span>{activeProject.liveCtaLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL (7 Cols): Live Interactive Sandbox */}
            <div className="lg:col-span-7">{renderInteractiveStage(false)}</div>
          </motion.div>
        </AnimatePresence>

        {/* Technical Implementation Highlights (Retained Competencies) */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-3xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/5 to-transparent">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3 text-text-primary tracking-tight">
            <span className="text-accent-cyan text-3xl">⚡</span>
            Technical Architecture Highlights
          </h3>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {techHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/10 hover:border-accent-cyan/30 bg-[#0a0e1a]/90 p-6 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h4 className="text-lg sm:text-xl font-bold text-text-primary mb-2 font-serif tracking-tight">
                  {highlight.title}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed font-sans">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          FULLSCREEN SANDBOX MODAL
         ===================================================================== */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} fullscreen view`}
            className="fixed inset-0 z-50 bg-[#050810]/95 backdrop-blur-md p-3 sm:p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-[#27CBCE]/15 border border-[#27CBCE]/35 text-[#8CF6F7] text-xs font-mono font-bold">
                  {activeProject.index}
                </span>
                <span className="text-sm sm:text-base font-bold text-white truncate">
                  {activeProject.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen view"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white border border-white/15 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close (Esc)</span>
              </button>
            </div>

            <div className="flex-1 min-h-0">{renderInteractiveStage(true)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
