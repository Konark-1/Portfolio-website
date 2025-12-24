/**
 * Performance detection utilities for low-end devices
 * Detects device capabilities and allows disabling heavy features
 */

export interface DeviceCapabilities {
  hasGPU: boolean;
  isLowEndDevice: boolean;
  isMobile: boolean;
  supportsWebGL: boolean;
  estimatedFPS: number;
  memoryInfo?: {
    deviceMemory?: number; // GB
    hardwareConcurrency?: number; // CPU cores
  };
}

let cachedCapabilities: DeviceCapabilities | null = null;

/**
 * Detects device capabilities and performance characteristics
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  if (cachedCapabilities) {
    return cachedCapabilities;
  }

  if (typeof window === 'undefined') {
    // SSR fallback
    cachedCapabilities = {
      hasGPU: false,
      isLowEndDevice: true,
      isMobile: false,
      supportsWebGL: false,
      estimatedFPS: 30,
    };
    return cachedCapabilities;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check WebGL support
  let supportsWebGL = false;
  let hasGPU = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      supportsWebGL = true;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check if GPU is software-rendered (indicates no hardware GPU)
        if (typeof renderer === 'string') {
          hasGPU = !renderer.toLowerCase().includes('software') &&
            !renderer.toLowerCase().includes('llvmpipe') &&
            !renderer.toLowerCase().includes('mesa');
        } else {
          hasGPU = true;
        }
      } else {
        // Assume GPU if WebGL is supported
        hasGPU = true;
      }
    }
  } catch {
    // WebGL not supported
  }

  // Get memory info if available
  const memoryInfo: DeviceCapabilities['memoryInfo'] = {};
  if ('deviceMemory' in navigator) {
    memoryInfo.deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  }
  if ('hardwareConcurrency' in navigator) {
    memoryInfo.hardwareConcurrency = navigator.hardwareConcurrency;
  }

  // Detect iOS Safari specifically - it has stricter GPU memory limits even on powerful devices
  const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    /WebKit/.test(navigator.userAgent) &&
    !/CriOS/.test(navigator.userAgent); // Not Chrome on iOS

  // Determine if ACTUALLY low-end device based on hardware capabilities
  // IMPORTANT: Being mobile does NOT automatically mean low-end
  // iPhone 13 (4GB RAM, 6 cores, A15 GPU) should NOT be classified as low-end
  const isActuallyLowEnd =
    !hasGPU ||
    (memoryInfo.deviceMemory !== undefined && memoryInfo.deviceMemory < 4) ||
    (memoryInfo.hardwareConcurrency !== undefined && memoryInfo.hardwareConcurrency < 4);

  // For backwards compatibility, expose combined low-end OR iOS Safari limits
  // This is used for features that are specifically problematic on iOS Safari (like WebGL)
  const isLowEndDevice = isActuallyLowEnd;

  // Estimate FPS based on device capabilities
  let estimatedFPS = 60;
  if (isActuallyLowEnd) {
    estimatedFPS = hasGPU ? 30 : 15;
  } else if (isMobile) {
    estimatedFPS = 45; // Mobile devices with good specs can handle 45fps
  }

  cachedCapabilities = {
    hasGPU,
    isLowEndDevice,
    isMobile,
    supportsWebGL,
    estimatedFPS,
    memoryInfo,
    // Additional properties for more granular control
    isIOSSafari,
    isActuallyLowEnd,
  } as DeviceCapabilities;

  return cachedCapabilities;
}

/**
 * Check if heavy animations should be disabled
 * Now only returns true for ACTUALLY low-end devices, not all mobile
 */
export function shouldDisableHeavyAnimations(): boolean {
  const caps = detectDeviceCapabilities();
  return (caps as any).isActuallyLowEnd || !caps.hasGPU || !caps.supportsWebGL;
}

/**
 * Get recommended FPS for animations based on device
 */
export function getRecommendedFPS(): number {
  const caps = detectDeviceCapabilities();
  return caps.estimatedFPS;
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

