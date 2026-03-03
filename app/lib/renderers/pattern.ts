import type { PatternConfig } from "../types";
import { clipBackground } from "./background";

export function renderPatternIcon(
  ctx: CanvasRenderingContext2D,
  config: PatternConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  // Background
  ctx.fillStyle = config.primaryColor;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate((config.rotation * Math.PI) / 180);
  ctx.translate(-size / 2, -size / 2);

  const cellSize = Math.max(4, size * config.scale * 0.15);
  ctx.fillStyle = config.secondaryColor;
  ctx.strokeStyle = config.secondaryColor;

  // Expand drawing area to cover rotation
  const expand = size * 0.5;
  const startX = -expand;
  const startY = -expand;
  const endX = size + expand;
  const endY = size + expand;

  switch (config.patternType) {
    case "stripes":
      ctx.lineWidth = cellSize * 0.5;
      for (let x = startX; x < endX; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
      break;

    case "dots":
      for (let x = startX; x < endX; x += cellSize) {
        for (let y = startY; y < endY; y += cellSize) {
          ctx.beginPath();
          ctx.arc(x, y, cellSize * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;

    case "grid":
      ctx.lineWidth = cellSize * 0.1;
      for (let x = startX; x < endX; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
      for (let y = startY; y < endY; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }
      break;

    case "checkerboard":
      for (let x = startX; x < endX; x += cellSize) {
        for (let y = startY; y < endY; y += cellSize) {
          const ix = Math.round(x / cellSize);
          const iy = Math.round(y / cellSize);
          if ((ix + iy) % 2 === 0) {
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }
      }
      break;

    case "diagonal":
      ctx.lineWidth = cellSize * 0.3;
      for (let i = startX - endY; i < endX + endY; i += cellSize) {
        ctx.beginPath();
        ctx.moveTo(i, startY);
        ctx.lineTo(i + endY - startY, endY);
        ctx.stroke();
      }
      break;
  }

  ctx.restore();
  ctx.restore();
}
