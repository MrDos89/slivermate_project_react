// ../components/MyPageComponents/LectureSection.jsx
import styled from "styled-components";

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  text-align: left; /* 왼쪽 정렬 */

`;


const DividerWrapper = styled.div`
  //   display: flex;
  //   justify-content: center; /* 중앙 정렬 */
  position: relative;
  width: 1300px; /* 구분선 너비 = 뷰포트 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  overflow: hidden; /* ❗️ 히든 영역 처리 */
`;

const Divider = styled.hr`
  width: 100%;
  margin: 15px 0;
  //   width: 900px; /*구분선 길이*/
`;

const LectureSliderWrapper = styled.div`
  // position: relative;
  width: 100%;
  // overflow: hidden;
`;

const LectureList = styled.div`
  display: flex;
  gap: 12px;
  // width: 100%;
  width: fit-content;
  transition: transform 0.4s ease-in-out;
`;

const LectureThumbnail = styled.img`
  width: 190px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(0, 0, 0);
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: #4fc3f7;
  }
`;

const LeftButton = styled(NavButton)`
  left: -10px;
`;

const RightButton = styled(NavButton)`
  right: -10px;
`;

const LectureSectionContainer = styled.div`
  margin-top: 40px;
`;

function LectureSection({
  user,
  startIndex,
  handlePrev,
  handleNext,
  VISIBLE_COUNT,
}) {
  return (
    <LectureSectionContainer>
      <SectionTitle>내가 시청중인 강의</SectionTitle>
      <DividerWrapper>
        <Divider />
        <LectureSliderWrapper>
          {startIndex > 0 && <LeftButton onClick={handlePrev}>‹</LeftButton>}
          <LectureList
            style={{
              transform: `translateX(-${startIndex * 132}px)`,
            }}
          >
            {user.watchingLectures.map((lecture) => (
              <LectureThumbnail
                key={lecture.id}
                src={lecture.thumbnail}
                alt={lecture.title}
              />
            ))}
          </LectureList>
          {startIndex + VISIBLE_COUNT < user.watchingLectures.length && (
            <RightButton onClick={handleNext}>›</RightButton>
          )}
        </LectureSliderWrapper>
        <Divider />
      </DividerWrapper>
    </LectureSectionContainer>
  );
}

export default LectureSection;
