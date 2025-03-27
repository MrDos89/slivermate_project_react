import { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "../images/rkdtk.png";
import image2 from "../images/gkrtod.png";
import image3 from "../images/clsrn.png";

const images = [image1, image2, image3];
const texts = ["믿고보는 파릇 강사", "월결제로 무한 강의", "배움을 공유"];

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: hsl(0, 0%, 100%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 170px;
  padding-bottom: 120px;
`;

const LeftWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 400px;
  height: 800px;
`;

const ImageBox = styled.img`
  position: absolute;
  transition: all 0.6s ease-in-out;
  opacity: ${({ position }) => (position === "center" ? 1 : 0.3)};
  transform: ${({ position }) =>
    position === "left"
      ? "translateX(-50%) scale(0.4)"
      : position === "right"
      ? "translateX(50%) scale(0.4)"
      : "translateX(0) scale(1.2)"};
  z-index: ${({ position }) => (position === "center" ? 2 : 1)};
  width: 100%;
  height: 100%;
  // object-fit: cover;
  object-fit: contain;
  border-radius: 12px;
`;

const TextBox = styled.div`
  width: 100%;
  margin-top: 70px;
  font-size: 1.5rem;
  color: #222;
  text-align: center;
`;

const SectionFour = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    if (index === activeIndex) return "center";
    if ((index + 1) % 3 === activeIndex) return "left";
    return "right";
  };

  return (
    <SectionWrapper>
      <LeftWrapper>
        <ImageContainer>
          {images.map((img, idx) => (
            <ImageBox key={idx} src={img} position={getPosition(idx)} />
          ))}
        </ImageContainer>
        <TextBox>{texts[activeIndex]}</TextBox>
      </LeftWrapper>
    </SectionWrapper>
  );
};

export default SectionFour;
