import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/header"; // Import the header
import Script from "next/script";
import CursorMount from "./components/CursorMount";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Konark Parihar - Data Analyst & AI Innovator",
  description: "Multi-disciplinary technologist & AI innovator. Built full-stack portfolio with interactive dashboards and analytics. Leveraging Generative AI for 3x faster insights.",
  openGraph: {
    title: "Konark Parihar - Data Analyst & AI Innovator",
    description: "Multi-disciplinary technologist & AI innovator. Built full-stack portfolio with interactive dashboards and analytics. Leveraging Generative AI for 3x faster insights.",
    url: "https://konarkparihar.vercel.app",
    siteName: "Konark Parihar Portfolio",
    images: [
      {
        url: "https://konarkparihar.vercel.app/og-thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Konark Parihar - Data Analyst & AI Innovator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konark Parihar - Data Analyst & AI Innovator",
    description: "Multi-disciplinary technologist & AI innovator. Built full-stack portfolio with interactive dashboards and analytics. Leveraging Generative AI for 3x faster insights.",
    images: ["https://konarkparihar.vercel.app/og-thumbnail.webp"],
  },
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
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Network hints for faster Power BI connect on first paint */}
        <link rel="preconnect" href="https://app.powerbi.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.powerbi.com" />
        <link rel="preconnect" href="https://app.fabric.microsoft.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.fabric.microsoft.com" />
        <link rel="preconnect" href="https://wabi-us-east2-redirect.analysis.windows.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wabi-us-east2-redirect.analysis.windows.net" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} dark`} suppressHydrationWarning>
        <ServiceWorkerRegistration />
        <Script src="/pbi-resize.js" strategy="afterInteractive" />
        <CursorMount />
        <Header /> {/* Add the header here */}
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
