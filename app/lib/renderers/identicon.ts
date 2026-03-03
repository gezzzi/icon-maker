import type { IdenticonConfig } from "../types";
import { clipBackground } from "./background";
import { simpleHash, hashToColor } from "../utils/hash";

export function renderIdenticonIcon(
  ctx: CanvasRenderingContext2D,
  config: IdenticonConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  const hash = simpleHash(config.seed || "icon");
  const gridSize = config.gridSize;
  const cellSize = size / gridSize;
  const halfGrid = Math.ceil(gridSize / 2);

  // Background
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, size, size);

  // Fill color
  ctx.fillStyle = config.autoColor ? hashToColor(hash) : config.color;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < halfGrid; col++) {
      const bitIndex = row * halfGrid + col;
      const filled = (hash[bitIndex % hash.length] >> (bitIndex % 8)) & 1;
      if (filled) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        // Mirror
        const mirrorCol = gridSize - 1 - col;
        if (mirrorCol !== col) {
          ctx.fillRect(
            mirrorCol * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
  }

  ctx.restore();
}
