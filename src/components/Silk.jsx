import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
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

const SilkPlane = forwardRef(function SilkPlane({ uniforms, isInViewport, isDocumentVisible }, ref) {
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

    // Throttle updates to reduce CPU usage - update every ~16ms (60fps max)
    const now = state.clock.elapsedTime;
    if (now - lastUpdateRef.current < 0.016) return;

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

const Silk = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
  const meshRef = useRef();
  const canvasRef = useRef();
  const containerRef = useRef();
  const isInViewportRef = useRef(true); // Assume in viewport initially (hero section)
  const isDocumentVisibleRef = useRef(!document.hidden);

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
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };

    // Intersection Observer to detect when component is in viewport
    let observer = null;

    const setupObserver = () => {
      if (!containerRef.current) return;

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
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        frameloop="always"
        gl={{
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
          antialias: true,
          alpha: false,
          // Disable stencil and depth buffers for better performance when not needed
          stencil: false,
          depth: false,
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} isInViewport={isInViewportRef} isDocumentVisible={isDocumentVisibleRef} />
      </Canvas>
    </div>
  );
};

export default Silk;
