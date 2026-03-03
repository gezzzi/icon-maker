"use client";

import type { PatternConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";

interface PatternEditorProps {
  config: PatternConfig;
  onChange: (config: PatternConfig) => void;
}

const patternTypes: {
  value: PatternConfig["patternType"];
  label: string;
}[] = [
  { value: "stripes", label: "ストライプ" },
  { value: "dots", label: "ドット" },
  { value: "grid", label: "グリッド" },
  { value: "checkerboard", label: "チェック" },
  { value: "diagonal", label: "斜線" },
];

export function PatternEditor({ config, onChange }: PatternEditorProps) {
  const update = (partial: Partial<PatternConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">パターン</span>
        <div className="flex flex-wrap gap-1">
          {patternTypes.map((p) => (
            <button
              key={p.value}
              onClick={() => update({ patternType: p.value })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.patternType === p.value
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <ColorPicker
        label="メイン色"
        value={config.primaryColor}
        onChange={(v) => update({ primaryColor: v })}
      />

      <ColorPicker
        label="サブ色"
        value={config.secondaryColor}
        onChange={(v) => update({ secondaryColor: v })}
      />

      <SliderControl
        label="スケール"
        value={config.scale}
        min={0.2}
        max={2}
        step={0.1}
        onChange={(v) => update({ scale: v })}
      />

      <SliderControl
        label="回転"
        value={config.rotation}
        min={0}
        max={360}
        step={5}
        onChange={(v) => update({ rotation: v })}
      />

      <ShapeSelector
        label="形状"
        value={config.bgShape}
        onChange={(v) => update({ bgShape: v })}
      />
    </div>
  );
}
