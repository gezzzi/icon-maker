"use client";

import { useEffect, useRef } from "react";
import type { IconConfig } from "@/app/lib/types";
import { renderIconAsync } from "@/app/lib/renderer";

interface SizePreviewProps {
  config: IconConfig;
  size: number;
  svgString?: string;
}

export function SizePreview({ config, size, svgString }: SizePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderIconAsync(ctx, config, size, svgString);
  }, [config, size, svgString]);

  const displaySize = Math.max(size, 32);

  return (
    <div className="flex flex-col items-center gap-1">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-border rounded"
        style={{
          width: displaySize,
          height: displaySize,
          imageRendering: size < 48 ? "pixelated" : "auto",
        }}
      />
      <span className="text-xs text-muted">{size}px</span>
    </div>
  );
}
