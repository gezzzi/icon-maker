"use client";

import type { ShapeConfig, ShapeLayer } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";

interface ShapeEditorProps {
  config: ShapeConfig;
  onChange: (config: ShapeConfig) => void;
}

const shapeTypes: { value: ShapeLayer["shape"]; label: string }[] = [
  { value: "circle", label: "円" },
  { value: "square", label: "四角" },
  { value: "triangle", label: "三角" },
  { value: "diamond", label: "ダイヤ" },
  { value: "hexagon", label: "六角" },
  { value: "star", label: "星" },
  { value: "cross", label: "十字" },
  { value: "heart", label: "ハート" },
];

export function ShapeEditor({ config, onChange }: ShapeEditorProps) {
  const update = (partial: Partial<ShapeConfig>) =>
    onChange({ ...config, ...partial });

  const updateLayer = (index: number, partial: Partial<ShapeLayer>) => {
    const layers = [...config.layers];
    layers[index] = { ...layers[index], ...partial };
    update({ layers });
  };

  const addLayer = () => {
    if (config.layers.length >= 3) return;
    update({
      layers: [
        ...config.layers,
        {
          shape: "circle",
          color: "#F59E0B",
          size: 0.4,
          rotation: 0,
          offsetX: 0,
          offsetY: 0,
        },
      ],
    });
  };

  const removeLayer = (index: number) => {
    update({ layers: config.layers.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-3">
      <ColorPicker
        label="背景色"
        value={config.bgColor}
        onChange={(v) => update({ bgColor: v })}
      />

      <ShapeSelector
        label="背景の形"
        value={config.bgShape}
        onChange={(v) => update({ bgShape: v })}
      />

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">レイヤー</span>
          {config.layers.length < 3 && (
            <button
              onClick={addLayer}
              className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
            >
              + 追加
            </button>
          )}
        </div>

        {config.layers.map((layer, i) => (
          <div
            key={i}
            className="border border-border rounded-lg p-3 mb-2 bg-input-bg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">レイヤー {i + 1}</span>
              {config.layers.length > 1 && (
                <button
                  onClick={() => removeLayer(i)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  削除
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {shapeTypes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateLayer(i, { shape: s.value })}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    layer.shape === s.value
                      ? "bg-primary text-white border-primary"
                      : "bg-surface border-border hover:bg-surface-hover"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <ColorPicker
                label="色"
                value={layer.color}
                onChange={(v) => updateLayer(i, { color: v })}
              />
              <SliderControl
                label="サイズ"
                value={layer.size}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(v) => updateLayer(i, { size: v })}
              />
              <SliderControl
                label="回転"
                value={layer.rotation}
                min={0}
                max={360}
                step={5}
                onChange={(v) => updateLayer(i, { rotation: v })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
