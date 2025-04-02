import React, { useState } from "react";
import styled from "styled-components";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  dummyClubs,
  CATEGORY_MAP,
  categoryIds,
  region,
  getHobbyNameById,
} from "../data/clubData";
import {
  Container,
  FixedTop,
  Inner,
  SearchBarWrapper,
  SearchBar,
  SearchButton,
  CategoryWrapper,
  SubCategoryRow,
  CategoryTitle,
  CategoryButton,
  ClubListWrapper,
  ClubCard,
  ClubInfo,
  ClubTitle,
  ClubMeta,
  ClubDesc,
  Thumbnail,
  DropdownWrapper,
  RegionLabel,
  RegionDropdown,
  PaginationWrapper,
  PageButton,
} from "../js/ClubPage.styles.js"; // ✅ 여기서 불러옴

// ✅ 컴포넌트
const ClubPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //const [mainCategory, setMainCategory] = useState("실내 활동");
  const [mainCategory, setMainCategory] = useState(null); // null이 전체 상태
  const [subCategoryId, setSubCategoryId] = useState(null); // null == 전체
  const [selectedRegionId, setSelectedRegionId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 5;

  const navigate = useNavigate();

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
      subCategoryId === null || club.club_sub_category_id === subCategoryId;
    const matchesRegion =
      selectedRegionId === null || club.region_id === selectedRegionId;
    const matchesSearch =
      club.club_name.includes(searchTerm) ||
      club.club_desc.includes(searchTerm);
    return matchesMain && matchesSub && matchesRegion && matchesSearch;
  });

  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const startIndex = (currentPage - 1) * clubsPerPage;
  const paginatedClubs = filteredClubs.slice(
    startIndex,
    startIndex + clubsPerPage
  );

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

      {/* 🟡 지역 드롭다운 필터 추가 */}
      <DropdownWrapper>
        <RegionLabel>지역 선택:</RegionLabel>
        <RegionDropdown
          value={selectedRegionId ?? ""}
          onChange={(e) =>
            setSelectedRegionId(
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        >
          <option value="">전체 지역</option>
          {Object.entries(region).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </RegionDropdown>
      </DropdownWrapper>

      {/* 🧩 동아리 카드 리스트 */}
      <ClubListWrapper>
        {paginatedClubs.length === 0 ? (
          <div>해당 조건에 맞는 동아리가 없습니다.</div>
        ) : (
          paginatedClubs.map((club) => (
            <ClubCard
              key={club.club_id}
              onClick={() => navigate(`/club/${club.club_id}`)}
            >
              <ClubInfo>
                <ClubTitle>{club.club_name}</ClubTitle>
                <ClubMeta>
                  ({region[club.region_id]}) / (
                  {getHobbyNameById(club.club_sub_category_id, club.hobbyType)})
                </ClubMeta>
                <ClubDesc>{club.club_desc}</ClubDesc>
              </ClubInfo>
              <Thumbnail src={club.club_thumbnail} alt="club thumbnail" />
            </ClubCard>
          ))
        )}
      </ClubListWrapper>
      {/* ✅ 페이지네이션 */}
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationWrapper>
    </Container>
  );
};

export default ClubPage;
