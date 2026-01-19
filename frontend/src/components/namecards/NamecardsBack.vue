<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
// API 파일 경로는 프로젝트 구조에 맞게 수정해주세요
import api from '@/api/namecard/index'

const props = defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
})

const route = useRoute()
const cardData = ref(null)
const isLoading = ref(true)

const getUser = async (targetId) => {
  try {
    isLoading.value = true

    // 1. ID 결정 (매개변수 우선 || URL 쿼리)
    const userId = props.userId || route.query.userId || targetId

    if (!userId) {
      // ID가 없으면 로딩 종료하고 리턴 (필요시 alert)
      isLoading.value = false
      return
    }

    // 2. API 호출
    const res = await api.getUserInfo(userId)

    // 3. 뒷면 데이터 매핑
    // (JSON에 없는 전화번호/주소 등은 임시로 하드코딩하거나 null 처리)
    if (res && res.data) {
      cardData.value = {
        phone: res.data.phone, // JSON에 없다면 기본값 or 빈값
        address: res.data.address, // JSON에 없다면 기본값
        email: res.data.email,
        website: res.data.url, // github.com/...
        color: res.data.style.color, // 포인트 컬러가 필요하다면 사용
      }
    }
  } catch (error) {
    console.error('뒷면 데이터 로딩 실패', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getUser('57')
})

// 부모 컴포넌트에서 호출할 수 있도록 노출
defineExpose({
  getUser,
})
</script>

<template>
  <div
    v-if="isLoading"
    class="flex justify-center items-center w-full max-w-md aspect-[1.58/1] mx-auto text-gray-400"
  >
    Loading Info...
  </div>

  <div v-else-if="cardData" class="relative w-full max-w-md aspect-[1.58/1] mx-auto">
    <div
      class="card-face card-back absolute inset-0 w-full h-full bg-zinc-900 text-white rounded-2xl border border-zinc-700 p-6 sm:p-8 flex flex-col overflow-hidden shadow-lg"
    >
      <div
        class="absolute bottom-0 left-0 w-24 h-24 bg-zinc-800 rounded-tr-full opacity-50 pointer-events-none"
      ></div>

      <div class="relative z-10 h-full flex flex-col">
        <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
          Contact Info
        </h3>

        <div class="space-y-4 flex-1 text-sm text-gray-300">
          <div v-if="cardData.phone" class="flex items-center gap-3">
            <div class="w-8 flex justify-center">
              <i class="fa-solid fa-phone text-lg"></i>
            </div>
            <span>{{ cardData.phone }}</span>
          </div>

          <div v-if="cardData.address" class="flex items-center gap-3">
            <div class="w-8 flex justify-center">
              <i class="fa-solid fa-location-dot text-lg"></i>
            </div>
            <span>{{ cardData.address }}</span>
          </div>

          <a
            v-if="cardData.email"
            :href="`mailto:${cardData.email}`"
            class="flex items-center gap-3 hover:text-yellow-400 transition-colors"
          >
            <div class="w-8 flex justify-center">
              <i class="fa-solid fa-envelope text-lg"></i>
            </div>
            <span>{{ cardData.email }}</span>
          </a>

          <a
            v-if="cardData.website"
            :href="`https://${cardData.website}`"
            target="_blank"
            class="flex items-center gap-3 hover:text-yellow-400 transition-colors"
          >
            <div class="w-8 flex justify-center">
              <i class="fa-solid fa-link text-lg"></i>
            </div>
            <span class="truncate">{{ cardData.website }}</span>
          </a>
        </div>

        <div class="text-right mt-auto pt-4 border-t border-zinc-800">
          <span class="text-[10px] font-bold tracking-widest opacity-40">POTICARD</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-red-500 mt-10">정보를 불러올 수 없습니다.</div>
</template>

<style scoped>
/* 필요한 경우 추가 스타일 */
</style>
