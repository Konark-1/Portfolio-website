"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  const sequence = [
    "INITIALIZING CORE SYSTEMS...",
    "LOADING NEURAL MODULES...",
    "CONNECTING TO DATA GRID...",
    "OPTIMIZING VIEWPORT...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800); // Wait for exit animation
        }, 500);
        return;
      }

      setText(prev => [...prev, sequence[currentIndex]]);
      currentIndex++;
    }, 300); // Speed of text appearing

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-emerald-500 font-mono"
        >
          <div className="w-full max-w-md p-8 space-y-4">
             <div className="flex items-center gap-2 mb-6 border-b border-emerald-500/30 pb-2">
                <Terminal className="w-5 h-5" />
                <span className="text-sm tracking-widest">SYSTEM_BOOT_SEQUENCE</span>
             </div>
             
             <div className="space-y-2 text-sm h-40">
                {text.map((line, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-emerald-500/50">{`>`}</span>
                    <span>{line}</span>
                  </motion.div>
                ))}
             </div>

             <motion.div 
               className="h-1 bg-emerald-500/20 rounded-full overflow-hidden mt-8"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
             >
                <motion.div 
                  className="h-full bg-emerald-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




