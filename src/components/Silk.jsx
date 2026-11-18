'use client';

import React, { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_scale;
  uniform float u_intensity;
  uniform float u_rotation;
  uniform vec3 u_bgColor;
  uniform vec3 u_primaryColor;
  uniform vec3 u_highlightColor;

  vec2 rotate2D(vec2 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  void main() {
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
    uv = rotate2D(uv * u_scale, u_rotation);

    float t = u_time;
    vec2 p = uv;

    // 4-octave domain-warped organic silk distortion
    for (int i = 0; i < 4; i++) {
      float fi = float(i) + 1.0;
      p.x += (0.34 / fi) * sin(fi * 2.1 * p.y + t * (0.42 + 0.11 * fi) + fi * 1.3);
      p.y += (0.34 / fi) * cos(fi * 1.85 * p.x - t * (0.36 + 0.09 * fi) + fi * 0.7);
    }

    float wave1 = sin(p.y * 3.6 + p.x * 1.35 + t * 0.55);
    float wave2 = sin(p.y * 6.2 - p.x * 2.05 - t * 0.42);
    float ribbon = 0.5 + 0.5 * sin(p.y * 2.55 + wave1 * 1.35 + wave2 * 0.55);

    float body = smoothstep(0.16, 0.86, ribbon);
    float crest = pow(clamp(ribbon, 0.0, 1.0), 5.0);
    float fineStrand = pow(0.5 + 0.5 * cos(p.y * 14.0 + wave1 * 3.0), 8.0) * body;

    float verticalMask = exp(-uv.y * uv.y * 1.05);
    float energy = (body * 0.55 + crest * 0.78 + fineStrand * 0.45) * verticalMask * u_intensity;

    vec3 col = u_bgColor;
    col = mix(col, u_primaryColor * 0.52, clamp(body * verticalMask * 0.85, 0.0, 1.0));
    col += u_primaryColor * (energy * 0.65);
    col += u_highlightColor * (crest * verticalMask * 0.72 + fineStrand * verticalMask * 0.42);

    // Filmic roll-off so luminous cyan highlights stay silky
    col = col / (1.0 + col * 0.24);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function parseHexColor(hex, fallback) {
  if (typeof hex !== 'string') return fallback;
  let clean = hex.trim().replace('#', '');
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return fallback;
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function toVec3(rgb) {
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

function rgbaStr(rgb, alpha) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function compileShader(gl, type, source) {
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

function probeWebGLSupport() {
  if (typeof document === 'undefined') return false;
  try {
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 1;
    testCanvas.height = 1;
    const opts = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    };
    const gl =
      testCanvas.getContext('webgl2', opts) ||
      testCanvas.getContext('webgl', opts) ||
      testCanvas.getContext('experimental-webgl', opts);

    if (!gl) return false;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return false;
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return true;
  } catch {
    return false;
  }
}

function traceSmoothCurve(ctx, xs, ys, count, moveFirst) {
  if (count < 2) return;
  if (moveFirst) {
    ctx.moveTo(xs[0], ys[0]);
  } else {
    ctx.lineTo(xs[0], ys[0]);
  }
  for (let i = 1; i < count - 1; i++) {
    const mx = (xs[i] + xs[i + 1]) * 0.5;
    const my = (ys[i] + ys[i + 1]) * 0.5;
    ctx.quadraticCurveTo(xs[i], ys[i], mx, my);
  }
  ctx.lineTo(xs[count - 1], ys[count - 1]);
}

function traceSmoothCurveReverse(ctx, xs, ys, count) {
  if (count < 2) return;
  ctx.lineTo(xs[count - 1], ys[count - 1]);
  for (let i = count - 2; i > 0; i--) {
    const mx = (xs[i] + xs[i - 1]) * 0.5;
    const my = (ys[i] + ys[i - 1]) * 0.5;
    ctx.quadraticCurveTo(xs[i], ys[i], mx, my);
  }
  ctx.lineTo(xs[0], ys[0]);
}

const RIBBON_CONFIGS = [
  {
    yFactor: 0.40,
    slope: -0.07,
    amp1: 0.13,
    amp2: 0.055,
    freq1: 2.35,
    freq2: 4.1,
    speed1: 0.62,
    speed2: -0.48,
    phase: 0.2,
    twistFreq: 1.75,
    twistSpeed: 0.42,
    thickness: 0.11,
    strands: 11,
  },
  {
    yFactor: 0.52,
    slope: -0.04,
    amp1: 0.15,
    amp2: 0.06,
    freq1: 1.95,
    freq2: 3.6,
    speed1: -0.52,
    speed2: 0.44,
    phase: 2.1,
    twistFreq: 2.05,
    twistSpeed: -0.36,
    thickness: 0.135,
    strands: 12,
  },
  {
    yFactor: 0.64,
    slope: -0.085,
    amp1: 0.11,
    amp2: 0.048,
    freq1: 2.75,
    freq2: 4.5,
    speed1: 0.48,
    speed2: 0.35,
    phase: 4.05,
    twistFreq: 1.55,
    twistSpeed: 0.31,
    thickness: 0.095,
    strands: 10,
  },
];

export default function Silk({
  speed = 1.0,
  scale = 1.0,
  noiseIntensity = 1.0,
  intensity = 1.0,
  rotation = -0.18,
  backgroundColor = '#050810',
  color = '#27CBCE',
  highlightColor = '#8CF6F7',
  forceFallback = false,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // 'css-seed' -> 'webgl' | 'canvas2d'
  const [engineMode, setEngineMode] = useState('css-seed');

  const effIntensity = noiseIntensity !== undefined ? noiseIntensity : intensity;

  const paramsRef = useRef({
    speed,
    scale,
    noiseIntensity: effIntensity,
    rotation,
    backgroundColor,
    color,
    highlightColor,
  });

  paramsRef.current = {
    speed,
    scale,
    noiseIntensity: effIntensity,
    rotation,
    backgroundColor,
    color,
    highlightColor,
  };

  // Step 1: Probe GPU WebGL safely on mount without polluting the display canvas
  useEffect(() => {
    if (forceFallback) {
      setEngineMode('canvas2d');
      return;
    }
    const hasWebGL = probeWebGLSupport();
    setEngineMode(hasWebGL ? 'webgl' : 'canvas2d');
  }, [forceFallback]);

  // Step 2: Run the active engine (WebGL or Canvas 2D) on a fresh keyed <canvas>
  useEffect(() => {
    if (engineMode === 'css-seed') return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let disposed = false;
    let rafId = 0;
    let isVisible = true;
    let isTabActive = typeof document !== 'undefined' ? !document.hidden : true;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    let prefersReducedMotion = motionQuery ? motionQuery.matches : false;

    let cleanupEngine = () => {};
    let renderFrame = () => {};
    let handleResize = () => {};

    const triggerFallback = () => {
      if (!disposed && engineMode === 'webgl') {
        setEngineMode('canvas2d');
      }
    };

    // =========================================================================
    // ENGINE A: WEBGL2 / WEBGL1 SHADER ENGINE
    // =========================================================================
    if (engineMode === 'webgl') {
      const opts = {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
      };

      let gl = null;
      try {
        gl =
          canvas.getContext('webgl2', opts) ||
          canvas.getContext('webgl', opts) ||
          canvas.getContext('experimental-webgl', opts);
      } catch {
        gl = null;
      }

      if (!gl) {
        triggerFallback();
        return undefined;
      }

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      const program = vs && fs ? gl.createProgram() : null;

      if (!program) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        triggerFallback();
        return undefined;
      }

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        triggerFallback();
        return undefined;
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'a_position');
      const uniforms = {
        time: gl.getUniformLocation(program, 'u_time'),
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        scale: gl.getUniformLocation(program, 'u_scale'),
        intensity: gl.getUniformLocation(program, 'u_intensity'),
        rotation: gl.getUniformLocation(program, 'u_rotation'),
        bgColor: gl.getUniformLocation(program, 'u_bgColor'),
        primaryColor: gl.getUniformLocation(program, 'u_primaryColor'),
        highlightColor: gl.getUniformLocation(program, 'u_highlightColor'),
      };

      const onContextLost = (e) => {
        e.preventDefault();
        triggerFallback();
      };
      canvas.addEventListener('webglcontextlost', onContextLost, false);

      handleResize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.max(1, Math.floor(rect.width * dpr));
        const h = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      renderFrame = (elapsedSec) => {
        if (gl.isContextLost()) {
          triggerFallback();
          return;
        }
        if (canvas.width === 0 || canvas.height === 0) return;

        const p = paramsRef.current;
        const bgRgb = toVec3(parseHexColor(p.backgroundColor, { r: 5, g: 8, b: 16 }));
        const priRgb = toVec3(parseHexColor(p.color, { r: 39, g: 203, b: 206 }));
        const hiRgb = toVec3(parseHexColor(p.highlightColor, { r: 140, g: 246, b: 247 }));

        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(uniforms.time, elapsedSec * Math.max(0.05, p.speed) * 0.7);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.scale, Math.max(0.25, p.scale));
        gl.uniform1f(uniforms.intensity, Math.max(0.1, p.noiseIntensity));
        gl.uniform1f(uniforms.rotation, p.rotation);
        gl.uniform3fv(uniforms.bgColor, bgRgb);
        gl.uniform3fv(uniforms.primaryColor, priRgb);
        gl.uniform3fv(uniforms.highlightColor, hiRgb);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      cleanupEngine = () => {
        canvas.removeEventListener('webglcontextlost', onContextLost, false);
        try {
          gl.deleteBuffer(buffer);
          gl.deleteProgram(program);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
        } catch {
          // Ignore errors if context was already lost
        }
      };
    }

    // =========================================================================
    // ENGINE B: 60 FPS SOFTWARE-SAFE CANVAS 2D SILK RIBBON ENGINE
    // =========================================================================
    if (engineMode === 'canvas2d') {
      const ctx =
        canvas.getContext('2d', { alpha: false, desynchronized: true }) ||
        canvas.getContext('2d');

      if (!ctx) {
        return undefined;
      }

      let cssWidth = 0;
      let cssHeight = 0;
      let dpr = 1;
      let cols = 0;

      // Pre-allocated typed buffers to prevent per-frame GC spikes
      let xs = new Float32Array(0);
      let topYs = new Float32Array(0);
      let botYs = new Float32Array(0);
      let strandYs = new Float32Array(0);

      let glowGradA = null;
      let glowGradB = null;
      let lastColorKey = '';

      const rebuildGradients = (priRgb, hiRgb) => {
        if (cssWidth <= 0 || cssHeight <= 0) return;

        glowGradA = ctx.createRadialGradient(
          cssWidth * 0.34,
          cssHeight * 0.50,
          0,
          cssWidth * 0.34,
          cssHeight * 0.50,
          Math.max(cssWidth, cssHeight) * 0.65
        );
        glowGradA.addColorStop(0, rgbaStr(priRgb, 0.22));
        glowGradA.addColorStop(0.55, rgbaStr(priRgb, 0.07));
        glowGradA.addColorStop(1, rgbaStr(priRgb, 0));

        glowGradB = ctx.createRadialGradient(
          cssWidth * 0.72,
          cssHeight * 0.45,
          0,
          cssWidth * 0.72,
          cssHeight * 0.45,
          Math.max(cssWidth, cssHeight) * 0.55
        );
        glowGradB.addColorStop(0, rgbaStr(hiRgb, 0.16));
        glowGradB.addColorStop(0.5, rgbaStr(priRgb, 0.05));
        glowGradB.addColorStop(1, rgbaStr(priRgb, 0));
      };

      handleResize = () => {
        const rect = container.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        cssWidth = Math.max(1, Math.floor(rect.width));
        cssHeight = Math.max(1, Math.floor(rect.height));

        const targetW = Math.max(1, Math.floor(cssWidth * dpr));
        const targetH = Math.max(1, Math.floor(cssHeight * dpr));
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }

        // Fixed 74 horizontal segments keeps software rasterization fast (<3ms)
        const segments = 74;
        cols = segments + 1;
        if (xs.length !== cols) {
          xs = new Float32Array(cols);
          topYs = new Float32Array(cols);
          botYs = new Float32Array(cols);
          strandYs = new Float32Array(cols);
        }

        const stepX = cssWidth / segments;
        for (let i = 0; i < cols; i++) {
          xs[i] = i * stepX;
        }

        const p = paramsRef.current;
        const priRgb = parseHexColor(p.color, { r: 39, g: 203, b: 206 });
        const hiRgb = parseHexColor(p.highlightColor, { r: 140, g: 246, b: 247 });
        lastColorKey = `${p.color}|${p.highlightColor}`;
        rebuildGradients(priRgb, hiRgb);
      };

      renderFrame = (elapsedSec) => {
        if (cssWidth <= 0 || cssHeight <= 0 || cols < 2) return;

        const p = paramsRef.current;
        const bgHex = p.backgroundColor || '#050810';
        const priRgb = parseHexColor(p.color, { r: 39, g: 203, b: 206 });
        const hiRgb = parseHexColor(p.highlightColor, { r: 140, g: 246, b: 247 });

        const colorKey = `${p.color}|${p.highlightColor}`;
        if (colorKey !== lastColorKey) {
          lastColorKey = colorKey;
          rebuildGradients(priRgb, hiRgb);
        }

        const t = elapsedSec * Math.max(0.05, p.speed) * 0.85;
        const scaleFactor = Math.max(0.4, p.scale);
        const intensityVal = Math.min(1.8, Math.max(0.25, p.noiseIntensity));
        const rotSlope = Math.sin(p.rotation) * 0.45;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = bgHex;
        ctx.fillRect(0, 0, cssWidth, cssHeight);

        // Soft volumetric cyan nebula pools
        if (glowGradA) {
          ctx.fillStyle = glowGradA;
          ctx.fillRect(0, 0, cssWidth, cssHeight);
        }
        if (glowGradB) {
          ctx.fillStyle = glowGradB;
          ctx.fillRect(0, 0, cssWidth, cssHeight);
        }

        // Additive blending produces luminous silk folds with zero shadowBlur overhead
        ctx.globalCompositeOperation = 'lighter';

        const veilFill = rgbaStr(priRgb, 0.075 * intensityVal);
        const strandStroke = rgbaStr(priRgb, 0.12 * intensityVal);
        const crestStroke = rgbaStr(hiRgb, 0.38 * intensityVal);
        const coreStroke = rgbaStr(hiRgb, 0.22 * intensityVal);

        for (let r = 0; r < RIBBON_CONFIGS.length; r++) {
          const cfg = RIBBON_CONFIGS[r];
          const baseCenterY = cssHeight * cfg.yFactor;
          const totalSlope = cfg.slope + rotSlope;

          for (let i = 0; i < cols; i++) {
            const nx = i / (cols - 1);
            const sx = nx * scaleFactor;

            const carrier =
              Math.sin(sx * cfg.freq1 * Math.PI + t * cfg.speed1 + cfg.phase) *
                (cssHeight * cfg.amp1) +
              Math.cos(sx * cfg.freq2 * Math.PI + t * cfg.speed2 - cfg.phase * 0.6) *
                (cssHeight * cfg.amp2);

            const driftY = (nx - 0.5) * cssHeight * totalSlope;
            const centerY = baseCenterY + driftY + carrier;

            // Twist modulation causes top & bottom silk edges to cross gracefully
            const halfWidth =
              Math.sin(sx * cfg.twistFreq * Math.PI + t * cfg.twistSpeed + cfg.phase) *
              (cssHeight * cfg.thickness);

            const ripple =
              Math.cos(sx * 5.2 * Math.PI - t * 0.65 + r) * (cssHeight * 0.018);

            topYs[i] = centerY - halfWidth + ripple;
            botYs[i] = centerY + halfWidth - ripple * 0.7;
          }

          // 1. Translucent organza ribbon veil
          ctx.beginPath();
          traceSmoothCurve(ctx, xs, topYs, cols, true);
          traceSmoothCurveReverse(ctx, xs, botYs, cols);
          ctx.closePath();
          ctx.fillStyle = veilFill;
          ctx.fill();

          // 2. Layered inner silk strands (natural caustic bunching at twists)
          ctx.lineWidth = 1.25;
          ctx.strokeStyle = strandStroke;
          const strandCount = cfg.strands;

          for (let s = 0; s < strandCount; s++) {
            const frac = s / (strandCount - 1);
            const harmonicOffset = Math.sin(frac * Math.PI) * 0.12;

            for (let i = 0; i < cols; i++) {
              const nx = i / (cols - 1);
              const microWave =
                Math.sin(nx * 6.5 + t * 0.9 + s * 0.55) *
                (cssHeight * 0.008) *
                harmonicOffset;
              strandYs[i] = topYs[i] + (botYs[i] - topYs[i]) * frac + microWave;
            }

            ctx.beginPath();
            traceSmoothCurve(ctx, xs, strandYs, cols, true);
            ctx.stroke();
          }

          // 3. Specular #8CF6F7 silk edge crests
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = crestStroke;
          ctx.beginPath();
          traceSmoothCurve(ctx, xs, topYs, cols, true);
          ctx.stroke();

          ctx.lineWidth = 1.2;
          ctx.strokeStyle = coreStroke;
          ctx.beginPath();
          traceSmoothCurve(ctx, xs, botYs, cols, true);
          ctx.stroke();
        }
      };
    }

    // =========================================================================
    // SHARED LIFECYCLE, OBSERVERS & 60 FPS LOOP
    // =========================================================================
    handleResize();
    renderFrame(0);

    const startTime = performance.now();

    const tick = (now) => {
      if (disposed) return;
      if (!isVisible || !isTabActive || prefersReducedMotion) {
        rafId = 0;
        return;
      }
      const elapsedSec = (now - startTime) * 0.001;
      renderFrame(elapsedSec);
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (disposed || rafId !== 0) return;
      if (!isVisible || !isTabActive || prefersReducedMotion) return;
      rafId = window.requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    let resizeObserver = null;
    const onResize = () => {
      handleResize();
      renderFrame((performance.now() - startTime) * 0.001);
    };

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', onResize);
    }

    let intersectionObserver = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = entry ? entry.isIntersecting : true;
          if (isVisible) startLoop();
          else stopLoop();
        },
        { threshold: 0.01 }
      );
      intersectionObserver.observe(container);
    }

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) startLoop();
      else stopLoop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        renderFrame(0);
      } else {
        startLoop();
      }
    };

    if (motionQuery) {
      if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', onMotionChange);
      } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(onMotionChange);
      }
    }

    startLoop();

    return () => {
      disposed = true;
      stopLoop();
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', onResize);
      if (intersectionObserver) intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (motionQuery) {
        if (typeof motionQuery.removeEventListener === 'function') {
          motionQuery.removeEventListener('change', onMotionChange);
        } else if (typeof motionQuery.removeListener === 'function') {
          motionQuery.removeListener(onMotionChange);
        }
      }
      cleanupEngine();
    };
  }, [engineMode]);

  return (
    <div
      ref={containerRef}
      data-silk-engine={engineMode}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`}
      style={{
        backgroundColor,
        ...style,
      }}
    >
      {/* Zero-blackout CSS ambient silk seed rendered immediately from SSR frame 0 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(62% 52% at 32% 52%, ${color}26 0%, transparent 72%),
            radial-gradient(54% 48% at 72% 46%, ${highlightColor}1c 0%, transparent 70%)
          `,
        }}
      />

      {engineMode !== 'css-seed' && (
        <canvas
          key={engineMode}
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full opacity-100"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  );
}
