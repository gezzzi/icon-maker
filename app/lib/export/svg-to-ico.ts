/**
 * SVG code string → ICO conversion utilities.
 * Loads SVG into an Image, draws onto Canvas at each target size,
 * then assembles the ICO binary (same format as ico-export.ts).
 */

function svgToPng(svgCode: string, size: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG as image"));
    };

    img.src = url;
  });
}

export async function svgToIco(
  svgCode: string,
  sizes: number[]
): Promise<Blob> {
  // Render each size to PNG
  const pngBuffers: ArrayBuffer[] = [];
  for (const size of sizes) {
    const blob = await svgToPng(svgCode, size);
    pngBuffers.push(await blob.arrayBuffer());
  }

  // Build ICO binary
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

    view.setUint8(entryOffset + 0, size < 256 ? size : 0);
    view.setUint8(entryOffset + 1, size < 256 ? size : 0);
    view.setUint8(entryOffset + 2, 0);
    view.setUint8(entryOffset + 3, 0);
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, pngData.byteLength, true);
    view.setUint32(entryOffset + 12, currentOffset, true);

    uint8.set(new Uint8Array(pngData), currentOffset);
    currentOffset += pngData.byteLength;
  }

  return new Blob([buffer], { type: "image/x-icon" });
}
