import type { EmojiConfig } from "../types";
import { clipBackground } from "./background";

export function renderEmojiIcon(
  ctx: CanvasRenderingContext2D,
  config: EmojiConfig,
  size: number
): void {
  ctx.save();
  clipBackground(ctx, config.bgShape, size);

  // Background
  if (config.showBackground) {
    ctx.fillStyle = config.bgColor;
    ctx.fillRect(0, 0, size, size);
  }

  // Emoji
  const fontSize = Math.round(size * config.emojiSize);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(config.emoji, size / 2, size / 2 + fontSize * 0.05);

  ctx.restore();
}
