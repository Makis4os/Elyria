import { readdir, mkdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const SRC = "img";
const SIZES = [640, 1024, 1600];
const EXT_OK = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (EXT_OK.has(extname(p).toLowerCase())) await convert(p);
  }
}

async function convert(file) {
  const base = basename(file, extname(file));
  const dir = dirname(file);
  await mkdir(dir, { recursive: true });

  for (const w of SIZES) {
    const out = join(dir, `${base}-${w}.webp`);
    try {
      await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(out);
      console.log("✓", out);
    } catch (e) {
      console.error("✗", file, e);
    }
  }
}

await walk(SRC);
console.log("✅ Optimization complete");
