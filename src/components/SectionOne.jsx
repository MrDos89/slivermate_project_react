import styled from "styled-components";

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: ${(props) => props.bgColor};
  color: white;
`;

const SectionOne = () => {
  return <SectionWrapper bgColor="#c9eaff">Section 1</SectionWrapper>;
};

export default SectionOne;
