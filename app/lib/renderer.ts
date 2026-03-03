import type { IconConfig } from "./types";
import { renderTextIcon } from "./renderers/text";
import { renderEmojiIcon } from "./renderers/emoji";
import { renderShapeIcon } from "./renderers/shapes";
import { renderGradientIcon } from "./renderers/gradient";
import { renderPatternIcon } from "./renderers/pattern";
import { renderIdenticonIcon } from "./renderers/identicon";
import { renderLucideIconAsync } from "./renderers/lucide-icon";

function renderIconSync(
  ctx: CanvasRenderingContext2D,
  config: IconConfig,
  size: number
): void {
  switch (config.mode) {
    case "text":
      renderTextIcon(ctx, config, size);
      break;
    case "emoji":
      renderEmojiIcon(ctx, config, size);
      break;
    case "shape":
      renderShapeIcon(ctx, config, size);
      break;
    case "gradient":
      renderGradientIcon(ctx, config, size);
      break;
    case "pattern":
      renderPatternIcon(ctx, config, size);
      break;
    case "identicon":
      renderIdenticonIcon(ctx, config, size);
      break;
    case "lucide-icon":
      // Sync fallback: draw background only
      ctx.save();
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();
      break;
  }
}

export async function renderIconAsync(
  ctx: CanvasRenderingContext2D,
  config: IconConfig,
  size: number,
  svgString?: string
): Promise<void> {
  ctx.clearRect(0, 0, size, size);

  if (config.mode === "lucide-icon" && svgString) {
    await renderLucideIconAsync(ctx, config, size, svgString);
  } else {
    renderIconSync(ctx, config, size);
  }
}
