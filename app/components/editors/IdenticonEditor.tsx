"use client";

import type { IdenticonConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { ShapeSelector } from "../ui/ShapeSelector";

interface IdenticonEditorProps {
  config: IdenticonConfig;
  onChange: (config: IdenticonConfig) => void;
}

export function IdenticonEditor({ config, onChange }: IdenticonEditorProps) {
  const update = (partial: Partial<IdenticonConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">シード</span>
        <input
          type="text"
          value={config.seed}
          onChange={(e) => update({ seed: e.target.value })}
          placeholder="任意の文字列"
          className="flex-1 text-sm border border-border rounded px-2 py-1.5 bg-surface"
        />
      </label>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">グリッド</span>
        <div className="flex gap-1">
          {([5, 7] as const).map((g) => (
            <button
              key={g}
              onClick={() => update({ gridSize: g })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.gridSize === g
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {g}×{g}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">自動色</span>
        <input
          type="checkbox"
          checked={config.autoColor}
          onChange={(e) => update({ autoColor: e.target.checked })}
          className="w-4 h-4 accent-primary"
        />
      </label>

      {!config.autoColor && (
        <ColorPicker
          label="色"
          value={config.color}
          onChange={(v) => update({ color: v })}
        />
      )}

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
