<script setup>
import { ref, onMounted, watch } from 'vue'
import { useNamecardStore } from '@/stores/namecardStore'

const props = defineProps({
  userId: {
    type: [Number, String],
    required: true
  }
})

const store = useNamecardStore()

// ★ 핵심: 전역 store.cardData 대신 컴포넌트별 독립적인 상태 사용
const cardData = ref(null)
const isLoading = ref(true)

const loadMyCard = async () => {
  isLoading.value = true
  // Store는 데이터를 가져오는 도구로만 사용하고, 결과값은 내 변수(cardData)에 저장
  const data = await store.getUser(props.userId)
  cardData.value = data
  isLoading.value = false
}

onMounted(() => {
  loadMyCard()
})

// props.userId가 바뀔 경우를 대비
watch(() => props.userId, () => {
  loadMyCard()
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
