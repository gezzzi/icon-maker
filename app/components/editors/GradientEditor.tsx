"use client";

import type { GradientConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";

interface GradientEditorProps {
  config: GradientConfig;
  onChange: (config: GradientConfig) => void;
}

const gradientTypes: {
  value: GradientConfig["gradientType"];
  label: string;
}[] = [
  { value: "linear", label: "線形" },
  { value: "radial", label: "放射" },
  { value: "conic", label: "円錐" },
];

export function GradientEditor({ config, onChange }: GradientEditorProps) {
  const update = (partial: Partial<GradientConfig>) =>
    onChange({ ...config, ...partial });

  const updateStop = (index: number, color: string) => {
    const stops = [...config.colorStops];
    stops[index] = { ...stops[index], color };
    update({ colorStops: stops });
  };

  const updateStopPosition = (index: number, position: number) => {
    const stops = [...config.colorStops];
    stops[index] = { ...stops[index], position };
    update({ colorStops: stops });
  };

  const addStop = () => {
    if (config.colorStops.length >= 4) return;
    update({
      colorStops: [...config.colorStops, { color: "#10B981", position: 0.5 }],
    });
  };

  const removeStop = (index: number) => {
    if (config.colorStops.length <= 2) return;
    update({ colorStops: config.colorStops.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">タイプ</span>
        <div className="flex gap-1">
          {gradientTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ gradientType: t.value })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.gradientType === t.value
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <SliderControl
        label="角度"
        value={config.angle}
        min={0}
        max={360}
        step={5}
        onChange={(v) => update({ angle: v })}
      />

      <ShapeSelector
        label="形状"
        value={config.bgShape}
        onChange={(v) => update({ bgShape: v })}
      />

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">カラーストップ</span>
          {config.colorStops.length < 4 && (
            <button
              onClick={addStop}
              className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
            >
              + 追加
            </button>
          )}
        </div>

        {config.colorStops.map((stop, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <ColorPicker
              label={`色 ${i + 1}`}
              value={stop.color}
              onChange={(v) => updateStop(i, v)}
            />
            <SliderControl
              label="位置"
              value={stop.position}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => updateStopPosition(i, v)}
            />
            {config.colorStops.length > 2 && (
              <button
                onClick={() => removeStop(i)}
                className="text-xs text-red-500 hover:text-red-700 shrink-0"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
