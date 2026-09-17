"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Article, SiteSettings } from "@/lib/types";
import { ArticlesSection } from "./ArticlesSection";
import { ParallaxLayer } from "./ParallaxLayer";

type HomePageProps = {
  settings: SiteSettings;
  articles: Article[];
};

const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#cabinet", label: "Cabinet" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
  { href: "#actualites", label: "Actualités" },
];

export function HomePage({ settings, articles }: HomePageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <div className="relative overflow-x-hidden bg-[#f4f9fc] text-slate-800">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.18),transparent)]"
        aria-hidden
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#accueil" className="font-serif text-lg text-slate-800">
            {settings.practitionerName}
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-sky-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={settings.doctolibUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-sky-200 transition hover:bg-sky-700"
          >
            Doctolib
          </a>
        </div>
      </header>

      <section
        id="accueil"
        ref={heroRef}
        className="relative flex min-h-screen items-center px-6 pt-24"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute right-[-10%] top-[15%] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute bottom-[10%] left-[-5%] h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
              {settings.title}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              {settings.practitionerName}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">{settings.heroTagline}</p>
            <p className="mt-3 text-slate-500">{settings.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={settings.doctolibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-medium text-white shadow-lg shadow-sky-200/80 transition hover:bg-sky-700"
              >
                Prendre rendez-vous sur Doctolib
              </a>
              <a
                href="#cabinet"
                className="inline-flex rounded-full border border-sky-200 bg-white/80 px-6 py-3 font-medium text-sky-800 transition hover:bg-white"
              >
                Découvrir le cabinet
              </a>
            </div>
          </motion.div>

          <ParallaxLayer offset={40} className="relative hidden lg:block">
            <div className="rounded-[2rem] border border-white/80 bg-white/60 p-8 shadow-2xl shadow-sky-100/60 backdrop-blur">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-sky-500">
                      Implantologie
                    </p>
                    <p className="mt-4 font-serif text-2xl text-slate-800">
                      Un accompagnement sur mesure, de la consultation au suivi.
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-sky-500">✓</span> Implantologie & chirurgie guidée
                    </li>
                    <li className="flex gap-2">
                      <span className="text-sky-500">✓</span> Esthétique du sourire
                    </li>
                    <li className="flex gap-2">
                      <span className="text-sky-500">✓</span> Parcours patient rassurant
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </section>

      <section id="cabinet" className="relative px-6 py-28">
        <ParallaxLayer offset={50}>
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-sky-100 bg-white/80 px-8 py-16 shadow-xl shadow-sky-50 md:px-14">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-serif text-3xl text-slate-800 md:text-4xl">
                  Un cabinet pensé pour votre sérénité
                </h2>
                <p className="mt-6 leading-relaxed text-slate-600">{settings.aboutText}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Hygiène & stérilisation", desc: "Protocoles stricts, matériel moderne." },
                  { label: "Écoute", desc: "Temps d'échange à chaque consultation." },
                  { label: "Technologie", desc: "Imagerie et planification 3D." },
                  { label: "Douceur", desc: "Soins adaptés à votre confort." },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-sky-50 bg-sky-50/40 p-5"
                  >
                    <p className="font-medium text-slate-800">{card.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxLayer>
      </section>

      <section id="expertise" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-slate-800 md:text-4xl">
            Domaines d&apos;expertise
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Implantologie",
                text: "Remplacement des dents manquantes par des solutions fixes et durables.",
              },
              {
                title: "Chirurgie orale",
                text: "Extractions, greffes osseuses et réhabilitations complexes.",
              },
              {
                title: "Esthétique",
                text: "Facettes, blanchiment et harmonisation du sourire.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-3xl border border-white bg-white/90 p-8 shadow-lg shadow-sky-100/40"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-sky-400" />
                <h3 className="text-xl font-medium text-slate-800">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-12 pt-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-700 to-cyan-800 text-white shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 md:p-14">
              <h2 className="font-serif text-3xl md:text-4xl">Nous contacter</h2>
              <ul className="mt-8 space-y-4 text-sky-50/95">
                <li>{settings.address}</li>
                <li>{settings.city}</li>
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:underline">
                    {settings.email}
                  </a>
                </li>
                <li>{settings.openingHours}</li>
              </ul>
              <a
                href={settings.doctolibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex rounded-full bg-white px-6 py-3 font-medium text-sky-800 transition hover:bg-sky-50"
              >
                Réserver sur Doctolib
              </a>
            </div>
            <div className="relative min-h-[280px] bg-sky-900/30 p-6 lg:min-h-0">
              <iframe
                title="Prise de rendez-vous Doctolib"
                src={settings.doctolibUrl}
                className="h-full min-h-[320px] w-full rounded-2xl border-0 bg-white shadow-inner lg:absolute lg:inset-6 lg:min-h-0 lg:w-[calc(100%-3rem)]"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
              <p className="mt-3 text-center text-xs text-sky-100/80 lg:absolute lg:bottom-2 lg:left-0 lg:right-0">
                Si l&apos;agenda ne s&apos;affiche pas, utilisez le bouton ci-dessus ou configurez
                l&apos;URL Doctolib dans l&apos;admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticlesSection articles={articles} />

      <footer className="border-t border-sky-100 bg-white/80 px-6 py-10 text-center text-sm text-slate-500">
        <p>{settings.practitionerName} — {settings.title}</p>
        {process.env.NEXT_PUBLIC_STATIC_PREVIEW !== "true" && (
          <p className="mt-2">
            <a href="/admin" className="text-sky-600 hover:underline">Espace admin</a>
          </p>
        )}
      </footer>
    </div>
  );
}
