import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userThumbnail from "../images/thumb3.png";
import thumb2 from "../images/thumb2.png";
import PostSection from "../components/MyPageComponents/PostSection";
import ClubSection from "../components/MyPageComponents/ClubSection";
import LectureSection from "../components/MyPageComponents/LectureSection";
import HostVideoSection from "../components/MyPageComponents/HostVideoSection";
import FamilySection from "../components/MyPageComponents/FamilySection";
import SchedulePaymentSection from "../components/MyPageComponents/SchedulePaymentSection";
import { useAuth } from "../components/Context/AuthContext";
import UserVo from "../vo/UserVo";
import PostVo from "../vo/PostVo";
import ClubVo from "../vo/ClubVo";
import CommentVo from "../vo/CommentVo";
import AnnounceVo from "../vo/AnnounceVo";

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
  SideMenu,
  MenuGroup,
  MenuButton,
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
    regionId: 1,
    categoryId: 1,
    hobbyId: 1,
    members: 12,
    thumbnail: userThumbnail,
    posts: ["식물 키우기 팁 공유해요", "이번 주 모임 공지"],
    clubUserId: 1, // ✅ 내가 만든 동아리 (user.uid와 같음)
  },
  {
    id: 2,
    name: "캠핑좋아",
    regionId: 17,
    categoryId: 2,
    hobbyId: 3,
    members: 20,
    thumbnail: thumb2,
    posts: ["제주도 캠핑 명소 공유", "4월 정모 일정 안내"],
    clubUserId: 99, // ❌ 내가 만든 동아리 아님
  },
  {
    id: 3,
    name: "요리조리",
    regionId: 9,
    categoryId: 1,
    hobbyId: 6,
    members: 8,
    thumbnail: userThumbnail,
    posts: ["비 오는 날 전 부쳐먹기", "다음은 김치전!"],
    clubUserId: 1, // ✅ 내가 만든 동아리
  },
];

function MyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [userClubs, setUserClubs] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userAnnouncements, setUserAnnouncements] = useState([]);

  const [groupUsers, setGroupUsers] = useState([]); // 같은 groupId 유저 목록
  const [groupLeaderName, setGroupLeaderName] = useState("");

  const [startIndex, setStartIndex] = useState(0);
  const [startPostIndex, setStartPostIndex] = useState(0); // 게시글/댓글 페이지네이션 시작 인덱스
  const [selectedPostType, setSelectedPostType] = useState(1); // 기본적으로 게시글 보기
  const postVisibleCount = 5; // 한 페이지에 보일 게시글/댓글 개수

  const tabColors = [
    "#EEFFF1", // 유저 정보
    "#dfffe5", // 내 강의
    "#d3ffdb", // 내 동아리
    "#bffdca", // 내가 쓴 글
    "#b4fcc1", // 내a 수업
    "#a4f7b3", // 가족 구성원
    "#8ceb9d", // 일정 및 결제
  ];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const VISIBLE_COUNT = 5;

  const userInfoRef = useRef(null);
  const postSectionRef = useRef(null);
  const lectureSectionRef = useRef(null);
  const clubSectionRef = useRef(null);
  const hostVideoRef = useRef(null);
  const familySectionRef = useRef(null);
  const scheduleSectionRef = useRef(null);

  // fetchUserData 호출 추가
  useEffect(() => {
    if (user?.group_id) {
      fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/usergroup/${user.group_id}`
      )
        .then((res) => res.json())
        .then((resData) => {
          const data = resData;

          if (!Array.isArray(data)) {
            console.error("data가 배열이 아님:", data);
            return;
          }

          // ✅ UserVo 인스턴스로 변환
          const userList = data.map((item) => UserVo.fromJson(item));
          setGroupUsers(userList);

          // ✅ 리더 찾기 (user_type === 1인 유저)
          const leader = userList.find((member) => member.userType === 1);
          if (leader) {
            setGroupLeaderName(leader.userName);
          }
        })
        .catch((err) => console.error("그룹 유저 불러오기 오류:", err));
    }
  }, [user]);

  // fetchPostData 호출 추가
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_ADDRESS}:${
            import.meta.env.VITE_API_PORT
          }/api/post/u/${user.uid}`
        );

        if (!response.ok) throw new Error("게시글 불러오기 실패");

        const rawData = await response.json();

        if (!Array.isArray(rawData)) {
          console.error("게시글 데이터가 배열이 아님:", rawData);
          return;
        }

        // ✅ PostVo 인스턴스로 변환
        const postList = rawData.map((item) => PostVo.fromJson(item));
        setUserPosts(postList);
      } catch (error) {
        console.error("❌ 게시글 데이터 불러오기 오류:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  // fetchClubData 호출 추가
  useEffect(() => {
    if (!user || typeof user.groupId !== "number" || isNaN(user.groupId))
      return;

    console.log("📦 그룹 ID 확인:", user?.groupId);

    const fetchUserClubs = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_ADDRESS}:${
            import.meta.env.VITE_API_PORT
          }/api/club/${user.groupId}/joined`
        );

        if (!response.ok) throw new Error("모임 불러오기 실패");

        const rawData = await response.json();

        if (!Array.isArray(rawData)) {
          console.error("모임 데이터가 배열이 아님:", rawData);
          return;
        }

        // ✅ ClubVo 인스턴스로 변환
        const clubList = rawData.map((item) => ClubVo.fromJson(item));
        setUserClubs(clubList);
      } catch (error) {
        console.error("❌ 모임 데이터 불러오기 오류:", error);
      }
    };

    fetchUserClubs();
  }, [user]);

  // fetchCommentData 호출 추가
  useEffect(() => {
    if (!user?.uid) return;

    const fetchCommentData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_ADDRESS}:${
            import.meta.env.VITE_API_PORT
          }/api/comment/u/${user.uid}`
        );

        if (!response.ok) throw new Error("댓글 불러오기 실패");

        const rawData = await response.json();

        if (!Array.isArray(rawData)) {
          console.error("댓글 데이터가 배열이 아님:", rawData);
          return;
        }

        // ✅ CommentVo 인스턴스로 변환
        const commentList = rawData.map((item) => CommentVo.fromJson(item));
        setUserComments(commentList);
      } catch (error) {
        console.error("❌ 댓글 데이터 불러오기 오류:", error);
      }
    };

    fetchCommentData();
  }, [user]);

  // fetchAnnouncementData 호출 추가
  useEffect(() => {
    if (!user?.uid) return;

    const fetchAnnouncementData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_ADDRESS}:${
            import.meta.env.VITE_API_PORT
          }/api/announcement/u/${user.uid}`
        );

        if (!response.ok) throw new Error("일정 불러오기 실패");

        const rawData = await response.json();

        if (!Array.isArray(rawData)) {
          console.error("일정 데이터가 배열이 아님:", rawData);
          return;
        }

        // ✅ CommentVo 인스턴스로 변환
        const announcementList = rawData.map((item) =>
          CommentVo.fromJson(item)
        );
        setUserAnnouncements(announcementList);
      } catch (error) {
        console.error("❌ 댓글 데이터 불러오기 오류:", error);
      }
    };

    fetchAnnouncementData();
  }, [user]);

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4. 드롭다운에서 게시글/댓글을 선택하면 해당 항목만 필터링
  const handlePostTypeChange = (e) => {
    setSelectedPostType(Number(e.target.value));
    setStartPostIndex(0); // 게시글/댓글 변경 시 첫 페이지로 돌아가도록
  };

  return (
    <>
      <SideMenu>
        <MenuGroup>
          <MenuButton
            onClick={() => {
              setSelectedTabIndex(0);
              handleScrollTo(userInfoRef);
            }}
            $isActive={selectedTabIndex === 0}
            $color={tabColors[0]}
          >
            유저 정보
          </MenuButton>

          {/* <MenuButton
            onClick={() => {
              setSelectedTabIndex(1);
              handleScrollTo(lectureSectionRef);
            }}
            $isActive={selectedTabIndex === 1}
            $color={tabColors[1]}
          >
            내 강의
          </MenuButton> */}
          <MenuButton
            onClick={() => {
              setSelectedTabIndex(2);
              handleScrollTo(clubSectionRef);
            }}
            $isActive={selectedTabIndex === 2}
            $color={tabColors[1]}
          >
            내 동아리
          </MenuButton>

          <MenuButton
            onClick={() => {
              setSelectedTabIndex(3);
              handleScrollTo(postSectionRef);
            }}
            $isActive={selectedTabIndex === 3}
            $color={tabColors[2]}
          >
            내가 쓴 글
          </MenuButton>

          {/* <MenuButton
            onClick={() => {
              setSelectedTabIndex(4);
              handleScrollTo(hostVideoRef);
            }}
            $isActive={selectedTabIndex === 4}
            $color={tabColors[4]}
          >
            내 수업
          </MenuButton> */}

          <MenuButton
            onClick={() => {
              setSelectedTabIndex(5);
              handleScrollTo(familySectionRef);
            }}
            $isActive={selectedTabIndex === 5}
            $color={tabColors[3]}
          >
            가족 구성원
          </MenuButton>

          <MenuButton
            onClick={() => {
              setSelectedTabIndex(6);
              handleScrollTo(scheduleSectionRef);
            }}
            $isActive={selectedTabIndex === 6}
            $color={tabColors[4]}
          >
            일정 및 결제
          </MenuButton>
        </MenuGroup>
      </SideMenu>

      <MyPageContainer style={{ backgroundColor: tabColors[selectedTabIndex] }}>
        {/* 1. 유저 정보 */}
        <ScrollAnchor ref={userInfoRef}>
          <UserInfoWrapper>
            <UserProfile>
              <Thumbnail src={user.thumbnail} alt="썸네일" />
              <Nickname>{user.nickname}</Nickname>
            </UserProfile>
            <Buttons>
              {/* <Button>회원정보</Button> */}
              {/* <Button>로그아웃</Button> */}
            </Buttons>
          </UserInfoWrapper>
        </ScrollAnchor>

        {/* 2. 유저 상태 */}
        <StatusSection>
          <StatusItem>
            👨‍👩‍👧 가족정보: {user.userType === 1 ? "부모님" : "자녀"}
          </StatusItem>
          {/* <StatusItem>👥 가입한 동아리: {user.clubCount}개</StatusItem> */}
          <StatusItem>👥 가입한 동아리: {userClubs.length} 개</StatusItem>
        </StatusSection>
        {/* 3. 내가 시청 중인 강의 */}
        <ScrollAnchor ref={lectureSectionRef}>
          {/* <LectureSection
            user={user}
            startIndex={startIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            VISIBLE_COUNT={VISIBLE_COUNT}
            sectionTitle={
              user.userType === 1
                ? "내가 시청중인 강의"
                : `${groupLeaderName} 님이 시청하는 강의`
            }
          /> */}
        </ScrollAnchor>

        {/* 4. 내 동아리 */}
        <ScrollAnchor ref={clubSectionRef}>
          <ClubSection
            dummyClubs={dummyClubs}
            userClubs={userClubs}
            regionMap={regionMap}
            hobbyMap={hobbyMap}
            sectionTitle={
              user.userType === 1
                ? "내 동아리"
                : `${groupLeaderName} 님의 동아리`
            }
            userId={user.uid}
          />
        </ScrollAnchor>

        {/* 5. 내가 쓴 글 보기 */}
        <ScrollAnchor ref={postSectionRef}>
          <PostSection
            user={user}
            userPosts={userPosts}
            userComments={userComments}
            selectedPostType={selectedPostType}
            startPostIndex={startPostIndex}
            setStartPostIndex={setStartPostIndex}
            handlePostTypeChange={handlePostTypeChange}
            hobbyMap={hobbyMap}
            sectionTitle={
              user.userType === 1
                ? "내가 쓴 글 & 댓글 보기"
                : `${groupLeaderName} 님이 쓴 글 & 댓글 보기`
            }
          />
        </ScrollAnchor>

        {/* 내 호스트 영상  */}
        <ScrollAnchor ref={hostVideoRef}>
          {/* <HostVideoSection
            user={user}
            startIndex={startIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            VISIBLE_COUNT={VISIBLE_COUNT}
            sectionTitle={
              user.userType === 1
                ? "내 호스트 영상"
                : `${groupLeaderName} 님의 호스트 영상`
            }
          /> */}
        </ScrollAnchor>

        {/* 7. 가족구성원 */}
        <ScrollAnchor ref={familySectionRef}>
          <FamilySection groupId={user?.group_id} groupUsers={groupUsers} />
        </ScrollAnchor>

        {/* 8. 일정 및 결제 확인 */}
        <ScrollAnchor ref={scheduleSectionRef}>
          <SchedulePaymentSection userAnnouncements={userAnnouncements} />
        </ScrollAnchor>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
