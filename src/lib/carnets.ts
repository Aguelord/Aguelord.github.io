import type { MarkdownInstance } from 'astro';

export type Carnet = {
  title: string;
  excerpt: string;
  category: 'Recherche' | 'Réflexions';
  format: 'Note' | 'Essai' | 'Fragment';
  status: 'Esquisse' | 'En cours' | 'Abouti' | 'Publié en revue';
  date: string;
  publication?: string;
  author?: string;
  ai?: string;
  document?: string;
  documentType?: 'PDF' | 'Word';
  dateLabel?: string;
  fullText?: string;
};

const files = import.meta.glob<MarkdownInstance<Carnet>>('../content/carnets/*.md', { eager: true });
export const carnets = Object.entries(files).map(([path, module]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const data = module.frontmatter;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Nom de fichier de carnet invalide : ${slug}`);
  if (!data.title || !data.excerpt || !['Recherche','Réflexions'].includes(data.category)
    || !['Note','Essai','Fragment'].includes(data.format)
    || !['Esquisse','En cours','Abouti','Publié en revue'].includes(data.status)
    || typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)
    || Number.isNaN(Date.parse(data.date))) throw new Error(`Métadonnées de carnet invalides : ${slug}`);
  if (data.publication && !/^https?:\/\//.test(data.publication)) throw new Error(`Lien de publication invalide : ${slug}`);
  if (data.document && !/^textes\/[a-z0-9-]+\.(pdf|docx)$/.test(data.document)) throw new Error(`Document invalide : ${slug}`);
  return { slug, ...data, Content: module.Content };
}).sort((a,b) => b.date.localeCompare(a.date));
