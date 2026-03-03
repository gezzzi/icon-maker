"use client";

import type { BackgroundShape } from "@/app/lib/types";

interface ShapeSelectorProps {
  label: string;
  value: BackgroundShape;
  onChange: (value: BackgroundShape) => void;
}

const shapes: { value: BackgroundShape; label: string; icon: string }[] = [
  { value: "circle", label: "円", icon: "●" },
  { value: "rounded-square", label: "角丸", icon: "■" },
  { value: "square", label: "四角", icon: "◼" },
];

export function ShapeSelector({ label, value, onChange }: ShapeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted w-24 shrink-0">{label}</span>
      <div className="flex gap-1">
        {shapes.map((shape) => (
          <button
            key={shape.value}
            onClick={() => onChange(shape.value)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              value === shape.value
                ? "bg-primary text-white border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            {shape.label}
          </button>
        ))}
      </div>
    </div>
  );
}
