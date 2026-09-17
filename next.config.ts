import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.NEXT_PUBLIC_REPO_NAME ?? "NewItem";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
