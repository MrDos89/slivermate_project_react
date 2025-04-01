import React, { useState } from "react";
import styled from "styled-components";
import { FaLeaf } from "react-icons/fa";

// 🔹 카테고리 ID 매핑 및 취미 데이터
const categoryIds = { "실내 활동": 1, "실외 활동": 2 };

const indoorHobbies = [
  { id: 1, name: "뜨개질", image: "lib/images/knitting.jpg" },
  { id: 2, name: "그림", image: "lib/images/drawing.jpg" },
  { id: 3, name: "독서", image: "lib/images/reading.jpg" },
  { id: 4, name: "영화 감상", image: "lib/images/movie.jpg" },
  { id: 5, name: "퍼즐", image: "lib/images/puzzle.jpg" },
  { id: 6, name: "요리", image: "lib/images/cooking.jpg" },
  { id: 7, name: "통기타", image: "lib/images/guitar.jpg" },
  { id: 8, name: "당구", image: "lib/images/billiards.jpg" },
  { id: 9, name: "바둑", image: "lib/images/go.jpg" },
];

const outdoorHobbies = [
  { id: 1, name: "등산", image: "lib/images/hiking.jpg" },
  { id: 2, name: "자전거", image: "lib/images/cycling.jpg" },
  { id: 3, name: "캠핑", image: "lib/images/camping.jpg" },
  { id: 4, name: "낚시", image: "lib/images/fishing.jpg" },
  { id: 5, name: "러닝/마라톤", image: "lib/images/running.jpg" },
  { id: 6, name: "수영", image: "lib/images/surfing.jpg" },
  { id: 7, name: "골프", image: "lib/images/golf.jpg" },
  { id: 8, name: "테니스", image: "lib/images/tennis.jpg" },
  { id: 9, name: "족구", image: "lib/images/foot.jpg" },
];

const CATEGORY_MAP = {
  "실내 활동": indoorHobbies,
  "실외 활동": outdoorHobbies,
};

// 🔹 지역 정보 매핑
const region = {
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

// 🔹 취미 이름 헬퍼 함수
const getHobbyNameById = (id, type) => {
  const source = type === "실내 활동" ? indoorHobbies : outdoorHobbies;
  const found = source.find((h) => h.id === id);
  return found?.name || "알 수 없음";
};

// 🔹 동아리 더미 데이터
const dummyClubs = [
  {
    id: 1,
    name: "파릇 독서 모임",
    regionId: 1,
    hobbyType: "실내 활동",
    hobbyId: 3,
    description: "책을 통해 서로의 생각을 나누는 따뜻한 모임입니다.",
    thumbnail: "lib/images/reading.jpg",
  },
  {
    id: 2,
    name: "산으로 가자",
    regionId: 15,
    hobbyType: "실외 활동",
    hobbyId: 1,
    description: "매주 등산으로 자연을 즐기고 건강을 챙겨요!",
    thumbnail: "lib/images/hiking.jpg",
  },
  {
    id: 3,
    name: "맛있는 요리 연구소",
    regionId: 9,
    hobbyType: "실내 활동",
    hobbyId: 6,
    description: "요리를 사랑하는 사람들이 모인 동아리입니다.",
    thumbnail: "lib/images/cooking.jpg",
  },
];

// ✅ 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const SubCategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
  align-items: center;
`;

const CategoryTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
  margin-right: 30px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #4caf50;
  font-weight: ${({ $active, $isTotal }) =>
    $isTotal ? "bold" : $active ? "bold" : "normal"};
  border-radius: 5px;
  cursor: pointer;
  transition: font-weight 0.2s ease;

  &:hover {
    font-weight: bold;
  }
`;

// 🔹 동아리 카드용 스타일
const ClubListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

const ClubCard = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const ClubInfo = styled.div`
  flex: 1;
`;

const ClubTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ClubMeta = styled.div`
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const ClubDesc = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 20px;
`;

// ✅ 컴포넌트
const ClubPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //const [mainCategory, setMainCategory] = useState("실내 활동");
  const [mainCategory, setMainCategory] = useState(null); // null이 전체 상태
  const [subCategoryId, setSubCategoryId] = useState(null); // null == 전체


//   const filteredClubs = dummyClubs.filter((club) => {
//     const matchesMain = club.hobbyType === mainCategory;
//     const matchesSub =
//       subCategoryId === null || club.hobbyId === subCategoryId;
//     return matchesMain && matchesSub;
//   });
const filteredClubs = dummyClubs.filter((club) => {
    const matchesMain =
      mainCategory === null || club.hobbyType === mainCategory;
    const matchesSub =
      subCategoryId === null || club.hobbyId === subCategoryId;
    return matchesMain && matchesSub;
  });

  return (
    <Container>
      <FixedTop>
        <Inner>
          {/* 🔍 검색창 */}
          <SearchBarWrapper
            onSubmit={(e) => {
              e.preventDefault();
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

          {/* 🟩 카테고리 필터 */}
          <CategoryWrapper>
            {Object.entries(CATEGORY_MAP).map(([group, hobbies]) => (
              <SubCategoryRow key={group}>
                <CategoryTitle>{group}</CategoryTitle>
                <CategoryButton
                  $active={mainCategory === group && subCategoryId === null}
                  $isTotal={true}
                  onClick={() => {
                    setMainCategory(group);
                    setSubCategoryId(null);
                  }}
                >
                  전체
                </CategoryButton>
                {hobbies.map((hobby) => (
                  <CategoryButton
                    key={hobby.id}
                    $active={
                      mainCategory === group && subCategoryId === hobby.id
                    }
                    $isTotal={false}
                    onClick={() => {
                      setMainCategory(group);
                      setSubCategoryId(hobby.id);
                    }}
                  >
                    {hobby.name}
                  </CategoryButton>
                ))}
              </SubCategoryRow>
            ))}
          </CategoryWrapper>
        </Inner>
      </FixedTop>

      {/* 🧩 동아리 카드 리스트 */}
      <ClubListWrapper>
        {filteredClubs.map((club) => (
          <ClubCard key={club.id}>
            <ClubInfo>
              <ClubTitle>{club.name}</ClubTitle>
              <ClubMeta>
                ({region[club.regionId]}) / (
                {getHobbyNameById(club.hobbyId, club.hobbyType)})
              </ClubMeta>
              <ClubDesc>{club.description}</ClubDesc>
            </ClubInfo>
            <Thumbnail src={club.thumbnail} alt="club thumbnail" />
          </ClubCard>
        ))}
      </ClubListWrapper>
    </Container>
  );
};

export default ClubPage;
