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

watch(
  () => props.userId,
  () => getUser(),
)
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-64 text-gray-400">Loading...</div>

  <div v-else-if="cardData" class="relative w-full max-w-md aspect-[1.58/1] mx-auto">
    <div
      class="absolute inset-0 w-full h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-8 backface-hidden overflow-hidden shadow-lg"
    >
      <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-bl-full"></div>

      <div class="flex flex-col justify-between h-full relative z-10">
        <div class="flex justify-between items-start">
          <div class="pr-4">
            <p class="text-xs font-bold text-point-yellow uppercase tracking-widest mb-1">
              {{ cardData.role }}
            </p>
            <h2
              class="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2 truncate"
            >
              {{ cardData.name }}
            </h2>
            <p
              class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-wrap line-clamp-2"
            >
              {{ cardData.description }}
            </p>
          </div>

          <div
            class="shrink-0 w-20 h-20 rounded-full border-4 border-white dark:border-zinc-800 shadow-md overflow-hidden bg-gray-100"
          >
            <img :src="cardData.avatar" alt="Profile" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="(tag, index) in cardData.keywords"
              :key="index"
              class="px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-md"
            >
              #{{ tag }}
            </span>
          </div>

          <div
            class="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center"
          >
            <div class="flex gap-3 text-gray-400 dark:text-gray-500">
              <a
                v-if="cardData.github"
                :href="'https://' + cardData.github"
                target="_blank"
                class="hover:text-point-yellow transition-colors"
              >
                <i class="fa-brands fa-github text-xl"></i>
              </a>

              <a href="#" class="hover:text-point-yellow transition-colors">
                <i class="fa-brands fa-linkedin text-xl"></i>
              </a>
              <a href="#" class="hover:text-point-yellow transition-colors">
                <i class="fa-brands fa-instagram text-xl"></i>
              </a>

              <a
                v-if="cardData.email"
                :href="'mailto:' + cardData.email"
                class="hover:text-point-yellow transition-colors"
              >
                <i class="fa-solid fa-envelope text-xl"></i>
              </a>
            </div>

            <i
              class="fa-solid fa-qrcode text-3xl text-gray-800 dark:text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-red-500 mt-10">사용자 정보를 찾을 수 없습니다.</div>
</template>

<style scoped>
/* 필요한 경우 추가 스타일 작성 */
.text-point-yellow {
  color: #facc15; /* Tailwind yellow-400 예시 */
}
</style>
