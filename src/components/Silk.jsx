'use client';

import React, { useRef, useEffect, useState } from 'react';
import { isIOS } from '@/hooks/useIsMobile';

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

// Streamlined Fragment Shader: 2 harmonic sines, mediump, precomputed CPU rotation matrix
const fragmentShaderSource = `
precision mediump float;
varying vec2 vUv;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform mat2  uRot;

void main() {
  vec2 uv = uRot * (vUv * uScale);
  float t = uSpeed * uTime * 0.08;

  // Harmonized dual-wave interference (2 sines total vs 8 in legacy)
  float w1 = sin(uv.x * 4.0 + uv.y * 2.5 + t);
  float w2 = sin(uv.y * 3.5 - uv.x * 2.0 - t * 0.7);
  float pattern = 0.65 + 0.35 * (w1 * 0.5 + w2 * 0.5);

  gl_FragColor = vec4(uColor * pattern, 1.0);
}
`;

const Silk = ({ speed = 7.5, scale = 1, color = '#27CBCE', noiseIntensity = 5.9, rotation = 0 }) => {
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Graceful bailout on iOS devices to prevent WebKit Jetsam 250MB memory crashes
    if (isIOS()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const isLowPower =
      /Mobi|Android|Windows Phone/i.test(navigator.userAgent) ||
      window.innerWidth <= 1024;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
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

    // Full-screen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
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
    const uRotLoc = gl.getUniformLocation(program, 'uRot');

    const rgb = hexToNormalizedRGB(color);
    if (uColorLoc) gl.uniform3f(uColorLoc, rgb[0], rgb[1], rgb[2]);
    if (uSpeedLoc) gl.uniform1f(uSpeedLoc, speed);
    if (uScaleLoc) gl.uniform1f(uScaleLoc, scale);

    // Compute 2x2 rotation matrix ONCE on CPU (saves millions of trig ops per frame)
    const rad = (rotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);
    if (uRotLoc) gl.uniformMatrix2fv(uRotLoc, false, [cosR, -sinR, sinR, cosR]);

    // Resize handler: Cap DPR strictly at 1.0 (0.75 for low power)
    const resize = () => {
      if (!canvas) return;
      const dpr = isLowPower ? 0.75 : 1.0;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

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

    // Viewport Intersection & Visibility Culling
    let isIntersecting = true;
    let isTabVisible = !document.hidden;
    let animId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let elapsedTime = 0;
    let lastTime = performance.now();

    // Immediate warm-up draw before loop
    if (uTimeLoc) gl.uniform1f(uTimeLoc, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    setIsReady(true);

    const loop = (currentTime) => {
      animId = requestAnimationFrame(loop);
      if (!isIntersecting || !isTabVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      elapsedTime += delta;

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
  }, [speed, scale, color, rotation]);

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
        opacity: isReady ? 1 : 0,
        transition: 'opacity 500ms ease-out',
      }}
    />
  );
};

export default Silk;
