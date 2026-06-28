import React, { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color } from 'three';

const hexToNormalizedRGB = hex => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const SilkPlane = forwardRef(function SilkPlane({ uniforms, isInViewport, isDocumentVisible, isLowPower }, ref) {
  const { viewport } = useThree();
  const lastUpdateRef = useRef(0);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((state, delta) => {
    // Skip updates when not in viewport OR document is hidden (tab in background)
    // This saves significant GPU resources especially on mobile
    if (!isInViewport.current || !isDocumentVisible.current) return;

    // Throttle updates to reduce CPU usage - update every ~33ms (30fps) on lowPower, ~16ms (60fps) on highPower
    const now = state.clock.elapsedTime;
    const throttleInterval = isLowPower ? 0.033 : 0.016;
    if (now - lastUpdateRef.current < throttleInterval) return;

    lastUpdateRef.current = now;

    if (ref.current && ref.current.material && ref.current.material.uniforms) {
      // Smooth delta clamping to prevent jumps when tab becomes visible
      const clampedDelta = Math.min(delta, 0.1);
      ref.current.material.uniforms.uTime.value += 0.1 * clampedDelta;
    }
  });

  return (
    <mesh ref={ref} frustumCulled={true}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
});
SilkPlane.displayName = 'SilkPlane';

class SilkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Silk Canvas render error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(39, 203, 206, 0.15), rgba(10, 14, 26, 1))',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }} />
      );
    }
    return this.props.children;
  }
}

const Silk = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
  const meshRef = useRef();
  const canvasRef = useRef();
  const containerRef = useRef();
  const isInViewportRef = useRef(true); // Assume in viewport initially (hero section)
  const isDocumentVisibleRef = useRef(true);

  // Synchronous client-side detection (safe because component is loaded with ssr: false)
  const isLowPower = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }, []);

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    }),
    [speed, scale, noiseIntensity, color, rotation]
  );

  // Handle visibility and viewport intersection - optimized for performance
  useEffect(() => {
    isDocumentVisibleRef.current = !document.hidden;

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };

    // Intersection Observer to detect when component is in viewport
    let observer = null;

    const setupObserver = () => {
      if (!containerRef.current) return;

      // Guard IntersectionObserver against older browsers/devices
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            isInViewportRef.current = entry.isIntersecting;
          },
          {
            threshold: [0, 0.1], // Trigger at 0% and 10% visibility
            rootMargin: '100px' // Larger margin for earlier detection
          }
        );
        observer.observe(containerRef.current);
      } else {
        isInViewportRef.current = true;
      }
    };

    // Setup observer immediately
    setupObserver();

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <Canvas
        ref={canvasRef}
        dpr={isLowPower ? 1 : [1, 2]}
        frameloop={isLowPower ? "demand" : "always"}
        gl={{
          preserveDrawingBuffer: false,
          powerPreference: 'default',
          antialias: !isLowPower,
          alpha: true,
          // Disable stencil and depth buffers for better performance when not needed
          stencil: false,
          depth: false,
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} isInViewport={isInViewportRef} isDocumentVisible={isDocumentVisibleRef} isLowPower={isLowPower} />
      </Canvas>
    </div>
  );
};

const SafeSilk = (props) => {
  const shouldSkipWebGL = useMemo(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return true;

    // Skip WebGL entirely on iOS — context creation blocks the main thread for 2-4s
    // and risks crashing Safari due to GPU memory pressure.
    // The canvas was frozen (frameloop="demand") on mobile anyway, providing zero animation.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad with desktop UA

    if (isIOS) return true;

    // Also skip on devices without WebGL support
    try {
      const canvas = document.createElement('canvas');
      return !(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return true;
    }
  }, []);

  if (shouldSkipWebGL) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(39, 203, 206, 0.18), rgba(15, 20, 30, 0.8) 60%, rgba(10, 14, 26, 1))',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }} />
    );
  }

  return (
    <SilkErrorBoundary>
      <Silk {...props} />
    </SilkErrorBoundary>
  );
};

export default SafeSilk;
