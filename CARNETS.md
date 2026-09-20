# Ajouter un texte aux Carnets

L’éditeur visuel reste prévu pour plus tard. Pour le moment, chaque texte public est un fichier Markdown dans `src/content/carnets/`, avec un nom court en minuscules et tirets, par exemple `une-idee-en-chemin.md`.

Copier cette structure dans le fichier et remplacer les valeurs :

```markdown
---
title: "Titre du texte"
excerpt: "Une ou deux phrases de présentation."
category: "Réflexions"
format: "Essai"
status: "En cours"
date: "2026-09-19"
---

Le texte commence ici.

## Une première piste

Paragraphes, **gras**, *italique*, liens et listes sont disponibles.

Une référence peut être précisée en note.[^reference]

[^reference]: La référence bibliographique.
```

Catégorie : `Recherche` ou `Réflexions`. Format : `Note`, `Essai` ou `Fragment`. État : `Esquisse`, `En cours`, `Abouti` ou `Publié en revue`. La date doit rester entre guillemets. Le champ facultatif `publication` accepte un lien HTTPS vers la revue ou le DOI.

Tous les fichiers placés dans `src/content/carnets/` sont destinés à être publics, quel que soit leur état. L’état « En cours » ne masque pas un texte.

Conserver les textes confidentiels hors du projet, ou dans le dossier local `private/`, exclu de Git et jamais lu par le site. Ne pas les placer dans `public/`. L’exclusion Git ne retire pas un fichier déjà commité de l’historique.

Après ajout, `pnpm build` puis `pnpm preview` permettent de consulter le résultat. Le support des formules mathématiques et les relations entre carnets restent à ajouter.
