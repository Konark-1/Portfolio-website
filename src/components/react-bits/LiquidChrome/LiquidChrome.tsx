"use client";

import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

import './LiquidChrome.css';

interface LiquidChromeProps {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidChrome = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  className = '',
  style,
  ...props
}: LiquidChromeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const scale = 1;
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Throttle mouse/touch events to reduce main thread blocking
    let rafId: number | null = null;
    let lastMouseUpdate = 0;
    const mouseThrottle = 32; // ~30fps for better INP
    
    function updateMouseUniform(x: number, y: number) {
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleMouseMove(event: MouseEvent) {
      const now = performance.now();
      if (now - lastMouseUpdate < mouseThrottle) {
        return;
      }
      lastMouseUpdate = now;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        updateMouseUniform(x, y);
        rafId = null;
      });
    }

    function handleTouchMove(event: TouchEvent) {
      if (event.touches.length > 0) {
        const now = performance.now();
        if (now - lastMouseUpdate < mouseThrottle) {
          return;
        }
        lastMouseUpdate = now;
        
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          const touch = event.touches[0];
          const rect = container.getBoundingClientRect();
          const x = (touch.clientX - rect.left) / rect.width;
          const y = 1 - (touch.clientY - rect.top) / rect.height;
          updateMouseUniform(x, y);
          rafId = null;
        });
      }
    }

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    let animationId: number | null = null;
    let isPaused = false;
    let lastTime = 0;
    let accumulatedTime = 0;
    
    function update(t: number) {
      if (isPaused) {
        // If paused, don't request next frame but keep accumulated time
        return;
      }
      
      animationId = requestAnimationFrame(update);
      const deltaTime = lastTime ? (t - lastTime) * 0.001 * speed : 0;
      accumulatedTime += deltaTime;
      program.uniforms.uTime.value = accumulatedTime;
      renderer.render({ scene: mesh });
      lastTime = t;
    }
    
    // Start animation
    lastTime = performance.now();
    animationId = requestAnimationFrame(update);

    // IntersectionObserver to pause/resume based on visibility
    // Resume when user is about to reach the section (300px before it's visible)
    const observerOptions = {
      root: null,
      rootMargin: '300px 0px 300px 0px', // Start animating 300px before visible
      threshold: 0
    };
    
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Resume animation if paused
          if (isPaused) {
            isPaused = false;
            lastTime = performance.now();
            if (!animationId) {
              animationId = requestAnimationFrame(update);
            }
          }
        } else {
          // Pause animation when not visible
          if (!isPaused) {
            isPaused = true;
            if (animationId) {
              cancelAnimationFrame(animationId);
              animationId = null;
            }
          }
        }
      });
    }, observerOptions);
    
    visibilityObserver.observe(container);
    
    // Also pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!isPaused) {
          isPaused = true;
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      } else {
        // Resume when tab becomes visible and component is in viewport
        if (isPaused) {
          const rect = container.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight + 300 && rect.bottom > -300;
          if (isInViewport) {
            isPaused = false;
            lastTime = performance.now();
            if (!animationId) {
              animationId = requestAnimationFrame(update);
            }
          }
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    container.appendChild(gl.canvas);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <div 
      ref={containerRef} 
      className={`liquidChrome-container ${className}`} 
      style={style}
      {...props} 
    />
  );
};

export default LiquidChrome;









