import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public/images/cabinet");

async function main() {
  for (const file of readdirSync(dir)) {
    if (!/^\d+\.png$/i.test(file)) continue;
    const png = path.join(dir, file);
    if (statSync(png).size < 1000) {
      console.warn("skip (fichier invalide):", file);
      continue;
    }
    const base = file.replace(/\.png$/i, "");
    await sharp(png)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(dir, `${base}.webp`));
    console.log("ok", `${base}.webp`);
  }
}

await main();
