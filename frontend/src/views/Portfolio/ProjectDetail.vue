<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const accent = ref('amber') 
const font = ref('sans')

const projectInfo = ref({
  name: 'E-commerce Mobile App 리디자인',
  period: '2023.01 – 2023.06',
  tags: ['App Redesign', 'UX Research', 'Figma', 'React'],
  heroImage: 'https://images.unsplash.com/photo-1523206489230-c012c745c25f?auto=format&fit=crop&q=80&w=1200',
  
  fullStory: [
    {
      title: 'Project Overview',
      content: `최근 이커머스 시장의 급격한 성장과 함께 사용자들의 기대 수준이 높아짐에 따라, 기존 플랫폼의 복잡한 결제 프로세스가 높은 이탈률의 주된 원인으로 파악되었습니다. 본 프로젝트는 '사용자의 인지 부하를 최소화하는 결제 경험'을 목표로 시작되었습니다. 단순히 UI를 예쁘게 바꾸는 것을 넘어, 기존 5단계에 달하던 결제 과정을 심리적 허들을 낮춘 원스톱 프로세스로 재설계했습니다.`
    },
    {
      title: 'Key Features',
      content: `가장 핵심적인 기능은 '실시간 재고 연동 시스템'과 '지능형 배송지 입력'입니다. React 기반의 SPA 환경에서 상태 관리 라이브러리를 고도화하여 사용자 경험을 최적화했습니다.`
    },
    {
      title: 'Technical Challenges',
      content: `가상 스크롤(Virtual Scroll) 기법을 도입하여 대규모 데이터 렌더링 병목 현상을 해결했습니다. WebP 적용으로 로딩 속도를 40% 개선하는 성과를 거두었습니다.`
    },
    {
      title: 'Design System',
      content: `Atomic Design 패턴을 기반으로 공통 컴포넌트 라이브러리를 구축했습니다. Figma Variables를 활용해 코드와의 싱크를 1:1로 맞추어 협업 효율을 극대화했습니다.`
    },
    {
      title: 'Results & Learning',
      content: `런칭 후 결제 완료 건수가 15% 상승했으며, 전환율이 22% 개선되었습니다. 비즈니스 로직과 UI 로직 분리의 중요성을 깊이 깨달은 프로젝트였습니다.`
    }
  ]
})

const accentMap = {
  amber: { text: 'text-amber-500', bg: 'bg-amber-400', pillBg: 'bg-amber-50', pillText: 'text-amber-600', border: 'border-amber-100', shadow: 'shadow-amber-100/50' },
  sky: { text: 'text-sky-500', bg: 'bg-sky-400', pillBg: 'bg-sky-50', pillText: 'text-sky-600', border: 'border-sky-100', shadow: 'shadow-sky-100/50' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-400', pillBg: 'bg-emerald-50', pillText: 'text-emerald-600', border: 'border-emerald-100', shadow: 'shadow-emerald-100/50' },
  violet: { text: 'text-violet-500', bg: 'bg-violet-400', pillBg: 'bg-violet-50', pillText: 'text-violet-600', border: 'border-violet-100', shadow: 'shadow-violet-100/50' },
  pink: { text: 'text-pink-500', bg: 'bg-pink-400', pillBg: 'bg-pink-50', pillText: 'text-pink-600', border: 'border-pink-100', shadow: 'shadow-pink-100/50' },
}

const goBack = () => router.push('/portfolio-view') 
</script>

<template>
  <div 
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 pb-20"
    :class="font === 'serif' ? 'font-serif' : 'font-sans'"
  >
    <div class="dot-bg min-h-screen">
      
      <nav class="sticky top-0 z-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 px-6 h-16 flex items-center">
        <div class="max-w-5xl mx-auto w-full flex justify-between items-center">
          <button @click="goBack" class="group flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <span class="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <span>BACK</span>
          </button>
          <div :class="['text-xs font-black tracking-widest uppercase', accentMap[accent].text]">Project Detail</div>
        </div>
      </nav>

      <main class="max-w-5xl mx-auto px-6 mt-12">
        <header class="mb-12">
          <div :class="['inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold mb-6', accentMap[accent].pillBg, accentMap[accent].pillText]">
            <span class="relative flex h-2 w-2">
              <span :class="['animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', accentMap[accent].bg]"></span>
              <span :class="['relative inline-flex rounded-full h-2 w-2', accentMap[accent].bg]"></span>
            </span>
            {{ projectInfo.period }}
          </div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
            {{ projectInfo.name }}
          </h1>
          
          <div class="flex flex-wrap gap-2 mb-10">
            <span v-for="tag in projectInfo.tags" :key="tag"
              class="px-4 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold shadow-sm"
            >
              #{{ tag }}
            </span>
          </div>

          <div class="relative mx-auto max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white dark:border-zinc-800">
            <img :src="projectInfo.heroImage" alt="Hero" class="w-full aspect-[21/9] object-cover" />
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section 
            v-for="(section, idx) in projectInfo.fullStory" 
            :key="idx"
            :class="[
              'p-8 rounded-[2rem] border bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl group',
              idx === 0 ? 'md:col-span-2 border-zinc-200 dark:border-zinc-800' : 'border-zinc-100 dark:border-zinc-800/50'
            ]"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm', accentMap[accent].pillBg, accentMap[accent].pillText]">
                  0{{ idx + 1 }}
                </div>
                <h2 class="text-xl md:text-2xl font-black tracking-tight group-hover:translate-x-1 transition-transform">
                  {{ section.title }}
                </h2>
              </div>
            </div>
            
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {{ section.content }}
            </p>
          </section>
        </div>

        <div class="mt-20 flex flex-col items-center">
          <div class="w-px h-12 bg-zinc-200 dark:bg-zinc-800 mb-8"></div>
          <button 
            @click="goBack"
            :class="['group relative px-12 py-5 rounded-2xl text-white font-black text-sm overflow-hidden transition-all hover:scale-105 active:scale-95', accentMap[accent].bg, accentMap[accent].shadow]"
          >
            <span class="relative z-10 flex items-center gap-2">
              LIST VIEW
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dot-bg {
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1.5px, transparent 1.5px);
  background-size: 30px 30px;
}
.dark .dot-bg {
  background-image: radial-gradient(rgba(255, 255, 255, 0.02) 1.5px, transparent 1.5px);
}

.font-serif { font-family: 'Charter', 'Georgia', serif; }
.font-sans { font-family: 'Pretendard', system-ui, sans-serif; }

/* Entrance Animation */
header, section {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

section:nth-child(1) { animation-delay: 0.1s; }
section:nth-child(2) { animation-delay: 0.2s; }
section:nth-child(3) { animation-delay: 0.3s; }
section:nth-child(4) { animation-delay: 0.4s; }
section:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>