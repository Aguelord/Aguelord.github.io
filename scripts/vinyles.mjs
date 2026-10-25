export function normalizeRecord(record, base) {
  const cover = record.cover_image && !/default\.svg$/i.test(record.cover_image) ? new URL(`images/covers/${record.cover_image}`, base).href : null;
  return {
    id: record.id, artist: record.artist || '', album: record.album || '',
    year: record.year > 0 ? record.year : null, genre: record.genre || '',
    label: record.label || '', format: record.format || '', notes: record.notes || '',
    giftedBy: record.gifted_by || '', cover: cover && /^https:\/\//.test(cover) ? cover : null
  };
}

export async function fetchVinyls(url, request = fetch) {
  const response = await request(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Discothèque HTTP ${response.status}; synchronisation interrompue, collection conservée.`);
  const data = await response.json();
  if (!Array.isArray(data?.records)) throw new Error('Réponse MyVinyles inattendue');
  return {
    updatedAt: data.last_updated || null,
    records: data.records.filter(r => r.owned !== false).map(r => normalizeRecord(r, url)).sort((a, b) => b.id - a.id)
  };
}
