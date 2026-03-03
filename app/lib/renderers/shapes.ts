import type { ShapeConfig, ShapeLayer } from "../types";
import { clipBackground } from "./background";

function drawShape(
  ctx: CanvasRenderingContext2D,
  layer: ShapeLayer,
  size: number
): void {
  const cx = size / 2 + layer.offsetX * size;
  const cy = size / 2 + layer.offsetY * size;
  const r = (size / 2) * layer.size;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((layer.rotation * Math.PI) / 180);
  ctx.fillStyle = layer.color;
  ctx.beginPath();

  switch (layer.shape) {
    case "circle":
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      break;
    case "square":
      ctx.rect(-r, -r, r * 2, r * 2);
      break;
    case "triangle":
      ctx.moveTo(0, -r);
      ctx.lineTo(r, r);
      ctx.lineTo(-r, r);
      ctx.closePath();
      break;
    case "diamond":
      ctx.moveTo(0, -r);
      ctx.lineTo(r, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r, 0);
      ctx.closePath();
      break;
    case "hexagon":
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      break;
    case "star": {
      const outerR = r;
      const innerR = r * 0.4;
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? outerR : innerR;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      break;
    }
    case "cross": {
      const w = r * 0.35;
      ctx.moveTo(-w, -r);
      ctx.lineTo(w, -r);
      ctx.lineTo(w, -w);
      ctx.lineTo(r, -w);
      ctx.lineTo(r, w);
      ctx.lineTo(w, w);
      ctx.lineTo(w, r);
      ctx.lineTo(-w, r);
      ctx.lineTo(-w, w);
      ctx.lineTo(-r, w);
      ctx.lineTo(-r, -w);
      ctx.lineTo(-w, -w);
      ctx.closePath();
      break;
    }
    case "heart": {
      const s = r * 0.6;
      ctx.moveTo(0, r * 0.4);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s * 1.8, -s * 0.3, -s * 1.2, -s * 1.2);
      ctx.bezierCurveTo(-s * 0.6, -s * 2, 0, -s * 1.4, 0, -s * 0.6);
      ctx.bezierCurveTo(0, -s * 1.4, s * 0.6, -s * 2, s * 1.2, -s * 1.2);
      ctx.bezierCurveTo(s * 1.8, -s * 0.3, s * 0.5, -s * 0.3, 0, r * 0.4);
      ctx.closePath();
      break;
    }
  }

  ctx.fill();
  ctx.restore();
}

export function renderShapeIcon(
  ctx: CanvasRenderingContext2D,
  config: ShapeConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  // Background
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, size, size);

  // Layers
  for (const layer of config.layers) {
    drawShape(ctx, layer, size);
  }

  ctx.restore();
}
