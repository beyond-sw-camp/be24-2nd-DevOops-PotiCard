import { apiFetch } from '@/plugins/interceptor'

export const getProjects = async () => {
  try {
    const res = await apiFetch('json/projects/allProjects')

    return res
  } catch (error) {
    console.error('프로젝트 목록 호출 실패:', error.message)
    return { projects: [] }
  }
}

export default {
  getProjects,
}
