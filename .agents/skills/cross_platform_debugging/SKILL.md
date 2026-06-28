---
name: cross_platform_debugging
description: Best practices and troubleshooting steps for debugging responsive and cross-platform web development issues on iOS Safari, Android Chrome, and Desktop environments.
---

# Cross-Platform & Device Debugging Guidelines (Web)

When tasked with debugging or developing features that span desktop, iOS, and Android web browsers (especially in React/Next.js applications), adhere to the following best practices and knowledge bases:

## 1. iOS Safari Specifics & Quirks
- **Memory & WebGL Restrictions:** iOS Safari has strict compositor memory limits. Complex WebGL canvases (like React Three Fiber) with `alpha: true` or transparent backgrounds overlaying DOM elements can cause the browser to crash. **Solution:** Make WebGL canvases opaque (`alpha: false`) and render the background color directly within the WebGL context. Limit `dpr` (device pixel ratio) to `0.75` or `1` on low-power devices.
- **requestIdleCallback:** Safari does NOT support `requestIdleCallback`. Ensure polyfills or `setTimeout` fallbacks are correctly implemented when deferring non-critical work.
- **100vh vs 100dvh:** Safari's bottom toolbar obscures standard `100vh` layouts. Always use `100dvh` (Dynamic Viewport Height) or safe area insets for full-screen hero sections to prevent layout jumping or hidden content.
- **Scroll Inertia & Momentum:** Avoid aggressive scroll-jacking or custom smooth scrolling libraries unless heavily tested, as they conflict with Safari's native momentum scrolling.

## 2. Next.js Hydration Consistency
- Avoid using `window` or `navigator` properties directly in component body to conditionally render UI (e.g., mobile vs. desktop layouts). This causes React Hydration mismatches between the server and client.
- **Solution:** Use CSS media queries for layout changes whenever possible. If Javascript detection is strictly necessary (like `window.matchMedia`), wrap the logic in a `useEffect` and rely on a mounted state before rendering the device-specific UI.

## 3. Intersection Observers & Lazy Loading
- Heavy components or dynamic imports triggered by Intersection Observers can cause severe main-thread lockups on low-end devices if they mount synchronously while scrolling.
- **Solution:** Add staggers or avoid overly aggressive lazy loading for elements immediately below the fold. For small UI components (like contact forms), prefer immediate loading to avoid visual glitches or transparent gaps during scroll.

## 4. Power BI Embedded Quirks
- Embedded Power BI dashboards default to displaying their own white background and navigation footers unless explicitly hidden.
- **Solution:** Always append `&transparent=1` and `&navContentPaneEnabled=false` to Power BI iframe `src` URLs if a seamless integration into a dark theme or specific layout is required.

## 5. CSS Fallbacks & Performance
- Avoid overly complex `backdrop-filter` or `filter: blur()` effects on massive container sizes as they severely impact render performance on mobile GPUs. Use pre-rendered gradient images or solid colors as fallbacks.
- Ensure all interactive elements have minimum `44px` by `44px` touch targets for mobile accessibility.
