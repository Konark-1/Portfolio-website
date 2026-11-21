'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
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
  Play,
  GitBranch,
  X,
  ZoomIn,
  Move,
  Expand,
  ChevronDown,
  ChevronUp,
  MonitorPlay,
} from 'lucide-react';
import { useIsDesktop } from '@/hooks/useIsDesktop';

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

/* ============================================================================
 * MOBILE LIGHTBOX INSPECTOR MODAL (Full Resolution Zoom & Pan + Opt-in Live)
 * ========================================================================== */

type ZoomLevel = 1 | 1.75 | 2.5;

interface ProjectVisualModalProps {
  project: ProjectSpec | null;
  onClose: () => void;
}

function ProjectVisualModal({ project, onClose }: ProjectVisualModalProps) {
  const [zoom, setZoom] = useState<ZoomLevel>(1.75);
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);

  useEffect(() => {
    if (project) {
      setZoom(1.75);
      setShowLiveEmbed(false);
    }
  }, [project]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || typeof document === 'undefined') return null;

  const zoomOptions: Array<{ level: ZoomLevel; label: string }> = [
    { level: 1, label: 'Fit' },
    { level: 1.75, label: '1.75×' },
    { level: 2.5, label: '2.5×' },
  ];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Fullscreen HD Visual Inspector`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#050810] text-white h-[100dvh] w-screen"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 shrink-0 bg-[#070B14]">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8CF6F7]">
            {project.index} · {project.domain}
          </p>
          <h3 className="truncate text-sm sm:text-base font-bold text-white font-serif mt-0.5">
            {project.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inspector"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:scale-95 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Viewport: Opt-in Live Embed OR Native Pan & Width-Scaled Zoom */}
      {showLiveEmbed && (project.embedUrl || project.liveUrl) ? (
        <div className="relative flex-1 bg-black">
          <iframe
            src={project.embedUrl || project.liveUrl}
            title={`${project.title} interactive view`}
            className="h-full w-full border-0"
            allowFullScreen
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="relative flex-1 overflow-auto overscroll-contain bg-[#050810] p-3">
          {/* Pan hint when zoomed */}
          {zoom > 1 && (
            <div className="pointer-events-none sticky left-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#0a0e1a]/90 backdrop-blur-md px-3 py-1 text-[11px] font-sans font-medium text-slate-200 border border-[#27CBCE]/30 shadow-lg">
              <Move className="h-3.5 w-3.5 text-[#8CF6F7]" />
              Drag to pan across charts &amp; KPIs
            </div>
          )}

          {/* Width-based layout scaling enables crisp rendering & native iOS momentum pan */}
          <div
            style={{ width: `${zoom * 100}%` }}
            className="min-w-full transition-[width] duration-200 ease-out py-2"
            onDoubleClick={() =>
              setZoom((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1))
            }
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/15 bg-[#070B14] shadow-2xl">
              <Image
                src={project.previewImage}
                alt={`${project.title} HD preview`}
                fill
                sizes="(max-width: 768px) 1600px, 1920px"
                quality={85}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Control Dock (Safe Area Aware) */}
      <div className="shrink-0 border-t border-white/10 bg-[#070B14] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Zoom Buttons */}
          {!showLiveEmbed ? (
            <div
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] p-1"
              role="group"
              aria-label="Zoom level"
            >
              {zoomOptions.map((opt) => {
                const active = zoom === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setZoom(opt.level)}
                    className={`min-h-[36px] rounded-lg px-3 text-xs font-semibold font-mono transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#27CBCE] text-[#050810] shadow-[0_0_12px_rgba(39,203,206,0.6)]'
                        : 'text-slate-300 hover:text-white active:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLiveEmbed(false)}
              className="min-h-[38px] rounded-xl border border-white/15 bg-white/10 px-3.5 text-xs font-semibold text-white cursor-pointer"
            >
              Back to HD Snapshot
            </button>
          )}

          {/* Opt-in Live Interactive Embed Toggle */}
          {project.embedUrl && !showLiveEmbed && (
            <button
              type="button"
              onClick={() => setShowLiveEmbed(true)}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7] px-3.5 text-xs font-bold text-[#050810] shadow-[0_0_16px_rgba(39,203,206,0.5)] active:scale-[0.98] cursor-pointer"
            >
              <MonitorPlay className="h-4 w-4" />
              Launch Live Report
            </button>
          )}

          {project.liveUrl && !project.embedUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7] px-3.5 text-xs font-bold text-[#050810] shadow-[0_0_16px_rgba(39,203,206,0.5)] cursor-pointer"
            >
              Open Live App
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============================================================================
 * MOBILE EDITORIAL CASE-STUDY CARD (< 1024px)
 * ========================================================================== */

interface MobileProjectCardProps {
  project: ProjectSpec;
  totalCount: number;
  onInspect: (project: ProjectSpec) => void;
}

function MobileProjectCard({ project, totalCount, onInspect }: MobileProjectCardProps) {
  const [stackExpanded, setStackExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/12 bg-[#080D1A]/95 shadow-xl">
      {/* 1. Header: Index, Category Pill, Title */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27CBCE]/35 bg-[#27CBCE]/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8CF6F7]">
            {project.badgeText}
          </span>
          <span className="font-mono text-xs font-bold text-slate-400">
            {project.index} / 0{totalCount}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white font-serif">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-slate-400 font-sans">{project.domain}</p>
      </div>

      {/* 2. Executive KPI Block */}
      <div className="px-4 sm:px-5 pb-4">
        <div className="rounded-xl border border-[#27CBCE]/25 bg-[#050912] p-3.5 flex items-baseline justify-between gap-3">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7]">
              {project.headlineMetric.value}
            </div>
            <div className="mt-0.5 text-xs font-semibold text-slate-200">
              {project.headlineMetric.label}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              {project.headlineMetric.context}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Full-Bleed Visual Preview with Zoom & Pan Affordance */}
      <div className="px-4 sm:px-5 pb-4">
        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title} dashboard in fullscreen zoom mode`}
          className="group relative block w-full overflow-hidden rounded-xl border border-white/15 bg-[#050810] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CF6F7] cursor-pointer"
        >
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={project.previewImage}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 94vw, 640px"
              quality={75}
              loading="lazy"
              decoding="async"
              className="object-cover object-top transition-transform duration-300 group-active:scale-[1.02]"
            />
            {/* Bottom gradient ensures action badge is always high-contrast */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#050810] shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-sans">
              <ZoomIn className="h-3.5 w-3.5 text-[#050810]" />
              Tap to Zoom &amp; Pan HD
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white border border-white/20">
              <Expand className="h-4 w-4" />
            </span>
          </div>
        </button>
      </div>

      {/* 4. Business Problem -> Engineered Resolution Narrative */}
      <div className="space-y-3 px-4 sm:px-5 pb-4">
        <div className="rounded-xl border-l-2 border-amber-400/80 bg-amber-500/[0.04] p-3.5 border border-amber-500/15">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Business Problem</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-200 font-sans">
            {project.problem}
          </p>
        </div>

        <div className="rounded-xl border-l-2 border-[#27CBCE]/80 bg-[#27CBCE]/[0.04] p-3.5 border border-[#27CBCE]/20">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#8CF6F7]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#27CBCE] shrink-0" />
            <span>Engineered Resolution</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-200 font-sans">
            {project.solution}
          </p>
        </div>
      </div>

      {/* 5. Collapsible Tech Stack */}
      <div className="border-t border-white/10 px-4 sm:px-5 py-3">
        <button
          type="button"
          onClick={() => setStackExpanded((v) => !v)}
          aria-expanded={stackExpanded}
          className="flex w-full items-center justify-between py-1 text-left text-xs font-semibold uppercase tracking-wider text-slate-300 cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-[#8CF6F7]" />
            Tech Stack ({project.stack.length})
          </span>
          {stackExpanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {stackExpanded && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-[#050810] px-2.5 py-1 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 6. Action Row (min 48px tap targets) */}
      <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 bg-[#050912]/80 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7] px-3.5 text-xs sm:text-sm font-bold text-[#050810] shadow-[0_0_20px_-4px_rgba(39,203,206,0.6)] active:scale-[0.98] cursor-pointer"
        >
          <ZoomIn className="h-4 w-4" />
          Inspect Visual
        </button>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
        >
          <span>{project.isCapstone ? 'Launch App' : 'Full Report'}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

/* ============================================================================
 * MOBILE PROJECTS VIEW CONTAINER (< 1024px)
 * ========================================================================== */

function MobileProjectsView() {
  const [inspectedProject, setInspectedProject] = useState<ProjectSpec | null>(null);

  return (
    <section
      id="projects-section-content"
      aria-labelledby="projects-heading-mobile"
      className="relative py-14 px-4 sm:px-6 bg-[#050810] text-slate-100 overflow-hidden scroll-mt-24"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-[#27CBCE]/10 blur-[100px] rounded-full"
      />

      <div className="relative mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27CBCE]/10 border border-[#27CBCE]/25 text-[#8CF6F7] text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineered Systems Catalog</span>
          </div>
          <h2
            id="projects-heading-mobile"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-serif"
          >
            Data Intelligence &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27CBCE] via-[#20B2AA] to-[#8CF6F7]">
              Autonomous Systems
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
            All 4 verified analytics models and autonomous engines. Tap any preview to inspect HD charts and zoom into metrics.
          </p>
        </div>

        {/* Vertical Stack of All 4 Project Cards */}
        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              totalCount={PROJECTS.length}
              onInspect={setInspectedProject}
            />
          ))}
        </div>

        {/* Technical Implementation Highlights */}
        <div className="mt-12 p-5 rounded-2xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/5 to-transparent">
          <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2.5 text-text-primary tracking-tight">
            <span className="text-accent-cyan text-2xl">⚡</span>
            Technical Highlights
          </h3>
          <div className="space-y-4">
            {techHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-xl border border-white/10 bg-[#0a0e1a]/90 p-4"
              >
                <div className="text-2xl mb-1.5">{highlight.icon}</div>
                <h4 className="text-base font-bold text-text-primary mb-1 font-serif tracking-tight">
                  {highlight.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen HD Portal Modal */}
      <ProjectVisualModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />
    </section>
  );
}

/* ============================================================================
 * DESKTOP PROJECTS VIEW (>= 1024px — 100% UNTOUCHED DESKTOP EXPERIENCE)
 * ========================================================================== */

function DesktopProjectsView() {
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

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
    if (activeProject.type === 'fullstack') {
      return (
        <div
          className={`relative flex flex-col bg-[#070B14] border border-[#27CBCE]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_-15px_rgba(39,203,206,0.22)] ${
            fullscreenMode ? 'h-full w-full' : 'h-full min-h-[540px]'
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
            <div className="relative flex-1 p-6 lg:p-7 flex flex-col justify-between overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,rgba(39,203,206,0.14),transparent_65%)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#27CBCE] font-semibold">
                    Autonomous NDR Recovery Loop
                  </p>
                  <h4 className="text-lg lg:text-xl font-bold text-white mt-1 break-words">
                    Event-Driven RTO Interception Pipeline
                  </h4>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                  Production Live
                </span>
              </div>

              {/* 4-Stage Pipeline Grid */}
              <div className="grid grid-cols-2 gap-3.5 my-auto">
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
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
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

    // Projects 01-03: Power BI Sandbox Stage
    return (
      <div
        className={`relative flex flex-col bg-[#070B14] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] ${
          fullscreenMode ? 'h-full w-full' : 'h-full min-h-[540px]'
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
              onClick={() => setShowInteractiveIframe(true)}
            >
              <img
                src={activeProject.previewImage}
                alt={`${activeProject.title} preview`}
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover/stage:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/45 group-hover/stage:bg-black/25 transition-colors duration-500" />

              <div className="relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-accent-cyan/50 bg-[#0a0e1a]/95 text-accent-cyan shadow-[0_0_25px_rgba(39,203,206,0.3)] group-hover/stage:shadow-[0_0_35px_rgba(39,203,206,0.55)] group-hover/stage:scale-105 transition-all">
                <Play className="h-4 w-4 fill-accent-cyan/30 text-accent-cyan" />
                <span className="text-sm font-semibold font-sans tracking-wide">
                  Click to launch interactive view
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
      id="projects-section-content"
      aria-labelledby="projects-heading"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#050810] text-slate-100 overflow-hidden scroll-mt-24"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[380px] bg-[#27CBCE]/10 blur-[150px] rounded-full"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
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

        {/* Desktop 4-Column Tabs */}
        <div
          role="tablist"
          aria-label="Portfolio Projects Index"
          className="grid grid-cols-4 gap-4 mb-8"
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
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectProject(project.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CF6F7] ${
                  isActive
                    ? 'bg-[#090E1A] border-[#27CBCE] shadow-[0_0_30px_-5px_rgba(39,203,206,0.35)] scale-[1.01]'
                    : 'bg-[#060A12]/80 border-white/10 hover:border-white/20 hover:bg-[#090E1A]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-sm font-bold tracking-wider ${
                      isActive ? 'text-[#8CF6F7]' : 'text-slate-400'
                    }`}
                  >
                    {project.index}
                  </span>
                  <div
                    className={`p-2 rounded-xl border transition-colors ${
                      isActive
                        ? 'bg-[#27CBCE]/15 border-[#27CBCE]/40 text-[#8CF6F7]'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {getProjectIcon(project.index, 'w-4 h-4')}
                  </div>
                </div>

                <div className="mb-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      project.isCapstone
                        ? 'bg-[#27CBCE]/20 text-[#8CF6F7] border border-[#27CBCE]/30'
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    {project.badgeText}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-white leading-snug line-clamp-2">
                  {project.shortTitle}
                </h3>

                {isActive && (
                  <motion.div
                    layoutId="desktop-active-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#8CF6F7] to-transparent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Dual-Column Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            id={`panel-${activeProject.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProject.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-12 gap-8 items-stretch"
          >
            {/* LEFT PANEL (5 Cols) */}
            <div className="col-span-5 flex flex-col justify-between p-6 lg:p-8 rounded-3xl bg-[#090E1A]/90 border border-white/10 shadow-2xl backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#27CBCE]">
                    {activeProject.domain}
                  </span>
                  {activeProject.isCapstone && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#27CBCE]/25 to-[#8CF6F7]/15 border border-[#8CF6F7]/40 text-[#8CF6F7] text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      CAPSTONE SHOWCASE
                    </span>
                  )}
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight font-serif">
                  {activeProject.title}
                </h3>

                {/* Hero KPI Banner */}
                <div className="mt-5 p-4 rounded-2xl bg-[#060B14]/90 border border-[#27CBCE]/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl lg:text-3xl font-bold font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[#27CBCE] to-[#8CF6F7]">
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

                {/* Problem & Resolution Cards */}
                <div className="mt-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 hover:border-amber-500/35 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400/90 mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Business Problem</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans">
                      {activeProject.problem}
                    </p>
                  </div>

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

              {/* Bottom Stack + Single Action CTA */}
              <div className="pt-6 border-t border-white/10 space-y-4">
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

            {/* RIGHT PANEL (7 Cols) — Mounted EXACTLY ONCE on Desktop */}
            <div className="col-span-7">{renderInteractiveStage(false)}</div>
          </motion.div>
        </AnimatePresence>

        {/* Technical Implementation Highlights */}
        <div className="mt-16 p-8 lg:p-10 rounded-3xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/5 to-transparent">
          <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3 text-text-primary tracking-tight">
            <span className="text-accent-cyan text-3xl">⚡</span>
            Technical Architecture Highlights
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {techHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/10 hover:border-accent-cyan/30 bg-[#0a0e1a]/90 p-6 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h4 className="text-lg lg:text-xl font-bold text-text-primary mb-2 font-serif tracking-tight">
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

      {/* FULLSCREEN SANDBOX MODAL (Desktop Only) */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
          >
            <div className="relative w-full h-full max-w-[1600px] max-h-[92vh] flex flex-col">
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen view"
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-50 p-2.5 rounded-full bg-[#0a0e1a] border border-[#27CBCE]/50 text-white hover:text-[#8CF6F7] hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(39,203,206,0.5)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex-1 w-full h-full overflow-hidden rounded-2xl">
                {renderInteractiveStage(true)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================================
 * ROOT COMPONENT — SINGLE BRANCH RENDERING (ZERO DUPLICATE DOM / IFRAMES)
 * ========================================================================== */

export default function ProjectsSection() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopProjectsView />;
  }

  return <MobileProjectsView />;
}
