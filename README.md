# Site vitrine — Dr Cristina Spanu

Site one-page pour une chirurgien-dentiste implantologue : parallaxe au scroll, palette claire et bleu médical, prise de rendez-vous Doctolib, espace admin pour les informations du cabinet et jusqu'à 5 articles en vedette (liste à gauche, contenu à droite).

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Administration : [http://localhost:3000/admin](http://localhost:3000/admin).

## Admin

- Mot de passe par défaut : `admin-spanu-demo` (à remplacer via la variable d'environnement `ADMIN_PASSWORD`).
- Modifier nom, coordonnées, URL Doctolib, textes.
- Créer / éditer des articles ; cocher « en vedette » pour l'accueil (maximum 5).

## Production

Définir `ADMIN_PASSWORD` et remplacer l'URL Doctolib dans l'admin par le lien direct de la fiche praticien (boutons et iframe de la section contact).

Les données sont stockées dans `data/settings.json` et `data/articles.json`.
