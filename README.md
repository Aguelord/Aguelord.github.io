# L’atelier d’Adrien

Site Astro statique, catalogue GitHub public et annotations éditoriales indépendantes.

## Développement

Node 24 et pnpm 11.19.0 sont recommandés.

```sh
pnpm install
pnpm sync
pnpm dev
```

`pnpm build` compile le catalogue enregistré sans accès GitHub. `pnpm test` vérifie la pagination, les erreurs API et les URL de démo. `pnpm sync` importe les métadonnées des dépôts publics d’Aguelord. Un échec laisse le catalogue précédent intact. Le jeton GITHUB_TOKEN est facultatif en local et ne doit jamais être enregistré dans le dépôt.

## Contenu

- `site.config.json` : compte GitHub, inclusion des forks et noms de dépôts à exclure.
- `src/data/github.json` : instantané généré, à ne pas modifier manuellement.
- `src/data/editorial.json` : textes, états et relations que la synchronisation conserve.

Les clés éditoriales sont les noms des dépôts en minuscules. Exemple fictif de structure, à adapter aux relations réelles :

```json
{
  "pybar": {
    "title": "PyBar",
    "description": "Votre description personnelle",
    "status": "Sur l’établi",
    "note": "Votre note de fabrication.",
    "relations": [{"project": "numenichal", "type": "prolonge"}]
  }
}
```

Une relation vers un identifiant absent fait échouer la compilation pour éviter les liens cassés. Aucune relation fictive n’est incluse par défaut. L’activité GitHub ne permet pas d’inférer l’état réel d’un chantier : les projets non archivés restent « À explorer » jusqu’à annotation.

## GitHub Pages

Créer le dépôt public `Aguelord/Aguelord.github.io`, y placer ce dossier à la racine et envoyer sur la branche `main`. Dans Settings → Pages, sélectionner GitHub Actions. Le workflow fourni synchronise les données, teste, compile et publie à chaque push, sur déclenchement manuel et chaque jour à 05:17 UTC. Le jeton temporaire GitHub Actions est utilisé automatiquement.

Un autre nom de dépôt est également supporté : le chemin de base est calculé par le workflow. Les builds planifiés GitHub peuvent être retardés et être désactivés après une longue période d’inactivité dans un dépôt public.

Ce dossier est livré localement : aucun dépôt distant ni déploiement n’a encore été créé.

## Studio

La page `/studio/` intègre le lecteur artiste officiel d’Adrien Vet, obtenu via Spotify oEmbed. Son adresse est conservée dans `src/data/music.json`. Aucun compte développeur ni secret n’est nécessaire. Le lecteur tiers n’est créé qu’après un clic ; le lien vers Spotify reste disponible sans JavaScript ou si le lecteur est bloqué. Il s’agit de la sélection proposée par le lecteur artiste Spotify, pas d’un import exhaustif de la discographie. Les fiches individuelles et la synchronisation du catalogue ne sont pas encore implémentées.

## Périmètre de cette première version

Accueil responsive, catalogue, recherche et filtre locaux, découverte aléatoire, fiches, liens éditoriaux dans les deux sens, studio avec lecteur Spotify à la demande. Navigation et contenu éditorial accessibles sans JavaScript. Pas de police distante ; Spotify se charge uniquement après activation du lecteur. Les README ne sont pas encore importés ; le bouton de chaque fiche permet de les consulter sur GitHub. Les contenus de thèse et articles seront ajoutés dans une prochaine étape.
