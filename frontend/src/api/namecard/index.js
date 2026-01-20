import { apiFetch } from '@/plugins/interceptor'

const getNamecardsInfo = async () => {
  try {
    const res = await apiFetch('json/namecards/namecardsFront')
    return res
  } catch (error) {
    console.error('명함 정보 호출 실패:', error.message)

    alert('명함 정보 호출 실패')
  }
}

const getUserInfo = async (userId) => {
  try {
    const res = await apiFetch(`json/namecards/userId_${userId}`)
    return res
  } catch (error) {
    console.error('명함 정보 호출 실패:', error.message)
    alert('명함 정보 호출 실패')
  }
}

export default {
  getUserInfo,
  getNamecardsInfo,
}
