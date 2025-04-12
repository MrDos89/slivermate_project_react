import userThumbnail from "../images/thumb3.png";
import thumb2 from "../images/thumb2.png";

// 🔹 더미 유저 데이터
export const dummyUser = {
    nickname: "파릇유저",
    isSubscribed: true,
    subscriptionDate: "2025-04-01",
    clubCount: 3,
    watchingLectures: [
      { id: 1, title: "뜨개질 기초", thumbnail: userThumbnail },
      { id: 2, title: "명상", thumbnail: thumb2 },
      { id: 3, title: "정원 가꾸기", thumbnail: userThumbnail },
      { id: 4, title: "요리 클래스", thumbnail: thumb2 },
      { id: 5, title: "프랑스어", thumbnail: userThumbnail },
      { id: 6, title: "스마트폰 활용", thumbnail: thumb2 },
      { id: 7, title: "미술 감상", thumbnail: userThumbnail },
    ],
    posts: [
      {
        id: 1,
        type: 1, // 게시글
        content: "오늘 뜨개질 하다가 손가락 아팠어요",
        date: "2025-03-20",
        hobby: { categoryId: 1, hobbyId: 1 }, // 뜨개질
        clubName: "뜨개질동호회A",
      },
      {
        id: 2,
        type: 1,
        content: "캠핑 다녀왔는데 너무 좋았어요!",
        date: "2025-03-19",
        hobby: { categoryId: 2, hobbyId: 3 }, // 캠핑
        clubName: "주말캠핑클럽",
      },
      {
        id: 3,
        type: 1,
        content: "오늘도 그림 그리기 성공!",
        date: "2025-03-18",
        hobby: { categoryId: 1, hobbyId: 2 }, // 그림
        clubName: "미술 사랑방",
      },
      {
        id: 4,
        type: 1,
        content: "바둑 모임에서 두 판 이겼습니다",
        date: "2025-03-17",
        hobby: { categoryId: 1, hobbyId: 9 }, // 바둑
        clubName: "파릇바둑회",
      },
      {
        id: 5,
        type: 1,
        content: "러닝하면서 마라톤 준비 중!",
        date: "2025-03-16",
        hobby: { categoryId: 2, hobbyId: 5 }, // 러닝/마라톤
        clubName: "건강달리기모임",
      },
      {
        id: 6,
        type: 2, // 댓글
        content: "정말 공감돼요! 저도 그래요",
        date: "2025-03-21",
        hobby: { categoryId: 1, hobbyId: 1 },
        clubName: "뜨개질동호회A",
      },
      {
        id: 7,
        type: 2,
        content: "좋은 정보 감사합니다!",
        date: "2025-03-20",
        hobby: { categoryId: 2, hobbyId: 3 },
        clubName: "주말캠핑클럽",
      },
      {
        id: 8,
        type: 2,
        content: "오늘 모임 정말 재밌었어요~",
        date: "2025-03-18",
        hobby: { categoryId: 1, hobbyId: 2 },
        clubName: "미술 사랑방",
      },
      {
        id: 9,
        type: 2,
        content: "어려운 수지만 잘 두셨어요!",
        date: "2025-03-17",
        hobby: { categoryId: 1, hobbyId: 9 },
        clubName: "파릇바둑회",
      },
      {
        id: 10,
        type: 2,
        content: "힘내세요! 응원합니다",
        date: "2025-03-16",
        hobby: { categoryId: 2, hobbyId: 5 },
        clubName: "건강달리기모임",
      },
      {
        id: 11,
        type: 2,
        content: "힘내세요! 응원합니다",
        date: "2025-03-16",
        hobby: { categoryId: 2, hobbyId: 5 },
        clubName: "건강달리기모임",
      },
    ],
  };