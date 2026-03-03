import type { IconConfig } from "../types";
import { renderIconAsync } from "../renderer";

export async function exportPng(
  config: IconConfig,
  size: number,
  svgString?: string
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  await renderIconAsync(ctx, config, size, svgString);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}
