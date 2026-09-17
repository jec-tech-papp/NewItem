import { promises as fs } from "fs";
import path from "path";
import type { Article, SiteSettings } from "./types";

const dataDir = path.join(process.cwd(), "data");
const settingsPath = path.join(dataDir, "settings.json");
const articlesPath = path.join(dataDir, "articles.json");

export async function getSettings(): Promise<SiteSettings> {
  const raw = await fs.readFile(settingsPath, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
}

export async function getArticles(): Promise<Article[]> {
  const raw = await fs.readFile(articlesPath, "utf-8");
  const articles = JSON.parse(raw) as Article[];
  return articles.sort((a, b) => a.order - b.order);
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2), "utf-8");
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles
    .filter((a) => a.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);
}
