import AnnounceVo from "../vo/AnnounceVo";

const API_BASE_URL = "http://YOUR_SERVER_IP:PORT/api/announce"; // ⚠️ 실제 서버 주소로 바꿔주세요

// 🔹 공지/모임 전체 조회 (GET)
export const fetchAnnounces = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data.map((item) => AnnounceVo.fromJson(item));
  } catch (error) {
    console.error("📛 공지/모임 불러오기 실패:", error);
    return [];
  }
};

// 🔹 단일 공지/모임 등록 (POST)
export const createAnnounce = async (announceVoInstance) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announceVoInstance.toJson()),
    });

    if (!response.ok) {
      throw new Error("📛 공지/모임 등록 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("📛 공지/모임 등록 중 오류:", error);
    return null;
  }
};
