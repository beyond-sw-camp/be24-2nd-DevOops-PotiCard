<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NamecardsFront from '@/components/namecards/NamecardsFront.vue'
import NamecardsBack from '@/components/namecards/NamecardsBack.vue'

const props = defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
})

const route = useRoute()

// 상태 관리
const isFlipped = ref(false)
const currentUserId = route.query.userId || '1'

// 카드 뒤집기 토글 함수
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

// 앞면/뒷면 강제 설정 함수 (버튼 클릭 시)
const setFace = (face) => {
  if (face === 'front') {
    isFlipped.value = false
  } else {
    isFlipped.value = true
  }
}

const updateStyle = (type, value) => {
  console.log(`스타일 변경: ${type} -> ${value}`)
}
</script>

<template>
  <div class="bg-pattern text-gray-800 dark:text-gray-100 transition-colors duration-300 flex flex-col min-h-screen">

    <main class="flex-1 pt-24 pb-20 px-4">
      <div class="max-w-6xl mx-auto">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div class="lg:col-span-5 space-y-6">
            <div
              class="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-6 md:p-8">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i class="fa-solid fa-paintbrush text-point-yellow"></i> 스타일 커스터마이징
              </h2>

              <div class="mb-8">
                <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block mb-3">Accent
                  Color</label>
                <div class="flex flex-wrap gap-3">
                  <button
                    class="w-10 h-10 rounded-full bg-yellow-400 ring-2 ring-offset-2 ring-yellow-400 dark:ring-offset-zinc-900 transition-all hover:scale-110"></button>
                  <button
                    class="w-10 h-10 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-transparent hover:ring-blue-500 dark:ring-offset-zinc-900 transition-all hover:scale-110"></button>
                  <button
                    class="w-10 h-10 rounded-full bg-green-500 ring-2 ring-offset-2 ring-transparent hover:ring-green-500 dark:ring-offset-zinc-900 transition-all hover:scale-110"></button>
                  <button
                    class="w-10 h-10 rounded-full bg-purple-500 ring-2 ring-offset-2 ring-transparent hover:ring-purple-500 dark:ring-offset-zinc-900 transition-all hover:scale-110"></button>
                </div>
              </div>

              <div class="mb-8">
                <label
                  class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block mb-3">Typography</label>
                <div class="grid grid-cols-2 gap-3">
                  <label class="cursor-pointer group relative">
                    <input type="radio" name="font" class="peer sr-only" checked />
                    <div
                      class="p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 peer-checked:border-yellow-400 peer-checked:bg-yellow-50 dark:peer-checked:bg-yellow-900/10 text-center transition-all">
                      <span class="font-sans font-bold text-gray-700 dark:text-gray-200 block text-lg">Sans-serif</span>
                    </div>
                  </label>
                  <label class="cursor-pointer group relative">
                    <input type="radio" name="font" class="peer sr-only" />
                    <div
                      class="p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 peer-checked:border-yellow-400 peer-checked:bg-yellow-50 dark:peer-checked:bg-yellow-900/10 text-center transition-all">
                      <span class="font-serif font-bold text-gray-700 dark:text-gray-200 block text-lg">Serif</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase block mb-3">Options</label>
                <div class="space-y-3">
                  <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">옵션 1</span>
                    <input type="checkbox" checked
                      class="w-5 h-5 rounded text-yellow-400 border-gray-300 focus:ring-yellow-400" />
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">옵션 2</span>
                    <input type="checkbox" checked
                      class="w-5 h-5 rounded text-yellow-400 border-gray-300 focus:ring-yellow-400" />
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">옵션 3</span>
                    <input type="checkbox" checked
                      class="w-5 h-5 rounded text-yellow-400 border-gray-300 focus:ring-yellow-400" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 flex flex-col">
            <div class="sticky top-24">

              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Live Preview</h3>
                <div class="bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg flex text-xs font-bold">
                  <button @click="setFace('front')" class="px-4 py-1.5 rounded-md transition-all duration-200"
                    :class="!isFlipped ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'">
                    앞면 (Profile)
                  </button>
                  <button @click="setFace('back')" class="px-4 py-1.5 rounded-md transition-all duration-200"
                    :class="isFlipped ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'">
                    뒷면 (Info)
                  </button>
                </div>
              </div>
              <div
                class="perspective-container relative w-full h-96 bg-gray-200 dark:bg-zinc-800 rounded-3xl shadow-2xl flex items-center justify-center p-8">

                <div class="card-object w-full max-w-md aspect-[1.58/1] shadow-2xl rounded-2xl cursor-pointer"
                  :class="{ 'is-flipped': isFlipped }" @click="toggleFlip">

                  <div class="card-face card-front ">
                    <NamecardsFront class="w-full h-full max-w-md aspect-[1.58/1]" :userId="currentUserId" />

                    <div class="absolute bottom-4 right-4 z-20 text-xs text-gray-400 animate-pulse pointer-events-none">
                      Click to flip <i class="fa-solid fa-rotate ml-1"></i>
                    </div>
                  </div>

                  <div class="card-face card-back">
                    <NamecardsBack class="w-full h-full max-w-md aspect-[1.58/1]" :userId="currentUserId" />
                    <div class="absolute bottom-4 right-4 z-20 text-xs text-gray-400 animate-pulse pointer-events-none">
                      Click to flip <i class="fa-solid fa-rotate ml-1"></i>
                    </div>
                  </div>

                </div>
              </div>

              <div class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  class="col-span-1 py-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-image text-xl mb-1"></i>
                  <span class="text-xs">이미지 저장</span>
                </button>
                <button
                  class="col-span-1 py-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-share-nodes text-xl mb-1"></i>
                  <span class="text-xs">링크 공유</span>
                </button>
                <button
                  class="col-span-2 md:col-span-1 py-4 bg-yellow-400 text-gray-900 rounded-2xl font-black shadow-lg shadow-yellow-200/50 dark:shadow-none hover:bg-yellow-300 transform hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-rocket text-xl mb-1"></i>
                  <span class="text-xs">수정 완료</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 무대 (원근감) */
.perspective-container {
  perspective: 1000px;
}

/* 회전체 (카드 본체) */
.card-object {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  /* 3D 공간 유지 */
}

/* 뒤집힘 상태 (isFlipped=true 일 때) */
.card-object.is-flipped {
  transform: rotateY(180deg);
}

/* 카드 앞/뒤 공통 */
.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
}

/* 앞면 */
.card-front {
  transform: rotateY(0deg);
  z-index: 2;
}

/* 뒷면 (미리 180도 돌려놓음) */
.card-back {
  transform: rotateY(180deg);
}

/* 배경 패턴 */
.bg-pattern {
  background-color: #f8fafc;
}

.dark .bg-pattern {
  background-color: #18181b;
}
</style>