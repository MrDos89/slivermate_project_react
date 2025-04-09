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

// const MakeClubButton = styled.button`
//   margin-top: 20px;
//   padding: 20px 36px;
//   font-size: 45px;
//   font-weight: bold;
//   // color: white;
//   // background: transparent;
//   color: rgba(255, 255, 255, 1); // 살짝 투명한 흰색
//   background: rgba(255, 255, 255, 0.2); // 배경도 투명한 느낌 추가
//   border: 2px solid white;
//   border-radius: 12px;
//   cursor: pointer;
//   z-index: 1;
//   transition: all 0.3s ease;

//   &:hover {
//     color: #fffae5;
//     border-color: #fffae5;
//   }
// `;

const MakeClubButton = styled.button`
  margin-top: 20px;
  padding: 20px 36px;
  font-size: 45px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0);
  border: 2px solid white;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;
    transform: scale(0.1);
    transform-origin: left top;
    transition: all 0.3s ease;
  }

  &::after {
    top: auto;
    left: auto;
    bottom: 0;
    right: 0;
    transform-origin: right bottom;
  }

  &:hover {
    color: #fffae5;
    border-color: #fffae5;
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s linear;
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
