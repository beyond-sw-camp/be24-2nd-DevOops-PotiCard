<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
// api 호출 함수가 정의된 경로 (사용자 환경에 맞게 수정)
import api from '@/api/namecard/index'

// ★ 핵심: 부모로부터 userId를 받습니다.
const props = defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
})

const route = useRoute()
const cardData = ref(null)
const isLoading = ref(true)

// 명함 정보 불러오는 함수
const getUser = async (targetId) => {
  try {
    // 1. targetId가 없으면 URL 쿼리에서 userId 추출 (예: /card?userId=1)
    const userId = props.userId || route.query.userId || targetId
    console.log('타겟 : ' + targetId)
    if (!userId) {
      alert('유저 정보가 없습니다.')
      return
    }

    // 2. API 호출 (userId를 인자로 전달한다고 가정)
    // 기존 api.getUserInfo()가 인자를 받도록 수정되어야 합니다.
    // 만약 apiFetch 로직을 직접 쓴다면: apiFetch(`json/namecards/user_${userId}.json`)
    const res = await api.getUserInfo(userId)

    // 3. 데이터 매핑 (API 응답 구조 -> 컴포넌트 상태)
    if (res && res.data) {
      cardData.value = {
        name: res.data.name,
        role: res.data.affiliation,
        description: res.data.namecard_title, // 혹은 별도 소개글 필드
        avatar: res.data.style.avatar,
        keywords: res.data.keywords, // 배열
        email: res.data.email,
        github: res.data.url,
        color: res.data.style.color,
      }
    }
  } catch (error) {
    console.error('데이터 로딩 실패', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getUser('57')
})
</script>

<template>
  <div
    class="relative w-full h-full bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between p-5 overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl hover:border-yellow-300 z-0 hover:z-10 group"
  >
    <template v-if="cardData && !isLoading">
      <div
        class="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full transition-colors group-hover:bg-yellow-300"
      ></div>

      <div class="relative z-10">
        <p class="text-[10px] font-bold text-yellow-600 uppercase tracking-wider mb-1">
          {{ cardData.role }}
        </p>
        <h4
          class="text-lg font-black text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2"
        >
          {{ cardData.name }}
        </h4>
        <div class="mt-3 flex flex-wrap gap-1">
          <span
            v-for="tag in cardData.keywords"
            :key="tag"
            class="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="flex justify-between items-end mt-4">
        <div
          class="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden group-hover:border-yellow-400 transition-colors bg-gray-50"
        >
          <img :src="cardData.avatar" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <i
          class="fa-solid fa-arrow-right text-gray-300 group-hover:text-yellow-500 transition-colors transform group-hover:translate-x-1"
        ></i>
      </div>
    </template>

    <template v-else>
      <div class="animate-pulse flex flex-col justify-between h-full">
        <div>
          <div class="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="flex gap-1">
            <div class="h-4 w-10 bg-gray-200 rounded-full"></div>
            <div class="h-4 w-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div class="flex justify-between items-end">
          <div class="w-10 h-10 rounded-full bg-gray-200"></div>
          <div class="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* 필요한 경우 추가 스타일 작성 */
.text-point-yellow {
  color: #facc15; /* Tailwind yellow-400 예시 */
}
</style>
