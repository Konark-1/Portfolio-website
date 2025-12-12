"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SmoothCursor = dynamic(() => import("@/components/ui/smooth-cursor").then(m => m.SmoothCursor), {
  ssr: false,
});

export default function CursorMount() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch device
    const isMobileDevice = () => {
      if (typeof window === "undefined") return true;
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileUA = mobileRegex.test(userAgent.toLowerCase());
      
      // Check screen size (mobile typically < 768px)
      const isSmallScreen = window.innerWidth < 768;
      
      // Check for touch capability
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check media queries for pointer and hover
      const hasFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
      const hasHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
      
      // Disable if mobile UA, small screen, or touch device without fine pointer/hover
      return isMobileUA || (isSmallScreen && hasTouchScreen) || !(hasFinePointer && hasHover);
    };

    // Only mount on devices with fine pointer and hover capability (not mobile)
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !isMobileDevice();

    if (!canUseCustomCursor) return;

    const idle = (cb: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as Window & {
          requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        }).requestIdleCallback(() => cb(), { timeout: 1500 });
        return;
      }
      setTimeout(cb, 500);
    };

    idle(() => setShouldMount(true));
  }, []);

  if (!shouldMount) return null;
  return <SmoothCursor />;
}



