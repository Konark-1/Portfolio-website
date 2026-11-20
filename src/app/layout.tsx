import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/header"; // Import the header
import Footer from "./components/footer"; // Import the footer

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konarkparihar.vercel.app"),
  title: "Konark Parihar | Business Analyst & KPI Specialist | Noida, Delhi NCR",
  description: "Business Analyst based in Noida, Delhi NCR. Specializing in KPI reporting, executive Power BI dashboards, SQL queries, process audits, and data quality workflows.",
  keywords: ["Business Analyst Noida", "KPI Reporting", "Power BI Developer", "SQL Analyst", "Data Operations Analyst", "Process & Data Quality", "Konark Parihar", "DAX Star Schema", "Business Analyst Delhi NCR"],
  openGraph: {
    title: "Konark Parihar | Business Analyst & KPI Specialist | Delhi NCR",
    description: "Business Analyst combining corporate operations experience with quantitative AI evaluation, executive Power BI dashboards, and SQL data audits.",
    url: "https://konarkparihar.vercel.app",
    siteName: "Konark Parihar Portfolio",
    images: [
      {
        url: "/og-thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Konark Parihar - Business Analyst Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konark Parihar | Business Analyst & KPI Specialist | Delhi NCR",
    description: "Business Analyst combining corporate operations with executive Power BI dashboards and SQL data audits.",
    images: ["/og-thumbnail.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Konark Parihar",
  "url": "https://konarkparihar.vercel.app",
  "jobTitle": "Business Analyst",
  "alumniOf": "Amity University",
  "sameAs": [
    "https://www.linkedin.com/in/konarkparihar",
    "https://github.com/Konark-1"
  ],
  "knowsAbout": ["Business Analysis", "KPI Reporting", "Power BI", "SQL", "Data Quality Audits", "DAX", "Process Optimization", "Python"],
  "description": "Business Analyst based in Noida, Delhi NCR specializing in KPI reporting, executive Power BI dashboards, and SQL data audits."
};

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Mobile viewport optimization (allow zoom for accessibility) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#27CBCE" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Network hints for faster Power BI connect on first paint */}
        <link rel="preconnect" href="https://app.powerbi.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.powerbi.com" />
        <link rel="preconnect" href="https://app.fabric.microsoft.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.fabric.microsoft.com" />
        <link rel="preconnect" href="https://wabi-us-east2-redirect.analysis.windows.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wabi-us-east2-redirect.analysis.windows.net" />

        {/* Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Automatic Cache/ServiceWorker Cleanup for Fresh Builds */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var i = 0; i < regs.length; i++) regs[i].unregister();
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} dark`} suppressHydrationWarning>
        <Header /> {/* Add the header here */}
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
