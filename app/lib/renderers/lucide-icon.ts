import type { LucideIconConfig } from "../types";
import { clipBackground } from "./background";

export async function renderLucideIconAsync(
  ctx: CanvasRenderingContext2D,
  config: LucideIconConfig,
  size: number,
  svgString: string
): Promise<void> {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  // Background
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, size, size);

  const padding = size * config.padding;
  const iconSize = size - padding * 2;

  const coloredSvg = svgString
    .replace(/stroke="[^"]*"/g, `stroke="${config.iconColor}"`)
    .replace(
      /stroke-width="[^"]*"/g,
      `stroke-width="${config.strokeWidth}"`
    )
    .replace(/width="[^"]*"/, `width="${iconSize}"`)
    .replace(/height="[^"]*"/, `height="${iconSize}"`);

  const blob = new Blob([coloredSvg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, padding, padding, iconSize, iconSize);
      URL.revokeObjectURL(url);
      ctx.restore();
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      ctx.restore();
      resolve();
    };
    img.src = url;
  });
}
