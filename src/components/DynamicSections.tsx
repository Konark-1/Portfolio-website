"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, type ReactNode } from "react";

const SECTION_HEIGHTS = {
  projects: "min-h-[1420px] md:min-h-[980px] lg:min-h-[860px]",
  certificates: "min-h-[680px] md:min-h-[620px]",
  contact: "min-h-[760px] md:min-h-[640px]",
} as const;

function SectionSkeleton({
  heightClass,
  label,
}: {
  heightClass: string;
  label: string;
}) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={`Loading ${label}`}
      className={`w-full ${heightClass} rounded-2xl border border-[#27CBCE]/10 bg-[#050810] contain-layout`}
    />
  );
}

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton heightClass={SECTION_HEIGHTS.projects} label="Projects" />
    ),
  }
);

const StackedCardCertificates = dynamic(
  () => import("@/components/ui/stacked-card-certificates").then((m) => m.StackedCardCertificates),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton
        heightClass={SECTION_HEIGHTS.certificates}
        label="Certificates"
      />
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton heightClass={SECTION_HEIGHTS.contact} label="Contact" />
    ),
  }
);

const CERTIFICATES_DATA = [
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
];

function ViewportGate({
  id,
  heightClass,
  cvHeight,
  rootMargin = "350px 0px",
  disableContentVisibility = false,
  children,
}: {
  id: string;
  heightClass: string;
  cvHeight: string;
  rootMargin?: string;
  disableContentVisibility?: boolean;
  children: ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // Immediate mount if user arrived via deep link (#projects, #certificates, #contact)
    if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
      setShouldMount(true);
      return;
    }

    const onHashChange = () => {
      if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
        setShouldMount(true);
      }
    };
    window.addEventListener("hashchange", onHashChange);

    const onMountSection = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === id) {
        setShouldMount(true);
      }
    };
    window.addEventListener("mount-section", onMountSection);

    const el = hostRef.current;
    if (!el) {
      return () => {
        window.removeEventListener("hashchange", onHashChange);
        window.removeEventListener("mount-section", onMountSection);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("mount-section", onMountSection);
    };
  }, [id, rootMargin]);

  return (
    <div
      id={id}
      ref={hostRef}
      className={`w-full ${heightClass} ${disableContentVisibility ? "" : "cv-auto"} scroll-mt-24`}
      style={{ "--cv-height": cvHeight } as React.CSSProperties}
    >
      {shouldMount ? children : <SectionSkeleton heightClass={heightClass} label={id} />}
    </div>
  );
}

export default function DynamicSections() {
  // Prewarm dynamic chunks during browser idle time so mobile users experience zero load latency
  useEffect(() => {
    const prewarm = () => {
      import("@/components/ui/stacked-card-certificates");
      import("@/components/sections/ProjectsSection");
    };
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(prewarm);
      } else {
        setTimeout(prewarm, 1000);
      }
    }
  }, []);

  return (
    <>
      <ViewportGate
        id="projects"
        heightClass={SECTION_HEIGHTS.projects}
        cvHeight="980px"
        rootMargin="500px 0px"
        disableContentVisibility
      >
        <ProjectsSection />
      </ViewportGate>

      <ViewportGate
        id="certificates"
        heightClass={SECTION_HEIGHTS.certificates}
        cvHeight="640px"
        rootMargin="800px 0px"
        disableContentVisibility
      >
        <StackedCardCertificates certificates={CERTIFICATES_DATA} />
      </ViewportGate>

      <ViewportGate
        id="contact"
        heightClass={SECTION_HEIGHTS.contact}
        cvHeight="680px"
      >
        <ContactSection />
      </ViewportGate>
    </>
  );
}
