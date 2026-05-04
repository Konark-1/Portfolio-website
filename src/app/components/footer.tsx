"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Linkedin, Github, MessageCircle, ArrowUp } from 'lucide-react';
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(39, 203, 206, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(39, 203, 206, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(39, 203, 206, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 203, 206, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(39, 203, 206, 0.15) 0%, 
    rgba(0, 0, 0, 0) 70%
  );
}

.footer-glass-pill {
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 
      0 10px 30px -10px rgba(0, 0, 0, 0.5), 
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(39, 203, 206, 0.3);
  box-shadow: 
      0 20px 40px -10px rgba(0, 0, 0, 0.7), 
      inset 0 1px 1px rgba(39, 203, 206, 0.2);
  color: white;
}

.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(39, 203, 206, 0.08);
  background: linear-gradient(180deg, rgba(39, 203, 206, 0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(39, 203, 206, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(39, 203, 206, 0.3));
}
`;

const MagneticButton = ({ children, className, ...props }: any) => {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = localRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove as any);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove as any);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  const Tag = props.href ? "a" : "button";

  return (
    <Tag
      ref={localRef}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Data Analytics</span> <span className="text-accent-cyan/60">✦</span>
    <span>AI Innovation</span> <span className="text-accent-cyan/60">✦</span>
    <span>Strategic Insights</span> <span className="text-accent-cyan/60">✦</span>
    <span>Visual Storytelling</span> <span className="text-accent-cyan/60">✦</span>
    <span>Scalable Solutions</span> <span className="text-accent-cyan/60">✦</span>
    <span>Precision Analysis</span> <span className="text-accent-cyan/60">✦</span>
  </div>
);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.9, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Links/Content Staggered Reveal
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  // Animation for heading reveal (Motion.dev / Framer Motion style)
  const headingWords = "Let's create something impactful together.".split(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Spacer to allow reveal effect */}
      <div
        ref={wrapperRef}
        className="relative h-[400px] w-full pointer-events-none"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-[400px] w-full flex-col justify-between bg-[#0A0E1A] text-foreground py-12 md:py-16 z-0 pointer-events-auto">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-40" />

          {/* Giant background text - moved to a container with overflow-hidden */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              ref={giantTextRef}
              className="footer-giant-bg-text absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap select-none uppercase opacity-20"
            >
              Konark
            </div>
          </div>

          {/* Main Center Content - Social Pills only */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 w-full max-w-6xl mx-auto">
            {/* Interactive Magnetic Social Pills */}
            <div ref={linksRef} className="flex flex-wrap justify-center gap-4 md:gap-8 w-full">
              <MagneticButton 
                href="https://www.linkedin.com/in/konarkparihar" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-bold text-sm md:text-lg flex items-center gap-3 group"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-accent-cyan group-hover:text-white transition-colors" />
                LinkedIn
              </MagneticButton>
              
              <MagneticButton 
                href="https://github.com/Konark-1" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-bold text-sm md:text-lg flex items-center gap-3 group"
              >
                <Github className="w-5 h-5 md:w-6 md:h-6 text-accent-cyan group-hover:text-white transition-colors" />
                GitHub
              </MagneticButton>

              <MagneticButton 
                href="https://wa.me/918800957178" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-bold text-sm md:text-lg flex items-center gap-3 group"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-cyan group-hover:text-white transition-colors" />
                WhatsApp
              </MagneticButton>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
            
            {/* Copyright */}
            <div className="text-text-muted text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {currentYear} Konark Parihar. All rights reserved.
            </div>

            {/* Back to top */}
            <MagneticButton
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-text-muted hover:text-white group order-3"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
