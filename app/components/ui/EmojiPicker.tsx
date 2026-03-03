"use client";

import { useState } from "react";
import { emojiCategories } from "@/app/lib/data/emoji-list";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="border border-border rounded-lg bg-surface overflow-hidden">
      <div className="flex border-b border-border overflow-x-auto">
        {emojiCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(i)}
            className={`px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${
              activeCategory === i
                ? "bg-primary text-white"
                : "hover:bg-surface-hover"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-0.5 p-2 max-h-40 overflow-y-auto">
        {emojiCategories[activeCategory].emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onChange(emoji)}
            className={`text-xl p-1 rounded hover:bg-surface-hover transition-colors ${
              value === emoji ? "bg-surface-active ring-1 ring-primary" : ""
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
