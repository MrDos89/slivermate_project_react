import styled from "styled-components";
import { useState, useRef } from "react";
import userThumbnail from "../images/thumb3.png";
import thumb2 from "../images/thumb2.png";
import PostSection from "../components/MyPageComponents/PostSection";
import ClubSection from "../components/MyPageComponents/ClubSection";
import LectureSection from "../components/MyPageComponents/LectureSection";

// 🔹 더미 유저 데이터
const dummyUser = {
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

const hobbyMap = {
  indoor: {
    categoryId: 1,
    list: {
      1: "뜨개질",
      2: "그림",
      3: "독서",
      4: "영화 감상",
      5: "퍼즐",
      6: "요리",
      7: "통기타",
      8: "당구",
      9: "바둑",
    },
  },
  outdoor: {
    categoryId: 2,
    list: {
      1: "등산",
      2: "자전거",
      3: "캠핑",
      4: "낚시",
      5: "러닝/마라톤",
      6: "수영",
      7: "골프",
      8: "테니스",
      9: "족구",
    },
  },
};

const regionMap = {
  1: "서울특별시",
  2: "부산광역시",
  3: "대구광역시",
  4: "인천광역시",
  5: "광주광역시",
  6: "대전광역시",
  7: "울산광역시",
  8: "세종특별자치시",
  9: "경기도",
  10: "강원도",
  11: "충청북도",
  12: "충청남도",
  13: "전라북도",
  14: "전라남도",
  15: "경상북도",
  16: "경상남도",
  17: "제주특별자치도",
  18: "울릉도",
};

const dummyClubs = [
  {
    id: 1,
    name: "파릇정원",
    regionId: 1, // 서울특별시
    categoryId: 1, // 실내
    hobbyId: 1, // 뜨개질
    members: 12,
    thumbnail: userThumbnail,
    posts: ["식물 키우기 팁 공유해요", "이번 주 모임 공지"],
  },
  {
    id: 2,
    name: "캠핑좋아",
    regionId: 17, // 제주특별자치도
    categoryId: 2, // 실외
    hobbyId: 3, // 캠핑
    members: 20,
    thumbnail: thumb2,
    posts: ["제주도 캠핑 명소 공유", "4월 정모 일정 안내"],
  },
];

const MyPageContainer = styled.div`
  // padding-top: px;
  padding: 70px 40px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  // max-width: 1200px;
  margin: 0 auto;
  width: 1300px;
  position: relative;
  z-index: 3;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

const Nickname = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 14px;
  background-color: #67dbff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4fc3f7;
  }
`;

const StatusSection = styled.div`
  margin: 30px auto 0;
  display: flex;
  gap: 80px;
  width: 1300px;
  height: 100px;
  justify-content: space-between;
`;

const StatusItem = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// const LectureSection = styled.div`
//   margin-top: 40px;
// `;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostItem = styled.div`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;
`;

// 스크롤 버튼
const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 200px; /* 첫 버튼과의 간격을 크게 */
`;

const SideMenu = styled.div`
  //position: absolute; //  fixed → absolute
  position: fixed;
  /* top: 0;
  left: -110px; //  MyPageContainer 밖 왼쪽으로 살짝 나가게 */
  top: 120px;
  left: 210px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 70px;
  z-index: 1;
`;

const MenuButton = styled.button`
  width: 120px;
  height: 80px;
  padding: 10px;
  background-color: #f9f9f9;
  // border: 2px solid #67dbff;
  border-radius: 10px;
  font-weight: bold;
  color: #333;

  cursor: pointer;
  &:hover {
    background-color: #c9c9c9;
    border: 2px solid #c9c9c9;
  }
`;

const ScrollAnchor = styled.div`
  scroll-margin-top: 120px;
`;

function MyPage() {
  const user = dummyUser;
  const [startIndex, setStartIndex] = useState(0);
  const [startPostIndex, setStartPostIndex] = useState(0); // 게시글/댓글 페이지네이션 시작 인덱스
  const [selectedPostType, setSelectedPostType] = useState(1); // 기본적으로 게시글 보기
  const postVisibleCount = 5; // 한 페이지에 보일 게시글/댓글 개수

  const VISIBLE_COUNT = 5;

  const userInfoRef = useRef(null);
  const postSectionRef = useRef(null);

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < user.watchingLectures.length)
      setStartIndex(startIndex + 1);
  };

  const visibleLectures = user.watchingLectures.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  // 2. 이전 페이지로 이동하는 함수
  const handlePostPrev = () => {
    if (startPostIndex > 0) setStartPostIndex(startPostIndex - 1);
  };

  // 3. 다음 페이지로 이동하는 함수
  const handlePostNext = () => {
    const filteredPosts = user.posts.filter(
      (post) => post.type === selectedPostType
    );
    if (startPostIndex + postVisibleCount < filteredPosts.length)
      setStartPostIndex(startPostIndex + 1);
  };

  // 4. 드롭다운에서 게시글/댓글을 선택하면 해당 항목만 필터링
  const handlePostTypeChange = (e) => {
    setSelectedPostType(Number(e.target.value));
    setStartPostIndex(0); // 게시글/댓글 변경 시 첫 페이지로 돌아가도록
  };

  // 5. 선택된 게시글/댓글 목록을 필터링
  const visiblePosts = user.posts
    .filter((post) => post.type === selectedPostType)
    .slice(startPostIndex, startPostIndex + postVisibleCount);

  return (
    <>
      <SideMenu>
        <MenuButton onClick={() => handleScrollTo(userInfoRef)}>
          유저 정보
        </MenuButton>
        <MenuGroup>
          <MenuButton onClick={() => handleScrollTo(postSectionRef)}>
            내가 쓴 글
          </MenuButton>
        </MenuGroup>
      </SideMenu>
      <MyPageContainer>
        {/* 1. 유저 정보 */}
        <ScrollAnchor ref={userInfoRef}>
          <UserInfoWrapper>
            <UserProfile>
              <Thumbnail src={userThumbnail} alt="썸네일" />
              <Nickname>{user.nickname}</Nickname>
            </UserProfile>
            <Buttons>
              <Button>회원정보</Button>
              <Button>로그아웃</Button>
            </Buttons>
          </UserInfoWrapper>
        </ScrollAnchor>

        {/* 2. 유저 상태 */}
        <StatusSection>
          <StatusItem>
            ✅ 구독 상태: {user.isSubscribed ? "구독중" : "미구독"}
          </StatusItem>
          <StatusItem>📆 구독 시작일: {user.subscriptionDate}</StatusItem>
          <StatusItem>👥 가입한 동아리: {user.clubCount}개</StatusItem>
        </StatusSection>

        {/* 3. 내가 시청 중인 강의 */}
        <LectureSection
          user={user}
          startIndex={startIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          VISIBLE_COUNT={VISIBLE_COUNT}
        />

        {/* 4. 내 동아리 */}
        <ClubSection
          dummyClubs={dummyClubs}
          regionMap={regionMap}
          hobbyMap={hobbyMap}
        />

        {/* 5. 내가 쓴 글 보기 */}
        <ScrollAnchor ref={postSectionRef}>
          <PostSection
            user={user}
            visiblePosts={visiblePosts}
            selectedPostType={selectedPostType}
            postVisibleCount={postVisibleCount}
            startPostIndex={startPostIndex}
            handlePostPrev={handlePostPrev}
            handlePostNext={handlePostNext}
            handlePostTypeChange={handlePostTypeChange}
            hobbyMap={hobbyMap}
          />
        </ScrollAnchor>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
