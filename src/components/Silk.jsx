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

const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    if (ref.current && ref.current.material && ref.current.material.uniforms) {
      ref.current.material.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
});
SilkPlane.displayName = 'SilkPlane';

const Silk = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
  const meshRef = useRef();
  const canvasRef = useRef();
  const [frameloop, setFrameloop] = useState('always');
  const frameloopRef = useRef('always');

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

  // Handle visibility changes - only pause when truly hidden, always resume when visible
  useEffect(() => {
    const resume = () => {
      if (frameloopRef.current !== 'always') {
        frameloopRef.current = 'always';
        setFrameloop('always');
      }
    };

    const pause = () => {
      if (frameloopRef.current !== 'demand') {
        frameloopRef.current = 'demand';
        setFrameloop('demand');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else {
        resume();
      }
    };

    const handleFocus = () => {
      if (!document.hidden) {
        resume();
      }
    };

    const handlePageshow = () => {
      // Handle back/forward cache restoration
      if (!document.hidden) {
        resume();
      }
    };

    // Set initial state
    if (document.hidden) {
      pause();
    } else {
      resume();
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageshow);
    
    // Safety check: ensure it's always running when visible
    // This catches any edge cases where events don't fire
    const safetyInterval = setInterval(() => {
      if (!document.hidden && frameloopRef.current !== 'always') {
        resume();
      }
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageshow);
      clearInterval(safetyInterval);
    };
  }, []);

  return (
    <Canvas 
      ref={canvasRef}
      dpr={[1, 2]} 
      frameloop={frameloop}
      gl={{
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        antialias: true,
        alpha: false,
        // Handle context loss gracefully
        onContextLost: (event) => {
          event.preventDefault();
          console.warn('WebGL context lost in Silk component');
        },
        onContextRestored: () => {
          console.info('WebGL context restored in Silk component');
          // Force resume when context is restored
          if (!document.hidden) {
            frameloopRef.current = 'always';
            setFrameloop('always');
          }
        },
      }}
      style={{ 
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

export default Silk;
