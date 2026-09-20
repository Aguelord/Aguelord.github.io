export function normalize(repo) {
  return {
    id: repo.name.toLowerCase(), name: repo.name,
    description: repo.description || '', url: repo.html_url,
    homepage: /^https?:\/\//i.test(repo.homepage || '') ? repo.homepage : null,
    language: repo.language, topics: repo.topics || [],
    createdAt: repo.created_at, updatedAt: repo.pushed_at || repo.updated_at,
    archived: repo.archived, fork: repo.fork,
    stars: repo.stargazers_count, forks: repo.forks_count,
    license: repo.license?.spdx_id || null
  };
}

export async function fetchRepos(user, request = fetch, token = '') {
  if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(user)) throw new Error('Identifiant GitHub invalide');
  const repos = [];
  for (let page = 1; ; page++) {
    const response = await request(`https://api.github.com/users/${user}/repos?type=owner&per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'atelier-sync', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      signal: AbortSignal.timeout(30000)
    });
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}; synchronisation interrompue, catalogue conservé.`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Réponse GitHub inattendue');
    repos.push(...batch.filter(r => r.private === false));
    if (batch.length < 100) return repos;
  }
}
