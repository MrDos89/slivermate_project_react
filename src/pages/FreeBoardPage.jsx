import { useEffect, useState, useRef } from "react";
import { dummyPosts } from "../data/posts";
import styled from "styled-components";
import Dropdown from "../components/FreeBoardComponents/Dropdown";
import MyPostWriter from "../components/FreeBoardComponents/MyPostWriter";
import FeedList from "../components/FreeBoardComponents/FeedList";

const Wrapper = styled.div`
  width: 1200px;
  padding: 60px;
  padding: 165px 60px 60px;
  text-align: center;
  font-size: 1.8rem;
  margin-top: 10px;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
  margin-bottom: 10px;
`;

const FixedPostBar = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
`;

const FreeBoardPage = () => {
  const API_POST_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/post`;

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
    { id: 1, name: "뜨개질" },
    { id: 2, name: "그림" },
    { id: 3, name: "독서" },
    { id: 4, name: "영화 감상" },
    { id: 5, name: "퍼즐" },
    { id: 6, name: "요리" },
    { id: 7, name: "통기타" },
    { id: 8, name: "당구" },
    { id: 9, name: "바둑" },
  ];

  const outdoorHobbies = [
    { id: 10, name: "등산" },
    { id: 11, name: "자전거" },
    { id: 12, name: "캠핑" },
    { id: 13, name: "낚시" },
    { id: 14, name: "러닝/마라톤" },
    { id: 15, name: "수영" },
    { id: 16, name: "골프" },
    { id: 17, name: "테니스" },
    { id: 18, name: "족구" },
  ];

  const allHobbies = [
    { id: -1, name: "전체" },
    { id: 0, name: "일상" },
    ...indoorHobbies,
    ...outdoorHobbies,
  ];

  // 포스트 처리
  const handlePost = async () => {
    // e.preventDefault();

    try {
      const response = await fetch(API_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ 세션 유지
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("data", data);

      navigate("/grouplogin", { state: { group_id: data.group_id } });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  // const [selectedRegion, setSelectedRegion] = useState({ id: null, name: "지역 선택" });
  // const [selectedHobby, setSelectedHobby] = useState({ id: null, name: "카테고리 선택" });

  const [selectedRegion, setSelectedRegion] = useState({
    id: -1,
    name: "전체",
  });
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
    .filter(
      (post) => selectedHobby.id === -1 || post.tags.includes(selectedHobby.id)
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
