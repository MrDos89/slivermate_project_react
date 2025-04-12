import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userThumbnail from "../images/thumb3.png";
import thumb2 from "../images/thumb2.png";
import PostSection from "../components/MyPageComponents/PostSection";
import ClubSection from "../components/MyPageComponents/ClubSection";
import LectureSection from "../components/MyPageComponents/LectureSection";
import HostVideoSection from "../components/MyPageComponents/HostVideoSection";
import {
  MyPageContainer,
  UserInfoWrapper,
  UserProfile,
  Thumbnail,
  Nickname,
  Buttons,
  Button,
  StatusSection,
  StatusItem,
  ScrollAnchor,
} from "../js/MyPage.styles";
import { dummyUser } from "../data/myPageDummyUser";

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

function MyPage() {
  const user = dummyUser;
  const navigate = useNavigate();
  const API_USER_SESSION_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/user/session`;
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //@note - 유저 세션 체크하기
  useEffect(() => {
    console.log("useEffect - 유저 세션 체크");
    console.log("API_URL:", API_USER_SESSION_URL);

    fetch(API_USER_SESSION_URL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.log("로그인 세션이 없습니다.");
            setIsLoggedIn(false);
            navigate("/login");
          } else {
            console.error("회원 정보 불러오기 실패:", response.status);
          }
          return; // 에러 발생 시 더 이상 진행하지 않음
        }
        return response.json();
      })
      .then((data) => {
        console.log("user 데이터 확인:", data);
        setUserData(data);
        setIsLoggedIn(true);
      })
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const [startPostIndex, setStartPostIndex] = useState(0); // 게시글/댓글 페이지네이션 시작 인덱스
  const [selectedPostType, setSelectedPostType] = useState(1); // 기본적으로 게시글 보기
  const postVisibleCount = 5; // 한 페이지에 보일 게시글/댓글 개수

  const VISIBLE_COUNT = 5;

  const userInfoRef = useRef(null);
  const postSectionRef = useRef(null);
  const lectureSectionRef = useRef(null);
  const clubSectionRef = useRef(null);
  const hostVideoRef = useRef(null);

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
        <MenuGroup>
          <MenuButton onClick={() => handleScrollTo(userInfoRef)}>
            유저 정보
          </MenuButton>
          <MenuButton onClick={() => handleScrollTo(lectureSectionRef)}>
            내 강의
          </MenuButton>{" "}
          <MenuButton onClick={() => handleScrollTo(clubSectionRef)}>
            내 동아리
          </MenuButton>{" "}
          <MenuButton onClick={() => handleScrollTo(postSectionRef)}>
            내가 쓴 글
          </MenuButton>
          <MenuButton onClick={() => handleScrollTo(hostVideoRef)}>
            내 호스트 영상
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
        <ScrollAnchor ref={lectureSectionRef}>
          <LectureSection
            user={user}
            startIndex={startIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            VISIBLE_COUNT={VISIBLE_COUNT}
          />
        </ScrollAnchor>

        {/* 4. 내 동아리 */}
        <ScrollAnchor ref={clubSectionRef}>
          <ClubSection
            dummyClubs={dummyClubs}
            regionMap={regionMap}
            hobbyMap={hobbyMap}
          />
        </ScrollAnchor>

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

        {/* 내 호스트 영상  */}
        <ScrollAnchor ref={hostVideoRef}>
          <HostVideoSection
            user={user}
            startIndex={startIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            VISIBLE_COUNT={VISIBLE_COUNT}
          />
        </ScrollAnchor>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
