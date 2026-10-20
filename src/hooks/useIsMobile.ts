import { useState, useEffect } from 'react';

/**
 * Robust detection for iOS devices (iPhone, iPad, iPod),
 * including iPadOS 13+ which masks itself as Macintosh desktop with touch points.
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIOSPlatform = /iPad|iPhone|iPod/.test(ua);
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return isIOSPlatform || isIPadOS;
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)
  );
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      const isNarrowScreen = width <= 768;
      const isMediumTouch = width <= 1024 && isTouchDevice();
      const iOS = isIOS();

      // Check user agent for common mobile devices
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      const isMobileAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

      // If it's iOS, any touch tablet/phone, narrow screen, or mobile user agent, treat as mobile
      setIsMobile(isNarrowScreen || isMediumTouch || iOS || isMobileAgent);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile, { passive: true });
    window.addEventListener('orientationchange', checkIsMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, []);

  return isMobile;
}

