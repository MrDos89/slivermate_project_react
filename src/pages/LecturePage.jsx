import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const SORT_OPTIONS = ["추천순", "최신순", "좋아요순"];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-top: 60px;
`;

const FixedTop = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  width: 100vw;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBarWrapper = styled.form`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px;
  font-size: 1rem;
  border: 2px solid #a5d6a7;
  border-radius: 30px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #66bb6a;
  }
  &::placeholder {
    color: #a5a5a5;
    font-style: italic;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #66bb6a;
  font-size: 1.2rem;
  &:hover {
    color: #43a047;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
  margin-right: 30px;
`;

const SubCategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
  align-items: center;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #4caf50;
  font-weight: ${({ $active, $isTotal }) =>
    $active || $isTotal ? "bold" : "normal"};
  border-radius: 5px;
  cursor: pointer;
  transition: font-weight 0.2s ease;
  &:hover {
    font-weight: bold;
  }
`;

const SortDropdown = styled.select`
  margin-top: 20px;
  padding: 8px 12px;
  display: block;
  margin-left: 0;
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
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://43.201.50.194:18090/api/lesson") // ✅ 하드코딩된 주소
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = lessons
    .filter((lesson) => {
      const categoryMatch =
        mainCategory === "실내"
          ? lesson.lesson_category === 1
          : lesson.lesson_category === 2;

      const subMatch =
        subCategory === "전체" || lesson.lesson_sub_category === subCategory;

      const searchMatch =
        lesson.lesson_name.includes(searchTerm) ||
        lesson.lesson_sub_category.includes(searchTerm);

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
        <Inner>
          <SearchBarWrapper onSubmit={(e) => e.preventDefault()}>
            <SearchBar
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaLeaf />
            </SearchButton>
          </SearchBarWrapper>
          <CategoryWrapper>
            {Object.entries(CATEGORY_MAP).map(([group, buttons]) => (
              <SubCategoryRow key={group}>
                <CategoryTitle>{group}</CategoryTitle>
                {buttons.map((btn) => {
                  const isActive =
                    mainCategory === group &&
                    (subCategory === btn ||
                      (btn === "전체" && subCategory === "전체"));
                  const isTotal = btn === "전체";

                  return (
                    <CategoryButton
                      key={btn}
                      $active={isActive}
                      $isTotal={isTotal}
                      onClick={() => {
                        setMainCategory(group);
                        setSubCategory(btn);
                      }}
                    >
                      {btn}
                    </CategoryButton>
                  );
                })}
              </SubCategoryRow>
            ))}
          </CategoryWrapper>
        </Inner>
      </FixedTop>

      <ScrollableContent>
        <div style={{ textAlign: "left" }}>
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
        </div>

        <CardGrid>
          {filtered.map((lesson) => (
            <Card
              key={lesson.lesson_id}
              onClick={() => navigate(`/lecture/${lesson.lesson_id}`)}
              style={{ cursor: "pointer" }}
            >
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
