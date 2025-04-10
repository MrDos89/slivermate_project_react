import axios from "axios";
import CategoryVo from "../vo/CategoryVo";

// 서버 주소 설정 (환경변수 또는 직접 주소 입력 가능)
const BASE_URL = "http://13.125.197.66:${import.meta.env.VITE_API_PORT}/api/category";

const CategoryApi = {
  // 🔹 전체 카테고리 목록 가져오기
  async getAllCategories() {
    try {
      const response = await axios.get(BASE_URL);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((item) => CategoryVo.fromJson(item));
      } else {
        console.warn("⚠️ 카테고리 데이터를 불러올 수 없습니다.");
        return [];
      }
    } catch (error) {
      console.error("🚨 [카테고리 전체 목록 에러]:", error);
      return [];
    }
  },

  // 🔹 특정 카테고리+서브카테고리 조회
  async getCategoryById(categoryId, subCategoryId) {
    try {
      const url = `${BASE_URL}/sc/${categoryId}/${subCategoryId}`;
      const response = await axios.get(url);
      if (
        response.status === 200 &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        return CategoryVo.fromJson(response.data[0]);
      } else {
        console.warn("⚠️ 해당 카테고리를 찾을 수 없습니다.");
        return null;
      }
    } catch (error) {
      console.error("🚨 [카테고리 단건 조회 에러]:", error);
      return null;
    }
  },
};

export default CategoryApi;
