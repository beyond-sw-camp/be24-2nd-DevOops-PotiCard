import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/namecard/index'

export const useNamecardStore = defineStore('namecard', () => {
  // 전역 상태 (단일 조회용) - 리스트 조회 시에는 사용하지 않음
  const cardData = ref(null)
  
  // ★ 중요: async 함수가 데이터를 반환하도록 수정
  const getUser = async (userId) => {
    if (!userId) return null

    const storageKey = `user_card_${userId}`
    
    try {
      // 1. 세션 스토리지 확인
      const cachedData = sessionStorage.getItem(storageKey)
      if (cachedData) {
        const parsed = JSON.parse(cachedData)
        // 필요하다면 전역 상태 업데이트 (선택 사항)
        cardData.value = parsed 
        return parsed // ★ 데이터를 반환해서 컴포넌트가 쓸 수 있게 함
      }

      // 2. API 호출
      const res = await api.getUserInfo(userId)

      if (res && res.data) {
        const mappedData = {
          name: res.data.name,
          role: res.data.affiliation,
          description: res.data.namecard_title,
          avatar: res.data.style.avatar,
          keywords: res.data.keywords,
          email: res.data.email,
          color: res.data.style.color,
          phone: res.data.phone, // JSON에 없다면 기본값 or 빈값
          address: res.data.address, // JSON에 없다면 기본값
          website: res.data.url, // github.com/...
        }

        sessionStorage.setItem(storageKey, JSON.stringify(mappedData))
        cardData.value = mappedData
        return mappedData // ★ API 결과도 반환
      }
    } catch (error) {
      console.error('데이터 로딩 실패', error)
      return null
    }
  }

  return { cardData, getUser }
})