"use client";

import { useCallback, useEffect, useState } from "react";
import type { Article, SiteSettings } from "@/lib/types";
import { MAX_FEATURED_ARTICLES } from "@/lib/types";

const emptyArticle = (): Omit<Article, "id" | "createdAt"> => ({
  title: "",
  excerpt: "",
  content: "",
  featured: true,
  order: 0,
});

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<
    Omit<Article, "createdAt"> & { createdAt?: string }
  >({ ...emptyArticle(), id: "" });
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"infos" | "articles">("infos");

  const loadData = useCallback(async () => {
    const [sRes, aRes] = await Promise.all([
      fetch("/api/settings"),
      fetch("/api/articles"),
    ]);
    if (sRes.ok) setSettings(await sRes.json());
    if (aRes.ok) setArticles(await aRes.json());
  }, []);

  useEffect(() => {
    void (async () => {
      const sessionRes = await fetch("/api/auth/session");
      const session = (await sessionRes.json()) as { authenticated: boolean };
      setAuthed(session.authenticated);
      if (session.authenticated) await loadData();
    })();
  }, [loadData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Mot de passe incorrect");
      return;
    }
    setAuthed(true);
    await loadData();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setPassword("");
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setMessage("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) setMessage("Informations enregistrées.");
    else if (res.status === 401) {
      setAuthed(false);
      setMessage("Session expirée — reconnectez-vous.");
    } else setMessage("Erreur lors de l'enregistrement.");
  }

  async function saveArticle(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const isNew = !editingArticle.id;
    const res = await fetch("/api/articles", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingArticle),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(isNew ? "Article créé." : "Article mis à jour.");
      setEditingArticle({ ...emptyArticle(), id: "" });
      await loadData();
    } else {
      setMessage(data.error ?? "Erreur article.");
    }
  }

  async function deleteArticle(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    const res = await fetch("/api/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMessage("Article supprimé.");
      await loadData();
    }
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Chargement…
      </div>
    );
  }

  if (authed === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f9fc] px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-sky-100 bg-white p-10 shadow-xl"
        >
          <h1 className="font-serif text-2xl text-slate-800">Administration</h1>
          <p className="mt-2 text-sm text-slate-500">Cabinet Dr Spanu</p>
          <label className="mt-8 block text-sm font-medium text-slate-700">
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3"
              required
            />
          </label>
          {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-sky-600 py-3 font-medium text-white hover:bg-sky-700"
          >
            Connexion
          </button>
          <p className="mt-4 text-center text-xs text-slate-400">
            <a href="/">← Retour au site</a>
          </p>
        </form>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Chargement…
      </div>
    );
  }

  const featuredCount = articles.filter((a) => a.featured).length;

  return (
    <div className="min-h-screen bg-[#f0f6fa] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-slate-800">Espace admin</h1>
            <p className="text-sm text-slate-500">Modifier le contenu du site vitrine</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rounded-full border border-sky-200 px-4 py-2 text-sm">
              Voir le site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-200 px-4 py-2 text-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {message && (
          <p className="mb-4 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-800">{message}</p>
        )}

        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => setTab("infos")}
            className={`rounded-full px-5 py-2 text-sm ${tab === "infos" ? "bg-sky-600 text-white" : "bg-white"}`}
          >
            Informations
          </button>
          <button
            type="button"
            onClick={() => setTab("articles")}
            className={`rounded-full px-5 py-2 text-sm ${tab === "articles" ? "bg-sky-600 text-white" : "bg-white"}`}
          >
            Articles ({featuredCount}/{MAX_FEATURED_ARTICLES} en vedette)
          </button>
        </div>

        {tab === "infos" && (
          <form onSubmit={saveSettings} className="space-y-4 rounded-3xl bg-white p-8 shadow-sm">
            {(
              [
                ["practitionerName", "Nom du praticien"],
                ["title", "Titre / spécialité"],
                ["subtitle", "Sous-titre"],
                ["heroTagline", "Accroche hero"],
                ["phone", "Téléphone"],
                ["email", "Email"],
                ["address", "Adresse"],
                ["city", "Ville"],
                ["doctolibUrl", "URL Doctolib"],
                ["openingHours", "Horaires"],
                ["practitionerImage", "Photo (chemin public, ex. /practitioner.jpg)"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <input
                  value={settings[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-sky-100 px-4 py-2"
                />
              </label>
            ))}
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Texte « À propos »</span>
              <textarea
                value={settings.aboutText}
                onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                rows={5}
                className="mt-1 w-full rounded-xl border border-sky-100 px-4 py-2"
              />
            </label>
            <button type="submit" className="rounded-full bg-sky-600 px-6 py-2 text-white">
              Enregistrer
            </button>
          </form>
        )}

        {tab === "articles" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="font-medium text-slate-800">Articles existants</h2>
              <ul className="mt-4 space-y-2">
                {articles.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-start justify-between gap-2 rounded-xl border border-sky-50 p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{a.title}</p>
                      <p className="text-slate-500">
                        {a.featured ? `Vedette · ordre ${a.order}` : "Non affiché en accueil"}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        className="text-sky-600"
                        onClick={() => setEditingArticle(a)}
                      >
                        Éditer
                      </button>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => deleteArticle(a.id)}
                      >
                        Suppr.
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={saveArticle} className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="font-medium text-slate-800">
                {editingArticle.id ? "Modifier l'article" : "Nouvel article"}
              </h2>
              <div className="mt-4 space-y-3">
                <input
                  placeholder="Titre"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  className="w-full rounded-xl border px-3 py-2"
                  required
                />
                <input
                  placeholder="Résumé (liste à gauche)"
                  value={editingArticle.excerpt}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                  }
                  className="w-full rounded-xl border px-3 py-2"
                />
                <textarea
                  placeholder="Contenu (panneau droit)"
                  value={editingArticle.content}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  rows={6}
                  className="w-full rounded-xl border px-3 py-2"
                  required
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editingArticle.featured}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, featured: e.target.checked })
                    }
                  />
                  Afficher en vedette sur l&apos;accueil (max {MAX_FEATURED_ARTICLES})
                </label>
                <label className="block text-sm">
                  Ordre (0–4)
                  <input
                    type="number"
                    min={0}
                    max={4}
                    value={editingArticle.order}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        order: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                  />
                </label>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-full bg-sky-600 px-5 py-2 text-white">
                  {editingArticle.id ? "Mettre à jour" : "Créer"}
                </button>
                {editingArticle.id && (
                  <button
                    type="button"
                    className="rounded-full border px-5 py-2"
                    onClick={() => setEditingArticle({ ...emptyArticle(), id: "" })}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
