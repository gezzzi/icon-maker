export interface ExportPreset {
  id: string;
  label: string;
  format: "ico" | "png";
  sizes: number[];
  filename: string;
}

export const exportPresets: ExportPreset[] = [
  {
    id: "favicon",
    label: "Favicon (Chrome タブ)",
    format: "ico",
    sizes: [16, 32],
    filename: "favicon.ico",
  },
  {
    id: "windows",
    label: "Windows アイコン",
    format: "ico",
    sizes: [16, 32, 48, 256],
    filename: "icon.ico",
  },
  {
    id: "sns-400",
    label: "SNS プロフィール (400×400)",
    format: "png",
    sizes: [400],
    filename: "icon-400.png",
  },
  {
    id: "sns-512",
    label: "SNS プロフィール (512×512)",
    format: "png",
    sizes: [512],
    filename: "icon-512.png",
  },
  {
    id: "png-32",
    label: "PNG 32×32",
    format: "png",
    sizes: [32],
    filename: "icon-32.png",
  },
  {
    id: "png-256",
    label: "PNG 256×256",
    format: "png",
    sizes: [256],
    filename: "icon-256.png",
  },
];
