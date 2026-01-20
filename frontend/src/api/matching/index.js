const BASE = '/json/matching'
const FILES = ['match1.json', 'match2.json', 'match3.json']

const normalize = (raw) => ({
  id: raw?.id ?? 0,
  name: raw?.name ?? '',
  role: raw?.role ?? '',
  category: raw?.category ?? 'ALL',
  location: raw?.location ?? '',
  exp: raw?.exp ?? '',
  skills: Array.isArray(raw?.skills) ? raw.skills : [],
  badges: Array.isArray(raw?.badges) ? raw.badges : [],
  likes: Number(raw?.likes) || 0,
  views: Number(raw?.views) || 0,
  updatedAt: raw?.updatedAt ?? '',
})

async function fetchJson(path) {
  const url = `${path}${path.includes('?') ? '&' : '?'}t=${Date.now()}`

  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  if (res.status === 404) return null

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text ? `[${res.status}] ${text}` : `[${res.status}] ${res.statusText}`)
  }

  return await res.json()
}

const list = async () => {
  try {
    const data = await fetchJson(`${BASE}/list.json`)
    if (data) {
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.companies)
          ? data.companies
          : null
      if (arr) return arr.map(normalize)
    }
  } catch (e) {}

  const results = await Promise.allSettled(FILES.map((f) => fetchJson(`${BASE}/${f}`)))

  const merged = results
    .filter((r) => r.status === 'fulfilled' && r.value)
    .map((r) => r.value)
    .map(normalize)
    .sort((a, b) => (a.id || 0) - (b.id || 0))

  return merged
}

const detail = async (id) => {
  const all = await list()
  return all.find((x) => String(x.id) === String(id)) || null
}

export default { list, detail }
