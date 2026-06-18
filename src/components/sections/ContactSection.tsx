"use client";

import React, { useState, useTransition, useCallback, useRef, useEffect, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, FileText, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const contactChannels = [
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
    href: "/KONARK_PARIHAR.pdf",
    download: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Visit Profile",
    href: "https://www.linkedin.com/in/konarkparihar",
  },
];

type ContactChannelProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  download?: boolean;
};

function ContactChannelCard({ icon: Icon, label, value, href, download }: ContactChannelProps): React.JSX.Element {
  const content = (
    <div className="flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 shadow-glass-soft transition-all duration-300 hover:scale-[1.02] group/card" style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--card)',
    }}>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans font-medium">{label}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary font-sans truncate group-hover/card:text-accent-cyan transition-colors">{value}</p>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan group-hover/card:bg-accent-cyan/20 transition-colors">
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
        download={download}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deferredFormData = useDeferredValue(formData);
  const errorClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("contact-", "") as keyof typeof formErrors;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errorClearTimeoutRef.current) {
      clearTimeout(errorClearTimeoutRef.current);
    }

    if (formErrors[fieldName]) {
      errorClearTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          setFormErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        });
      }, 150);
    }
  }, [formErrors]);

  const validateForm = useCallback(() => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    startTransition(() => {
      setFormStatus("submitting");
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("Contact form error:", data);
        throw new Error(data.error || "Failed to send message");
      }

      startTransition(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      });
      setTimeout(() => {
        startTransition(() => setFormStatus("idle"));
      }, 3000);
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      startTransition(() => {
        setFormStatus("error");
      });
      setTimeout(() => {
        startTransition(() => setFormStatus("idle"));
      }, 3000);
    }
  }, [formData, validateForm]);

  return (
    <section id="contact" className="relative z-20 text-foreground border-t" style={{
      backgroundColor: 'var(--background-contact)',
      borderColor: 'var(--border-color)'
    }}>
      {/* Subtle turquoise ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(39,203,206,0.06),transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Context & Direct Channels */}
          <div className="space-y-10 sm:space-y-12">
            <div className="space-y-6">
              <motion.p 
                className="text-xs sm:text-sm uppercase tracking-[0.6em] text-accent-cyan font-sans font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Get in touch
              </motion.p>
              <motion.h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Let&rsquo;s work together
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-sans max-w-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I&apos;m always open to discussing new opportunities, collaborations, or data analytics projects. Reach out via the form or through my direct channels.
              </motion.p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary font-serif flex items-center gap-2">
                <span className="w-8 h-px bg-accent-cyan/30" />
                Direct Channels
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactChannels.map((channel) => (
                  <ContactChannelCard key={channel.label} {...channel} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <Card className="border-border bg-card/80 shadow-glass-soft backdrop-blur-sm sticky top-32">
              <CardContent className="space-y-4 pt-6 p-6 sm:p-8">
                {isMounted ? (
                  <form className="space-y-5" onSubmit={handleSubmit} suppressHydrationWarning>
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        suppressHydrationWarning
                        className={`w-full rounded-2xl border ${formErrors.name ? "border-red-500/50" : "border-border"
                          } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 font-sans`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        suppressHydrationWarning
                        className={`w-full rounded-2xl border ${formErrors.email ? "border-red-500/50" : "border-border"
                          } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 font-sans`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-text-primary mb-2 font-sans">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or opportunity..."
                        suppressHydrationWarning
                        className={`w-full rounded-2xl border ${formErrors.message ? "border-red-500/50" : "border-border"
                          } bg-white/5 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/60 resize-none font-sans`}
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.message}</p>
                      )}
                    </div>
                    {formStatus === "success" && (
                      <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300 font-sans">
                        Message sent successfully! I&apos;ll get back to you soon.
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300 font-sans">
                        Something went wrong. Please try again or use direct channels.
                      </div>
                    )}
                    <MagneticButton
                      intensity={0.5}
                      className="w-full"
                    >
                      <button 
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="w-full rounded-2xl bg-accent-cyan/90 px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-bright/60 disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center"
                      >
                        {formStatus === "submitting" ? "Sending..." : "Send Message"}
                      </button>
                    </MagneticButton>
                  </form>
                ) : (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
