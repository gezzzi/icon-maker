import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, unlink } from "fs/promises";
import path from "path";

const SCAN_DIRS = [".", "public", "public/generated"];

async function findSvgFiles(): Promise<string[]> {
  const root = process.cwd();
  const files: string[] = [];

  for (const dir of SCAN_DIRS) {
    const abs = path.join(root, dir);
    try {
      const entries = await readdir(abs, { withFileTypes: true });
      for (const e of entries) {
        if (e.isFile() && e.name.endsWith(".svg")) {
          files.push(path.posix.join(dir, e.name));
        }
      }
    } catch {
      // directory may not exist
    }
  }

  return files;
}

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get("path");

  if (filePath) {
    // Read a specific SVG file
    const safePath = path.normalize(filePath).replace(/\.\./g, "");
    const abs = path.join(process.cwd(), safePath);

    try {
      const content = await readFile(abs, "utf-8");
      return NextResponse.json({ path: safePath, content });
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  }

  // List all SVG files
  const files = await findSvgFiles();
  return NextResponse.json({ files });
}

export async function DELETE(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get("path");
  if (!filePath) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  const safePath = path.normalize(filePath).replace(/\.\./g, "");
  if (!safePath.endsWith(".svg")) {
    return NextResponse.json({ error: "Only .svg files can be deleted" }, { status: 400 });
  }

  const abs = path.join(process.cwd(), safePath);

  try {
    await unlink(abs);
    return NextResponse.json({ deleted: safePath });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
