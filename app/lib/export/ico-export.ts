import { exportPng } from "./png-export";
import type { IconConfig } from "../types";

export async function exportIco(
  config: IconConfig,
  sizes: number[],
  svgString?: string
): Promise<Blob> {
  // Render each size to PNG
  const pngBuffers: ArrayBuffer[] = [];
  for (const size of sizes) {
    const blob = await exportPng(config, size, svgString);
    pngBuffers.push(await blob.arrayBuffer());
  }

  // Build ICO file
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * sizes.length;
  const dataOffset = headerSize + dirSize;

  let totalDataSize = 0;
  for (const png of pngBuffers) totalDataSize += png.byteLength;

  const buffer = new ArrayBuffer(dataOffset + totalDataSize);
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);

  // Header
  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type: ICO
  view.setUint16(4, sizes.length, true); // Image count

  // Directory entries + copy PNG data
  let currentOffset = dataOffset;
  for (let i = 0; i < sizes.length; i++) {
    const entryOffset = 6 + i * 16;
    const size = sizes[i];
    const pngData = pngBuffers[i];

    view.setUint8(entryOffset + 0, size < 256 ? size : 0); // Width
    view.setUint8(entryOffset + 1, size < 256 ? size : 0); // Height
    view.setUint8(entryOffset + 2, 0); // Color count
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Color planes
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel
    view.setUint32(entryOffset + 8, pngData.byteLength, true); // Data size
    view.setUint32(entryOffset + 12, currentOffset, true); // Data offset

    uint8.set(new Uint8Array(pngData), currentOffset);
    currentOffset += pngData.byteLength;
  }

  return new Blob([buffer], { type: "image/x-icon" });
}
