import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Dropdown from "../components/FreeBoardComponents/Dropdown";
import MyPostWriter from "../components/FreeBoardComponents/MyPostWriter";
import FeedList from "../components/FreeBoardComponents/FeedList";





const Wrapper = styled.div`
width: 1200px;;
  // padding: 60px;
  padding: 200px 60px 60px;
  text-align: center;
  font-size: 1.8rem;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
  margin-bottom: 20px;
`;

const FixedPostBar = styled.div`
  position: fixed;
  top: 60px; 
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
`;


const FreeBoardPage = () => {
  
  const dummyPosts = [
    {
      id: 1,
      user: "복채리~",
      userThumbnail: "../src/images/cnlal3.jpg",
      content: "살아 숨쉬는 것들 중 가장 낭만적이었던 순간. 카메라로 온전히 다 담을 순 없지만 이렇게 남겨둬요.",
      images: [{ url: "../src/images/cnlal3.jpg" }],
      tags: [0, 8],
      likes: 1012,
      comments: 873,
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2분 전
    },
    {
      id: 2,
      user: "파릇러버",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "요즘 뜨개질에 빠져 있어요 🧶 색깔 조합 너무 귀엽지 않나요?",
      images: [{ url: "https://source.unsplash.com/600x400/?knitting,yarn" }],
      tags: [1],
      likes: 300,
      comments: 15,
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10분 전
    },
    {
      id: 3,
      user: "슬리버메이트",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "한적한 새벽의 자전거 타기 🚴‍♂️",
      images: [{ url: "https://source.unsplash.com/600x400/?bicycle,night" }],
      tags: [11],
      likes: 120,
      comments: 4,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
    },
    {
      id: 4,
      user: "자연속으로",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "캠핑은 언제나 옳다🏕️ 불멍이 주는 힐링이란...",
      images: [{ url: "https://source.unsplash.com/600x400/?camping,fire" }],
      tags: [12],
      likes: 420,
      comments: 33,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
    },
    {
      id: 5,
      user: "책벌레",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "올해 첫 책! 따뜻한 커피와 함께 독서 📚",
      images: [{ url: "https://source.unsplash.com/600x400/?book,coffee" }],
      tags: [3],
      likes: 78,
      comments: 3,
      createdAt: new Date("2024-12-12T10:00:00").toISOString(), // 오래된 날짜
    },
    {
      id: 6,
      user: "책벌레",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "올해 첫 책! 따뜻한 커피와 함께 독서 📚",
      images: [{ url: "https://source.unsplash.com/600x400/?book,coffee" }],
      tags: [3],
      likes: 78,
      comments: 3,
      createdAt: new Date("2024-12-12T10:00:00").toISOString(), // 오래된 날짜
    },
    {
      id: 7,
      user: "책벌레",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "올해 첫 책! 따뜻한 커피와 함께 독서 📚",
      images: [{ url: "https://source.unsplash.com/600x400/?book,coffee" }],
      tags: [3],
      likes: 78,
      comments: 3,
      createdAt: new Date("2024-12-12T10:00:00").toISOString(), // 오래된 날짜
    },
    {
      id: 8,
      user: "책벌레",
      userThumbnail: "/images/defaultUserThumbnail.png",
      content: "올해 첫 책! 따뜻한 커피와 함께 독서 📚",
      images: [{ url: "https://source.unsplash.com/600x400/?book,coffee" }],
      tags: [3],
      likes: 78,
      comments: 3,
      createdAt: new Date("2024-12-12T10:00:00").toISOString(), // 오래된 날짜
    },
  ];
  

  const regionId = [
    { id: -1, name: "전체" },
    { id: 1, name: "서울특별시" },
    { id: 2, name: "인천광역시" },
    { id: 3, name: "대전광역시" },
    { id: 4, name: "대구광역시" },
    { id: 5, name: "울산광역시" },
    { id: 6, name: "부산광역시" },
    { id: 7, name: "광주광역시" },
    { id: 8, name: "세종특별자치시" },
    { id: 9, name: "제주도" },
    { id: 10, name: "울릉도" },
  ];

  const indoorHobbies = [
    { id: 1, name: "뜨개질" }, { id: 2, name: "그림" }, { id: 3, name: "독서" },
    { id: 4, name: "영화 감상" }, { id: 5, name: "퍼즐" }, { id: 6, name: "요리" },
    { id: 7, name: "통기타" }, { id: 8, name: "당구" }, { id: 9, name: "바둑" },
  ];

  const outdoorHobbies = [
    { id: 10, name: "등산" }, { id: 11, name: "자전거" }, { id: 12, name: "캠핑" },
    { id: 13, name: "낚시" }, { id: 14, name: "러닝/마라톤" }, { id: 15, name: "수영" },
    { id: 16, name: "골프" }, { id: 17, name: "테니스" }, { id: 18, name: "족구" },
  ];

  const allHobbies = [
    { id: -1, name: "전체" },
    { id: 0, name: "일상" },
    ...indoorHobbies,
    ...outdoorHobbies,
  ];

  // const [selectedRegion, setSelectedRegion] = useState({ id: null, name: "지역 선택" });
  // const [selectedHobby, setSelectedHobby] = useState({ id: null, name: "카테고리 선택" });


  const [selectedRegion, setSelectedRegion] = useState({ id: -1, name: "전체" });
const [selectedHobby, setSelectedHobby] = useState({ id: -1, name: "전체" });

  const [showRegionList, setShowRegionList] = useState(false);
  const [showHobbyList, setShowHobbyList] = useState(false);

  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState(dummyPosts);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // const filteredPosts = selectedHobby.id === -1
  //   ? posts
  //   : posts.filter((post) => post.tags.includes(selectedHobby.id));
  const filteredPosts = posts
  .filter((post) =>
    selectedHobby.id === -1 || post.tags.includes(selectedHobby.id)
  )
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    


  return (
    <>
    <FixedPostBar>
      <DropdownContainer>
        <Dropdown
          selected={selectedRegion}
          setSelected={setSelectedRegion}
          show={showRegionList}
          setShow={setShowRegionList}
          options={regionId}
        />
        <Dropdown
          selected={selectedHobby}
          setSelected={setSelectedHobby}
          show={showHobbyList}
          setShow={setShowHobbyList}
          options={allHobbies}
        />
      </DropdownContainer>
    </FixedPostBar>

    <Wrapper>
    <MyPostWriter onSubmit={handleAddPost} />
      <FeedList posts={filteredPosts} />
    </Wrapper>
  </>
  );
};

export default FreeBoardPage;
