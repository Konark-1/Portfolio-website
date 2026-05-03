"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/konarkparihar", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Konark-1", label: "GitHub" },
    { icon: Mail, href: "mailto:konarkofficial@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative z-30 border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-serif text-2xl font-bold text-text-primary tracking-tight">
              Konark<span className="text-accent-cyan">.</span>Parihar
            </h3>
            <p className="text-sm text-text-muted font-sans">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <MagneticButton key={social.label} intensity={0.7}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-accent-cyan transition-colors duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Decorative bottom bar */}
        <div className="mt-12 h-1 w-full bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
      </div>
    </footer>
  );
}
