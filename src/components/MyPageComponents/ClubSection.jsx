import styled from "styled-components";

const ClubSectionWrapper = styled.div`
  margin-top: 120px;
`;

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

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
`;

const ClubCardWrapper = styled.div`
  position: relative;
`;

const CrownIcon = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  font-size: 40px;
  z-index: 10;
`;

const ClubCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  height: 220px;
  display: flex;
  flex-direction: column;
`;

const ClubThumbnailWrapper = styled.div`
  position: relative;
  height: 120px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  opacity: 0.9;
`;

const ClubOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
`;

const ClubName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ClubInfo = styled.div`
  font-size: 14px;
`;

const ClubPosts = styled.div`
  padding: 10px;
  font-size: 13px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ClubPost = styled.div`
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ClubSection({ dummyClubs, regionMap, hobbyMap, sectionTitle, userId }) {
  const isOwner = (club) => {
    if (!userId) return false;
    return club.clubUserId === userId;
  };

  const sortedClubs = [...dummyClubs].sort((a, b) =>
    isOwner(b) - isOwner(a)
  );

  return (
    <ClubSectionWrapper>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <ClubGrid>
        {sortedClubs.map((club) => {
          const regionName = regionMap[club.regionId] || "지역 미정";
          const hobbyKey = club.categoryId === 1 ? "indoor" : "outdoor";
          const hobbyName =
            hobbyMap[hobbyKey]?.list[club.hobbyId] || "취미 미정";
          const isCreatedByMe = isOwner(club);

          return (
            <ClubCardWrapper key={club.id}>
              {isCreatedByMe && <CrownIcon>👑</CrownIcon>}
              <ClubCard>
                <ClubThumbnailWrapper img={club.thumbnail}>
                  <ClubOverlay>
                    <div style={{ textAlign: "right", width: "100%" }}>
                      <ClubName>{club.name}</ClubName>
                      <ClubInfo>
                        {regionName} / {hobbyName} / {club.members}명
                      </ClubInfo>
                    </div>
                  </ClubOverlay>
                </ClubThumbnailWrapper>
                <ClubPosts>
                  {club.posts.map((post, i) => (
                    <ClubPost key={i}>• {post}</ClubPost>
                  ))}
                </ClubPosts>
              </ClubCard>
            </ClubCardWrapper>
          );
        })}
      </ClubGrid>
    </ClubSectionWrapper>
  );
}

export default ClubSection;
