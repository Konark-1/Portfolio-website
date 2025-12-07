import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/header"; // Import the header
import Script from "next/script";
import CursorMount from "./components/CursorMount";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  display: "swap", 
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Konark - Data Analyst Portfolio",
  description: "Portfolio of Konark, a skilled data analyst.",
};

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
        <meta name="theme-color" content="#000000" />
        
        {/* Network hints for faster Power BI connect on first paint */}
        <link rel="preconnect" href="https://app.powerbi.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.powerbi.com" />
        <link rel="preconnect" href="https://app.fabric.microsoft.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.fabric.microsoft.com" />
        <link rel="preconnect" href="https://wabi-us-east2-redirect.analysis.windows.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wabi-us-east2-redirect.analysis.windows.net" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} dark`}>
        <Script src="/pbi-resize.js" strategy="afterInteractive" />
        <CursorMount />
        <Header /> {/* Add the header here */}
        {children}
      </body>
    </html>
  );
}
