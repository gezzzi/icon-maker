import type { GradientConfig } from "../types";
import { clipBackground } from "./background";

export function renderGradientIcon(
  ctx: CanvasRenderingContext2D,
  config: GradientConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  let gradient: CanvasGradient;
  const cx = size / 2;
  const cy = size / 2;

  if (config.gradientType === "linear") {
    const angle = (config.angle * Math.PI) / 180;
    const dx = Math.cos(angle) * size;
    const dy = Math.sin(angle) * size;
    gradient = ctx.createLinearGradient(
      cx - dx / 2,
      cy - dy / 2,
      cx + dx / 2,
      cy + dy / 2
    );
  } else if (config.gradientType === "radial") {
    gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  } else {
    gradient = ctx.createConicGradient(
      (config.angle * Math.PI) / 180,
      cx,
      cy
    );
  }

  for (const stop of config.colorStops) {
    gradient.addColorStop(stop.position, stop.color);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();
}
