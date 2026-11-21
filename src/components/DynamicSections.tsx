"use client";

import React from "react";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { StackedCardCertificates } from "@/components/ui/stacked-card-certificates";
import ContactSection from "@/components/sections/ContactSection";

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

export default function DynamicSections() {
  return (
    <>
      <div id="projects" className="scroll-mt-24">
        <ProjectsSection />
      </div>

      <div id="certificates" className="scroll-mt-24">
        <StackedCardCertificates certificates={CERTIFICATES_DATA} />
      </div>

      <div id="contact" className="scroll-mt-24">
        <ContactSection />
      </div>
    </>
  );
}
