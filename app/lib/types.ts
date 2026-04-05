export type IconMode =
  | "text"
  | "emoji"
  | "shape"
  | "lucide-icon"
  | "gradient"
  | "pattern"
  | "identicon"
  | "ai-prompt";

export type BackgroundShape = "circle" | "rounded-square" | "square";

export interface TextConfig {
  mode: "text";
  text: string;
  fontFamily: string;
  fontWeight: "normal" | "bold";
  fontSize: number;
  textColor: string;
  bgColor: string;
  bgShape: BackgroundShape;
}

export interface EmojiConfig {
  mode: "emoji";
  emoji: string;
  emojiSize: number;
  bgColor: string;
  bgShape: BackgroundShape;
  showBackground: boolean;
}

export interface ShapeLayer {
  shape:
    | "circle"
    | "square"
    | "triangle"
    | "diamond"
    | "hexagon"
    | "star"
    | "cross"
    | "heart";
  color: string;
  size: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface ShapeConfig {
  mode: "shape";
  layers: ShapeLayer[];
  bgColor: string;
  bgShape: BackgroundShape;
}

export interface LucideIconConfig {
  mode: "lucide-icon";
  iconName: string;
  iconColor: string;
  strokeWidth: number;
  bgColor: string;
  bgShape: BackgroundShape;
  padding: number;
}

export interface GradientConfig {
  mode: "gradient";
  gradientType: "linear" | "radial" | "conic";
  colorStops: { color: string; position: number }[];
  angle: number;
  bgShape: BackgroundShape;
}

export interface PatternConfig {
  mode: "pattern";
  patternType: "stripes" | "dots" | "grid" | "checkerboard" | "diagonal";
  primaryColor: string;
  secondaryColor: string;
  scale: number;
  rotation: number;
  bgShape: BackgroundShape;
}

export interface IdenticonConfig {
  mode: "identicon";
  seed: string;
  gridSize: 5 | 7;
  color: string;
  bgColor: string;
  bgShape: BackgroundShape;
  autoColor: boolean;
}

export interface PromptConfig {
  mode: "ai-prompt";
  description: string;
  style: "outline" | "flat" | "filled" | "minimal" | "auto";
  autoColor: boolean;
  color: string;
  bgType: "transparent" | "color" | "auto";
  bgColor: string;
  purpose: "favicon" | "windows" | "sns" | "general";
  characterFace: boolean;
}

export type IconConfig =
  | TextConfig
  | EmojiConfig
  | ShapeConfig
  | LucideIconConfig
  | GradientConfig
  | PatternConfig
  | IdenticonConfig
  | PromptConfig;

export const DEFAULT_CONFIG: TextConfig = {
  mode: "text",
  text: "A",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: 0.6,
  textColor: "#FFFFFF",
  bgColor: "#4F46E5",
  bgShape: "rounded-square",
};
