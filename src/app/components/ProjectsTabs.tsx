"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState<'consistent' | 'seamless' | 'cinematic'>("cinematic");
  const [hoverTab, setHoverTab] = useState<null | 'consistent' | 'seamless' | 'cinematic'>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loadedState, setLoadedState] = useState<Record<'consistent' | 'seamless' | 'cinematic', boolean>>({
    cinematic: false,
    seamless: false,
    consistent: false,
  });
  const [preloadAll, setPreloadAll] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Preload iframes when section is near viewport
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setPreloadAll(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.01, rootMargin: "600px 0px 600px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const tabs = [
    { key: 'cinematic' as const, label: 'Adaptive Visuals' },
    { key: 'seamless' as const, label: 'Macro and Micro level Analysis' },
    { key: 'consistent' as const, label: 'Distribution and Trend Analysis' },
  ];

  const displayed = hoverTab ?? activeTab;
  
  // Optimized hover handlers to reduce INP
  const handleMouseEnter = useCallback((key: 'consistent' | 'seamless' | 'cinematic') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoverTab(key);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    // Debounce hover leave to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverTab(null);
    }, 50);
  }, []);
  
  const handleTabClick = useCallback((key: 'consistent' | 'seamless' | 'cinematic') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveTab(key);
  }, []);

  return (
    <div ref={rootRef} className="mt-6 sm:mt-12 pointer-events-auto">
      {/* Full-width titles row with blur like reference */}
      <div className="ml-[calc(50%-50vw)] w-screen">
        <div className="border-t border-white/15 bg-gradient-to-b from-white/5 via-white/0 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 sm:gap-4">
            {tabs.map(({ key, label }) => {
              const isDisplayed = displayed === key;
              return (
                <h3
                  key={key}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleTabClick(key)}
                  className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-pointer select-none text-center
                    transition-all duration-300 ease-in-out
                    ${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}
                    ${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}
                    py-2 px-4 rounded-lg w-full sm:w-auto
                    ${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/8'}
                    shadow-md
                  `}
                  style={{ 
                    fontSize: 'clamp(0.875rem, 1rem, 2.5rem)' 
                  }}
                >
                  {label}
                </h3>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mt-6 sm:mt-10">
        {/* Keep DOM of all three iframes mounted to preload and avoid switching lag */}
        <div className="mx-auto w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[74vw] px-0">
          <div className="relative rounded-[22px] md:rounded-[24px] overflow-hidden bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            {/* Turquoise glow border */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -inset-2 rounded-[28px] bg-teal-400/20 blur-xl" />
              <div className="absolute inset-0 rounded-[22px] ring-1 ring-teal-400/20" />
            </div>

            {/* Shared aspect-ratio container */}
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ease-out z-[5]`}
                style={{ opacity: loadedState[(hoverTab ?? activeTab)] ? 0 : 1, pointerEvents: 'none' }}
              />
              {/* Cinematic */}
              <iframe
                title="Project 3"
                src="https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'cinematic' ? 2 : 1, opacity: activeTab === 'cinematic' ? (loadedState?.cinematic ? 1 : 0) : 0, transform: activeTab === 'cinematic' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'cinematic' ? (loadedState?.cinematic ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={preloadAll || activeTab === 'cinematic' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, cinematic: true }))}
              />

              {/* Seamless */}
              <iframe
                title="Project2"
                src="https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'seamless' ? 2 : 1, opacity: activeTab === 'seamless' ? (loadedState?.seamless ? 1 : 0) : 0, transform: activeTab === 'seamless' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'seamless' ? (loadedState?.seamless ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={preloadAll || activeTab === 'seamless' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, seamless: true }))}
              />

              {/* Consistent */}
              <iframe
                title="project"
                src="https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9&pageName=ReportSection&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImhpZGVBbmdsZVBhbmVsIjpmYWxzZSwiaGlkZUZvb3RlciI6ZmFsc2UsImRpc2FibGVGaWx0ZXJQYW5lbCI6ZmFsc2UsImRpc2FibGVWaXN1YWxQYW5lbCI6ZmFsc2UsImRpc2FibGVXZWJDb250ZXh0TWVudSI6ZmFsc2UsImRpc2FibGVBbmFseXppbmdQYW5lbCI6ZmFsc2UsImRpc2FibGVGb2N1c01vZGUiOmZhbHNlLCJkaXNhYmxlU2VhcmNoUGFuZWwiOmZhbHNlLCJkaXNhYmxlUGFnZU5hdmlnYXRvciI6ZmFsc2UsImRpc2FibGVTbGljZXJzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2VsZWN0aW9uUGFuZWwiOmZhbHNlLCJkaXNhYmxlQm9va21hcmtzUGFuZWwiOmZhbHNlLCJkaXNhYmxlU2V0dGluZ3NQYW5lbCI6ZmFsc2UsImRpc2FibGVJbnNpZ2h0c1BhbmVsIjpmYWxzZX19"
                className="absolute inset-0 h-full w-full [transform:translateX(0%)_scaleX(1.05)] origin-center"
                style={{ border: '0', backgroundColor: '#000', zIndex: activeTab === 'consistent' ? 2 : 1, opacity: activeTab === 'consistent' ? (loadedState?.consistent ? 1 : 0) : 0, transform: activeTab === 'consistent' ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)', pointerEvents: activeTab === 'consistent' ? (loadedState?.consistent ? 'auto' : 'none') : 'none', visibility: 'visible', transition: 'opacity 400ms ease-out' }}
                allowFullScreen
                loading={preloadAll || activeTab === 'consistent' ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoadedState(prev => ({ ...prev, consistent: true }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


