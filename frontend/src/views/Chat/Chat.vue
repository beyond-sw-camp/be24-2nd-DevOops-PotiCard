<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import chatApi from '@/api/chat/index.js'

/* --------- 1. 상태 관리 (Reactive State) --------- */
const rooms = reactive([]);
const getChatRoomList = async () => {
  try {
    const res = await chatApi.chatRoomList()
    console.log('채팅방 목록:', res)
    if (res && res.data) {
      rooms.splice(0, rooms.length, ...res.data)
    } else if (Array.isArray(res)) {
      rooms.splice(0, rooms.length, ...res)
    }
  } catch (error) {
    console.error('채팅방 목록 로드 실패:', error)
  }
}

  
const messagesByRoom = ref({})
const activeRoomId = ref(null)
const searchQuery = ref('')
const messageInput = ref('')
const messageArea = ref(null)
const textareaRef = ref(null)

/* 명함 및 메뉴 관련 상태 */
const isCardOpen = ref(false)
const isFlipped = ref(false)
const isMenuOpen = ref(false) // 드롭다운 메뉴 상태

/* --------- 2. 유틸리티 & 설정 --------- */
const myUserId =
  localStorage.getItem('chatUserId') ||
  (crypto.randomUUID ? crypto.randomUUID() : 'idx-' + Date.now())
localStorage.setItem('chatUserId', myUserId)

const myUserName =
  sessionStorage.getItem('chatUserName') || 'Guest-' + Math.floor(1000 + Math.random() * 9000)
sessionStorage.setItem('chatUserName', myUserName)

let ws = null

/* --------- 3. 계산된 속성 (Computed) --------- */
const filteredRooms = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  // if (!q) return rooms.value
  // return rooms.value.filter((r) =>
  //   (r.name + ' ' + r.company + ' ' + r.role + ' ' + r.tags.join(' ')).toLowerCase().includes(q),
  if (!q) return rooms
  return rooms.filter((r) =>
  (r.name + ' ' + r.company + ' ' + r.role + ' ' + (r.tags?.join(' ') || '')).toLowerCase().includes(q),
  )
})

const activeRoom = computed(() => rooms.find((r) => r.id === activeRoomId.value))
const currentMessages = computed(() => messagesByRoom.value[activeRoomId.value] || [])

/* --------- 4. 로직 (Methods) --------- */
const scrollBottom = async () => {
  await nextTick()
  if (messageArea.value) {
    messageArea.value.scrollTop = messageArea.value.scrollHeight
  }
}

const wsConnect = () => {
  const scheme = location.protocol === 'https:' ? 'wss' : 'ws'
  const WS_URL = `${scheme}://${location.host}/chat-ws`
  ws = new WebSocket(WS_URL)

  ws.onopen = () => {
    if (activeRoomId.value) wsJoin(activeRoomId.value)
  }

  ws.onmessage = (e) => {
    let msg
    try {
      msg = JSON.parse(e.data)
    } catch {
      return
    }

    if (msg.type === 'chat') {
      const roomId = Number(msg.roomId)
      const isMe = String(msg.userId) === String(myUserId)

      if (!messagesByRoom.value[roomId]) messagesByRoom.value[roomId] = []
      messagesByRoom.value[roomId].push({
        who: isMe ? 'me' : 'them',
        text: msg.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })

      const r = rooms.find((x) => x.id === roomId)
      if (r) r.last = msg.text.length > 30 ? msg.text.slice(0, 30) + '...' : msg.text
      if (roomId === activeRoomId.value) scrollBottom()
    }
  }

  ws.onclose = () => setTimeout(wsConnect, 1000)
}

const wsJoin = (roomId) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return
  ws.send(JSON.stringify({ type: 'join', roomId, userId: myUserId, userName: myUserName }))
}

// ActiveRoom 설정
const setActiveRoom = async (roomId) => {
  activeRoomId.value = roomId
  const room = rooms.find((r) => r.id === roomId)
  if (room) room.unread = 0
  isMenuOpen.value = false
  wsJoin(roomId)
  // 채팅방 메시지 불러오기
  await loadChatMessages(roomId)
  scrollBottom()
}

// 날짜 포맷팅 함수
const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "방금";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays === 1) return "어제";
    if (diffDays < 7) return `${diffDays}일 전`;

    // 오늘 날짜와 비교하여 오전/오후 표시
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}:${String(minutes).padStart(2, '0')}`;
  }

// 채팅방 메시지 불러오기
const loadChatMessages = async (roomId) => {
  try {
    const res = await chatApi.getChatMessages(roomId)
    if (res && res.data && res.data.messages) {
      // 메시지 데이터를 messagesByRoom 형식으로 변환
      const formattedMessages = res.data.messages.map(msg => {
        // senderId가 1이면 오른쪽(me)으로 표시
        const isMe = msg.senderId === 1 || String(msg.senderId) === String(myUserId)
        return {
          who: isMe ? "me" : "them",
          text: msg.content,
          time: formatMessageTime(msg.createdAt),
          messageId: msg.messageId,
          isRead: msg.isRead
        }
      })

      // messagesByRoom에 저장
      messagesByRoom.value[roomId] = formattedMessages
      
      console.log(`방 ${roomId}의 메시지 로드 완료:`, formattedMessages)
    } else if (res && Array.isArray(res)) {
      // 응답이 배열인 경우
      const formattedMessages = res.map(msg => {
        // senderId가 1이면 오른쪽(me)으로 표시 나중엔 빼주면됨
        const isMe = msg.senderId === 1 || String(msg.senderId) === String(myUserId)
        return {
          who: isMe ? "me" : "them",
          text: msg.content,
          time: formatMessageTime(msg.createdAt),
          messageId: msg.messageId,
          isRead: msg.isRead
        }
      })
      messagesByRoom.value[roomId] = formattedMessages
      console.log(`방 ${roomId}의 메시지 로드 완료 (배열 형식):`, formattedMessages)
    } else {
      // 메시지가 없는 경우 빈 배열로 초기화
      messagesByRoom.value[roomId] = []
      console.log(`방 ${roomId}의 메시지가 없습니다.`)
    }
  } catch (error) {
    console.error(`방 ${roomId}의 메시지 로드 실패:`, error)
    // 에러 발생 시 빈 배열로 초기화
    messagesByRoom.value[roomId] = []
  }
}

const toggleCard = () => {
  isFlipped.value = false
  isCardOpen.value = !isCardOpen.value
  isMenuOpen.value = false // 명함 열 때 메뉴 닫기
}

/* 부가 기능 로직 */
const reportUser = () => {
  if (!activeRoom.value) return
  alert(`${activeRoom.value.name}님을 신고하시겠습니까? 운영팀에서 신속히 검토하겠습니다.`)
  isMenuOpen.value = false
}

const leaveChat = () => {
  if (!activeRoom.value) return
  if (
    confirm(
      `'${activeRoom.value.name}'님과의 채팅방을 나가시겠습니까?\n나가면 대화 내용이 모두 삭제됩니다.`,
    )
  ) {
    const index = rooms.findIndex((r) => r.id === activeRoomId.value)
    if (index > -1) rooms.splice(index, 1)
    activeRoomId.value = null
    isMenuOpen.value = false
  }
}

const sendMessage = () => {
  const text = messageInput.value.trim()
  if (!activeRoomId.value) return alert('채팅방을 먼저 선택해주세요!')
  if (!text) return

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: 'chat',
        roomId: activeRoomId.value,
        userId: myUserId,
        userName: myUserName,
        text,
      }),
    )
  } else {
    if (!messagesByRoom.value[activeRoomId.value]) messagesByRoom.value[activeRoomId.value] = []
    messagesByRoom.value[activeRoomId.value].push({ who: 'me', text, time: '방금' })
    scrollBottom()
  }

  messageInput.value = ''
  nextTick(() => autosize())
}

const autosize = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 150) + 'px'
}

const quickReply = (text) => {
  messageInput.value = text
  nextTick(() => {
    autosize()
    textareaRef.value?.focus()
  })
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const startVideoCall = () => {
  if (!activeRoomId.value) return alert('대상을 선택해주세요.')
  window.location.href = `/video-chat?id=${activeRoom.value.id}&name=${encodeURIComponent(activeRoom.value.name)}`
}

onMounted(() => {
  getChatRoomList();
  wsConnect()
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark')
})
</script>

<template>
  <div
    class="chat-app max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-40px)] flex flex-col relative overflow-hidden font-sans"
  >
    <transition name="fade">
      <div
        v-if="isCardOpen"
        @click.self="toggleCard"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <transition name="card-pop" appear>
          <div
            class="relative w-full max-w-md aspect-[1.58/1] perspective-1000"
            @click="isFlipped = !isFlipped"
          >
            <div
              :class="[
                'relative w-full h-full transform-style-3d shadow-2xl rounded-2xl duration-700 cursor-pointer',
                isFlipped ? 'flipped' : '',
              ]"
            >
              <div
                class="absolute inset-0 w-full h-full bg-white rounded-2xl border border-slate-100 p-8 backface-hidden overflow-hidden"
              >
                <div class="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-bl-full"></div>
                <div class="flex flex-col justify-between h-full relative z-10 text-left">
                  <div class="flex justify-between items-start">
                    <div class="pr-4">
                      <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
                        {{ activeRoom.role }}
                      </p>
                      <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {{ activeRoom.name }}
                      </h2>
                      <p class="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
                        {{ activeRoom.intro }}
                      </p>
                    </div>
                    <div
                      class="w-20 h-20 rounded-full border-4 border-slate-50 shadow-md overflow-hidden bg-slate-100 flex-shrink-0"
                    >
                      <img :src="activeRoom.avatar" class="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div class="space-y-4">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in activeRoom.tags"
                        :key="tag"
                        class="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold rounded-md"
                        >#{{ tag }}</span
                      >
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <div class="flex gap-3 text-slate-400">
                        <i
                          class="fa-brands fa-github text-xl hover:text-slate-900 transition-colors"
                        ></i>
                        <i
                          class="fa-solid fa-envelope text-xl hover:text-slate-900 transition-colors"
                        ></i>
                      </div>
                      <i class="fa-solid fa-qrcode text-3xl text-slate-800 opacity-80"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 w-full h-full bg-slate-900 rounded-2xl p-8 backface-hidden rotate-y-180 text-white flex flex-col justify-center shadow-2xl"
              >
                <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                  <span class="w-1.5 h-6 bg-amber-400 rounded-full"></span> Contact Info
                </h3>
                <div class="space-y-4 text-base opacity-90">
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-phone w-5 text-amber-400"></i> 010-****-{{
                      activeRoom.id
                    }}000
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-link w-5 text-amber-400"></i>
                    {{ activeRoom.company.toLowerCase().replace(' ', '') }}.com
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-location-dot w-5 text-amber-400"></i> Seoul, South Korea
                  </div>
                </div>
                <p
                  class="mt-8 text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold"
                >
                  Click to see front side
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <header class="flex items-center justify-between mb-6 shrink-0">
      <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">채팅</h1>
      <div class="flex gap-2">
        <button
          @click="alert('준비 중입니다.')"
          class="btn-icon bg-amber-400 hover:scale-105 transition-transform"
          title="새 채팅"
        >
          <i class="fa-solid fa-plus text-amber-950"></i>
        </button>
      </div>
    </header>

    <div class="flex-1 grid grid-cols-12 gap-6 min-h-0">
      <aside class="col-span-12 lg:col-span-4 flex flex-col gap-4 min-h-0">
        <div
          class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-0"
        >
          <div class="p-5 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between mb-4">
              <span class="font-bold text-slate-400 uppercase text-[10px] tracking-widest"
                >Chat List</span
              >
              <span
                class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold"
                >{{ filteredRooms.length }}</span
              >
            </div>
            <div class="relative">
              <i
                class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
              ></i>
              <input
                v-model="searchQuery"
                class="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-amber-400 transition-all outline-none dark:text-white"
                placeholder="이름, 회사 또는 키워드"
              />
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-3 space-y-2 thin-scroll">
            <button
              v-for="room in filteredRooms"
              :key="room.id"
              @click="setActiveRoom(room.id)"
              :class="[
                'room-card w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border',
                activeRoomId === room.id
                  ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50 shadow-md'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent',
              ]"
            >
              <div class="relative shrink-0">
                <div class="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img :src="room.avatar" class="w-full h-full object-cover" />
                </div>
                <div
                  v-if="room.unread > 0"
                  class="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900"
                >
                  {{ room.unread }}
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex justify-between items-center mb-0.5">
                  <h3 class="font-bold truncate text-slate-900 dark:text-slate-100">
                    {{ room.name }}
                  </h3>
                  <span class="text-[10px] text-slate-400 font-medium">12:34</span>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-2">
                  {{ room.company }} · {{ room.role }}
                </p>
                <p class="text-sm text-slate-600 dark:text-slate-300 truncate font-medium">
                  {{ room.content }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <section
        class="col-span-12 lg:col-span-8 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <template v-if="activeRoomId">
          <div
            class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                <img :src="activeRoom.avatar" class="w-full h-full object-cover" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="font-black text-slate-900 dark:text-white">{{ activeRoom.name }}</h2>
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">
                  {{ activeRoom.company }} · {{ activeRoom.role }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="startVideoCall" class="btn-action" title="화상 채팅">
                <i class="fa-solid fa-video"></i>
              </button>
              <button
                @click="toggleCard"
                class="btn-action bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                title="명함 정보"
              >
                <i class="fa-solid fa-address-card"></i>
              </button>

              <div class="relative">
                <button
                  @click="isMenuOpen = !isMenuOpen"
                  class="btn-action"
                  :class="{ 'bg-slate-100 dark:bg-slate-800': isMenuOpen }"
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

                <transition name="fade-in">
                  <div
                    v-if="isMenuOpen"
                    class="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden py-1"
                  >
                    <button
                      @click="reportUser"
                      class="w-full px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3"
                    >
                      <i class="fa-solid fa-triangle-exclamation text-amber-500"></i> 신고하기
                    </button>
                    <div class="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                    <button
                      @click="leaveChat"
                      class="w-full px-4 py-3 text-left text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-3"
                    >
                      <i class="fa-solid fa-door-open"></i> 채팅방 나가기
                    </button>
                  </div>
                </transition>

                <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 z-40"></div>
              </div>
            </div>
          </div>

          <div
            ref="messageArea"
            class="flex-1 overflow-y-auto p-6 space-y-6 thin-scroll bg-slate-50/50 dark:bg-slate-950/20"
          >
            <div
              v-for="(m, idx) in currentMessages"
              :key="idx"
              :class="['flex w-full', m.who === 'me' ? 'justify-end' : 'justify-start']"
            >
              <div
                :class="['max-w-[75%] flex flex-col', m.who === 'me' ? 'items-end' : 'items-start']"
              >
                <div :class="['bubble', m.who === 'me' ? 'bubble-me' : 'bubble-them']">
                  {{ m.text }}
                </div>
                <span class="text-[10px] mt-1.5 text-slate-400 font-bold px-1 uppercase">{{
                  m.time
                }}</span>
              </div>
            </div>
          </div>

          <div
            class="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0"
          >
            <div class="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
              <button @click="quickReply('안녕하세요! 반갑습니다 👋')" class="btn-tag">
                👋 인사
              </button>
              <button
                @click="quickReply('포트폴리오 내용에 대해 궁금한 점이 있어요.')"
                class="btn-tag"
              >
                ❓ 질문
              </button>
              <button @click="quickReply('편하신 시간에 대화 가능할까요?')" class="btn-tag">
                📅 제안
              </button>
              <button @click="quickReply('감사합니다!')" class="btn-tag">🙏 감사</button>
            </div>

            <div
              class="flex items-end gap-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-700/50 focus-within:border-amber-400 transition-all"
            >
              <button
                class="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <i class="fa-solid fa-paperclip"></i>
              </button>
              <textarea
                ref="textareaRef"
                v-model="messageInput"
                @input="autosize"
                @keydown="handleKeydown"
                rows="1"
                class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 resize-none max-h-32 dark:text-slate-200 outline-none"
                placeholder="메시지를 입력하세요..."
              ></textarea>
              <button
                @click="sendMessage"
                class="w-10 h-10 flex-shrink-0 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center text-amber-950 transition-all active:scale-95 shadow-sm"
              >
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </template>

        <div
          v-else
          class="flex-1 flex flex-col items-center justify-center text-slate-400 p-10 text-center"
        >
          <div
            class="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6"
          >
            <i class="fa-solid fa-comments text-4xl opacity-20"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            대화를 시작해보세요
          </h3>
          <p class="text-sm max-w-xs leading-relaxed">
            상대방을 선택하여 새로운 프로젝트나 커리어나눔을 시작할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 3D Transform Utilities */
.perspective-1000 {
  perspective: 1000px;
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

/* Custom Scrollbar */
.thin-scroll::-webkit-scrollbar {
  width: 5px;
}
.thin-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.dark .thin-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Custom Component Styles */
.btn-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-action {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-action:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.dark .btn-action:hover {
  background: #1e293b;
  color: #f8fafc;
}

.btn-tag {
  white-space: nowrap;
  padding: 6px 14px;
  background: #f1f5f9;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.btn-tag:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
  color: #0f172a;
}
.dark .btn-tag {
  background: #1e293b;
  color: #94a3b8;
}
.dark .btn-tag:hover {
  background: #334155;
  color: #f8fafc;
}

/* Chat Bubbles */
.bubble {
  padding: 12px 18px;
  font-size: 14px;
  line-height: 1.6;
  border-radius: 22px;
  position: relative;
  word-break: break-all;
}
.bubble-me {
  background: #fbbf24;
  color: #451a03;
  border-bottom-right-radius: 4px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
}
.bubble-them {
  background: white;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  border: 1px solid #e2e8f0;
}
.dark .bubble-them {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #334155;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card-pop-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card-pop-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}

/* 드롭다운 애니메이션 */
.fade-in-enter-active {
  transition: all 0.2s ease-out;
}
.fade-in-leave-active {
  transition: all 0.15s ease-in;
}
.fade-in-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
