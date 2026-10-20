'use client';

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
    (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)
  );
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkTouch();
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
    mql.addEventListener('change', checkTouch);
    return () => mql.removeEventListener('change', checkTouch);
  }, []);
  return isTouch;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window === 'undefined') return;
      // Screen-width driven layout check (<= 768px is mobile view)
      setIsMobile(window.innerWidth <= 768);
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
