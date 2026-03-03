"use client";

import type { TextConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";

interface TextEditorProps {
  config: TextConfig;
  onChange: (config: TextConfig) => void;
}

const fonts = [
  { value: "sans-serif", label: "ゴシック" },
  { value: "serif", label: "明朝" },
  { value: "'Arial Black', sans-serif", label: "Arial Black" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'Courier New', monospace", label: "Courier" },
];

export function TextEditor({ config, onChange }: TextEditorProps) {
  const update = (partial: Partial<TextConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">テキスト</span>
        <input
          type="text"
          value={config.text}
          onChange={(e) => update({ text: e.target.value.slice(0, 2) })}
          maxLength={2}
          className="w-20 text-lg border border-border rounded px-2 py-1 bg-surface text-center"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">フォント</span>
        <select
          value={config.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="flex-1 text-sm border border-border rounded px-2 py-1.5 bg-surface"
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">太さ</span>
        <div className="flex gap-1">
          {(["normal", "bold"] as const).map((w) => (
            <button
              key={w}
              onClick={() => update({ fontWeight: w })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.fontWeight === w
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {w === "normal" ? "標準" : "太字"}
            </button>
          ))}
        </div>
      </label>

      <SliderControl
        label="文字サイズ"
        value={config.fontSize}
        min={0.2}
        max={0.9}
        step={0.05}
        onChange={(v) => update({ fontSize: v })}
      />

      <ColorPicker
        label="文字色"
        value={config.textColor}
        onChange={(v) => update({ textColor: v })}
      />

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
    </div>
  );
}
