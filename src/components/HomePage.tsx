"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";
import { googleMapsDirectionsUrl } from "@/lib/mapsUrl";
import type { Article, SiteSettings } from "@/lib/types";
import { ArticlesSection } from "./ArticlesSection";
import { CabinetSlideshow } from "./CabinetSlideshow";
import { DoctolibButton } from "./DoctolibButton";
import { LogoRail } from "./LogoRail";
import { ParallaxLayer } from "./ParallaxLayer";
import { LogoParallaxBackdrop } from "./parallax/LogoParallaxBackdrop";
import { ParallaxBackdrop } from "./parallax/ParallaxBackdrop";
import { ParallaxColumn, ParallaxSection } from "./parallax/ParallaxSection";
import { ParallaxFloat } from "./parallax/ParallaxFloat";
import { MobileNav } from "./MobileNav";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

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

/** Logos à afficher plus tard : ajouter les fichiers dans /public/logos puis compléter ce tableau */
const PARTNER_LOGOS: { src: string; alt: string }[] = [];

export function HomePage({ settings, articles }: HomePageProps) {
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const heroMotion = desktopEffects && !reduceMotion;
  const heroRef = useRef<HTMLElement>(null);
  const cabinetRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: cabinetProgress } = useScroll({
    target: cabinetRef,
    offset: ["start end", "end start"],
  });

  const heroBgY = useTransform(scrollY, [0, 800], [0, 280]);
  const heroTextY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroTextOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroImageY = useTransform(scrollY, [0, 700], [0, -160]);
  const heroImageScale = useTransform(scrollY, [0, 600], [1, 1.14]);
  const heroImageRotate = useTransform(scrollY, [0, 800], [0, -4]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [1, 0.15]);

  return (
    <div className="relative overflow-x-hidden bg-[#f4f9fc] text-slate-800">
      <ParallaxBackdrop />
      <LogoParallaxBackdrop logoUrl={settings.logoUrl || "/logos/spanu-logo.png"} />

      <div className="relative z-[2]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 lg:py-5">
          <a
            href="#accueil"
            className="flex min-w-0 flex-1 items-center lg:flex-none"
            aria-label={settings.practitionerName}
          >
            <Image
              src={assetUrl(settings.logoUrl || "/logos/spanu-logo.png")}
              alt={`Logo ${settings.practitionerName}`}
              width={767}
              height={325}
              className="h-9 w-auto max-w-[min(52vw,220px)] object-contain object-left sm:h-11 lg:h-[4.5rem] lg:max-w-[min(48vw,330px)]"
              priority
            />
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
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
        </div>
      </header>

      <section
        id="accueil"
        ref={heroRef}
        className="relative px-4 pb-24 pt-[calc(4.5rem+env(safe-area-inset-top))] sm:px-6 sm:pb-32 lg:flex lg:min-h-[115vh] lg:items-center lg:px-6 lg:pt-24"
      >
        <motion.div
          style={
            heroMotion ? { y: heroBgY, opacity: heroOverlayOpacity } : undefined
          }
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
          aria-hidden
        >
          <div className="absolute right-[-5%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute bottom-[5%] left-[-8%] h-[32rem] w-[32rem] rounded-full bg-cyan-200/40 blur-3xl" />
        </motion.div>

        {/* Smartphone / tablette : texte en overlay sur la photo */}
        <div className="mx-auto w-full max-w-md lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/60 shadow-2xl shadow-sky-200/40"
          >
            <div className="relative min-h-[min(78svh,640px)] w-full">
              <Image
                src={assetUrl(settings.practitionerImage || "/practitioner.jpg")}
                alt={`Portrait de ${settings.practitionerName}`}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-sky-950/92 via-sky-900/45 to-sky-50/25"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/85 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 pb-6 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-sky-200 sm:text-xs">
                  {settings.title}
                </p>
                <h1 className="mt-2 font-serif text-[1.85rem] leading-tight text-white sm:text-4xl">
                  {settings.practitionerName}
                </h1>
                <p className="mt-3 text-sm leading-snug text-sky-50/95 sm:text-base">
                  {settings.heroTagline}
                </p>
                <p className="mt-2 text-xs text-sky-100/85 sm:text-sm">{settings.subtitle}</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-6 flex w-full flex-col gap-3">
            <DoctolibButton href={settings.doctolibUrl} className="doctolib-cta-full" />
            <a
              href="#cabinet"
              className="inline-flex justify-center rounded-full border border-sky-200 bg-white/90 px-6 py-3 text-center font-medium text-sky-800"
            >
              Découvrir le cabinet
            </a>
          </div>
        </div>

        {/* Desktop : mise en page d’origine (inchangée) */}
        <div className="mx-auto hidden w-full max-w-6xl gap-12 lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            style={
              heroMotion
                ? { y: heroTextY, opacity: heroTextOpacity, willChange: "transform" }
                : undefined
            }
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
              <DoctolibButton href={settings.doctolibUrl} />
              <a
                href="#cabinet"
                className="inline-flex rounded-full border border-sky-200 bg-white/80 px-6 py-3 font-medium text-sky-800 transition hover:bg-white"
              >
                Découvrir le cabinet
              </a>
            </div>
          </motion.div>

          <ParallaxLayer offset={200} speed={1.4} className="relative w-full">
            <motion.div
              style={
                heroMotion
                  ? {
                      y: heroImageY,
                      scale: heroImageScale,
                      rotate: heroImageRotate,
                      willChange: "transform",
                    }
                  : undefined
              }
            >
              <div className="rounded-[2rem] border border-white/80 bg-white/60 p-6 shadow-2xl shadow-sky-200/50 backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sky-50">
                  <Image
                    src={assetUrl(settings.practitionerImage || "/practitioner.jpg")}
                    alt={`Portrait de ${settings.practitionerName}`}
                    fill
                    className="object-cover object-top"
                    sizes="480px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sky-950/75 via-sky-900/30 to-transparent p-6 pt-16">
                    <p className="text-xs uppercase tracking-widest text-sky-100">
                      Bures-sur-Yvette
                    </p>
                    <p className="mt-2 font-serif text-xl text-white">
                      {settings.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>
        </div>

        <ParallaxFloat
          speed={0.9}
          distance={400}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-center sm:bottom-8 lg:block"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-sky-500/80">Défiler</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="mx-auto mt-2 h-10 w-6 rounded-full border border-sky-300/60"
          >
            <div className="mx-auto mt-2 h-2 w-0.5 rounded-full bg-sky-500" />
          </motion.div>
        </ParallaxFloat>
      </section>

      <section
        id="cabinet"
        ref={cabinetRef}
        className="relative z-10 -mt-8 px-4 pb-20 pt-6 sm:px-6 sm:pb-28 sm:pt-8 lg:-mt-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <ParallaxFloat speed={0.35} distance={160} className="absolute -left-32 top-20">
            <div className="h-64 w-64 rounded-full bg-sky-100/60 blur-2xl" />
          </ParallaxFloat>
          <ParallaxFloat speed={0.5} distance={200} className="absolute -right-24 bottom-0">
            <div className="h-80 w-80 rounded-full bg-cyan-100/50 blur-2xl" />
          </ParallaxFloat>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div className="grid w-full gap-8 rounded-2xl border border-sky-100/90 bg-white/85 px-5 py-10 shadow-2xl shadow-sky-100/60 backdrop-blur-md sm:gap-12 sm:rounded-[2.5rem] sm:px-8 sm:py-16 md:grid-cols-2 md:items-start md:px-14">
            <ParallaxColumn progress={cabinetProgress} direction={-1}>
                <h2 className="font-serif text-3xl text-slate-800 md:text-4xl">
                  Un cabinet pensé pour votre sérénité
                </h2>
                <p className="mt-6 leading-relaxed text-slate-600">{settings.aboutIntro}</p>
                <p className="mt-4 leading-relaxed text-slate-600">{settings.welcomeText}</p>
              </ParallaxColumn>
              <ParallaxColumn progress={cabinetProgress} direction={1}>
                <div className="grid gap-4 sm:grid-cols-1">
                  {[
                    {
                      label: "Mutuelles & devis",
                      desc: settings.mutuellesText,
                    },
                    {
                      label: "Confort & écoute",
                      desc: "Un cadre moderne et chaleureux, avec un temps d'échange à chaque consultation.",
                    },
                  ].map((card, i) => (
                    <ParallaxFloat key={card.label} speed={0.2 + i * 0.08} distance={100}>
                      <div className="rounded-2xl border border-sky-50 bg-sky-50/40 p-5">
                        <p className="font-medium text-slate-800">{card.label}</p>
                        <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                      </div>
                    </ParallaxFloat>
                  ))}
                </div>
              </ParallaxColumn>
          </div>
        </div>
      </section>

      <LogoRail logos={PARTNER_LOGOS} />

      <section id="expertise" className="relative px-4 py-16 sm:px-6 sm:py-24">
        <ParallaxFloat speed={0.35} distance={180} className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-3xl text-slate-800 md:text-4xl">
            Domaines d&apos;expertise
          </h2>
        </ParallaxFloat>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {[
            {
              title: "Parodontologie",
              text: settings.expertiseParodontie,
            },
            {
              title: "Prothèse sur implant",
              text: settings.expertiseImplant,
            },
            {
              title: "Esthétique dentaire",
              text: settings.expertiseEsthetique,
            },
          ].map((item, i) => (
            <ParallaxLayer key={item.title} offset={100 + i * 40} speed={0.8 + i * 0.15}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="rounded-2xl border border-white bg-white/90 p-6 shadow-lg shadow-sky-100/40 sm:rounded-3xl sm:p-8"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-sky-400" />
                <h3 className="text-xl font-medium text-slate-800">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </motion.div>
            </ParallaxLayer>
          ))}
        </div>
      </section>

      <ParallaxSection
        id="contact"
        className="px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8"
        background={
          <div
            className="absolute inset-[-30%] bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(186,230,253,0.12),transparent_70%)]"
            aria-hidden
          />
        }
      >
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-700 to-cyan-800 text-white shadow-2xl sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-2">
            <ParallaxFloat speed={0.3} distance={140} className="p-6 sm:p-10 md:p-14">
              <h2 className="font-serif text-3xl md:text-4xl">Nous contacter</h2>
              <ul className="mt-8 space-y-4 text-sky-50/95">
                <li>
                  <p>{settings.address}</p>
                  <p>{settings.city}</p>
                  <a
                    href={googleMapsDirectionsUrl(settings.address, settings.city)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center rounded-md border border-white/50 bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
                  >
                    S&apos;y rendre
                  </a>
                </li>
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {settings.phone}
                  </a>
                </li>
                {settings.email ? (
                  <li>
                    <a href={`mailto:${settings.email}`} className="hover:underline">
                      {settings.email}
                    </a>
                  </li>
                ) : null}
                <li>{settings.openingHours}</li>
              </ul>
              <p className="mt-6 rounded-xl bg-sky-800/40 p-4 text-sm leading-relaxed text-sky-50/95">
                {settings.emergencyText}
              </p>
              <div className="mt-8 sm:mt-10">
                <DoctolibButton href={settings.doctolibUrl} className="doctolib-cta-full lg:doctolib-cta-inline" />
              </div>
            </ParallaxFloat>
            <ParallaxFloat
              speed={0.55}
              distance={200}
              className="relative min-h-[280px] p-4 sm:min-h-[320px] sm:p-6 lg:min-h-[320px]"
            >
              <CabinetSlideshow />
            </ParallaxFloat>
          </div>
        </div>
      </ParallaxSection>

      <ArticlesSection articles={articles} />

      <MobileNav doctolibUrl={settings.doctolibUrl} />

      <footer className="relative border-t border-sky-100 bg-white/80 px-4 py-8 text-center text-xs text-slate-500 sm:px-6 sm:py-10 sm:text-sm">
        <Image
          src={assetUrl(settings.logoUrl || "/logos/spanu-logo.png")}
          alt=""
          width={767}
          height={325}
          className="mx-auto mb-4 h-8 w-auto opacity-90"
        />
        <p>{settings.practitionerName} — {settings.title}</p>
        {process.env.NEXT_PUBLIC_STATIC_PREVIEW !== "true" && (
          <p className="mt-2">
            <a href="/admin" className="text-sky-600 hover:underline">Espace admin</a>
          </p>
        )}
      </footer>
      </div>
    </div>
  );
}
