"use client";

import type { EmojiConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";
import { SliderControl } from "../ui/SliderControl";
import { ShapeSelector } from "../ui/ShapeSelector";
import { EmojiPicker } from "../ui/EmojiPicker";

interface EmojiEditorProps {
  config: EmojiConfig;
  onChange: (config: EmojiConfig) => void;
}

export function EmojiEditor({ config, onChange }: EmojiEditorProps) {
  const update = (partial: Partial<EmojiConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm text-muted block mb-1">絵文字を選択</span>
        <EmojiPicker
          value={config.emoji}
          onChange={(v) => update({ emoji: v })}
        />
      </div>

      <SliderControl
        label="サイズ"
        value={config.emojiSize}
        min={0.3}
        max={0.95}
        step={0.05}
        onChange={(v) => update({ emojiSize: v })}
      />

      <label className="flex items-center gap-2">
        <span className="text-sm text-muted w-24 shrink-0">背景表示</span>
        <input
          type="checkbox"
          checked={config.showBackground}
          onChange={(e) => update({ showBackground: e.target.checked })}
          className="w-4 h-4 accent-primary"
        />
      </label>

      {config.showBackground && (
        <ColorPicker
          label="背景色"
          value={config.bgColor}
          onChange={(v) => update({ bgColor: v })}
        />
      )}

      <ShapeSelector
        label="形状"
        value={config.bgShape}
        onChange={(v) => update({ bgShape: v })}
      />
    </div>
  );
}
