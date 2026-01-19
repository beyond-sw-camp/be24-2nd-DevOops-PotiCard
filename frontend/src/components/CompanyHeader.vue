<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import '@/assets/css/Header.css'
import brandLogo from '@/image/poticard-logo.png'

const router = useRouter()

// 기업 로그인 정보(프로젝트에 맞게 localStorage에서 가져옴)
const companyInfo = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('USERINFO') || 'null')
  } catch {
    return null
  }
})

const companyName = computed(() => companyInfo.value?.userName ?? companyInfo.value?.name ?? 'Demo')
const companyEmail = computed(() => companyInfo.value?.email ?? companyInfo.value?.userEmail ?? 'company@poticard.com')

// 상태
const userMenuOpen = ref(false)
const showLogoutConfirm = ref(false)
const showNotiPopup = ref(false)

// 토글
const toggleUserMenu = (e) => {
  e?.stopPropagation?.()
  userMenuOpen.value = !userMenuOpen.value
  if (!userMenuOpen.value) showLogoutConfirm.value = false
}
const closeUserMenu = () => {
  userMenuOpen.value = false
  showLogoutConfirm.value = false
}

// 바깥 클릭 닫기 (유저패널 + 알림팝업)
const onDocClick = (e) => {
  if (userMenuOpen.value) {
    const userRoot = document.getElementById('companyUserWrap')
    if (!userRoot || !userRoot.contains(e.target)) closeUserMenu()
  }

  if (showNotiPopup.value) {
    const notiRoot = document.getElementById('companyNotiWrap')
    if (!notiRoot || !notiRoot.contains(e.target)) showNotiPopup.value = false
  }
}

// ESC 닫기
const onKeyDown = (e) => {
  if (e.key !== 'Escape') return
  closeUserMenu()
  showNotiPopup.value = false
}

// 패널 내부 버튼
const goJobCreate = () => {
  closeUserMenu()
  router.push('/company/jobcreate')
}
const goApplicants = () => {
  closeUserMenu()
  router.push('/company/applicants') // = 대기자보기/지원자보기 (너희 라우트에 맞게)
}

// 로그아웃
const openLogoutConfirm = (e) => {
  e?.stopPropagation?.()
  showLogoutConfirm.value = true
}
const cancelLogout = () => (showLogoutConfirm.value = false)
const confirmLogout = () => {
  localStorage.removeItem('USERINFO')
  document.cookie = 'ATOKEN=; Max-Age=0; path=/'
  closeUserMenu()
  router.push('/login')
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeyDown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <header
    class="sticky top-0 z-[1000] w-full border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
      <!-- LEFT -->
      <div class="flex items-center gap-8">
        <!-- ✅ 로고 클릭 = 메인(/) -->
        <RouterLink to="/" class="group flex items-center gap-3">
          <span class="pc-brand-box">
            <img :src="brandLogo" alt="PotiCard" class="pc-brand-logo" />
          </span>
          <span class="text-2xl font-black tracking-tighter text-point-yellow">Poticard</span>
          <span class="text-[11px] font-extrabold px-2 py-1 rounded-full border border-amber-200 dark:border-amber-500/30
                   bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300">
            기업
          </span>
        </RouterLink>

        <nav class="hidden lg:flex items-center gap-1">
          <RouterLink to="/company"
            class="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-point-yellow transition-colors">
            기업 홈
          </RouterLink>
          <RouterLink to="/company/joblist"
            class="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-point-yellow transition-colors">
            공고
          </RouterLink>
          <RouterLink to="/namecard-search"
            class="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-point-yellow transition-colors">
            인재검색
          </RouterLink>
          <RouterLink to="/company/applicants"
            class="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-point-yellow transition-colors">
            지원자
          </RouterLink>
        </nav>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-3">
        <!-- 공고 등록 버튼(헤더 밖 버튼 유지하고 싶으면 여기 살림) -->
        <RouterLink to="/company/jobcreate"
          class="hidden sm:inline-flex items-center justify-center h-11 px-6 rounded-2xl font-extrabold bg-amber-400 text-zinc-900 hover:bg-amber-300 transition">
          공고 등록
        </RouterLink>

        <div class="h-6 w-[1px] bg-gray-200 dark:border-zinc-800 mx-1"></div>

        <!-- ✅ 기업계정(닉네임) + 오른쪽에 채팅/알림 (원래헤더 느낌) -->
        <div class="flex items-center gap-2">
          <!-- 기업계정 / 닉네임 -->
          <div class="relative" id="companyUserWrap">
            <button type="button" @click="toggleUserMenu" class="inline-flex items-center gap-2 h-11 px-3 rounded-2xl border border-gray-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
              <span class="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 block"></span>

              <span class="flex flex-col items-start leading-[1.05] min-w-0">
                <span class="text-[10px] font-bold text-gray-400">기업계정</span>
                <span class="text-sm font-black text-gray-900 dark:text-white truncate max-w-[92px]">
                  {{ companyName }}
                </span>
              </span>
            </button>

            <!-- ✅ 여기: 패널 무조건 보이게 v-if + absolute -->
            <Transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <div v-if="userMenuOpen" class="absolute right-0 top-full mt-3 w-[420px] max-w-[85vw]
                       bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
                       rounded-[28px] shadow-2xl p-5 z-[120]">
                <!-- 우상단 로그아웃 -->
                <div class="flex justify-end mb-3">
                  <button type="button" class="pc-logout-chip" @click="openLogoutConfirm">로그아웃</button>
                </div>

                <!-- 미니 카드(원래 헤더 느낌) -->
                <div class="pc-mini-card">
                  <div class="pc-mini-head">
                    <div class="pc-mini-avatar">
                      <img :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${companyName}`" alt="avatar" />
                    </div>

                    <div class="pc-mini-main">
                      <p class="pc-mini-name">{{ companyName }}</p>
                      <p class="pc-mini-role">Company Account</p>
                      <p class="pc-mini-company">PotiCard</p>
                    </div>

                    <div class="pc-mini-icon">🏢</div>
                  </div>

                  <div class="pc-mini-divider"></div>

                  <div class="pc-mini-row">
                    <span class="pc-mini-label">Email</span>
                    <span class="pc-mini-value">{{ companyEmail }}</span>
                  </div>

                  <!-- ✅ 패널 버튼: 공고등록 / 대기자보기 -->
                  <div class="pc-mini-actions">
                    <button type="button" class="pc-mini-btn" @click="goJobCreate">공고등록</button>
                    <button type="button" class="pc-mini-btn ghost" @click="goApplicants">대기자보기</button>
                  </div>
                </div>

                <!-- 로그아웃 confirm -->
                <div v-if="showLogoutConfirm" class="pc-confirm-backdrop" @click.self="cancelLogout">
                  <div class="pc-confirm">
                    <p class="pc-confirm-title">로그아웃하시겠습니까?</p>
                    <div class="pc-confirm-actions">
                      <button type="button" class="pc-confirm-btn ghost" @click="cancelLogout">아니요</button>
                      <button type="button" class="pc-confirm-btn" @click="confirmLogout">확인</button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- 채팅 -->
          <RouterLink to="/chat"
            class="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500 dark:text-gray-400"
            title="채팅">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </RouterLink>

          <!-- 알림 -->
          <div class="relative" id="companyNotiWrap">
            <button @click.stop="showNotiPopup = !showNotiPopup"
              class="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors relative" title="알림">
              <span
                class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <Transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <div v-if="showNotiPopup" class="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-zinc-900
                       border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-[120]">
                <div class="px-5 py-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                  <span class="font-bold">알림</span>
                  <button class="text-xs text-point-yellow font-bold">모두 읽음</button>
                </div>
                <div class="max-h-80 overflow-y-auto">
                  <div
                    class="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition border-b border-gray-50 dark:border-zinc-800/50">
                    <p class="text-sm font-bold">💬 새 메시지</p>
                    <p class="text-xs text-gray-500 mt-1">김채용님이 메시지를 보냈습니다.</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
