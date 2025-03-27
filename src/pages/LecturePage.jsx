import React, { useState } from "react";
import styled from "styled-components";

// 더미 데이터 (SliverLesson 기반)
const lectureDummy = [
  {
    lesson_id: 1,
    user_id: 101,
    lesson_name: "따뜻한 hot뜨개질 클래스",
    lesson_desc: "초보자도 쉽게 배우는 겨울 준비 뜨개질!",
    lesson_category: 1, // 실내
    lesson_sub_category: "뜨개질",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 10000,
    register_date: "2024-01-01",
    is_hidden: false,
    upd_date: "2024-01-02",
    user_name: "홍길동",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 12,
    recommended: 50,
  },
  {
    lesson_id: 2,
    user_id: 102,
    lesson_name: "북쪽으로 go",
    lesson_desc: "강해지고 싶은 자, 북쪽 산으로 모여라 정상에서 회춘을 할지니",
    lesson_category: 2, // 실외
    lesson_sub_category: "등산",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 15000,
    register_date: "2024-02-15",
    is_hidden: false,
    upd_date: "2024-02-20",
    user_name: "이몽룡",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 30,
    recommended: 80,
  },
  {
    lesson_id: 3,
    user_id: 103,
    lesson_name: "참 쉽죠?",
    lesson_desc: "밥 아저씨가 될 마지막 기회",
    lesson_category: 1, // 실내
    lesson_sub_category: "그림",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 15000,
    register_date: "2024-02-15",
    is_hidden: false,
    upd_date: "2024-02-20",
    user_name: "이몽룡",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 30,
    recommended: 80,
  },
  {
    lesson_id: 4,
    user_id: 104,
    lesson_name: "노안을 이기는 모임",
    lesson_desc: "노안때문에 책 읽기 힘들다? 전부 핑계입니다 츄ㅜ라이츄라이",
    lesson_category: 1,
    lesson_sub_category: "독서",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 15000,
    register_date: "2024-02-15",
    is_hidden: false,
    upd_date: "2024-02-20",
    user_name: "이몽룡",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 30,
    recommended: 80,
  },
  {
    lesson_id: 5,
    user_id: 105,
    lesson_name: "영화관 팝콘이 세상에서 제일 맛있는 60대 모임",
    lesson_desc: "근데 너무 비싸죠? 그러니 n빵을 하기 위해 만들었습니다",
    lesson_category: 1,
    lesson_sub_category: "영화감상",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 15000,
    register_date: "2024-02-15",
    is_hidden: false,
    upd_date: "2024-02-20",
    user_name: "이몽룡",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 30,
    recommended: 80,
  },
  {
    lesson_id: 5,
    user_id: 105,
    lesson_name: "내 발로 뛰기 힘들어서 자전거를 샀다",
    lesson_desc: "근데 더 힘들다 허벅지 자극 미쳤죠;;",
    lesson_category: 2, // 실외
    lesson_sub_category: "자전거",
    lesson_free_lecture: "",
    lesson_cost_lecture: "",
    lesson_thumbnail: "https://via.placeholder.com/150",
    lesson_price: 15000,
    register_date: "2024-02-15",
    is_hidden: false,
    upd_date: "2024-02-20",
    user_name: "이몽룡",
    user_thumbnail: "https://via.placeholder.com/50",
    likes: 30,
    recommended: 80,
  },
];

const CATEGORY_MAP = {
  실내: [
    "전체",
    "뜨개질",
    "그림",
    "독서",
    "영화감상",
    "퍼즐",
    "요리",
    "통기타",
    "당구",
    "바둑",
  ],
  실외: [
    "전체",
    "등산",
    "자전거",
    "캠핑",
    "낚시",
    "러닝",
    "수영",
    "골프",
    "테니스",
    "족구",
  ],
};

const SORT_OPTIONS = ["가격순", "추천순", "최신순", "좋아요순"];

const Wrapper = styled.div`
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 20px 20px;
  padding-top: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; // 전체 높이
  overflow: hidden;
`;

const FixedTop = styled.div`
  flex-shrink: 0;
  padding: 20px;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  margin-bottom: 30px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 20px;
`;

const CategoryTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
`;

const SubCategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${({ $active }) => ($active ? "#28a745" : "#ddd")};
  color: ${({ $active }) => ($active ? "white" : "black")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-radius: 5px;
  cursor: pointer;
`;

const SortDropdown = styled.select`
  margin-top: 20px;
  padding: 8px 12px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  background: white;
  text-align: center;
`;

const Thumb = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 10px 0 5px;
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: #444;
`;

const LecturePage = () => {
  const [mainCategory, setMainCategory] = useState("실내");
  const [subCategory, setSubCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("가격순");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = lectureDummy
    .filter((lesson) => {
      const categoryMatch =
        mainCategory === "실내"
          ? lesson.lesson_category === 1
          : lesson.lesson_category === 2;
      const subMatch =
        subCategory === "전체" || lesson.lesson_sub_category === subCategory;
      const searchMatch = lesson.lesson_name.includes(searchTerm);
      return categoryMatch && subMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "가격순":
          return a.lesson_price - b.lesson_price;
        case "추천순":
          return b.recommended - a.recommended;
        case "좋아요순":
          return b.likes - a.likes;
        case "최신순":
          return new Date(b.register_date) - new Date(a.register_date);
        default:
          return 0;
      }
    });

  return (
    <Container>
      <FixedTop>
        <SearchBar
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <CategoryWrapper>
          {Object.entries(CATEGORY_MAP).map(([group, buttons]) => (
            <SubCategoryRow key={group}>
              <CategoryTitle style={{ marginTop: 0 }}>{group}</CategoryTitle>
              {buttons.map((btn) => (
                <CategoryButton
                  key={btn}
                  $active={mainCategory === group && subCategory === btn}
                  onClick={() => {
                    setMainCategory(group);
                    setSubCategory(btn);
                  }}
                >
                  {btn}
                </CategoryButton>
              ))}
            </SubCategoryRow>
          ))}
        </CategoryWrapper>
      </FixedTop>

      <ScrollableContent>
        <SortDropdown
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SortDropdown>

        <CardGrid>
          {filtered.map((lesson) => (
            <Card key={lesson.lesson_id}>
              <Thumb src={lesson.lesson_thumbnail} />
              <Title>{lesson.lesson_name}</Title>
              <Author>{lesson.user_name}</Author>
              <Desc>{lesson.lesson_desc}</Desc>
            </Card>
          ))}
        </CardGrid>
      </ScrollableContent>
    </Container>
  );
};

export default LecturePage;
