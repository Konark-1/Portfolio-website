'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Silk.css';

export interface SilkProps {
  /** Animation speed multiplier (default: 2.5) */
  speed?: number;
  /** Wave UV scale (default: 1.0) */
  scale?: number;
  /** Primary silk midtone hex color (default: '#27c4ff') */
  color?: string;
  /** Specular fold crest highlight hex color (default: '#8cf6f7') */
  sheenColor?: string;
  /** Specular fold crest alias for compatibility */
  highlightColor?: string;
  /** Deep obsidian trough/base hex color (default: '#050810') */
  baseColor?: string;
  /** Subtle organic film grain intensity (default: 0.25) */
  noiseIntensity?: number;
  /** Rotation angle in radians (default: 0) */
  rotation?: number;
  /** Sheen intensity (default: 0.5) */
  sheen?: number;
  /** Depth intensity (default: 0.5) */
  depth?: number;
  /** Glow intensity (default: 0.3) */
  glow?: number;
  /** Optional wrapper className */
  className?: string;
  /** Optional force engine mode for testing/QA ('auto' | 'webgl' | 'canvas2d') */
  forceEngine?: 'auto' | 'webgl' | 'canvas2d';
  /** Optional inline style */
  style?: React.CSSProperties;
}

type EngineMode = 'webgl' | 'canvas2d';
type RGB = [number, number, number];

// ---------------------------------------------------------------------------
// Color Utilities
// ---------------------------------------------------------------------------
function parseHexToRgb255(hex: string, fallback: RGB): RGB {
  const clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b];
  } else if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b];
  }
  return fallback;
}

function rgb255ToNorm([r, g, b]: RGB): RGB {
  return [r / 255, g / 255, b / 255];
}

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function rgbaStr([r, g, b]: RGB, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// ---------------------------------------------------------------------------
// Universal GLSL ES 1.00 Shaders (Runs natively on WebGL 2.0 AND WebGL 1.0)
// ---------------------------------------------------------------------------
const VERTEX_SHADER_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uHighlightColor;
uniform vec3 uBaseColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform vec2 uResolution;

const float E = 2.71828182845904523536;

float filmNoise(vec2 coord) {
  vec2 wrapped = mod(coord, 1024.0);
  vec2 r = E * sin(E * wrapped);
  return fract(r.x * r.y * (1.0 + wrapped.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * uv;
}

void main() {
  float rnd = filmNoise(gl_FragCoord.xy);

  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 centeredUv = vUv - 0.5;
  if (aspect < 1.0) {
    centeredUv.x *= max(0.6, aspect);
  }

  vec2 uv = rotateUvs((centeredUv + 0.5) * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float wave = sin(
    5.0 * (
      tex.x + tex.y +
      cos(3.0 * tex.x + 5.0 * tex.y) +
      0.02 * tOffset
    ) +
    sin(20.0 * (tex.x + tex.y - 0.1 * tOffset))
  );

  float t = clamp(0.5 + 0.5 * wave, 0.0, 1.0);

  float bodyMix = smoothstep(0.08, 0.78, pow(t, 1.25));
  float crestMix = smoothstep(0.72, 0.99, t);

  vec3 col = mix(uBaseColor, uColor, bodyMix);
  col = mix(col, uHighlightColor, crestMix * 0.85);

  col -= (rnd - 0.5) * (0.045 * uNoiseIntensity);
  col = max(col, uBaseColor * 0.65);

  gl_FragColor = vec4(col, 1.0);
}
`;

const WEBGL_ATTRS: WebGLContextAttributes = {
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  preserveDrawingBuffer: false,
  powerPreference: 'default',
  failIfMajorPerformanceCaveat: false,
};

function acquireHardwareWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
  try {
    const gl =
      (canvas.getContext('webgl2', WEBGL_ATTRS) as WebGLRenderingContext | null) ||
      (canvas.getContext('webgl', WEBGL_ATTRS) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', WEBGL_ATTRS) as WebGLRenderingContext | null);
    if (!gl || gl.isContextLost()) return null;
    return gl;
  } catch {
    return null;
  }
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// ---------------------------------------------------------------------------
// Canvas 2D Procedural Silk Ribbon Descriptors (Deterministic Luxury Drapery)
// ---------------------------------------------------------------------------
interface RibbonSpec {
  yRatio: number;
  thickRatio: number;
  freq1: number;
  freq2: number;
  phase1: number;
  phase2: number;
  speed1: number;
  speed2: number;
  amp1Ratio: number;
  amp2Ratio: number;
  crestAlpha: number;
  bodyAlpha: number;
}

const RIBBON_SPECS: readonly RibbonSpec[] = [
  { yRatio: -0.46, thickRatio: 0.23, freq1: 5.2, freq2: 8.1, phase1: 0.3, phase2: 1.4, speed1: 0.55, speed2: 0.38, amp1Ratio: 0.09, amp2Ratio: 0.045, crestAlpha: 0.45, bodyAlpha: 0.42 },
  { yRatio: -0.34, thickRatio: 0.25, freq1: 4.8, freq2: 7.4, phase1: 1.5, phase2: 2.9, speed1: 0.62, speed2: 0.41, amp1Ratio: 0.11, amp2Ratio: 0.052, crestAlpha: 0.62, bodyAlpha: 0.52 },
  { yRatio: -0.21, thickRatio: 0.22, freq1: 5.8, freq2: 9.2, phase1: 2.7, phase2: 0.6, speed1: 0.50, speed2: 0.46, amp1Ratio: 0.10, amp2Ratio: 0.048, crestAlpha: 0.78, bodyAlpha: 0.60 },
  { yRatio: -0.09, thickRatio: 0.26, freq1: 4.4, freq2: 6.8, phase1: 3.9, phase2: 2.1, speed1: 0.66, speed2: 0.35, amp1Ratio: 0.12, amp2Ratio: 0.055, crestAlpha: 0.88, bodyAlpha: 0.66 },
  { yRatio:  0.03, thickRatio: 0.24, freq1: 5.5, freq2: 8.6, phase1: 5.1, phase2: 3.7, speed1: 0.58, speed2: 0.44, amp1Ratio: 0.11, amp2Ratio: 0.050, crestAlpha: 0.92, bodyAlpha: 0.68 },
  { yRatio:  0.16, thickRatio: 0.25, freq1: 4.9, freq2: 7.9, phase1: 0.9, phase2: 5.0, speed1: 0.64, speed2: 0.39, amp1Ratio: 0.10, amp2Ratio: 0.054, crestAlpha: 0.84, bodyAlpha: 0.62 },
  { yRatio:  0.29, thickRatio: 0.22, freq1: 6.0, freq2: 9.5, phase1: 2.2, phase2: 1.2, speed1: 0.52, speed2: 0.48, amp1Ratio: 0.09, amp2Ratio: 0.046, crestAlpha: 0.72, bodyAlpha: 0.54 },
  { yRatio:  0.41, thickRatio: 0.24, freq1: 4.6, freq2: 7.1, phase1: 3.6, phase2: 4.3, speed1: 0.60, speed2: 0.36, amp1Ratio: 0.10, amp2Ratio: 0.048, crestAlpha: 0.58, bodyAlpha: 0.46 },
  { yRatio:  0.53, thickRatio: 0.21, freq1: 5.4, freq2: 8.4, phase1: 4.8, phase2: 2.5, speed1: 0.54, speed2: 0.42, amp1Ratio: 0.08, amp2Ratio: 0.042, crestAlpha: 0.48, bodyAlpha: 0.40 },
];

const CANVAS2D_SEGMENTS = 32;
const CANVAS2D_MAX_WIDTH = 960; // Caps fill rate while bilinear scaling ensures locked 60 FPS

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export const Silk: React.FC<SilkProps> = ({
  speed = 2.5,
  scale = 1.0,
  color = '#27c4ff',
  sheenColor = '#8cf6f7',
  highlightColor,
  baseColor = '#050810',
  noiseIntensity = 0.25,
  rotation = 0,
  className = '',
  forceEngine = 'auto',
  style,
}) => {
  const finalHighlight = highlightColor || sheenColor || '#8cf6f7';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [engineMode, setEngineMode] = useState<EngineMode>(
    forceEngine === 'canvas2d' ? 'canvas2d' : 'webgl'
  );

  // Keep dynamic visual props in a ref so prop tweaks never tear down the context
  const configRef = useRef({
    speed,
    scale,
    color,
    highlightColor: finalHighlight,
    baseColor,
    noiseIntensity,
    rotation,
  });

  useEffect(() => {
    configRef.current = {
      speed,
      scale,
      color,
      highlightColor: finalHighlight,
      baseColor,
      noiseIntensity,
      rotation,
    };
  }, [speed, scale, color, finalHighlight, baseColor, noiseIntensity, rotation]);

  useEffect(() => {
    if (forceEngine === 'canvas2d') {
      setEngineMode('canvas2d');
    } else if (forceEngine === 'webgl') {
      setEngineMode('webgl');
    }
  }, [forceEngine]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let rafId: number | null = null;
    let isVisible = true;
    let isTabVisible = typeof document !== 'undefined' ? !document.hidden : true;
    let disposed = false;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    let reducedMotion = motionQuery?.matches ?? false;

    let elapsedSec = 0;
    let lastNow = 0;

    // -----------------------------------------------------------------------
    // ENGINE A: UNIVERSAL WEBGL 1/2
    // -----------------------------------------------------------------------
    if (engineMode === 'webgl') {
      const gl = acquireHardwareWebGL(canvas);
      if (!gl) {
        if (forceEngine !== 'webgl') {
          setEngineMode('canvas2d');
        }
        return;
      }

      const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      const program = vertShader && fragShader ? gl.createProgram() : null;

      if (!vertShader || !fragShader || !program) {
        if (vertShader) gl.deleteShader(vertShader);
        if (fragShader) gl.deleteShader(fragShader);
        if (forceEngine !== 'webgl') setEngineMode('canvas2d');
        return;
      }

      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        if (forceEngine !== 'webgl') setEngineMode('canvas2d');
        return;
      }

      // Single fullscreen triangle (zero diagonal seam overdraw)
      const quadBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'aPosition');
      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uTimeLoc = gl.getUniformLocation(program, 'uTime');
      const uColorLoc = gl.getUniformLocation(program, 'uColor');
      const uHighlightLoc = gl.getUniformLocation(program, 'uHighlightColor');
      const uBaseLoc = gl.getUniformLocation(program, 'uBaseColor');
      const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
      const uScaleLoc = gl.getUniformLocation(program, 'uScale');
      const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
      const uNoiseLoc = gl.getUniformLocation(program, 'uNoiseIntensity');
      const uResLoc = gl.getUniformLocation(program, 'uResolution');

      const hardwareCores =
        typeof navigator !== 'undefined' && navigator.hardwareConcurrency
          ? navigator.hardwareConcurrency
          : 4;
      let dprScale = hardwareCores <= 2 ? 1.0 : 1.5;

      const syncWebGLSize = () => {
        const rect = container.getBoundingClientRect();
        const cssW = Math.max(1, Math.floor(rect.width));
        const cssH = Math.max(1, Math.floor(rect.height));
        const dpr = Math.min(window.devicePixelRatio || 1, dprScale);
        const targetW = Math.max(1, Math.floor(cssW * dpr));
        const targetH = Math.max(1, Math.floor(cssH * dpr));

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
          gl.viewport(0, 0, targetW, targetH);
        }
      };

      const renderWebGLFrame = (timeSec: number) => {
        if (disposed || gl.isContextLost()) return;

        const cfg = configRef.current;
        const primaryNorm = rgb255ToNorm(parseHexToRgb255(cfg.color, [39, 196, 255]));
        const highlightNorm = rgb255ToNorm(
          parseHexToRgb255(cfg.highlightColor, [140, 246, 247])
        );
        const baseNorm = rgb255ToNorm(parseHexToRgb255(cfg.baseColor, [5, 8, 16]));

        gl.useProgram(program);
        gl.uniform1f(uTimeLoc, timeSec * 0.1);
        gl.uniform3f(uColorLoc, primaryNorm[0], primaryNorm[1], primaryNorm[2]);
        gl.uniform3f(
          uHighlightLoc,
          highlightNorm[0],
          highlightNorm[1],
          highlightNorm[2]
        );
        gl.uniform3f(uBaseLoc, baseNorm[0], baseNorm[1], baseNorm[2]);
        gl.uniform1f(uSpeedLoc, cfg.speed);
        gl.uniform1f(uScaleLoc, cfg.scale);
        gl.uniform1f(uRotationLoc, cfg.rotation);
        gl.uniform1f(uNoiseLoc, cfg.noiseIntensity);
        gl.uniform2f(uResLoc, canvas.width, canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const stopLoop = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };

      const tick = (now: number) => {
        if (disposed || !isVisible || !isTabVisible || reducedMotion) {
          rafId = null;
          return;
        }

        const rawDeltaMs = lastNow > 0 ? now - lastNow : 16.67;
        lastNow = now;
        const clampedDtSec = Math.min(rawDeltaMs, 100) / 1000;
        elapsedSec += clampedDtSec;

        renderWebGLFrame(elapsedSec);
        rafId = requestAnimationFrame(tick);
      };

      const startLoop = () => {
        if (disposed || rafId !== null || !isVisible || !isTabVisible) return;
        if (reducedMotion) {
          renderWebGLFrame(elapsedSec);
          return;
        }
        lastNow = performance.now();
        rafId = requestAnimationFrame(tick);
      };

      const onContextLost = (e: Event) => {
        e.preventDefault();
        stopLoop();
        if (forceEngine !== 'webgl') {
          setEngineMode('canvas2d');
        }
      };

      const onVisibilityChange = () => {
        isTabVisible = !document.hidden;
        if (!isTabVisible) {
          stopLoop();
        } else {
          startLoop();
        }
      };

      const onMotionChange = (e: MediaQueryListEvent) => {
        reducedMotion = e.matches;
        if (reducedMotion) {
          stopLoop();
          renderWebGLFrame(elapsedSec);
        } else {
          startLoop();
        }
      };

      const resizeObserver = new ResizeObserver(() => {
        syncWebGLSize();
        renderWebGLFrame(elapsedSec);
      });

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = Boolean(entry?.isIntersecting);
          if (!isVisible) {
            stopLoop();
          } else {
            startLoop();
          }
        },
        { threshold: 0.01 }
      );

      canvas.addEventListener('webglcontextlost', onContextLost, false);
      document.addEventListener('visibilitychange', onVisibilityChange);
      motionQuery?.addEventListener('change', onMotionChange);
      resizeObserver.observe(container);
      intersectionObserver.observe(container);

      syncWebGLSize();
      renderWebGLFrame(elapsedSec);
      startLoop();

      return () => {
        disposed = true;
        stopLoop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        canvas.removeEventListener('webglcontextlost', onContextLost, false);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        motionQuery?.removeEventListener('change', onMotionChange);

        if (!gl.isContextLost()) {
          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.useProgram(null);
          if (quadBuffer) gl.deleteBuffer(quadBuffer);
          gl.deleteProgram(program);
          gl.deleteShader(vertShader);
          gl.deleteShader(fragShader);
        }
      };
    }

    // -----------------------------------------------------------------------
    // ENGINE B: ZERO-LAG CANVAS 2D PROCEDURAL SILK RIBBON ENGINE
    // -----------------------------------------------------------------------
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Pre-allocated typed arrays (zero per-frame geometry allocation)
    const ptCount = CANVAS2D_SEGMENTS + 1;
    const xCoords = new Float32Array(ptCount);
    const uCoords = new Float32Array(ptCount);
    const topY = new Float32Array(ptCount);
    const botY = new Float32Array(ptCount);

    let bufW = 800;
    let bufH = 450;
    let spanW = 1000;
    let spanH = 1000;
    let cachedBgGradient: CanvasGradient | null = null;
    let cachedBgKey = '';

    const syncCanvas2DSize = () => {
      const rect = container.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));

      // Cap internal width while preserving exact aspect ratio
      const scaleFactor = cssW > CANVAS2D_MAX_WIDTH ? CANVAS2D_MAX_WIDTH / cssW : 1;
      const targetW = Math.max(160, Math.round(cssW * scaleFactor));
      const targetH = Math.max(120, Math.round(cssH * scaleFactor));

      if (canvas.width !== targetW || canvas.height !== targetH || cachedBgGradient === null) {
        canvas.width = targetW;
        canvas.height = targetH;
        bufW = targetW;
        bufH = targetH;

        const diag = Math.hypot(bufW, bufH);
        spanW = diag * 1.16;
        spanH = diag * 1.12;

        const halfW = spanW * 0.5;
        for (let i = 0; i < ptCount; i++) {
          const u = i / CANVAS2D_SEGMENTS;
          uCoords[i] = u;
          xCoords[i] = -halfW + u * spanW;
        }
        cachedBgKey = '';
      }
    };

    const renderCanvas2DFrame = (timeSec: number) => {
      if (disposed) return;

      const cfg = configRef.current;
      const baseRgb = parseHexToRgb255(cfg.baseColor, [5, 8, 16]);
      const midRgb = parseHexToRgb255(cfg.color, [39, 196, 255]);
      const crestRgb = parseHexToRgb255(cfg.highlightColor, [140, 246, 247]);
      const deepShadowRgb = mixRgb(baseRgb, midRgb, 0.24);
      const specularRgb = mixRgb(crestRgb, [235, 255, 255], 0.55);

      // 1. Cached Obsidian Base Fill (zero per-frame gradient allocation)
      const bgKey = `${cfg.baseColor}|${cfg.color}|${bufW}|${bufH}`;
      if (bgKey !== cachedBgKey || !cachedBgGradient) {
        const bgGrad = ctx.createLinearGradient(0, 0, bufW, bufH);
        bgGrad.addColorStop(0, rgbaStr(baseRgb, 1));
        bgGrad.addColorStop(0.5, rgbaStr(mixRgb(baseRgb, midRgb, 0.14), 1));
        bgGrad.addColorStop(1, rgbaStr(baseRgb, 1));
        cachedBgGradient = bgGrad;
        cachedBgKey = bgKey;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = cachedBgGradient;
      ctx.fillRect(0, 0, bufW, bufH);

      // 2. Transform into diagonal silk drapery space
      const tiltAngle = -0.38 + cfg.rotation;
      ctx.translate(bufW * 0.5, bufH * 0.5);
      ctx.rotate(tiltAngle);

      const t = timeSec * (cfg.speed * 0.14);
      const freqScale = Math.max(0.5, cfg.scale);

      // 3. Render 9 overlapping domain-warped silk ribbons (ZERO blur filters)
      for (let rIdx = 0; rIdx < RIBBON_SPECS.length; rIdx++) {
        const r = RIBBON_SPECS[rIdx];
        const baseY = r.yRatio * spanH;
        const baseHalfThick = r.thickRatio * spanH * 0.5;
        const amp1 = r.amp1Ratio * spanH;
        const amp2 = r.amp2Ratio * spanH;

        let minY = Infinity;
        let maxY = -Infinity;

        for (let i = 0; i < ptCount; i++) {
          const u = uCoords[i];
          const waveA = Math.sin(u * r.freq1 * freqScale + t * r.speed1 + r.phase1);
          // Trigonometric domain warp creates organic silk pinching & swirling
          const waveB = Math.cos(
            u * r.freq2 * freqScale - t * r.speed2 + r.phase2 + waveA * 0.65
          );
          const satinRipple =
            Math.sin(u * 11.5 * freqScale + t * 0.45 + r.phase1 * 1.7) * 0.16;

          const centerY = baseY + waveA * amp1 + (waveB + satinRipple) * amp2;
          const breathingThick =
            baseHalfThick * (0.72 + 0.34 * Math.sin(u * 3.9 - t * 0.38 + r.phase2));

          const ty = centerY - breathingThick;
          const by = centerY + breathingThick;
          topY[i] = ty;
          botY[i] = by;

          if (ty < minY) minY = ty;
          if (by > maxY) maxY = by;
        }

        // Silk body 3D fold gradient (bright luminous crest -> turquoise -> deep obsidian trough)
        const grad = ctx.createLinearGradient(0, minY, 0, maxY);
        grad.addColorStop(0.0, rgbaStr(crestRgb, 0.0));
        grad.addColorStop(0.12, rgbaStr(crestRgb, r.crestAlpha * 0.72));
        grad.addColorStop(0.28, rgbaStr(midRgb, r.bodyAlpha * 0.85));
        grad.addColorStop(0.58, rgbaStr(deepShadowRgb, 0.74));
        grad.addColorStop(0.86, rgbaStr(baseRgb, 0.94));
        grad.addColorStop(1.0, rgbaStr(baseRgb, 0.0));

        // Trace smooth closed silk band
        ctx.beginPath();
        ctx.moveTo(xCoords[0], topY[0]);
        for (let i = 1; i < ptCount - 1; i++) {
          const mx = (xCoords[i] + xCoords[i + 1]) * 0.5;
          const my = (topY[i] + topY[i + 1]) * 0.5;
          ctx.quadraticCurveTo(xCoords[i], topY[i], mx, my);
        }
        ctx.lineTo(xCoords[ptCount - 1], topY[ptCount - 1]);
        ctx.lineTo(xCoords[ptCount - 1], botY[ptCount - 1]);

        for (let i = ptCount - 2; i >= 1; i--) {
          const mx = (xCoords[i] + xCoords[i - 1]) * 0.5;
          const my = (botY[i] + botY[i - 1]) * 0.5;
          ctx.quadraticCurveTo(xCoords[i], botY[i], mx, my);
        }
        ctx.lineTo(xCoords[0], botY[0]);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();

        // Trace luminous specular fold crease locked tightly to top edge (zero blur)
        ctx.beginPath();
        ctx.moveTo(xCoords[0], topY[0] + 2);
        for (let i = 1; i < ptCount - 1; i++) {
          const mx = (xCoords[i] + xCoords[i + 1]) * 0.5;
          const my = (topY[i] + topY[i + 1]) * 0.5 + 2;
          ctx.quadraticCurveTo(xCoords[i], topY[i] + 2, mx, my);
        }
        ctx.lineTo(xCoords[ptCount - 1], topY[ptCount - 1] + 2);

        // Soft cyan sheen halo
        ctx.lineWidth = 4.5;
        ctx.strokeStyle = rgbaStr(midRgb, r.crestAlpha * 0.28);
        ctx.stroke();

        // Crisp specular silk highlight filament
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = rgbaStr(specularRgb, r.crestAlpha * 0.72);
        ctx.stroke();
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now: number) => {
      if (disposed || !isVisible || !isTabVisible || reducedMotion) {
        rafId = null;
        return;
      }

      const rawDeltaMs = lastNow > 0 ? now - lastNow : 16.67;
      lastNow = now;
      elapsedSec += Math.min(rawDeltaMs, 100) / 1000;

      renderCanvas2DFrame(elapsedSec);
      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (disposed || rafId !== null || !isVisible || !isTabVisible) return;
      if (reducedMotion) {
        renderCanvas2DFrame(elapsedSec);
        return;
      }
      lastNow = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (reducedMotion) {
        stopLoop();
        renderCanvas2DFrame(elapsedSec);
      } else {
        startLoop();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      syncCanvas2DSize();
      renderCanvas2DFrame(elapsedSec);
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (!isVisible) {
          stopLoop();
        } else {
          startLoop();
        }
      },
      { threshold: 0.01 }
    );

    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery?.addEventListener('change', onMotionChange);
    resizeObserver.observe(container);
    intersectionObserver.observe(container);

    syncCanvas2DSize();
    renderCanvas2DFrame(elapsedSec);
    startLoop();

    return () => {
      disposed = true;
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery?.removeEventListener('change', onMotionChange);
    };
  }, [engineMode, forceEngine]);

  return (
    <div
      ref={containerRef}
      className={`silk-root ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        key={engineMode}
        ref={canvasRef}
        className="silk-canvas"
        aria-hidden="true"
      />
      <div className="silk-vignette" />
    </div>
  );
};

export default Silk;
