import { NextResponse } from "next/server";
import { execFile } from "child_process";

const CURSOR_EXE =
  "C:\\Users\\user\\AppData\\Local\\Programs\\cursor\\_\\Cursor.exe";
const PROJECT_DIR = "C:\\Users\\user\\dev\\icon-maker";

export async function POST() {
  return new Promise<NextResponse>((resolve) => {
    execFile(CURSOR_EXE, ["--new-window", PROJECT_DIR], (error) => {
      if (error) {
        resolve(
          NextResponse.json({ error: error.message }, { status: 500 })
        );
      } else {
        resolve(NextResponse.json({ ok: true }));
      }
    });
  });
}
