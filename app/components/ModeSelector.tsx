"use client";

import type { IconMode } from "@/app/lib/types";

interface ModeSelectorProps {
  value: IconMode;
  onChange: (mode: IconMode) => void;
}

const modes: { value: IconMode; label: string }[] = [
  { value: "text", label: "テキスト" },
  { value: "emoji", label: "絵文字" },
  { value: "shape", label: "図形" },
  { value: "lucide-icon", label: "アイコン" },
  { value: "gradient", label: "グラデーション" },
  { value: "pattern", label: "パターン" },
  { value: "identicon", label: "アイデンティコン" },
  { value: "ai-prompt", label: "AI プロンプト" },
];

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            value === mode.value
              ? "bg-primary text-white shadow-sm"
              : "bg-surface border border-border hover:bg-surface-hover"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
