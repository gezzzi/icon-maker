"use client";

import type { IconConfig } from "@/app/lib/types";
import { MainCanvas } from "./MainCanvas";
import { SizePreview } from "./SizePreview";

interface PreviewPanelProps {
  config: IconConfig;
  svgString?: string;
}

const previewSizes = [16, 32, 48, 128];

export function PreviewPanel({ config, svgString }: PreviewPanelProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-surface rounded-xl shadow-sm border border-border">
        <MainCanvas config={config} size={256} svgString={svgString} />
      </div>
      <div>
        <p className="text-xs text-muted mb-2 text-center">サイズプレビュー</p>
        <div className="flex items-end gap-3">
          {previewSizes.map((size) => (
            <SizePreview
              key={size}
              config={config}
              size={size}
              svgString={svgString}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
