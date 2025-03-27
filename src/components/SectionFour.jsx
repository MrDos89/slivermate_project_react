import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import image1 from "../images/rkdtk.png";
import image2 from "../images/gkrtod.png";
import image3 from "../images/clsrn.png";
import thumb1 from "../images/thumb1.png";
import thumb2 from "../images/thumb2.png";
import thumb3 from "../images/thumb3.png";
import thumb4 from "../images/thumb4.png";
import thumb5 from "../images/thumb5.png";

const thumbnailImages = [thumb1, thumb2, thumb3, thumb4, thumb5];

const images = [image1, image2, image3];
const texts = ["믿고보는 파릇 강사", "월결제로 무한 강의", "배움을 공유"];

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  // background: hsl(0, 0%, 100%);
  background: #e1f7d5;
  display: flex;
  align-items: center;
  // justify-content: flex-start;
  justify-content: space-between;
  // padding-left: 170px;
  // padding: 0 100px;
  padding-right: 50px;
  padding-left: 150px;
  box-sizing: border-box;
  padding-bottom: 50px;
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

const RightWrapper = styled.div`
  width: 700px;
  text-align: right;
  padding-right: 230px;
`;

const MainText = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const ImageBox = styled.img`
  position: absolute;
  transition: all 0.6s ease-in-out;
  opacity: ${({ position }) => (position === "center" ? 1 : 0.3)};
  transform: ${({ position }) =>
    position === "left"
      ? "translateX(-55%) scale(0.5)"
      : position === "right"
      ? "translateX(55%) scale(0.5)"
      : "translateX(0) scale(1.3)"};
  z-index: ${({ position }) => (position === "center" ? 2 : 1)};
  width: 100%;
  height: 100%;
  // object-fit: cover;
  object-fit: contain;
  border-radius: 12px;
`;

const CircleWrapper = styled.div`
  width: 600px;
  height: 600px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

const TextBox = styled.div`
  width: 100%;
  margin-top: 70px;
  font-size: 1.5rem;
  color: #222;
  text-align: center;
`;

const ThumbnailSlider = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  margin-top: 40px;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: ${({ totalWidth }) => totalWidth}px;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 133px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 0" : "right: 0")};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #32a852; // 녹색
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 70px;

  &:hover {
    background-color: #28a745;
  }
`;

const SectionFour = () => {
  const THUMB_WIDTH = 200;
  const THUMB_MARGIN = 10;
  const THUMB_TOTAL = THUMB_WIDTH + THUMB_MARGIN;
  const VISIBLE_AREA_WIDTH = 700; // RightWrapper 기준
  const visibleCount = Math.floor(VISIBLE_AREA_WIDTH / THUMB_TOTAL);
  const maxSlide = Math.max(thumbnailImages.length - visibleCount, 0);

  const navigate = useNavigate();

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % thumbnailImages.length);
  //   }, 3000); // 3초 간격

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <SectionWrapper>
      <LeftWrapper>
        <CircleWrapper>
          <ImageContainer>
            {images.map((img, idx) => (
              <ImageBox key={idx} src={img} position={getPosition(idx)} />
            ))}
          </ImageContainer>
          <TextBox>{texts[activeIndex]}</TextBox>
        </CircleWrapper>
      </LeftWrapper>
      <RightWrapper>
        <MainText>배움에는 정년이 없다</MainText>
        <MainText>인생 2막, 배움으로 더욱 풍성하게</MainText>
        <SubText>
          파릇에선 경험과 지혜를 나누며 <br />
          새로운 도전을 시작할 기회를 제공합니다.
        </SubText>
        <ThumbnailSlider>
          <ArrowButton direction="left" onClick={handlePrev}>
            ❮
          </ArrowButton>
          <SliderTrack
            totalWidth={thumbnailImages.length * THUMB_TOTAL}
            style={{
              transform: `translateX(-${currentSlide * THUMB_TOTAL}px)`,
            }}
          >
            {thumbnailImages.map((thumb, idx) => (
              <Thumbnail key={idx} src={thumb} alt={`썸네일 ${idx + 1}`} />
            ))}
          </SliderTrack>
          <ArrowButton direction="right" onClick={handleNext}>
            ❯
          </ArrowButton>
        </ThumbnailSlider>
        <Button onClick={() => navigate("/lecture")}>자세히 보기</Button>
      </RightWrapper>
    </SectionWrapper>
  );
};

export default SectionFour;
