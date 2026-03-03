"use client";

import { useState, useCallback, useEffect } from "react";
import * as lucideIcons from "lucide-react";
import type {
  IconConfig,
  IconMode,
  TextConfig,
  EmojiConfig,
  ShapeConfig,
  LucideIconConfig,
  GradientConfig,
  PatternConfig,
  IdenticonConfig,
  PromptConfig,
} from "@/app/lib/types";
import { DEFAULT_CONFIG } from "@/app/lib/types";
import { ModeSelector } from "./ModeSelector";
import { PreviewPanel } from "./preview/PreviewPanel";
import { ExportPanel } from "./export/ExportPanel";
import { TextEditor } from "./editors/TextEditor";
import { EmojiEditor } from "./editors/EmojiEditor";
import { ShapeEditor } from "./editors/ShapeEditor";
import { LucideIconEditor } from "./editors/LucideIconEditor";
import { GradientEditor } from "./editors/GradientEditor";
import { PatternEditor } from "./editors/PatternEditor";
import { IdenticonEditor } from "./editors/IdenticonEditor";
import { PromptEditor } from "./editors/PromptEditor";
import { PromptOutput } from "./PromptOutput";
import { SvgPreviewPanel } from "./SvgPreviewPanel";
import { ThemeToggle } from "./ThemeToggle";

const defaultConfigs: Record<IconMode, IconConfig> = {
  text: DEFAULT_CONFIG,
  emoji: {
    mode: "emoji",
    emoji: "🚀",
    emojiSize: 0.7,
    bgColor: "#FEF3C7",
    bgShape: "rounded-square",
    showBackground: true,
  },
  shape: {
    mode: "shape",
    layers: [
      {
        shape: "star",
        color: "#F59E0B",
        size: 0.7,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
      },
    ],
    bgColor: "#1E3A5F",
    bgShape: "rounded-square",
  },
  "lucide-icon": {
    mode: "lucide-icon",
    iconName: "Rocket",
    iconColor: "#FFFFFF",
    strokeWidth: 2,
    bgColor: "#8B5CF6",
    bgShape: "rounded-square",
    padding: 0.15,
  },
  gradient: {
    mode: "gradient",
    gradientType: "linear",
    colorStops: [
      { color: "#6366F1", position: 0 },
      { color: "#EC4899", position: 1 },
    ],
    angle: 135,
    bgShape: "rounded-square",
  },
  pattern: {
    mode: "pattern",
    patternType: "stripes",
    primaryColor: "#1E40AF",
    secondaryColor: "#93C5FD",
    scale: 1,
    rotation: 45,
    bgShape: "rounded-square",
  },
  identicon: {
    mode: "identicon",
    seed: "hello",
    gridSize: 5,
    color: "#4F46E5",
    bgColor: "#F1F5F9",
    bgShape: "rounded-square",
    autoColor: true,
  },
  "ai-prompt": {
    mode: "ai-prompt",
    description: "",
    style: "outline",
    autoColor: false,
    color: "#4F46E5",
    bgType: "transparent",
    bgColor: "#FFFFFF",
    purpose: "favicon",
  },
};

export function IconMakerApp() {
  const [config, setConfig] = useState<IconConfig>(DEFAULT_CONFIG);
  const [svgString, setSvgString] = useState<string | undefined>();

  // Get SVG string for Lucide icons
  const lucideIconName = config.mode === "lucide-icon" ? config.iconName : "";
  const lucideStrokeWidth =
    config.mode === "lucide-icon" ? config.strokeWidth : 2;

  useEffect(() => {
    if (!lucideIconName) {
      setSvgString(undefined);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (lucideIcons as any)[lucideIconName];
    if (!Icon || typeof Icon !== "function") return;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    import("react-dom/client").then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(
        <Icon size={24} strokeWidth={lucideStrokeWidth} />
      );

      setTimeout(() => {
        const svg = container.querySelector("svg");
        if (svg) {
          setSvgString(svg.outerHTML);
        }
        root.unmount();
        document.body.removeChild(container);
      }, 50);
    });
  }, [lucideIconName, lucideStrokeWidth]);

  const handleModeChange = useCallback(
    (mode: IconMode) => {
      if (mode === config.mode) return;
      setConfig(defaultConfigs[mode]);
    },
    [config.mode]
  );

  const handleConfigChange = useCallback((newConfig: IconConfig) => {
    setConfig(newConfig);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Icon Maker
            </h1>
            <p className="text-sm text-muted mt-0.5">
              Favicon・Windows アイコン・SNS プロフィール画像を作成
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4">
          <ModeSelector value={config.mode} onChange={handleModeChange} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor Panel */}
          <div className="flex-1 bg-surface border border-border rounded-xl p-4 min-w-0">
            <h2 className="text-sm font-medium text-muted mb-3">設定</h2>
            {config.mode === "text" && (
              <TextEditor
                config={config as TextConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "emoji" && (
              <EmojiEditor
                config={config as EmojiConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "shape" && (
              <ShapeEditor
                config={config as ShapeConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "lucide-icon" && (
              <LucideIconEditor
                config={config as LucideIconConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "gradient" && (
              <GradientEditor
                config={config as GradientConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "pattern" && (
              <PatternEditor
                config={config as PatternConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "identicon" && (
              <IdenticonEditor
                config={config as IdenticonConfig}
                onChange={handleConfigChange}
              />
            )}
            {config.mode === "ai-prompt" && (
              <PromptEditor
                config={config as PromptConfig}
                onChange={handleConfigChange}
              />
            )}
          </div>

          {/* Preview / Prompt Output Panel */}
          <div className="lg:w-[340px] shrink-0">
            <div className="bg-surface border border-border rounded-xl p-4">
              <h2 className="text-sm font-medium text-muted mb-3">
                {config.mode === "ai-prompt"
                  ? "生成されたプロンプト"
                  : "プレビュー"}
              </h2>
              {config.mode === "ai-prompt" ? (
                <PromptOutput config={config as PromptConfig} />
              ) : (
                <PreviewPanel config={config} svgString={svgString} />
              )}
            </div>
          </div>
        </div>

        {config.mode === "ai-prompt" ? (
          <div className="mt-6">
            <SvgPreviewPanel />
          </div>
        ) : (
          <div className="mt-6">
            <ExportPanel config={config} svgString={svgString} />
          </div>
        )}
      </main>
    </div>
  );
}
