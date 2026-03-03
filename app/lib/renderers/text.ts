import type { TextConfig } from "../types";
import { clipBackground } from "./background";

export function renderTextIcon(
  ctx: CanvasRenderingContext2D,
  config: TextConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  // Background
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, size, size);

  // Text
  const fontSize = Math.round(size * config.fontSize);
  ctx.font = `${config.fontWeight} ${fontSize}px ${config.fontFamily}`;
  ctx.fillStyle = config.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(config.text, size / 2, size / 2 + fontSize * 0.05);

  ctx.restore();
}
