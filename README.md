# Site vitrine — Dr Cristina Spanu

Site one-page pour une chirurgien-dentiste (implantologie, parodontologie) : parallaxe au scroll, palette claire, Doctolib, articles en vedette.

## Aperçu client (GitHub Pages)

Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions** (pas « Deploy from a branch »). Une fois le workflow vert, le site est à :

**https://jec-tech-papp.github.io/NewItem/**

Chaque push sur `main` (ou la branche configurée dans le workflow) reconstruit la vitrine à partir des fichiers `data/*.json`. L’espace admin n’est **pas** disponible sur Pages (réservé au travail en local).

## Développement sur votre PC

```bash
npm install
npm run dev
```

- Site : http://localhost:3000  
- Admin : http://localhost:3000/admin (mot de passe par défaut `admin-spanu-demo`, variable `ADMIN_PASSWORD` en option)

Pour tester le build Pages en local :

```bash
npm run build:pages
npx serve out
```

(Ouvrir l’URL indiquée avec le préfixe `/NewItem` si besoin.)

## Données

- `data/settings.json` — coordonnées, textes, URL Doctolib  
- `data/articles.json` — articles (max 5 en vedette sur l’accueil)

Modifiez ces fichiers en local via l’admin, puis commitez pour mettre à jour l’aperçu GitHub Pages.

## Images

- Diaporama (section contact) : `public/images/cabinet/01.png`, `02.png`, `03.png`
- Logo : `public/logos/spanu-logo.png`

## SEO

- Métadonnées (titre, description, Open Graph, Twitter) générées depuis `data/settings.json`
- Données structurées Schema.org (`Dentist`, `WebSite`, articles) dans la page d’accueil
- `sitemap.xml` et `robots.txt` générés au build
- En production, définir **`NEXT_PUBLIC_SITE_URL`** (ex. `https://www.votredomaine.fr`) pour l’URL canonique et le JSON-LD ; le build GitHub Pages le renseigne automatiquement

## Hébergement OVH (après validation)

- **Mutualisé (statique)** : `npm run build:pages` avec `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr` → déployer le dossier `out/` en FTP.
- **VPS / Cloud (Node.js)** : `npm run build` + `npm start` (PM2), `ADMIN_PASSWORD`, sauvegarde de `data/`.
