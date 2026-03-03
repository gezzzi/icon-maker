"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { svgToIco } from "../lib/export/svg-to-ico";

const POLL_INTERVAL = 3000;

export function SvgPreviewPanel() {
  const [svgCode, setSvgCode] = useState("");

  // File browser state
  const [svgFiles, setSvgFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const prevFilesRef = useRef<string>("");

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/svg-files");
      if (res.ok) {
        const data = await res.json();
        const key = JSON.stringify(data.files);
        if (key !== prevFilesRef.current) {
          prevFilesRef.current = key;
          setSvgFiles(data.files);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Poll for file changes (initial fetch at 0ms, then every POLL_INTERVAL)
  useEffect(() => {
    const id = setInterval(fetchFiles, POLL_INTERVAL);
    const initial = setTimeout(fetchFiles, 0);
    return () => {
      clearInterval(id);
      clearTimeout(initial);
    };
  }, [fetchFiles]);

  const loadFile = useCallback(async (filePath: string) => {
    try {
      const res = await fetch(
        `/api/svg-files?path=${encodeURIComponent(filePath)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSvgCode(data.content);
        setSelectedFile(filePath);
      }
    } catch {
      // ignore
    }
  }, []);

  const deleteFile = useCallback(
    async (filePath: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!confirm(`${filePath} を削除しますか？`)) return;
      try {
        const res = await fetch(
          `/api/svg-files?path=${encodeURIComponent(filePath)}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          if (selectedFile === filePath) {
            setSvgCode("");
            setSelectedFile(null);
          }
          fetchFiles();
        }
      } catch {
        // ignore
      }
    },
    [selectedFile, fetchFiles]
  );

  const isValidSvg = useMemo(() => {
    const trimmed = svgCode.trim();
    return trimmed.startsWith("<svg") && trimmed.includes("</svg>");
  }, [svgCode]);

  const svgDataUrl = useMemo(() => {
    if (!isValidSvg) return null;
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    return URL.createObjectURL(blob);
  }, [svgCode, isValidSvg]);

  const handleDownload = useCallback(() => {
    if (!isValidSvg) return;
    const name = selectedFile?.split("/").pop() || "icon.svg";
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svgCode, selectedFile, isValidSvg]);

  const [icoExporting, setIcoExporting] = useState<string | null>(null);

  const handleIcoDownload = useCallback(
    async (variant: "favicon" | "windows") => {
      if (!isValidSvg) return;
      const sizes = variant === "favicon" ? [16, 32] : [16, 32, 48, 256];
      const label = variant === "favicon" ? "Favicon" : "Windows";
      setIcoExporting(variant);
      try {
        const blob = await svgToIco(svgCode, sizes);
        const baseName =
          selectedFile?.split("/").pop()?.replace(/\.svg$/i, "") || "icon";
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}-${label.toLowerCase()}.ico`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("ICO export failed:", e);
        alert("ICO の書き出しに失敗しました");
      } finally {
        setIcoExporting(null);
      }
    },
    [svgCode, selectedFile, isValidSvg]
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h2 className="text-sm font-medium text-muted mb-3">
        SVG プレビュー
      </h2>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: File list */}
        <div className="flex-1 min-w-0">
          {svgFiles.length === 0 ? (
            <div className="py-8 border border-border rounded-lg flex items-center justify-center bg-input-bg">
              <span className="text-xs text-muted">
                SVG ファイルが見つかりません
              </span>
            </div>
          ) : (
            <div className="border border-border rounded-lg bg-input-bg">
              {svgFiles.map((file) => (
                <div
                  key={file}
                  className={`flex items-center border-b border-border last:border-b-0 transition-colors ${
                    selectedFile === file
                      ? "bg-primary/10"
                      : "hover:bg-surface-hover"
                  }`}
                >
                  <button
                    onClick={() => loadFile(file)}
                    className={`flex-1 text-left px-3 py-2 text-sm truncate ${
                      selectedFile === file ? "text-primary" : ""
                    }`}
                  >
                    {file}
                  </button>
                  <button
                    onClick={(e) => deleteFile(file, e)}
                    className="px-2 py-2 text-xs text-red-500 hover:text-red-700 shrink-0"
                    title="削除"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="lg:w-[240px] shrink-0 flex flex-col items-center">
          <label className="text-xs text-muted block mb-1 self-start">
            プレビュー
          </label>
          <div className="w-[200px] h-[200px] border border-border rounded-lg flex items-center justify-center bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] dark:bg-[repeating-conic-gradient(#374151_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]">
            {isValidSvg && svgDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={svgDataUrl}
                alt="SVG preview"
                className="max-w-full max-h-full"
              />
            ) : (
              <span className="text-xs text-muted">
                {svgCode.trim() ? "無効な SVG" : "ファイルを選択"}
              </span>
            )}
          </div>

          {/* Size previews */}
          {isValidSvg && svgDataUrl && (
            <div className="flex items-end gap-3 mt-3">
              {[64, 32, 16].map((size) => (
                <div key={size} className="flex flex-col items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svgDataUrl}
                    alt={`${size}px`}
                    width={size}
                    height={size}
                    className="border border-border rounded"
                  />
                  <span className="text-[10px] text-muted">{size}px</span>
                </div>
              ))}
            </div>
          )}

          {/* Download - always visible */}
          <button
            onClick={handleDownload}
            disabled={!isValidSvg}
            className="mt-3 w-full py-1.5 px-4 text-sm font-medium rounded-lg transition-colors bg-primary text-white hover:bg-primary-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            ダウンロード
          </button>

          {/* ICO export */}
          <div className="mt-2 flex gap-2 w-full">
            <button
              onClick={() => handleIcoDownload("favicon")}
              disabled={!isValidSvg || icoExporting !== null}
              className="flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-colors border border-border bg-surface hover:bg-surface-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              {icoExporting === "favicon" ? "処理中..." : "Favicon (.ico)"}
            </button>
            <button
              onClick={() => handleIcoDownload("windows")}
              disabled={!isValidSvg || icoExporting !== null}
              className="flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-colors border border-border bg-surface hover:bg-surface-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              {icoExporting === "windows" ? "処理中..." : "Windows (.ico)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
