import { apiFetch } from '@/plugins/interceptor'

const getPostList = async (postId) => {
  try {
    const res = await apiFetch(`json/posts/post_${postId}`)
    return res
  } catch (error) {
    console.error('커뮤니티 글 호출 실패:', error.message)
  }
}

export default {
  getPostList,
}
