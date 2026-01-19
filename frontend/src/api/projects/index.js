import { apiFetch } from '@/plugins/interceptor'

const getProjectDetail = async () => {
  try {
    const res = await apiFetch('json/projects/projectDetail')
    // console.log('불러온 데이터 : ' + res)
    return res
  } catch (error) {
    console.error('API 호출 실패:', error.message)
    alert('API 호출 실패')
  }
}

const getSectionDetail = async () => {
  try {
    const res = await apiFetch('json/projects/sectionDetail')
    // console.log('불러온 데이터 : ' + res)
    return res
  } catch (error) {
    console.error('API 호출 실패:', error.message)
    alert('API 호출 실패')
  }
}

export default {
  getProjectDetail,
  getSectionDetail,
}
