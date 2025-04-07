import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../images/skantlarl.mp4";

const SectionWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: transparent;
  color: white;
  flex-direction: column;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const MakeClubButton = styled.button`
  margin-top: 20px;
  padding: 16px 28px;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    color: #fffae5;
    border-color: #fffae5;
  }
`;

const SectionEight = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        영상이 지원되지 않습니다.
      </BackgroundVideo>
      <MakeClubButton onClick={() => navigate("/create-club")}>
        나무 심기
      </MakeClubButton>
    </SectionWrapper>
  );
};
export default SectionEight;
