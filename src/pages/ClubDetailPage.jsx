// 📄 src/pages/ClubDetailPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyClubs } from "../data/clubData";
import styled from "styled-components";
import FeedList from "../components/ClubComponents/FeedList";
import PhotoFeed from "../components/ClubComponents/PhotoFeed";
import CalendarSection from "../components/ClubComponents/CalendarSection";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const NotFound = styled.div`
  padding: 100px;
  font-size: 24px;
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 450px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TabMenu = styled.div`
  display: flex;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  font-weight: 500;
`;

const TabButton = styled.button`
  position: relative;
  flex: 1;
  padding: 20px 0;
  border: none;
  background-color: white;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.$active ? "rgb(0, 133, 82)" : "#333")};
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 30%;
    width: ${(props) => (props.$active ? "40%" : "0")};
    height: 3px;
    background-color: rgb(0, 133, 82);
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: rgb(0, 133, 82);
  }

  &:hover::after {
    width: 40%;
  }
`;

const TabContent = styled.div`
  padding: 10px 10px;
  min-height: 400px; /* 고정 높이로 레이아웃 흔들림 방지 */
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ClubName = styled.h2`
  font-size: 36px;
  font-weight: bold;
`;

const RegisterDate = styled.span`
  font-size: 18px;
  color: #888;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 20px;
`;

const Description = styled.div`
  border: 2px solid #ccc;
  padding: 30px;
  margin-top: 30px;
  font-size: 20px;
  color: #333;
  line-height: 1.6;
`;

const TabNotice = styled.div`
  font-size: 24px;
  text-align: center;
  padding-top: 50px;
  color: #666;
`;

// 컴포넌트 본문
const ClubDetailPage = () => {
  const { id } = useParams();
  const clubId = parseInt(id, 10);
  const club = dummyClubs.find((c) => c.club_id === clubId);

  const [selectedTab, setSelectedTab] = useState("소개");

  if (!club) {
    return <NotFound>해당 동아리를 찾을 수 없습니다.</NotFound>;
  }

  return (
    <Container>
      {/* 썸네일 이미지 */}
      <ThumbnailWrapper>
        <Thumbnail src={club.club_thumbnail} alt="썸네일" />
      </ThumbnailWrapper>

      {/* 탭 메뉴 */}
      <TabMenu>
        {["소개", "피드", "포토", "일정"].map((tab) => (
          <TabButton
            key={tab}
            onClick={() => setSelectedTab(tab)}
            $active={selectedTab === tab}
          >
            {tab}
          </TabButton>
        ))}
      </TabMenu>

      {/* 탭 콘텐츠 */}
      <TabContent>
        {selectedTab === "소개" && (
          <>
            <HeaderRow>
              <ClubName>{club.club_name}</ClubName>
              <RegisterDate>개설일 {club.club_register_date}</RegisterDate>
            </HeaderRow>

            <InfoRow>
              <span>(모임장 아이디: {club.club_user_id})</span>
              <span>
                ({club.club_member_number}) / ({club.club_member_max})
              </span>
            </InfoRow>

            <Description>{club.club_desc}</Description>
          </>
        )}

        {/* {selectedTab === "피드" && <TabNotice>피드 내용 준비 중...</TabNotice>} */}
        {/* ✅ 피드 탭 클릭 시 피드 리스트 렌더링 */}
        {selectedTab === "피드" && (
          <FeedList posts={club.posts || []} clubId={clubId} />
        )}

        {/* {selectedTab === "포토" && (
          <TabNotice>포토첩 내용 준비 중...</TabNotice>
        )} */}
        {selectedTab === "포토" && (
          <PhotoFeed posts={club.posts || []} clubId={clubId} />
        )}

        {/* {selectedTab === "일정" && <TabNotice>일정 내용 준비 중...</TabNotice>} */}
        {selectedTab === "일정" && <CalendarSection />}
      </TabContent>
    </Container>
  );
};

export default ClubDetailPage;
