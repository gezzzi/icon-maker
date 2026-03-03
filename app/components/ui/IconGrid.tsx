"use client";

import { useState, useMemo } from "react";
import * as icons from "lucide-react";
import { lucideIconNames } from "@/app/lib/data/lucide-icons";

interface IconGridProps {
  value: string;
  onChange: (iconName: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconsMap = icons as Record<string, any>;

export function IconGrid({ value, onChange }: IconGridProps) {
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search) return lucideIconNames;
    const lower = search.toLowerCase();
    return lucideIconNames.filter((name) => name.toLowerCase().includes(lower));
  }, [search]);

  return (
    <div className="border border-border rounded-lg bg-surface overflow-hidden">
      <div className="p-2 border-b border-border">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="アイコンを検索..."
          className="w-full text-sm border border-border rounded px-2 py-1.5 bg-input-bg"
        />
      </div>
      <div className="grid grid-cols-8 gap-0.5 p-2 max-h-48 overflow-y-auto">
        {filteredIcons.map((name) => {
          const Icon = iconsMap[name];
          if (!Icon || typeof Icon !== "function") return null;
          return (
            <button
              key={name}
              onClick={() => onChange(name)}
              title={name}
              className={`p-1.5 rounded hover:bg-surface-hover transition-colors flex items-center justify-center ${
                value === name ? "bg-surface-active ring-1 ring-primary" : ""
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
