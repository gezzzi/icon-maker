"use client";

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
}: SliderControlProps) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm text-muted w-24 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="text-sm w-12 text-right tabular-nums">
        {Number.isInteger(step) ? value : value.toFixed(2)}
      </span>
    </label>
  );
}
