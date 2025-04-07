import axios from 'axios';
import PostVo from '../vo/PostVo';

const API_BASE_URL = 'http://localhost:8080/api/post'; // 실제 백엔드 주소로 변경하세요

const PostService = {
  // 게시글 목록 가져오기
  async fetchPosts() {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map(post => PostVo.fromJson(post));
      } else {
        console.warn('⚠ 응답이 비정상입니다.');
        return [];
      }
    } catch (error) {
      console.error('❌ API 호출 실패:', error);
      return [];
    }
  },

  // 게시글 등록
  async createPost(postVo) {
    try {
      const response = await axios.post(API_BASE_URL, postVo.toJson());
      return response.data;
    } catch (error) {
      console.error('❌ 게시글 등록 실패:', error);
      throw error;
    }
  },
};

export default PostService;
