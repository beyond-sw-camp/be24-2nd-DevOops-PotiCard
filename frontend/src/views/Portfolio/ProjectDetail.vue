<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const accent = ref('sky') // Poticard의 프로페셔널한 느낌을 위해 sky 색상으로 변경
const font = ref('sans')

const projectInfo = ref({
  name: 'Poticard: 개발자 전용 명함 & 채용 관리 플랫폼',
  period: '2026.01 – 현재',
  tags: ['Vue.js', 'Tailwind CSS', 'Vite', 'Frontend-focused'],
  heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  
  fullStory: [
    {
      title: 'Project Overview',
      content: `Poticard는 단순한 구인구직 사이트를 넘어, 개발자와 기업이 '명함'이라는 매개체를 통해 보다 직관적으로 연결되는 네트워킹 플랫폼입니다. 기존의 경직된 채용 프로세스를 유연한 명함 교환 방식으로 재구성하여 접근성을 높였습니다.`
    },
    {
      title: 'Key Features',
      content: `주요 기능으로는 개인/기업용 디지털 명함 관리, 직관적인 공고 등록 및 현황 확인 대시보드가 있습니다. 특히 기업 사용자가 등록한 공고에 대한 지원자 현황을 한눈에 파악하고, 실시간 채팅을 통해 소통할 수 있는 기능을 핵심으로 합니다.`
    },
    {
      title: 'Technical Implementation',
      content: `Vue.js 3와 Tailwind CSS를 사용하여 컴포넌트 기반의 개발을 진행했습니다. 특히 유지보수와 스타일 일관성을 위해 Tailwind의 유틸리티 클래스를 직접 활용하고, 재사용 가능한 UI 컴포넌트를 설계하는 데 집중했습니다.`
    },
    {
      title: 'Frontend Challenges',
      content: `백엔드 API와의 연동을 위해 Axios 인터셉터와 Vite 프록시 설정을 구축하여 데이터 통신 효율을 높였습니다. 공고 현황 대시보드에서는 복잡한 상태 관리를 최적화하여 사용자에게 매끄러운 UX를 제공하고자 노력했습니다.`
    },
    {
      title: 'Learning Points',
      content: `Git을 통한 협업 과정에서 충돌 해결 및 브랜치 관리 전략의 중요성을 학습하고 있습니다. 프론트엔드 개발자로서 단순히 화면을 구현하는 것을 넘어, 비즈니스 로직과 데이터 흐름을 어떻게 효율적으로 연결할지에 대한 깊은 고민을 담은 프로젝트입니다.`
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
          
          <h1 class="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-[1.2]">
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
/* 기존 스타일 유지 */
.dot-bg {
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1.5px, transparent 1.5px);
  background-size: 30px 30px;
}
.dark .dot-bg {
  background-image: radial-gradient(rgba(255, 255, 255, 0.02) 1.5px, transparent 1.5px);
}
.font-serif { font-family: 'Charter', 'Georgia', serif; }
.font-sans { font-family: 'Pretendard', system-ui, sans-serif; }

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