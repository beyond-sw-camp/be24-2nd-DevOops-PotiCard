import { apiFetch } from "../../plugins/interceptor.js";

// 채팅방 목록
const chatRoomList = async () => {
    try {
        const res = await apiFetch("/json/chat/chat-room-list");
        console.log("res fetch성공", res);
        return res;
    } catch (error) {
        console.error("API 호출 실패:", error.message);
        throw error;
    }
};

// 채팅 메시지 목록 (특정 방의 메시지)
const chatMessageList = async (roomId) => {
    try {
        // roomId가 있으면 쿼리 파라미터로 전달, 없으면 전체 메시지
        const url = roomId ? `/chat/chat-messages.json?roomId=${roomId}` : "/json/chat/chat-messages";
        console.log(url)
        const res = await apiFetch(url);
        console.log(`방 ${roomId}의 메시지:`, res);
        return res;
    } catch (error) {
        console.error("API 호출 실패:", error.message);
        throw error;
    }
};

// 특정 채팅방의 메시지 가져오기 (roomId별 JSON 파일)
const getChatMessages = async (roomId) => {
    try {
        const res = await apiFetch(`/json/chat/chat-messages-${roomId}`);
        console.log(`방 ${roomId}의 메시지:`, res);
        return res;
    } catch (error) {
        console.error("API 호출 실패:", error.message);
        throw error;
    }
};

// 화상 채팅 정보
const loadPortfolios = async () => {
    try {
        const res = await apiFetch("/json/chat/my-portfolios");
        console.log(res);
        return res;
    } catch (error) {
        console.error("API 호출 실패:", error.message);
        throw error;
    }
};

export default {
    chatRoomList, chatMessageList, getChatMessages, loadPortfolios
};
