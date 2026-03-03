import type { BackgroundShape } from "../types";

export function clipBackground(
  ctx: CanvasRenderingContext2D,
  shape: BackgroundShape,
  size: number
): void {
  ctx.beginPath();
  if (shape === "circle") {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  } else if (shape === "rounded-square") {
    const r = size * 0.15;
    ctx.roundRect(0, 0, size, size, r);
  } else {
    ctx.rect(0, 0, size, size);
  }
  ctx.clip();
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  shape: BackgroundShape,
  color: string,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, shape, size);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();
}
