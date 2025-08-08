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
      <body className={inter.className}>
        <Header /> {/* Add the header here */}
        {children}
      </body>
    </html>
  );
}
