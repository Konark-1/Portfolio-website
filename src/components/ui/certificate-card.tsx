"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Download, Maximize2, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface CertificateCardProps {
  title: string;
  description?: string;
  filePath: string;
  imagePath?: string;
  issuer?: string;
  date?: string;
  index: number;
}

export function CertificateCard({
  title,
  description,
  filePath,
  imagePath,
  issuer,
  date,
  index,
}: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImage = imagePath && (imagePath.endsWith('.png') || imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg'));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 via-white/5 to-transparent backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 blur-xl" />
          
          {/* Certificate Image/Preview - Main Focus */}
          <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {hasImage ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={imagePath!}
                  alt={title}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </motion.div>
            ) : (
              <iframe
                src={`${filePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-full border-0"
                title={title}
                loading="lazy"
              />
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
            
            {/* Hover overlay with action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
              >
                <div className="flex items-center gap-2 text-white">
                  <Maximize2 className="h-5 w-5" />
                  <span className="text-sm font-medium">View Full Size</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Badge */}
            {issuer && (
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-lg"
                >
                  {issuer}
                </motion.div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="relative z-10 p-6 space-y-3">
            {/* Icon and Title */}
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-blue-500/20 border border-accent-cyan/30"
              >
                <Award className="h-5 w-5 text-accent-cyan" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors duration-300 line-clamp-2 leading-tight font-serif">
                  {title}
                </h3>
                {date && (
                  <p className="text-xs text-text-muted mt-1 font-sans">{date}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-text-muted leading-relaxed line-clamp-2 font-sans">
                {description}
              </p>
            )}

            {/* Action Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(filePath, '_blank');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan/20 to-blue-500/20 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:from-accent-cyan/30 hover:to-blue-500/30 transition-all duration-300 group/btn font-sans"
            >
              <Download className="h-4 w-4 group-hover/btn:translate-y-[-2px] transition-transform" />
              <span>Download PDF</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
            </motion.button>
          </div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={false}
            animate={{
              background: isHovered
                ? "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)"
                : "transparent",
            }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundPosition: isHovered ? "200% 0" : "-200% 0",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Full-Size Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between p-6 bg-gradient-to-b from-gray-900/95 to-transparent border-b border-white/10">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1 font-serif">{title}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-muted font-sans">
                      {issuer && <span>{issuer}</span>}
                      {date && issuer && <span>•</span>}
                      {date && <span>{date}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={filePath}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan/20 hover:bg-accent-cyan/30 border border-accent-cyan/30 text-accent-cyan text-sm font-medium transition-all font-sans"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </motion.a>
                    
                    <motion.button
                      onClick={() => setIsModalOpen(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Certificate Display */}
                <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-950 to-black">
                  <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
                    {hasImage ? (
                      <div className="relative w-full h-full max-h-[70vh]">
                        <Image
                          src={imagePath!}
                          alt={title}
                          fill
                          className="object-contain"
                          sizes="100vw"
                        />
                      </div>
                    ) : (
                      <iframe
                        src={`${filePath}#toolbar=1&navpanes=1`}
                        className="w-full h-full min-h-[600px] border-0 rounded-xl"
                        title={title}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
