import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: #ffffff;
  color: white;
  flex-direction: column;
`;

const MakeClubButton = styled.button`
  margin-top: 20px;
  padding: 16px 28px;
  font-size: 1.4rem;
  background-color: #008552;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #006f47;
  }
`;

const SectionEight = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <MakeClubButton onClick={() => navigate("/create-club")}>
        모임 만들기
      </MakeClubButton>
    </SectionWrapper>
  );
};

export default SectionEight;
