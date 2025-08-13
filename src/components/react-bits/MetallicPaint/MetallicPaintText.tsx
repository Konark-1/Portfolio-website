"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import MetallicPaint from "./MetallicPaint";

interface MetallicPaintTextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  className?: string;
  params?: {
    patternScale: number;
    refraction: number;
    edge: number;
    patternBlur: number;
    liquid: number;
    speed: number;
  };
}

const MetallicPaintText: React.FC<MetallicPaintTextProps> = ({
  text,
  fontSize = 32,
  fontFamily = "Arial, sans-serif",
  fontWeight = "bold",
  className = "",
  params = {
    edge: 0,
    patternScale: 2,
    patternBlur: 0.005,
    refraction: 0.015,
    liquid: 0.07,
    speed: 0.3,
  },
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateTextImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set font properties
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    // Measure text to set canvas size
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.2; // Add some padding

    // Set canvas size
    canvas.width = textWidth + 20; // Add padding
    canvas.height = textHeight + 20;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font again (canvas resize clears it)
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    // Draw text
    ctx.fillText(text, 10, canvas.height / 2);

    // Get image data
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setImageData(imgData);
  }, [text, fontSize, fontFamily, fontWeight]);

  useEffect(() => {
    generateTextImage();
  }, [generateTextImage]);

  if (!imageData) {
    return (
      <div className={className}>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <span className="text-2xl font-bold text-white">{text}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <MetallicPaint imageData={imageData} params={params} />
    </div>
  );
};

export default memo(MetallicPaintText);
