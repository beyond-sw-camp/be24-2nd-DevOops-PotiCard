<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNamecardStore } from '@/stores/namecardStore'

const props = defineProps({
  userId: {
    type: [String, Number],
    required: false,
  },
})

const route = useRoute()
const store = useNamecardStore()

// 스토어의 state를 반응형으로 가져오기
const { cardData, isLoading } = storeToRefs(store)

// 데이터 로드 트리거 함수
const loadData = async () => {
  const targetId = props.userId || route.query.userId

  if (targetId) {
    await store.getUser(targetId)
  } else {
    console.log('ID가 제공되지 않았습니다.')
  }
}

// 컴포넌트 마운트 시 실행
onMounted(() => {
  loadData()
})

// 라우트나 props가 변경되면 다시 불러오기
watch(() => [props.userId, route.query.userId], () => {
  loadData()
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-64 text-gray-400">Loading...</div>

  <div v-else-if="cardData" class="relative w-full max-w-md aspect-[1.58/1] mx-auto">
    <div
      class="absolute inset-0 w-full h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-8 backface-hidden overflow-hidden shadow-lg">
      <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-bl-full"></div>

      <div class="flex flex-col justify-between h-full relative z-10">
        <div class="flex justify-between items-start">
          <div class="pr-4">
            <p class="text-xs font-bold text-point-yellow uppercase tracking-widest mb-1">
              {{ cardData.role }}
            </p>
            <h2 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2 truncate">
              {{ cardData.name }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-wrap line-clamp-2">
              {{ cardData.description }}
            </p>
          </div>

          <div
            class="shrink-0 w-20 h-20 rounded-full border-4 border-white dark:border-zinc-800 shadow-md overflow-hidden bg-gray-100">
            <img :src="cardData.avatar" alt="Profile" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex gap-2 flex-wrap">
            <span v-for="(tag, index) in cardData.keywords" :key="index"
              class="px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-md">
              #{{ tag }}
            </span>
          </div>

          <div class="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <div class="flex gap-3 text-gray-400 dark:text-gray-500">
              <a v-if="cardData.website" :href="'https://' + cardData.website" target="_blank"
                class="hover:text-point-yellow transition-colors">
                <i class="fa-brands fa-github text-xl"></i>
              </a>

              <a href="#" class="hover:text-point-yellow transition-colors">
                <i class="fa-brands fa-linkedin text-xl"></i>
              </a>
              <a href="#" class="hover:text-point-yellow transition-colors">
                <i class="fa-brands fa-instagram text-xl"></i>
              </a>

              <a v-if="cardData.email" :href="'mailto:' + cardData.email"
                class="hover:text-point-yellow transition-colors">
                <i class="fa-solid fa-envelope text-xl"></i>
              </a>
            </div>

            <i
              class="fa-solid fa-qrcode text-3xl text-gray-800 dark:text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-red-500 mt-10">사용자 정보를 찾을 수 없습니다.</div>
</template>

<style scoped>
.text-point-yellow {
  color: #facc15;
}
</style>
