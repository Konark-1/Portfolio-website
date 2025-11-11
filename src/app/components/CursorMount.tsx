"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SmoothCursor = dynamic(() => import("@/components/ui/smooth-cursor").then(m => m.SmoothCursor), {
  ssr: false,
});

export default function CursorMount() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // Only mount on devices with fine pointer and hover capability
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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



