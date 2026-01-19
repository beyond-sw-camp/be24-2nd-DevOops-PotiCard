<template>
  <div class="min-h-screen bg-[#f8fafc] p-10 font-sans text-[#333] overflow-x-hidden">
    <div class="max-w-[1280px] mx-auto">
      <div class="grid grid-cols-12 gap-8 items-start">
        <div
          class="col-span-4 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-10 flex flex-col relative overflow-hidden h-[750px]"
        >
          <div class="absolute top-10 right-10 z-30">
            <h3 class="text-xl font-black text-gray-900">오늘의 명함</h3>
          </div>

          <div
            class="flex-1 relative flex items-center justify-center"
            @wheel.prevent="handleScroll"
          >
<div class="stack-wrapper relative w-64 h-40"> <div
      v-for="(userId, idx) in stackUserIds"
      :key="userId"
      class="mini-card-container absolute inset-0 transition-all duration-700 ease-out"
      :style="getMiniCardStyle(idx)"
    >
      <div 
        class="w-full h-full rounded-2xl overflow-hidden transition-all"
        :class="{ 'ring-4 ring-yellow-400': idx === selectedIdx }"
      >
        <NamecardsMini :userId="userId" />
      </div>
      
    </div>

  </div>
          </div>
        </div>

        <div class="col-span-8 grid grid-cols-8 gap-8">
          <div
            class="col-span-5 bg-white rounded-[2.5rem] border border-slate-200 p-8 flex flex-col items-center justify-center relative h-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div class="absolute top-8">
              <span
                class="text-[10px] font-black bg-slate-50 border border-slate-100 shadow-sm text-gray-400 px-5 py-2 rounded-full uppercase tracking-[0.3em]"
                >Business Card View</span
              >
            </div>

<transition name="card-switch" mode="out-in">
    
    <div
      :key="selectedIdx"
      class="perspective-container relative w-full max-w-md aspect-[1.58/1] cursor-pointer"
      @click="isFlipped = !isFlipped"
    >
      <div
        class="card-object w-full h-full relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl duration-700"
        :class="{ 'is-flipped': isFlipped }"
      >
        
        <div class="card-face card-front">
          <NamecardsFront :userId="userCards[selectedIdx].id" />
          
          <div class="absolute bottom-4 right-4 z-20 text-xs text-gray-400 animate-pulse pointer-events-none">
             Click to flip <i class="fa-solid fa-rotate ml-1"></i>
          </div>
        </div>

        <div class="card-face card-back">
          <NamecardsBack :userId="userCards[selectedIdx].id" />
        </div>

      </div>
    </div>
    
  </transition>
          </div>

          <div
            class="col-span-3 bg-zinc-900 rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden h-[480px]"
          >
            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"
            ></div>
            <div>
              <span
                class="text-[10px] font-black border border-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest text-white/50"
                >Ad</span
              >
              <h4 class="text-2xl font-black mt-6 leading-tight">
                나를 위한<br /><span class="text-yellow-400">완벽한</span> 명함
              </h4>
              <p class="text-gray-300 mt-4 text-xs leading-relaxed">
                상위 1% 기업의 제안을<br />지금 바로 확인해보세요.
              </p>
            </div>
            <button
              class="w-full py-4 bg-yellow-400 text-zinc-900 rounded-xl font-black text-sm hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
            >
              시작하기
            </button>
          </div>

          <div
            class="col-span-8 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[240px] flex flex-col"
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-black flex items-center gap-2 text-slate-800">📢 공지사항</h3>
              <button
                class="text-xs text-slate-400 font-bold hover:text-yellow-600 transition-colors"
              >
                전체보기 +
              </button>
            </div>
            <div
              class="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-50"
            >
              <div
                v-for="i in 3"
                :key="i"
                class="p-4 flex items-center justify-between bg-white hover:bg-slate-50 transition cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm"></span>
                  <span class="text-sm font-semibold text-slate-700"
                    >기업 계정 권한(멤버 초대) 기능 업데이트 안내</span
                  >
                </div>
                <span class="text-xs text-slate-400 font-mono font-medium">2026.01.17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 space-y-6">
        <h3 class="text-2xl font-black px-2 text-slate-800">회원님을 위한 추천 공고</h3>
        <div class="grid grid-cols-4 gap-6">
          <div
            v-for="job in [
              { title: 'UI/UX 디자이너 채용', company: '잡코리아 테크랩스' },
              { title: '브랜드 디자이너', company: '포티카드 스튜디오' },
              { title: '프로덕트 디자이너', company: '토스팀' },
              { title: '콘텐츠 디자이너', company: '라인 플러스' },
            ]"
            :key="job.title"
            class="bg-white p-7 rounded-[2rem] border border-slate-200 hover:border-yellow-400 hover:shadow-xl transition-all cursor-pointer shadow-sm group"
          >
            <div class="flex justify-between mb-4">
              <span
                class="text-[10px] font-black text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-100"
                >HOT</span
              >
              <i class="fa-regular fa-bookmark text-slate-300 group-hover:text-yellow-400"></i>
            </div>

            <h4 class="font-bold text-slate-800 line-clamp-1 group-hover:text-yellow-600">
              {{ job.title }}
            </h4>
            <p class="text-xs text-slate-400 mt-1 font-medium">{{ job.company }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NamecardsMini from '@/components/namecards/MiniNamecards.vue' // 컴포넌트 경로 확인
import NamecardsFront from '@/components/namecards/NamecardsFront.vue'
import NamecardsBack from '@/components/namecards/NamecardsBack.vue'

// 45부터 55까지 숫자가 담긴 배열 생성: [45, 46, ... , 55]
const stackUserIds = Array.from({ length: 11 }, (_, i) => 45 + i)

// 1. 통합 데이터 생성 (45 ~ 55번 유저)
// Array.from을 사용해 ID 객체 배열을 한 번에 만듭니다.
const userCards = ref(
  Array.from({ length: 11 }, (_, i) => ({
    id: 45 + i
  }))
)

// 3. 미니 카드 선택 함수
const selectCard = (idx) => {
  selectedIdx.value = idx
  isFlipped.value = false // 카드를 바꾸면 앞면으로 초기화
}

const initialCenter = Math.floor(stackUserIds.values.length / 2)
const selectedIdx = ref(initialCenter)
const scrollOffset = ref(initialCenter)
const isFlipped = ref(false)

const handleScroll = (e) => {
  const delta = e.deltaY > 0 ? 1 : -1
  const nextIdx = Math.max(0, Math.min(scrollOffset.value + delta, userCards.value.length - 1))
  if (scrollOffset.value !== nextIdx) {
    scrollOffset.value = nextIdx
    selectedIdx.value = nextIdx
    isFlipped.value = false
  }
}

const getMiniCardStyle = (idx) => {
  const diff = idx - scrollOffset.value
  const absDiff = Math.abs(diff)
  const isSelected = idx === selectedIdx.value

  const translateY = diff * 110
  const translateX = diff * 45
  const rotateZ = diff * 15
  const translateZ = -absDiff * 60
  const rotateX = diff * -12

  const opacity = isSelected ? 1 : Math.max(0.3, 1 - absDiff * 0.25)

  return {
    transform: `
      translateY(${translateY}px) 
      translateX(${translateX}px) 
      translateZ(${translateZ}px) 
      rotateZ(${rotateZ}deg)
      rotateX(${rotateX}deg) 
      scale(${isSelected ? 1.1 : 0.95})
    `,
    zIndex: 100 - absDiff,
    opacity: opacity,
    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    filter: isSelected ? 'none' : `blur(${absDiff * 0.3}px)`,
    pointerEvents: isSelected ? 'auto' : 'none',
  }
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1200px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
}

.stack-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-card-container {
  position: absolute;
  width: 280px;
  height: 175px;
  transform-origin: center center;
  backface-visibility: hidden;
}

.card-switch-enter-active,
.card-switch-leave-active {
  transition: all 0.4s ease-out;
}
.card-switch-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.card-switch-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* 2. 3D 플립 애니메이션 필수 스타일 */
.perspective-container {
  perspective: 1000px;
}

.card-object {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d; /* 입체감 유지 */
}

.card-object.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0; /* top:0, left:0, w-full, h-full */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem; /* rounded-2xl 대응 */
  overflow: hidden;
  /* 컴포넌트 배경색이 덮어쓰도록 투명 혹은 기본설정 유지 */
}

.card-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
  z-index: 1;
}
</style>
