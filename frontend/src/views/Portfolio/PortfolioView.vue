<script setup>
import { ref, onMounted } from 'vue'
import NamecardsFront from '@/components/namecards/NamecardsFront.vue'
import NamecardsBack from '@/components/namecards/NamecardsBack.vue'
import { getProjects } from '@/api/portfolio/index.js'

const isFlipped = ref(false)
const projects = ref([])
const currentUserId = '1'

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

/* 컴포넌트 로드 시 데이터 호출 */
onMounted(async () => {
  const data = await getProjects()
  if (data && data.projects) {
    projects.value = data.projects
  } else if (Array.isArray(data)) {
    projects.value = data
  }
})
</script>

<template>
  <div class="bg-pattern text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col">
    <!-- header fetch -->
    <div id="header-placeholder"></div>

    <!-- 메인 콘텐츠 -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 pt-28 pb-20">
      <section class="flex justify-center items-center min-h-[400px]">

        <div class="scene w-full max-w-md aspect-[1.58/1] cursor-pointer group">

          <div class="card-object w-full h-full relative shadow-2xl rounded-2xl transition-all duration-500"
            :class="{ 'is-flipped': isFlipped }" @click="toggleFlip">

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
          <article v-for="project in projects" :key="project.id"
            class="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-yellow-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div class="w-full h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700">
                <i :class="project.iconClass || 'fa-regular fa-image'" class="text-4xl"></i>
              </div>

              <div class="absolute inset-0 w-full h-full">
                <img v-if="project.iconClass && project.iconClass.startsWith('http')" :src="project.iconClass"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Project Image" />
                <div v-else class="flex items-center justify-center h-full text-gray-300 dark:text-zinc-700">
                  <i :class="project.iconClass || 'fa-regular fa-image'" class="text-4xl"></i>
                </div>
              </div>

              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <router-link to="/project-detail"
                  class="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-bold border border-white/30 hover:bg-white/40 transition-all">
                  View Details
                </router-link>
              </div>
            </div>

            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <span
                  class="text-[10px] font-bold text-point-yellow bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded uppercase tracking-wide">
                  {{ project.category }}
                </span>
                <span class="text-xs text-gray-400">{{ project.date }}</span>
              </div>
              <h4
                class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-point-yellow transition-colors">
                {{ project.title }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" class="text-xs text-gray-400">
                  #{{ tag }}
                </span>
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
  -webkit-backface-visibility: hidden;
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
}

.dark .bg-pattern {
  background-color: #09090b;
}

/* 3D 플립 CSS (Tailwind 대신 사용)*/

/* 원근감 */
.scene {
  perspective: 1000px;
}

/* 회전하는 물체 */
.card-object {
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}

/* 뒤집혔을 때 상태 */
.card-object.is-flipped {
  transform: rotateY(180deg);
}

/* 앞면과 뒷면 공통 설정 */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
}

/* 뒷면은 처음부터 180도 돌려놓기 */
.card-back {
  transform: rotateY(180deg);
}

/* 앞면 */
.card-front {
  transform: rotateY(0deg);
}
</style>
