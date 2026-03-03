"use client";

import { useState } from "react";
import type { IconConfig } from "@/app/lib/types";
import { exportPresets } from "@/app/lib/export/presets";
import { exportPng } from "@/app/lib/export/png-export";
import { exportIco } from "@/app/lib/export/ico-export";
import { downloadBlob } from "@/app/lib/utils/download";

interface ExportPanelProps {
  config: IconConfig;
  svgString?: string;
}

export function ExportPanel({ config, svgString }: ExportPanelProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (presetId: string) => {
    const preset = exportPresets.find((p) => p.id === presetId);
    if (!preset) return;

    setExporting(presetId);
    try {
      let blob: Blob;
      if (preset.format === "ico") {
        blob = await exportIco(config, preset.sizes, svgString);
      } else {
        blob = await exportPng(config, preset.sizes[0], svgString);
      }
      downloadBlob(blob, preset.filename);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="border-t border-border pt-4">
      <h3 className="text-sm font-medium mb-3">エクスポート</h3>
      <div className="flex flex-wrap gap-2">
        {exportPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleExport(preset.id)}
            disabled={exporting !== null}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting === preset.id ? "処理中..." : preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
