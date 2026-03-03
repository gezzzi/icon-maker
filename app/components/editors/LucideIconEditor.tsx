"use client";

import type { LucideIconConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";
import { IconGrid } from "../ui/IconGrid";

interface LucideIconEditorProps {
  config: LucideIconConfig;
  onChange: (config: LucideIconConfig) => void;
}

export function LucideIconEditor({
  config,
  onChange,
}: LucideIconEditorProps) {
  const update = (partial: Partial<LucideIconConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm text-muted block mb-1">アイコンを選択</span>
        <IconGrid
          value={config.iconName}
          onChange={(v) => update({ iconName: v })}
        />
      </div>

      <ColorPicker
        label="アイコン色"
        value={config.iconColor}
        onChange={(v) => update({ iconColor: v })}
      />

      <SliderControl
        label="線幅"
        value={config.strokeWidth}
        min={0.5}
        max={3}
        step={0.25}
        onChange={(v) => update({ strokeWidth: v })}
      />

      <SliderControl
        label="余白"
        value={config.padding}
        min={0.05}
        max={0.35}
        step={0.05}
        onChange={(v) => update({ padding: v })}
      />

      <ColorPicker
        label="背景色"
        value={config.bgColor}
        onChange={(v) => update({ bgColor: v })}
      />

      <ShapeSelector
        label="形状"
        value={config.bgShape}
        onChange={(v) => update({ bgShape: v })}
      />
    </div>
  );
}
