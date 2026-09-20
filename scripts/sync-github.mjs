import { readFile, writeFile, rename } from 'node:fs/promises';
import { fetchRepos, normalize } from './github.mjs';
const root = new URL('../', import.meta.url);
const config = JSON.parse(await readFile(new URL('site.config.json', root), 'utf8'));
const repos = await fetchRepos(config.githubUser, fetch, process.env.GITHUB_TOKEN);
const projects = repos.filter(r => (config.includeForks || !r.fork) && !config.exclude.includes(r.name))
  .map(normalize).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt));
const target = new URL('src/data/github.json', root);
const temporary = new URL('src/data/github.json.tmp', root);
await writeFile(temporary, JSON.stringify({syncedAt: new Date().toISOString(), projects}, null, 2) + '\n');
await rename(temporary, target);
console.log(`${projects.length} dépôts publics synchronisés pour ${config.githubUser}.`);
