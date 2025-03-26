import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import backgroundImg from "../images/back.png";

// ✅ "책 펼치듯" 등장 애니메이션
const bookOpen = keyframes`
  from {
    opacity: 0;
    transform: rotateX(90deg) scale(0.8);
    transform-origin: bottom center;
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
`;

const SectionWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  gap: 700px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover; // ✅ 비율 유지 + 브라우저 꽉 채움
    z-index: -1;
    filter: brightness(0.85);
  }
`;

const AnimatedText = styled.div`
  @font-face {
    font-family: "Tenada";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "Tenada";
  font-size: 70px;
  font-weight: bold;
  opacity: 0;
  ${(props) =>
    props.visible &&
    css`
      animation: ${bookOpen} 0.8s ease-out forwards;
    `}
`;

const SectionOne = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <SectionWrapper ref={sectionRef}>
      <AnimatedText visible={visible}>시니어의 인생은</AnimatedText>
      <AnimatedText visible={visible}>이제 시작이다</AnimatedText>
    </SectionWrapper>
  );
};

export default SectionOne;
