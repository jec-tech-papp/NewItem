import { execSync } from "node:child_process";
import { mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skipDir = path.join(root, ".github-pages-skip");
const toHide = ["src/app/api", "src/app/admin"];

async function hideRoutes() {
  await mkdir(skipDir, { recursive: true });
  for (const rel of toHide) {
    const from = path.join(root, rel);
    const dest = path.join(skipDir, rel.replace(/\//g, "_"));
    await rm(dest, { recursive: true, force: true });
    try {
      await rename(from, dest);
    } catch {
      // déjà masqué (build local relancé)
    }
  }
}

async function restoreRoutes() {
  for (const rel of toHide) {
    const to = path.join(root, rel);
    const from = path.join(skipDir, rel.replace(/\//g, "_"));
    await rm(to, { recursive: true, force: true });
    try {
      await rename(from, to);
    } catch {
      // rien à restaurer
    }
  }
}

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  process.env.NEXT_PUBLIC_REPO_NAME ??
  "NewItem";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_STATIC_PREVIEW: "true",
  NEXT_PUBLIC_REPO_NAME: repoName,
};

try {
  await hideRoutes();
  execSync("npx next build", { stdio: "inherit", env, cwd: root });
} finally {
  await restoreRoutes();
}
