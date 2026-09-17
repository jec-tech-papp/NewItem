import { NextResponse } from "next/server";
import { z } from "zod";
import { getArticles, saveArticles } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";
import { MAX_FEATURED_ARTICLES } from "@/lib/types";

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  excerpt: z.string(),
  content: z.string().min(1),
  featured: z.boolean(),
  order: z.number().int().min(0).max(4),
});

function countFeatured(articles: { featured: boolean }[]) {
  return articles.filter((a) => a.featured).length;
}

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const parsed = articleSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const articles = await getArticles();
  const draft = parsed.data;
  if (draft.featured && countFeatured(articles) >= MAX_FEATURED_ARTICLES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_FEATURED_ARTICLES} articles en vedette sur l'accueil.` },
      { status: 400 },
    );
  }
  const newArticle = {
    ...draft,
    id: `art-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  articles.push(newArticle);
  await saveArticles(articles);
  return NextResponse.json(newArticle);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await request.json();
  const parsed = articleSchema.extend({ id: z.string() }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const articles = await getArticles();
  const idx = articles.findIndex((a) => a.id === parsed.data.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }
  const others = articles.filter((a) => a.id !== parsed.data.id);
  const featuredCount =
    countFeatured(others) + (parsed.data.featured ? 1 : 0);
  if (featuredCount > MAX_FEATURED_ARTICLES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_FEATURED_ARTICLES} articles en vedette.` },
      { status: 400 },
    );
  }
  const updated = {
    ...articles[idx],
    ...parsed.data,
    createdAt: articles[idx].createdAt,
  };
  articles[idx] = updated;
  await saveArticles(articles);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "id requis" }, { status: 400 });
  }
  const articles = await getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }
  await saveArticles(filtered);
  return NextResponse.json({ ok: true });
}
