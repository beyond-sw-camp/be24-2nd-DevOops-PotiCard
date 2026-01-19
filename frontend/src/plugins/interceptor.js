const BASE_URL = 'http://localhost:5173/api/' // local
// const BASE_URL = 'http://192.100.200.10:8080/' // tomcat
// const BASE_URL = 'https://www.beyond24lsj.kro.kr/api/' // aws

export async function apiFetch(url, options = {}) {
  //요청 인터셉터

  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  }

  let response

  try {
    response = await fetch(BASE_URL + url, config)
  } catch (error) {
    console.log('요청 보낼 때 네트워크 에러')
    throw error
  }

  //응답 인터셉터

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    console.log('응답 받을 때 HTTP 에러')
    throw new Error(body?.message || `HTTP ${response.status}`)
  }

  return body
}
