# Site vitrine — Dr Cristina Spanu

Site one-page pour une chirurgien-dentiste implantologue : parallaxe au scroll, palette claire, Doctolib, articles en vedette.

## Aperçu client (GitHub Pages)

Après activation de **Pages** dans le dépôt GitHub (*Settings → Pages → Source : GitHub Actions*), le site est publié à :

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
