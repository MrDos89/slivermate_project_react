import axios from 'axios';
import LessonVo from '../vo/LessonVo';

const API_BASE_URL = 'http://13.125.197.66:18090/api/lesson'; 

const LessonService = {
  // 강의 전체 목록 가져오기
  async fetchLessons() {
    try {
      const response = await axios.get(API_BASE_URL);

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((item) => LessonVo.fromJson(item));
      } else {
        console.warn('⚠️ 서버에서 받은 데이터가 배열이 아닙니다.');
        return [];
      }
    } catch (error) {
      console.error('❌ 강의 목록 조회 실패:', error);
      return [];
    }
  },

  // 카테고리 & 서브카테고리 기준으로 조회
  async fetchByCategory(mainCat, subCat) {
    try {
      const url = `${API_BASE_URL}/sc/${mainCat}/${subCat}`;
      const response = await axios.get(url);

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((item) => LessonVo.fromJson(item));
      } else {
        return [];
      }
    } catch (error) {
      console.error('❌ 카테고리별 강의 조회 실패:', error);
      return [];
    }
  },

  // 단일 강의 상세 조회
  async fetchLessonById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      if (response.status === 200 && response.data) {
        return LessonVo.fromJson(response.data);
      } else {
        return null;
      }
    } catch (error) {
      console.error('❌ 단일 강의 조회 실패:', error);
      return null;
    }
  },

  // 강의 등록
  async createLesson(lessonVo) {
    try {
      const response = await axios.post(API_BASE_URL, lessonVo.toJson());
      return response.data;
    } catch (error) {
      console.error('❌ 강의 등록 실패:', error);
      throw error;
    }
  },
};

export default LessonService;
