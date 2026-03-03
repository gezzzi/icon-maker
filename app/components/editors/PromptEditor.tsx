"use client";

import type { PromptConfig } from "@/app/lib/types";
import { ColorPicker } from "../ui/ColorPicker";

interface PromptEditorProps {
  config: PromptConfig;
  onChange: (config: PromptConfig) => void;
}

const styles: { value: PromptConfig["style"]; label: string }[] = [
  { value: "outline", label: "アウトライン" },
  { value: "flat", label: "フラット" },
  { value: "filled", label: "フィルド" },
  { value: "minimal", label: "ミニマル" },
  { value: "auto", label: "AI にお任せ" },
];

const purposes: { value: PromptConfig["purpose"]; label: string }[] = [
  { value: "favicon", label: "Favicon" },
  { value: "windows", label: "Windows" },
  { value: "sns", label: "SNS" },
  { value: "general", label: "汎用" },
];

export function PromptEditor({ config, onChange }: PromptEditorProps) {
  const update = (partial: Partial<PromptConfig>) =>
    onChange({ ...config, ...partial });

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-muted">アイコンの説明</span>
        <input
          type="text"
          value={config.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="例: ベルのアイコン"
          className="text-sm border border-border rounded px-3 py-2 bg-surface"
        />
      </label>

      <div>
        <span className="text-sm text-muted block mb-1">スタイル</span>
        <div className="flex flex-wrap gap-1">
          {styles.map((s) => (
            <button
              key={s.value}
              onClick={() => update({ style: s.value })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.style === s.value
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm text-muted block mb-1">カラー</span>
        <div className="flex gap-1 mb-2">
          <button
            onClick={() => update({ autoColor: false })}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              !config.autoColor
                ? "bg-primary text-white border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            色指定
          </button>
          <button
            onClick={() => update({ autoColor: true })}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              config.autoColor
                ? "bg-primary text-white border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            AI にお任せ
          </button>
        </div>
        {!config.autoColor && (
          <ColorPicker
            label="メインカラー"
            value={config.color}
            onChange={(v) => update({ color: v })}
          />
        )}
      </div>

      <div>
        <span className="text-sm text-muted block mb-1">背景</span>
        <div className="flex flex-wrap gap-1 mb-2">
          {(["transparent", "color", "auto"] as const).map((t) => (
            <button
              key={t}
              onClick={() => update({ bgType: t })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.bgType === t
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {t === "transparent" ? "透明" : t === "color" ? "色指定" : "AI にお任せ"}
            </button>
          ))}
        </div>
        {config.bgType === "color" && (
          <ColorPicker
            label="背景色"
            value={config.bgColor}
            onChange={(v) => update({ bgColor: v })}
          />
        )}
      </div>

      <div>
        <span className="text-sm text-muted block mb-1">用途</span>
        <div className="flex flex-wrap gap-1">
          {purposes.map((p) => (
            <button
              key={p.value}
              onClick={() => update({ purpose: p.value })}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                config.purpose === p.value
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border hover:bg-surface-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
