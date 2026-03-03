"use client";

import { useState, useCallback } from "react";
import type { PromptConfig } from "@/app/lib/types";
import { generatePrompt } from "@/app/lib/prompt-generator";

interface PromptOutputProps {
  config: PromptConfig;
}

export function PromptOutput({ config }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const prompt = generatePrompt(config);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  return (
    <div className="flex flex-col h-full">
      <pre className="flex-1 text-sm whitespace-pre-wrap break-words bg-input-bg border border-border rounded-lg p-3 overflow-y-auto max-h-[460px] text-foreground">
        {prompt}
      </pre>
      <button
        onClick={handleCopy}
        className="mt-3 w-full py-2 px-4 text-sm font-medium rounded-lg transition-colors bg-primary text-white hover:bg-primary-hover"
      >
        {copied ? "コピーしました!" : "コピー"}
      </button>
    </div>
  );
}
