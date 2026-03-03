"use client";

import { useEffect, useRef } from "react";
import type { IconConfig } from "@/app/lib/types";
import { renderIconAsync } from "@/app/lib/renderer";

interface MainCanvasProps {
  config: IconConfig;
  size?: number;
  svgString?: string;
}

export function MainCanvas({
  config,
  size = 256,
  svgString,
}: MainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderIconAsync(ctx, config, size, svgString);
  }, [config, size, svgString]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="border border-border rounded-lg"
      style={{ width: size, height: size }}
    />
  );
}
