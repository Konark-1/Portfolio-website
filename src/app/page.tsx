"use client";

import { lazy, Suspense, useState } from 'react';
import GlassSurface from "@/components/react-bits/GlassSurface/GlassSurface";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Code2,
  Database,
  FileText,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ContactLinkProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};


// Lazy load the heavy WebGL component
const LiquidChrome = lazy(() => import("@/components/react-bits/LiquidChrome/LiquidChrome"));

export default function HomePage() {
  const contactItems = [
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
      icon: MapPin,
      label: "Location",
      value: "Noida, Uttar Pradesh 201301",
    },
  ];

  const stats = [
    { number: "6+", label: "Months Experience" },
    { number: "100%", label: "Data Accuracy" },
    { number: "Nov 2025", label: "Recent Certification" },
  ];

  const highlights = [
    {
      title: "AI-Powered Workflow",
      description: "3x faster SQL/Python delivery using AI copilots while keeping quality checks in place.",
    },
    {
      title: "Commerce + Analytics",
      description: "B.Com foundations plus real-world claims analytics for healthcare & insurance domains.",
    },
    {
      title: "Power BI Storytelling",
      description: "Specialist in immersive dashboards with DAX, governed datasets, and decision-grade visuals.",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/konarkparihar",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/KonarkParihar",
      label: "GitHub",
    },
  ];

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

  const projectPlaceholders = [
    {
      title: "Weather Analytics Dashboard",
      focus: "Power BI",
      status: "In review",
      description:
        "Real-time monitoring across Indian cities with AQI, forecast overlays, and sunrise/sunset metrics.",
    },
    {
      title: "Healthcare Provider Network",
      focus: "Excel + Database",
      status: "Case study draft",
      description:
        "Process automation story from the Xceedance experience showing data hygiene and reporting rigor.",
    },
    {
      title: "AI-Assisted Data Cleaning",
      focus: "Python",
      status: "Code polish",
      description:
        "ETL pipeline demonstrating how copilots accelerate wrangling without compromising audit trails.",
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
      href: "/resume.pdf",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/konarkparihar",
      href: "https://www.linkedin.com/in/konarkparihar",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Connection warming handled via preconnect/dns-prefetch in layout */}

      {/* Hero section with LiquidChrome background - limited to hero only */}
      <div className="relative min-h-screen overflow-hidden">
        {/* LiquidChrome background only for hero section */}
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

      {/* About & Overview Section */}
      <section id="about" className="relative z-10 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 space-y-12">
          <div className="flex flex-col gap-6 sm:gap-8">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted">
              Get to know me
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="heading-2 text-text-primary mb-3">About Me</h2>
                <p className="max-w-3xl text-lg text-text-muted">
                  Detail-oriented data analyst blending a commerce foundation with modern BI tooling.
                  I thrive on turning messy, high-volume datasets into accurate, actionable stories that help
                  stakeholders decide faster.
                </p>
              </div>
              <Badge className="self-start sm:self-auto text-background bg-accent-cyan/90 px-4 py-2 text-sm font-semibold">
                🟢 Available for opportunities
              </Badge>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-0 backdrop-blur-xl shadow-glass-soft">
              <CardHeader className="space-y-6 border-b border-white/5">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-3xl bg-accent-bright/30" />
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-accent-bright/20 via-accent-cyan/40 to-highlight/25 text-3xl font-semibold text-text-primary shadow-glass">
                      KP
                      <span className="absolute inset-[-6px] rounded-full border border-accent-bright/40 opacity-70" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-text-primary">Konark Parihar</CardTitle>
                    <p className="text-sm text-text-muted">Data Analyst & BI Specialist</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  {contactItems.map((item) => (
                    <ContactLink key={item.label} {...item} />
                  ))}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-text-muted mb-3">
                    Connect
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-text-primary transition hover:-translate-y-0.5 hover:border-accent-cyan/60 hover:text-accent-cyan"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-10">
              <motion.div
                className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 sm:p-8 shadow-glass-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-text-primary">
                  I recently completed the Data Analyst certification from Ducat, Noida (Nov 2025) while
                  applying my skills inside the Medical Provider Network team at Xceedance Consulting. The
                  role demanded 100% accuracy on sensitive healthcare data — a standard I continue to uphold
                  in every dashboard, SQL procedure, and insight narrative.
                </p>
                <p className="text-base text-text-muted">
                  Beyond day-to-day deliveries, I’m known for building AI-assisted workflows that reduce
                  repetitive legwork. This gives clients Power BI experiences that feel cinematic on the
                  surface yet are powered by deeply governed data practices underneath.
                </p>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 via-white/0 to-transparent p-5 flex gap-3"
                  >
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{highlight.title}</p>
                      <p className="text-sm text-text-muted mt-1">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Projects Section (Flow-inspired tabs) */}
      <section id="projects" className="relative z-10 bg-black text-white py-16 sm:py-24 lg:py-32 overflow-hidden cv-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl chrome-text">Projects</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-300 max-w-3xl mx-auto px-2">
              A cinematic showcase of interactive analytics. Explore embedded Power BI dashboards with smooth, polished interactions.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="sticky top-20 sm:top-24 z-20 bg-gradient-to-b from-black via-black/95 to-transparent pb-6 sm:pb-8 pt-4 pointer-events-none">
            <Suspense fallback={<div className="h-12" />}>
              <ProjectsTabs />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Project Cards Framework */}
      <section id="featured-projects" className="relative z-10 bg-background text-foreground border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.55em] text-text-muted">Project library</p>
            <h2 className="heading-2 text-text-primary">Case studies & dashboards</h2>
            <p className="text-text-muted max-w-3xl mx-auto">
              Scaffold for 21st.dev inspired cards. Each placeholder card is ready for another agent to inject imagery,
              metrics, and CTAs without touching layout.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projectPlaceholders.map((project) => (
              <ProjectPlaceholderCard key={project.title} {...project} />
            ))}
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
            <h2 className="heading-2 text-text-primary">Let's work together</h2>
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

function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState<'consistent' | 'seamless' | 'cinematic'>("cinematic");
  const [hoverTab, setHoverTab] = useState<null | 'consistent' | 'seamless' | 'cinematic'>(null);
  const [loadedState, setLoadedState] = useState<Record<'consistent' | 'seamless' | 'cinematic', boolean>>({
    cinematic: false,
    seamless: false,
    consistent: false,
  });


  const tabs = [
    { key: 'cinematic' as const, label: 'Adaptive Visuals' },
    { key: 'seamless' as const, label: 'Macro and Micro level Analysis' },
    { key: 'consistent' as const, label: 'Distribution and Trend Analysis' },
  ];

  const displayed = hoverTab ?? activeTab;

  return (
    <div className="mt-6 sm:mt-12 pointer-events-auto">
      {/* Full-width titles row with blur like reference */}
      <div className="ml-[calc(50%-50vw)] w-screen">
        <div className="border-t border-white/15 bg-gradient-to-b from-white/5 via-white/0 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 sm:gap-4">
            {tabs.map(({ key, label }) => {
              const isDisplayed = displayed === key;
              return (
                <h3
                  key={key}
                  onMouseEnter={() => setHoverTab(key)}
                  onMouseLeave={() => setHoverTab(null)}
                  onClick={() => setActiveTab(key)}
                  className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-pointer select-none text-center
                    transition-all duration-300 ease-in-out
                    ${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}
                    ${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}
                    py-2 px-4 rounded-lg w-full sm:w-auto
                    ${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/8'}
                    shadow-md
                  `}
                  style={{ 
                    fontSize: 'clamp(0.875rem, 1rem, 2.5rem)' 
                  }}
                >
                  {label}
                </h3>
              );
            })}
          </div>
        </div>
      </div>


      {/* Content area */}
      <div className="mt-6 sm:mt-10">
        {/* Keep DOM of all three iframes mounted to preload and avoid switching lag */}
        <div className="mx-auto w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[74vw] px-0">
          <div className="relative rounded-[22px] md:rounded-[24px] overflow-hidden bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            {/* Turquoise glow border */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -inset-2 rounded-[28px] bg-teal-400/20 blur-xl" />
              <div className="absolute inset-0 rounded-[22px] ring-1 ring-teal-400/20" />
            </div>

            {/* Shared aspect-ratio container */}
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ease-out z-[5]`}
                style={{ opacity: loadedState[(hoverTab ?? activeTab)] ? 0 : 1, pointerEvents: 'none' }}
              />
              {/* Cinematic */}
              <iframe
                title="Project 3"
                src="https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'cinematic' ? 2 : 1, opacity: activeTab === 'cinematic' ? (loadedState?.cinematic ? 1 : 0) : 0, transform: activeTab === 'cinematic' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'cinematic' ? (loadedState?.cinematic ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={activeTab === 'cinematic' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, cinematic: true }))}
              />

              {/* Seamless */}
              <iframe
                title="Project2"
                src="https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'seamless' ? 2 : 1, opacity: activeTab === 'seamless' ? (loadedState?.seamless ? 1 : 0) : 0, transform: activeTab === 'seamless' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'seamless' ? (loadedState?.seamless ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={activeTab === 'seamless' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, seamless: true }))}
              />

              {/* Consistent */}
              <iframe
                title="project"
                src="https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'consistent' ? 2 : 1, opacity: activeTab === 'consistent' ? (loadedState?.consistent ? 1 : 0) : 0, transform: activeTab === 'consistent' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'consistent' ? (loadedState?.consistent ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={activeTab === 'consistent' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, consistent: true }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ContactLinkProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

function ContactLink({ icon: Icon, label, value, href }: ContactLinkProps) {
  const content = (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 transition hover:border-accent-cyan/50 hover:bg-white/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-text-muted">{label}</p>
        <p className="text-sm font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

type StatCardProps = {
  number: string;
  label: string;
};

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-glass-soft">
      <p className="text-3xl font-semibold text-text-primary">{number}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-text-muted">
        {label}
      </p>
    </div>
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

type ProjectPlaceholderProps = {
  title: string;
  focus: string;
  status: string;
  description: string;
};

function ProjectPlaceholderCard({ title, focus, status, description }: ProjectPlaceholderProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-glass-soft space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="uppercase tracking-[0.4em] text-text-muted">{focus}</span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-text-muted">
          {status}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan hover:text-accent-bright focus:outline-none"
      >
        Prep case study <Send className="h-4 w-4" />
      </button>
    </div>
  );
}

type ContactChannelProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

function ContactChannelCard({ icon: Icon, label, value, href }: ContactChannelProps) {
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
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
      >
        {content}
      </a>
    );
  }

  return content;
}
