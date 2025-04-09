import React, { useState } from "react";
import styled from "styled-components";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { lectureDummy } from "../data/lectureDummy";

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

// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1700px;
//   margin: 0 auto;
//   padding: 20px 20px;
//   padding-top: 60px;
// `;

{
  /* 
const FixedTop = styled.div`
  flex-shrink: 0;
  padding: 20px;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  width: 100%;
  /* max-width: 1900px;  
  margin: 0 auto;
  /* padding: 0 20px; // 좌우 여백 살짝 
`;
*/
}

const FixedTop = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
  /* padding: 20px; 제거 */
`;

const Inner = styled.div`
  width: 100vw; // ← 브라우저 기준으로 설정
  padding: 20px; // ← 여기서 여백 조정
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; // 전체 높이
  overflow: hidden;
  padding-top: 60px;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;

  /* 스크롤바 숨기기 (크로스브라우징 처리) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const SearchBarWrapper = styled.form`
  position: relative;
  //width: 60%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px; // 오른쪽 패딩 확보
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

const CenteredBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; // 가운데 정렬 핵심!
`;

const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  // align-items: center; // 가운데 정렬
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
  display: block; /*  block 요소로 */
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

  const navigate = useNavigate();

  const filtered = lectureDummy
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
          <SearchBarWrapper
            onSubmit={(e) => {
              e.preventDefault();
              // 검색 실행 로직 (현재 상태 그대로 유지하므로 자동 실행됨)
            }}
          >
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
                <CategoryTitle style={{ marginTop: 0 }}>{group}</CategoryTitle>
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
                      $isTotal={isTotal} // ✅ 추가!
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

        {/* <CardGrid>
          {filtered.map((lesson) => (
            <Card key={lesson.lesson_id}>
              <Thumb src={lesson.lesson_thumbnail} />
              <Title>{lesson.lesson_name}</Title>
              <Author>{lesson.user_name}</Author>
              <Desc>{lesson.lesson_desc}</Desc>
            </Card>
          ))}
        </CardGrid> */}
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
