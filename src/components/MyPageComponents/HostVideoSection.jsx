// ../components/MyPageComponents/HostVideoSection.jsx
import styled from "styled-components";

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  text-align: left;
`;

const DividerWrapper = styled.div`
  position: relative;
  width: 1300px;
  margin: 0 auto;
  overflow: hidden;
`;

const Divider = styled.hr`
  width: 100%;
  margin: 15px 0;
`;

const LectureSliderWrapper = styled.div`
  width: 100%;
`;

const LectureList = styled.div`
  display: flex;
  gap: 12px;
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
  padding: 10px;
`;

function HostVideoSection({
  user,
  startIndex,
  handlePrev,
  handleNext,
  VISIBLE_COUNT,
}) {
  return (
    <LectureSectionContainer>
      <SectionTitle>내 호스트 영상</SectionTitle>
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

export default HostVideoSection;
