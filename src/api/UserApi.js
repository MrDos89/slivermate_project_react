import UserVo from "../vo/UserVo";

const BASE_URL = "http://13.125.197.66:${import.meta.env.VITE_API_PORT}/api/user";

const UserApi = {
  // 전체 유저 목록 가져오기
  async fetchAllUsers() {
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();

      return json.map((userJson) => UserVo.fromJson(userJson));
    } catch (error) {
      console.error("[유저 목록 조회 실패]", error);
      return [];
    }
  },

  // 특정 유저 1명 조회 (uid로)
  async fetchUserById(uid) {
    try {
      const response = await fetch(`${BASE_URL}/${uid}`);
      const json = await response.json();
      return UserVo.fromJson(json);
    } catch (error) {
      console.error(`[유저 ${uid} 조회 실패]`, error);
      return null;
    }
  },

  // 유저 생성
  async createUser(userVo) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userVo.toJson()),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      return await response.json(); // 성공 시 반환값 필요 시
    } catch (error) {
      console.error("[회원가입 실패]", error);
      throw error;
    }
  },

  // 유저 삭제
  async deleteUser(uid) {
    try {
      const response = await fetch(`${BASE_URL}/${uid}`, {
        method: "DELETE",
      });

      return response.ok;
    } catch (error) {
      console.error(`[유저 ${uid} 삭제 실패]`, error);
      return false;
    }
  },
};

export default UserApi;
