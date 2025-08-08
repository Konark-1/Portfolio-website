import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header"; // Import the header

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Regalia%20Monarch.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Regalia%20Monarch.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Header /> {/* Add the header here */}
        {children}
      </body>
    </html>
  );
}
