<script setup>
import { ref } from 'vue'
// 기존에 만든 컴포넌트 import (경로 확인 필요)
import NamecardsFront from '@/components/namecards/NamecardsFront.vue'
import NamecardsBack from '@/components/namecards/NamecardsBack.vue'

// 카드 뒤집기 상태 관리
const isFlipped = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

// 예시를 위한 userId (실제로는 props로 받거나 라우트에서 가져옴)
const currentUserId = '1'
</script>

<template>
  <div
    class="bg-pattern text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col"
  >
    <!-- header fetch -->
    <div id="header-placeholder"></div>

    <!-- 2. 메인 콘텐츠 -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 pt-28 pb-20">
<section class="flex justify-center items-center min-h-[400px]">
    
    <div class="scene w-full max-w-md aspect-[1.58/1] cursor-pointer group">
      
      <div 
        class="card-object w-full h-full relative shadow-2xl rounded-2xl transition-all duration-500"
        :class="{ 'is-flipped': isFlipped }"
        @click="toggleFlip"
      >
        
        <div class="card-face card-front">
          <NamecardsFront :userId="currentUserId" />
          
          <div class="absolute bottom-4 right-4 z-20 text-xs text-gray-400 animate-pulse pointer-events-none">
             Click to flip <i class="fa-solid fa-rotate ml-1"></i>
          </div>
        </div>

        <div class="card-face card-back">
          <NamecardsBack :userId="currentUserId" />
        </div>

      </div>
    </div>

  </section>

      <!-- Projects Section -->
      <section>
        <div class="flex items-center gap-3 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h3>
          <div class="h-px flex-1 bg-gray-200 dark:bg-zinc-800"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Project Card 1 -->
          <article
            class="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-yellow-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-full h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
              <!-- Placeholder Image -->
              <div
                class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700"
              >
                <i class="fa-regular fa-image text-4xl"></i>
              </div>
              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span
                  class="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-bold border border-white/30"
                  >View Details</span
                >
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <span
                  class="text-[10px] font-bold text-point-yellow bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded uppercase tracking-wide"
                  >App Redesign</span
                >
                <span class="text-xs text-gray-400">2023.01</span>
              </div>
              <h4
                class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-point-yellow transition-colors"
              >
                E-commerce Mobile App
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                기존 쇼핑몰 앱의 복잡한 결제 프로세스를 개선하여 구매 전환율을 15% 상승시킨 리디자인
                프로젝트입니다.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs text-gray-400">#UX_Research</span>
                <span class="text-xs text-gray-400">#Figma</span>
              </div>
            </div>
          </article>

          <!-- Project Card 2 -->
          <article
            class="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-yellow-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-full h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
              <div
                class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700"
              >
                <i class="fa-solid fa-chart-pie text-4xl"></i>
              </div>
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span
                  class="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-bold border border-white/30"
                  >View Details</span
                >
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <span
                  class="text-[10px] font-bold text-point-yellow bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded uppercase tracking-wide"
                  >Web Dashboard</span
                >
                <span class="text-xs text-gray-400">2023.05</span>
              </div>
              <h4
                class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-point-yellow transition-colors"
              >
                Finance Admin Dashboard
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                복잡한 금융 데이터를 직관적인 차트와 그래프로 시각화하여 관리자 업무 효율을 높인
                대시보드입니다.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs text-gray-400">#Data_Viz</span>
                <span class="text-xs text-gray-400">#React</span>
              </div>
            </div>
          </article>

          <!-- Project Card 3 -->
          <article
            class="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-yellow-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-full h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
              <div
                class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700"
              >
                <i class="fa-solid fa-swatchbook text-4xl"></i>
              </div>
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span
                  class="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-bold border border-white/30"
                  >View Details</span
                >
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <span
                  class="text-[10px] font-bold text-point-yellow bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded uppercase tracking-wide"
                  >Design System</span
                >
                <span class="text-xs text-gray-400">2023.08</span>
              </div>
              <h4
                class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-point-yellow transition-colors"
              >
                Enterprise Design System
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                전사 프로덕트의 일관성을 위한 디자인 시스템 구축 프로젝트. 컴포넌트 라이브러리와
                가이드라인을 제작했습니다.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs text-gray-400">#System_Design</span>
                <span class="text-xs text-gray-400">#Documentation</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 3D Flip Animation Styles */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari Support */
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
}

/* Card transition */
#card-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}

/* Background Pattern */
.bg-pattern {
  background-color: #f8fafc;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 24px 24px;
}
.dark .bg-pattern {
  background-color: #09090b;
  background-image: radial-gradient(#27272a 1px, transparent 1px);
}

/* ★★★ 3D 플립 핵심 CSS (Tailwind 대신 사용) ★★★ 
  이 스타일이 있어야 앞/뒷면 간섭 없이 완벽하게 동작합니다.
*/

/* 1. 무대 (원근감) */
.scene {
  perspective: 1000px;
}

/* 2. 회전하는 물체 */
.card-object {
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 부드러운 회전 효과 */
  transform-style: preserve-3d; /* 3D 공간 유지 필수 */
}

/* 3. 뒤집혔을 때 상태 */
.card-object.is-flipped {
  transform: rotateY(180deg);
}

/* 4. 앞면과 뒷면 공통 설정 */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* 뒷면 숨기기: 브라우저 호환성을 위해 webkit 접두사 포함 */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden; /* 둥근 모서리 밖으로 내용 삐져나감 방지 */
}

/* 5. 뒷면은 처음부터 180도 돌려놓기 */
.card-back {
  transform: rotateY(180deg);
}

/* 6. 앞면 (특별한 설정 없음, 기본 0도) */
.card-front {
  transform: rotateY(0deg);
  /* z-index 싸움을 방지하기 위해 명시적으로 0도 지정 */
}
</style>
