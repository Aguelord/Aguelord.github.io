import snapshot from '../data/github.json';
import annotations from '../data/editorial.json';
type Editorial = {title?:string; description?:string; status?:string; note?:string; relations?:{project:string;type:string}[]};
const editorial = annotations as Record<string, Editorial>;
export const projects = snapshot.projects.map(p => ({...p, ...editorial[p.id],
  title: editorial[p.id]?.title || p.name,
  status: editorial[p.id]?.status || (p.archived ? 'Archivé' : 'À explorer'),
  relations: editorial[p.id]?.relations || []
}));
for (const p of projects) for (const r of p.relations) {
  if (!projects.some(other => other.id === r.project)) throw new Error(`Connexion introuvable : ${p.id} → ${r.project}`);
}
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
export const projectHref = (id: string) => href(`projets/${id}/`);
export const date = (value: string) => new Intl.DateTimeFormat('fr-FR', {dateStyle:'medium', timeZone:'UTC'}).format(new Date(value));
export const syncedAt = snapshot.syncedAt;
