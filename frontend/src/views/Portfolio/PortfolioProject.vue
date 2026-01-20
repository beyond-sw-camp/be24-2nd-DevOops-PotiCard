<script setup>
import { onMounted } from 'vue';
import SectionEditor from '@/components/SectionEditor.vue';
import api from '@/api/projects/index'
import { ref } from 'vue';

const getProjectDetail = async () => {
    const project = ref([])
    const res = await api.getProjectDetail()
    console.log(res);
    project.value = res.data.map((item) => {
        return {
            title: item.projectName,
            period: item.projectPeriod,
            contribution: item.projectContribution,
        }
    })

    return project
}
onMounted(async () => {
})
</script>

<template>
    <div class="bg-pattern text-gray-800 dark:text-gray-100 transition-colors duration-300 flex flex-col min-h-screen">

        <main class="flex-1 pt-24 pb-20 px-4">
            <div class="max-w-4xl mx-auto">

                <!-- 단계 표시기 (Progress Bar) - 1단계 활성화 -->
                <div class="mb-10 max-w-3xl mx-auto">
                    <div class="flex justify-between text-sm font-bold text-gray-400 mb-2 px-1">
                        <span class="text-yellow-300">01. 프로젝트 작성</span>
                        <span>02. 프로젝트 확인/수정</span>
                        <span>03. 스타일</span>
                    </div>
                    <div class="w-full h-2 bg-gray-300 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            class="w-1/3 h-full bg-yellow-300 rounded-full shadow-[0_0_10px_#FACC15] transition-all duration-500">
                        </div>
                    </div>
                </div>

                <!-- 메인 카드 -->
                <div
                    class="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8 md:p-10 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-point-yellow to-orange-300">
                    </div>

                    <div class="mb-10 text-center">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">프로젝트 & 경험</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">가장 돋보이고 싶은 프로젝트를 골라 자유롭게 구성해보세요.</p>
                    </div>

                    <form class="space-y-12">

                        <div class="space-y-6">
                            <div class="flex justify-between items-center">
                                <label
                                    class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                                    <i class="fa-solid fa-pen-to-square"></i> 프로젝트 속성
                                </label>
                            </div>
                        </div>
                        <!-- 섹션 1: 프로젝트 공통 속성 -->
                        <div
                            class="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 space-y-5">
                            <!-- 프로젝트 제목 -->
                            <div class="space-y-1">
                                <label class="text-xs font-bold text-gray-500 dark:text-gray-400">프로젝트 제목</label>
                                <textarea type="text" placeholder="예: E-commerce 모바일 앱 리디자인"
                                    class="h-13 w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-point-yellow focus:ring-1 focus:ring-point-yellow outline-none transition-all text-gray-900 dark:text-white resize-none"></textarea>
                            </div>

                            <!-- 기간 및 역할 -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1">
                                    <label class="text-xs font-bold text-gray-500 dark:text-gray-400">진행 기간</label>
                                    <input type="text" placeholder="2023.01 - 2023.06"
                                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-point-yellow outline-none text-gray-900 dark:text-white">
                                </div>
                                <div class="space-y-1">
                                    <label class="text-xs font-bold text-gray-500 dark:text-gray-400">참여도 / 역할</label>
                                    <input type="text" placeholder="기여도 100% (Solo)"
                                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-point-yellow outline-none text-gray-900 dark:text-white">
                                </div>
                            </div>
                        </div>

                        <!-- 섹션 2 : 프로젝트 세부 내용 -->
                        <div class="flex justify-between items-center">
                            <label
                                class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                                <i class="fa-solid fa-pen-to-square"></i> 프로젝트 상세
                            </label>
                        </div>

                        <div
                            class="prj_detail bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 space-y-5">
                            <sidebar>
                                <label class="section text-xs font-bold text-gray-500 dark:text-gray-400">섹션</label>
                                <a hrf="#"
                                    class="prj_select bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 p-6 border border-gray-100 dark:border-zinc-800 space-y-5">
                                    1
                                </a>
                                <a hrf="#"
                                    class="prj_select bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 p-6 border border-gray-100 dark:border-zinc-800 space-y-5">
                                    2
                                </a>
                                <a hrf="#"
                                    class="prj_select bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 p-6 border border-gray-100 dark:border-zinc-800 space-y-5">
                                    +
                                </a>
                            </sidebar>
                            <main class="prj_content">

                                <!-- 소제목 -->
                                <div class="space-y-1">
                                    <label class="text-xs font-bold text-gray-500 dark:text-gray-400">섹션 소제목</label>
                                    <textarea placeholder="본 섹션의 간단한 별명을 지어주세요"
                                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-point-yellow focus:ring-1 focus:ring-point-yellow outline-none transition-all text-gray-900 dark:text-white h-13 resize-none"></textarea>
                                </div>
                                <!-- 상세 설명 -->

                                <div class="space-y-1">
                                    <label class="text-xs font-bold text-gray-500 dark:text-gray-400">상세</label>
                                    <SectionEditor
                                        class="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-point-yellow focus:ring-1 focus:ring-point-yellow outline-none transition-all text-gray-900 dark:text-white">
                                    </SectionEditor>
                                </div>
                            </main>
                        </div>

                        <!-- 하단 액션 버튼 -->
                        <div class="pt-6 flex justify-end items-center">
                            <a href="portfolio-update-n-check"
                                class="px-8 py-3 bg-yellow-50 dark:bg-zinc-800/50 border border-yellow-200 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded-2xl font-black tracking-tight hover:bg-yellow-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center">
                                다음 단계 <i class="fa-solid fa-arrow-right ml-2 text-lg"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
:deep(body) {
    font-family: 'Noto Sans KR', sans-serif;
}

.font-poppins {
    font-family: 'Poppins', sans-serif;
}

.bg-pattern {
    background-color: #f8fafc;
}

.dark .bg-pattern {
    background-color: #18181b;
}

.prj_detail {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.prj_content {
    flex: 1;
}

sidebar {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    width: 50px;
    align-items: center;
    gap: 10px;
}

.section {
    display: flex;
    width: 45px;
    height: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 29px;
}

.prj_select {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
</style>