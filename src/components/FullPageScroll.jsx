import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SectionOne from "./SectionOne.jsx";
import SectionTwo from "./SectionTwo.jsx";
import SectionThree from "./SectionThree.jsx";
import SectionFour from "./SectionFour.jsx";
import SectionFive from "./SectionFive.jsx";
import SectionSix from "./SectionSix.jsx";
import SectionSeven from "./SectionSeven.jsx";
import SectionEight from "./SectionEight.jsx";
import SectionNine from "./SectionNine.jsx";
import CustomerModal from "./CustomerModal/CustomerModal"; 


// const FullPageWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   overflow: hidden;
// `;
const FullPageWrapper = styled.div`
  position: fixed;
  top: 60px; /* 헤더 아래로 배치 */
  left: 0;
  width: 100vw;
  height: calc(100vh - 60px); /* 헤더 높이(60px) 만큼 뺌 */
  overflow: hidden;
`;

const NavigationContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const NavButton = styled.button`
  width: 10px;
  height: 10px;
  display: block;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#67dbff" : "#ccc")};
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  box-sizing: content-box; /* 🔥 박스 크기 제대로 조정 */
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #ffffff;
  }
`;

const SectionsContainer = styled.div`
  position: fixed;
  top: 60px; // ✅ 헤더 높이만큼 내려줘야 겹치지 않음
  left: 0;
  width: 100vw;
  height: 900vh; /* 9개 섹션이므로 900vh */
  display: flex;
  flex-direction: column;
  transition: transform 0.8s ease-in-out;
  transform: translateY(${(props) => props.scrollIndex * -100}vh);
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
`;

const FixedButton = styled.button`
  padding: 20px 20px;
  background-color: #67dbff;
  color: white;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;

  &:hover {
    background-color: #46c3e3;
  }
`;

function FullPageScroll({ scrollIndex, setScrollIndex }) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo !== null) {
      const index = parseInt(scrollTo, 10);
      if (!isNaN(index)) {
        setScrollIndex(index);
      }
    }
  }, [location.search, setScrollIndex]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        setScrollIndex((prev) => Math.min(prev + 1, 8));
      } else {
        setScrollIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [setScrollIndex]);

  const [showModal, setShowModal] = useState(false);

  return (
    <FullPageWrapper>
      <NavigationContainer>
        {[...Array(9)].map((_, index) => (
          <NavButton
            key={index}
            active={scrollIndex === index}
            onClick={() => setScrollIndex(index)}
          />
        ))}
      </NavigationContainer>

      <SectionsContainer scrollIndex={scrollIndex}>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        <SectionSeven />
        <SectionEight />
        <SectionNine />
      </SectionsContainer>

      <FixedButtonContainer>
  {/* <FixedButton onClick={() => alert("고객센터 연결 준비 중입니다.")}>📞</FixedButton> */}
  <FixedButton onClick={() => setShowModal(true)}>📞</FixedButton>
  <FixedButton onClick={() => alert("채팅 기능은 추후 추가 예정입니다.")}>💬</FixedButton>
</FixedButtonContainer>

{showModal && <CustomerModal onClose={() => setShowModal(false)} />}

    </FullPageWrapper>
  );
}

export default FullPageScroll;
