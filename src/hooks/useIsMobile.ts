import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check screen width
      const isNarrowScreen = window.innerWidth <= 768;
      
      // Check for touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check user agent for common mobile devices
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

      setIsMobile(isNarrowScreen || (hasTouch && isMobileAgent));
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
