import snapshot from '../data/github.json';
import annotations from '../data/editorial.json';
type Editorial = {title?:string; description?:string; status?:string; note?:string; relations?:{project:string;type:string}[]; links?:{label:string;path:string}[];
  manual?:{language?:string; createdAt:string; updatedAt:string}};
const editorial = annotations as Record<string, Editorial>;
// Pièces sans dépôt public : décrites à la main tant que la synchronisation ne les connaît pas.
const manual = Object.entries(editorial).filter(([id, e]) => e.manual && !snapshot.projects.some(p => p.id === id))
  .map(([id, e]) => ({id, name: e.title || id, description: '', url: null as string | null, homepage: null, language: e.manual!.language || null, topics: [] as string[],
    createdAt: e.manual!.createdAt, updatedAt: e.manual!.updatedAt, archived: false, fork: false, stars: 0, forks: 0, license: null}));
export const projects = [...snapshot.projects, ...manual].sort((a,b) => b.updatedAt.localeCompare(a.updatedAt)).map(p => ({...p, ...editorial[p.id],
  title: editorial[p.id]?.title || p.name,
  status: editorial[p.id]?.status || (p.archived ? 'Archivé' : 'À explorer'),
  relations: editorial[p.id]?.relations || [],
  links: editorial[p.id]?.links || []
}));
for (const p of projects) for (const r of p.relations) {
  if (!projects.some(other => other.id === r.project)) throw new Error(`Connexion introuvable : ${p.id} → ${r.project}`);
}
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
export const projectHref = (id: string) => href(`projets/${id}/`);
export const date = (value: string) => new Intl.DateTimeFormat('fr-FR', {dateStyle:'medium', timeZone:'UTC'}).format(new Date(value));
export const syncedAt = snapshot.syncedAt;
