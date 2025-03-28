import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: #ffdbd7;
  color: white;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: white;
  color: #ff5c5c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ffe5e2;
  }
`;

const SectionNine = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      Section 9
      <Button onClick={() => navigate("/freeboard")}>자세히 보기</Button>
    </SectionWrapper>
  );
};

export default SectionNine;
