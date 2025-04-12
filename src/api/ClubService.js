import axios from 'axios';
import ClubVo from '../vo/ClubVo';

const API_BASE_URL = ''; // 실제 서버 주소로 교체 필요

const ClubService = {
  // ✅ 동아리 전체 목록 불러오기
  async fetchClubs() {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((club) => ClubVo.fromJson(club));
      } else {
        console.warn('⚠️ 클럽 데이터 형식이 배열이 아닙니다.');
        return [];
      }
    } catch (error) {
      console.error('❌ 클럽 목록 가져오기 실패:', error);
      return [];
    }
  },

  // ✅ 단일 클럽 상세 조회
  async fetchClubById(clubId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${clubId}`);
      if (response.status === 200 && response.data) {
        return ClubVo.fromJson(response.data);
      } else {
        console.warn('❗ 클럽이 존재하지 않거나 데이터 없음');
        return null;
      }
    } catch (error) {
      console.error('❌ 클럽 상세 조회 실패:', error);
      return null;
    }
  },

  // ✅ 동아리 등록
  async createClub(clubVo) {
    try {
      const response = await axios.post(API_BASE_URL, clubVo.toJson());
      return response.data;
    } catch (error) {
      console.error('❌ 클럽 등록 실패:', error);
      throw error;
    }
  },

  // ✅ 동아리 수정
  async updateClub(clubId, clubVo) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${clubId}`, clubVo.toJson());
      return response.data;
    } catch (error) {
      console.error('❌ 클럽 수정 실패:', error);
      throw error;
    }
  },

  // ✅ 동아리 삭제
  async deleteClub(clubId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${clubId}`);
      return response.status === 200;
    } catch (error) {
      console.error('❌ 클럽 삭제 실패:', error);
      return false;
    }
  },
};

export default ClubService;
