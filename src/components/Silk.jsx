'use client';

import React, { useRef, useEffect, useState } from 'react';

const hexToNormalizedRGB = (hex) => {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
};

const vertexShaderSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// The authentic, exact React Bits Silk wave shader from the original design
const fragmentShaderSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;

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
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

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

export default function Silk({
  speed = 7.5,
  scale = 1,
  color = '#27CBCE',
  noiseIntensity = 5.9,
  intensity = 1.0,
  rotation = 0,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const [engineMode, setEngineMode] = useState('webgl'); // 'webgl' | 'canvas2d'
  const effNoise = noiseIntensity !== undefined ? noiseIntensity : (intensity ?? 5.9);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let rafId = 0;
    let isIntersecting = true;
    let isTabVisible = typeof document !== 'undefined' ? !document.hidden : true;
    let cleanup = () => {};

    // Check prefers-reduced-motion
    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    const prefersReducedMotion = motionQuery ? motionQuery.matches : false;
    const effSpeed = prefersReducedMotion ? 0 : speed;

    // -------------------------------------------------------------------------
    // 1. ATTEMPT NATIVE WEBGL ENGINE (Primary authentic React Bits Silk)
    // -------------------------------------------------------------------------
    let gl = null;
    try {
      gl =
        canvas.getContext('webgl', {
          alpha: false,
          depth: false,
          stencil: false,
          antialias: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }) ||
        canvas.getContext('experimental-webgl', {
          alpha: false,
          depth: false,
          stencil: false,
          antialias: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        });
    } catch {
      gl = null;
    }

    if (gl) {
      setEngineMode('webgl');

      const compileShader = (type, source) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vert = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
      const frag = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (!vert || !frag) {
        if (vert) gl.deleteShader(vert);
        if (frag) gl.deleteShader(frag);
        gl = null;
      } else {
        const program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.deleteProgram(program);
          gl.deleteShader(vert);
          gl.deleteShader(frag);
          gl = null;
        } else {
          gl.useProgram(program);

          // Full-screen quad (2 triangles)
          const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1,
          ]);

          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

          const posAttr = gl.getAttribLocation(program, 'position');
          gl.enableVertexAttribArray(posAttr);
          gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

          // Uniforms
          const uTimeLoc = gl.getUniformLocation(program, 'uTime');
          const uColorLoc = gl.getUniformLocation(program, 'uColor');
          const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
          const uScaleLoc = gl.getUniformLocation(program, 'uScale');
          const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
          const uNoiseLoc = gl.getUniformLocation(program, 'uNoiseIntensity');

          const rgb = hexToNormalizedRGB(color);
          if (uColorLoc) gl.uniform3f(uColorLoc, rgb[0], rgb[1], rgb[2]);
          if (uSpeedLoc) gl.uniform1f(uSpeedLoc, effSpeed);
          if (uScaleLoc) gl.uniform1f(uScaleLoc, scale);
          if (uRotationLoc) gl.uniform1f(uRotationLoc, rotation);
          if (uNoiseLoc) gl.uniform1f(uNoiseLoc, effNoise);

          // Responsive resize handler with DPR clamp (1.5 max desktop, 1.0 mobile)
          let lastW = 0;
          let lastH = 0;
          const handleResize = () => {
            if (!canvas || disposed) return;
            const isMobile = window.innerWidth <= 768;
            const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w === 0 || h === 0) return;

            // Ignore minor address-bar height adjustments on mobile to avoid buffer thrashing
            if (isMobile && lastW === w && Math.abs(h - lastH) < 120) return;
            lastW = w;
            lastH = h;

            const dw = Math.floor(w * dpr);
            const dh = Math.floor(h * dpr);
            if (canvas.width !== dw || canvas.height !== dh) {
              canvas.width = dw;
              canvas.height = dh;
              gl.viewport(0, 0, dw, dh);
            }
          };

          handleResize();

          let elapsedTime = 0;
          let lastTimestamp = performance.now();

          const renderFrame = (t) => {
            if (disposed || !gl) return;
            if (uTimeLoc) gl.uniform1f(uTimeLoc, t);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          };

          // Immediate synchronous Frame 0 draw (eliminates perceived black flash)
          renderFrame(0);

          const loop = (now) => {
            if (disposed) return;
            rafId = requestAnimationFrame(loop);
            if (!isIntersecting || !isTabVisible) return;

            const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
            lastTimestamp = now;
            elapsedTime += dt;

            renderFrame(elapsedTime);
          };

          rafId = requestAnimationFrame(loop);

          let resizeTimer = null;
          const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              if (disposed) return;
              handleResize();
              renderFrame(elapsedTime);
            }, 60);
          };
          window.addEventListener('resize', onResize, { passive: true });

          cleanup = () => {
            disposed = true;
            if (rafId) cancelAnimationFrame(rafId);
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', onResize);
            try {
              gl.deleteBuffer(buffer);
              gl.deleteProgram(program);
              gl.deleteShader(vert);
              gl.deleteShader(frag);
              // Cleanly drop WebGL context to prevent Chrome exhaustion during Next.js dev reloads
              gl.getExtension('WEBGL_lose_context')?.loseContext();
            } catch {
              // noop on teardown
            }
          };
        }
      }
    }

    // -------------------------------------------------------------------------
    // 2. FALLBACK ENGINE: CANVAS 2D PROCEDURAL SILK WAVES (If WebGL is Disabled)
    // -------------------------------------------------------------------------
    if (!gl) {
      setEngineMode('canvas2d');
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        let cssW = 0;
        let cssH = 0;

        const handleResize2D = () => {
          if (!canvas || disposed) return;
          cssW = canvas.clientWidth;
          cssH = canvas.clientHeight;
          if (cssW === 0 || cssH === 0) return;
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = Math.floor(cssW * dpr);
          canvas.height = Math.floor(cssH * dpr);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        handleResize2D();

        let elapsedTime = 0;
        let lastTimestamp = performance.now();

        const render2D = (t) => {
          if (disposed || cssW <= 0 || cssH <= 0) return;
          ctx.fillStyle = '#050810';
          ctx.fillRect(0, 0, cssW, cssH);

          // Ambient silk radial gradient wash
          const radGrad = ctx.createRadialGradient(
            cssW * 0.45,
            cssH * 0.45,
            10,
            cssW * 0.5,
            cssH * 0.5,
            Math.max(cssW, cssH) * 0.7
          );
          radGrad.addColorStop(0, 'rgba(39, 203, 206, 0.25)');
          radGrad.addColorStop(0.5, 'rgba(11, 77, 89, 0.12)');
          radGrad.addColorStop(1, 'rgba(5, 8, 16, 0)');
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, cssW, cssH);

          // Flowing sinusoidal silk ribbons
          const ribbons = [
            { y: cssH * 0.42, amp: cssH * 0.12, freq: 0.003, speed: 0.5, color: 'rgba(39, 203, 206, 0.18)' },
            { y: cssH * 0.54, amp: cssH * 0.15, freq: 0.0025, speed: -0.4, color: 'rgba(140, 246, 247, 0.15)' },
            { y: cssH * 0.65, amp: cssH * 0.10, freq: 0.0035, speed: 0.6, color: 'rgba(39, 203, 206, 0.12)' },
          ];

          ribbons.forEach((r) => {
            ctx.beginPath();
            ctx.moveTo(0, cssH);
            for (let x = 0; x <= cssW; x += 20) {
              const wave = Math.sin(x * r.freq + t * r.speed) * r.amp;
              const subWave = Math.sin(x * r.freq * 2.1 - t * r.speed * 0.8) * (r.amp * 0.3);
              ctx.lineTo(x, r.y + wave + subWave);
            }
            ctx.lineTo(cssW, cssH);
            ctx.closePath();
            ctx.fillStyle = r.color;
            ctx.fill();
          });
        };

        render2D(0);

        const loop2D = (now) => {
          if (disposed) return;
          rafId = requestAnimationFrame(loop2D);
          if (!isIntersecting || !isTabVisible) return;

          const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
          lastTimestamp = now;
          elapsedTime += dt * effSpeed * 0.15;
          render2D(elapsedTime);
        };

        rafId = requestAnimationFrame(loop2D);

        const onResize2D = () => {
          handleResize2D();
          render2D(elapsedTime);
        };
        window.addEventListener('resize', onResize2D, { passive: true });

        cleanup = () => {
          disposed = true;
          if (rafId) cancelAnimationFrame(rafId);
          window.removeEventListener('resize', onResize2D);
        };
      }
    }

    // -------------------------------------------------------------------------
    // 3. COMMON INTERSECTION & VISIBILITY MANAGEMENT
    // -------------------------------------------------------------------------
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cleanup();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [speed, scale, color, effNoise, rotation]);

  return (
    <canvas
      ref={canvasRef}
      data-silk-engine={engineMode}
      className={`silk-canvas absolute inset-0 block h-full w-full pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#050810',
        ...style,
      }}
    />
  );
}
