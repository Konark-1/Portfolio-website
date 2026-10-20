'use client';

import React, { useRef, useEffect } from 'react';

const hexToNormalizedRGB = (hex) => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
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

// The authentic, exact Silk wave shader from the original design
const fragmentShaderSource = `
precision highp float;
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

const Silk = ({ speed = 7.5, scale = 1, color = '#27CBCE', noiseIntensity = 5.9, rotation = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ultra-lightweight native WebGL context (0KB Three.js overhead, no iOS memory crashes)
    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true, // Prevents iOS Safari from clearing buffer to black on frame drops
    });

    if (!gl) return;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
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
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

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
    if (uSpeedLoc) gl.uniform1f(uSpeedLoc, speed);
    if (uScaleLoc) gl.uniform1f(uScaleLoc, scale);
    if (uRotationLoc) gl.uniform1f(uRotationLoc, rotation);
    if (uNoiseLoc) gl.uniform1f(uNoiseLoc, noiseIntensity);

    // Responsive resize handler with DPR clamp and mobile scroll URL-bar protection
    let lastWidth = 0;
    let lastHeight = 0;

    const resize = () => {
      if (!canvas) return;
      const isMobile = window.innerWidth <= 768;
      const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      // On mobile / iOS, ignore minor height fluctuations caused by address bar collapse during scroll.
      // Reallocating canvas buffer during scroll destroys the drawing buffer and causes screen flicker!
      if (isMobile && lastWidth === width && Math.abs(height - lastHeight) < 120) {
        return;
      }
      lastWidth = width;
      lastHeight = height;

      const dw = Math.floor(width * dpr);
      const dh = Math.floor(height * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        gl.viewport(0, 0, dw, dh);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Viewport intersection observer: pauses render when scrolled away to save 100% GPU
    // rootMargin: '200px' ensures smooth continuous buffer coverage without edge flickering
    let isIntersecting = true;
    let isTabVisible = !document.hidden;
    let animId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '200px', threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let elapsedTime = 0;
    let lastTime = performance.now();

    // Immediate draw on frame 0
    if (uTimeLoc) gl.uniform1f(uTimeLoc, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    const loop = (currentTime) => {
      animId = requestAnimationFrame(loop);
      if (!isIntersecting || !isTabVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      elapsedTime += delta * 0.1;

      if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsedTime);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className="silk-canvas"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  );
};

export default Silk;
