"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Article } from "@/lib/types";

type ArticlesSectionProps = {
  articles: Article[];
};

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [activeId, setActiveId] = useState(articles[0]?.id ?? "");
  const active = articles.find((a) => a.id === activeId) ?? articles[0];

  if (!articles.length) {
    return (
      <section id="actualites" className="px-6 py-24">
        <p className="text-center text-slate-500">Aucun article pour le moment.</p>
      </section>
    );
  }

  return (
    <section id="actualites" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
            Informations patients
          </p>
          <h2 className="mt-3 font-serif text-3xl text-slate-800 md:text-4xl">
            Conseils & actualités
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <motion.ul
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {articles.map((article, index) => {
              const isActive = article.id === active?.id;
              return (
                <li key={article.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(article.id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-sky-200 bg-white shadow-lg shadow-sky-100/80"
                        : "border-transparent bg-white/60 hover:border-sky-100 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-medium text-sky-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 font-medium text-slate-800">{article.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {article.excerpt}
                    </p>
                  </button>
                </li>
              );
            })}
          </motion.ul>

          <motion.article
            key={active?.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-sky-100/80 bg-white/90 p-8 shadow-xl shadow-sky-100/50 backdrop-blur-sm md:p-10"
          >
            {active && (
              <>
                <h3 className="font-serif text-2xl text-slate-800 md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-6 leading-relaxed text-slate-600 whitespace-pre-line">
                  {active.content}
                </p>
              </>
            )}
          </motion.article>
        </div>
      </div>
    </section>
  );
}
