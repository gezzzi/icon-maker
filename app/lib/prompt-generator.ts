import type { PromptConfig } from "./types";

const styleLabels: Record<PromptConfig["style"], string> = {
  outline: "アウトライン（線画）",
  flat: "フラット（塗りつぶし）",
  filled: "フィルド（線+塗り）",
  minimal: "ミニマル（極限までシンプル）",
  auto: "",
};

const purposeLabels: Record<PromptConfig["purpose"], string> = {
  favicon: "ブラウザの favicon として使用",
  windows: "Windows のアプリアイコンとして使用",
  sns: "SNS のプロフィール画像として使用",
  general: "汎用アイコンとして使用",
};

const styleInstructions: Record<PromptConfig["style"], string> = {
  outline:
    '- stroke-linecap="round", stroke-linejoin="round"\n- fill="none"、stroke で描画\n- 線幅は stroke-width="2" を基本とする',
  flat: "- fill のみで描画、stroke は使用しない\n- シンプルな面で構成",
  filled:
    '- fill と stroke の両方を使用\n- stroke-linecap="round", stroke-linejoin="round"',
  minimal:
    "- 最小限のパス数で表現\n- 不要な装飾は一切なし\n- 幾何学的な形状を優先",
  auto: "",
};

function getViewBoxAndSize(purpose: PromptConfig["purpose"]): string {
  switch (purpose) {
    case "favicon":
      return '- viewBox="0 0 24 24"\n- 16×16px でも視認できるシンプルなデザイン';
    case "windows":
      return '- viewBox="0 0 256 256"\n- 256×256px を基準にデザイン\n- 16×16px に縮小しても認識できること';
    case "sns":
      return '- viewBox="0 0 512 512"\n- 512×512px を基準にデザイン\n- 円形にクロップされることを考慮';
    case "general":
      return '- viewBox="0 0 24 24"\n- 様々なサイズで使用可能なデザイン';
  }
}

export function generatePrompt(config: PromptConfig): string {
  const bgText =
    config.bgType === "transparent"
      ? "透明"
      : config.bgType === "auto"
        ? "アイコンの内容に合った最適な背景色を選択してください"
        : `${config.bgColor}（塗りつぶし）`;

  const lines = [
    "以下の仕様で SVG アイコンを1つ作成し、public/generated/ に既存ファイルと重複しない名前で保存してください。",
    "",
    "## アイコンの内容",
    config.description || "（説明を入力してください）",
    "",
    "## デザイン仕様",
    config.style === "auto"
      ? "- スタイル: アイコンの内容に最適なスタイルを選択してください"
      : `- スタイル: ${styleLabels[config.style]}`,
    `- メインカラー: ${config.autoColor ? "アイコンの内容に合った最適な色を選択してください" : config.color}`,
    `- 背景: ${bgText}`,
    "",
    "## 技術的な要件",
    "- SVG 形式",
    getViewBoxAndSize(config.purpose),
    ...(config.style !== "auto" && styleInstructions[config.style]
      ? [styleInstructions[config.style]]
      : []),
    "- パスは最適化し、不要な属性は省く",
    "- クラスや ID は使用しない",
    "",
    "## 用途",
    `- ${purposeLabels[config.purpose]}`,
  ];

  return lines.join("\n");
}
