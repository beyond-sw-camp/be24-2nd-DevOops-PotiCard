import api from '@/plugins/axiosinterceptor'

const BASE = '/json/matching'
const FILES = [
    'match1.json',
    'match2.json',
    'match3.json',
    'match4.json',
    'match5.json',
    'match6.json',
]

function normalize(raw) {
    return {
        id: raw?.id ?? 0,
        name: raw?.name ?? '',
        role: raw?.role ?? '',
        category: raw?.category ?? 'ALL',
        location: raw?.location ?? '',
        exp: raw?.exp ?? '',
        skills: Array.isArray(raw?.skills) ? raw.skills : [],
        badges: Array.isArray(raw?.badges) ? raw.badges : [],
        likes: Number.isFinite(raw?.likes) ? raw.likes : 0,
        views: Number.isFinite(raw?.views) ? raw.views : 0,
        updatedAt: raw?.updatedAt ?? '',
    }
}

async function getJson(url) {
    const res = await api.get(url, { baseURL: '' })
    return res.data
}

async function list() {
    try {
        const data = await getJson(`${BASE}/list.json`)
        const arr = Array.isArray(data) ? data : Array.isArray(data?.companies) ? data.companies : null
        if (arr) return arr.map(normalize)
        } catch (e) {
    }

    const results = await Promise.allSettled(FILES.map((f) => getJson(`${BASE}/${f}`)))

    const merged = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value)
    .flatMap((v) => (Array.isArray(v) ? v : [v]))
    .filter(Boolean)
    .map(normalize)

    merged.sort((a, b) => (a.id || 0) - (b.id || 0))
    return merged
}

async function detail(id) {
    const all = await list()
    return all.find((x) => String(x.id) === String(id)) || null
}

export default { list, detail }
