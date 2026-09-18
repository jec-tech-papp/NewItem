"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Article } from "@/lib/types";
import { useDesktopEffects } from "@/hooks/useMediaQuery";
import { ParallaxFloat } from "./parallax/ParallaxFloat";

type ArticlesSectionProps = {
  articles: Article[];
};

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [activeId, setActiveId] = useState(articles[0]?.id ?? "");
  const active = articles.find((a) => a.id === activeId) ?? articles[0];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const parallaxOn = desktopEffects && !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const listY = useTransform(scrollYProgress, [0, 1], [70, -110]);
  const panelY = useTransform(scrollYProgress, [0, 1], [-50, 130]);

  if (!articles.length) {
    return (
      <section id="actualites" className="px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-center text-slate-500">Aucun article pour le moment.</p>
      </section>
    );
  }

  return (
    <section
      id="actualites"
      ref={sectionRef}
      aria-labelledby="actualites-titre"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-28"
    >
      <ParallaxFloat
        speed={0.4}
        distance={200}
        className="pointer-events-none absolute -right-20 top-24 hidden h-72 w-72 rounded-full bg-sky-100/50 blur-3xl sm:block"
        aria-hidden
      >
        <span />
      </ParallaxFloat>

      <div className="relative mx-auto max-w-6xl">
        <ParallaxFloat speed={0.25} distance={100} className="mb-8 text-center sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600 sm:text-sm sm:tracking-[0.2em]">
              Informations patients
            </p>
            <h2
              id="actualites-titre"
              className="mt-3 font-serif text-2xl text-slate-800 sm:text-3xl md:text-4xl"
            >
              Conseils &amp; actualités
            </h2>
          </motion.div>
        </ParallaxFloat>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8">
          <motion.ul
            style={parallaxOn ? { y: listY, willChange: "transform" } : undefined}
            initial={{ opacity: 0, x: -28 }}
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
                    className={`min-h-[44px] w-full rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 sm:py-4 ${
                      isActive
                        ? "border-sky-200 bg-white shadow-lg shadow-sky-100/80"
                        : "border-transparent bg-white/60 active:bg-white hover:border-sky-100 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-medium text-sky-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-sm font-medium text-slate-800 sm:text-base">
                      {article.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm">
                      {article.excerpt}
                    </p>
                  </button>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            style={parallaxOn ? { y: panelY, willChange: "transform" } : undefined}
            className="rounded-2xl border border-sky-100/80 bg-white/90 p-5 shadow-xl shadow-sky-100/50 backdrop-blur-sm sm:rounded-3xl sm:p-8 md:p-10 lg:sticky lg:top-28 lg:self-start"
          >
            {articles.map((article) => {
              const isActive = article.id === active?.id;
              return (
                <motion.article
                  key={article.id}
                  id={`article-${article.id}`}
                  initial={isActive ? { opacity: 0, y: 24 } : false}
                  animate={isActive ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.35 }}
                  className={isActive ? "block" : "sr-only"}
                  aria-hidden={!isActive}
                >
                  <h3 className="font-serif text-xl text-slate-800 sm:text-2xl md:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line sm:mt-6 sm:text-base">
                    {isActive ? article.content : `${article.excerpt}\n\n${article.content}`}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
