import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../images/rkdtk.png";
import image2 from "../images/gkrtod.png";
import image3 from "../images/clsrn.png";
import thumb1 from "../images/thumb1.png";
import thumb2 from "../images/thumb2.png";
import thumb3 from "../images/thumb3.png";
import thumb4 from "../images/thumb4.png";
import thumb5 from "../images/thumb5.png";

const thumbnailImages = [thumb1, thumb2, thumb3, thumb4, thumb5];

const LOOP_COUNT = 3; // 반복 횟수
const repeatedThumbnails = Array.from(
  { length: LOOP_COUNT },
  () => thumbnailImages
).flat();

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
  margin-top: 50px;
`;

const MainText = styled.h1`
  @font-face {
    font-family: "CBNUJIKJI";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/CBNUJIKJI.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "KimjungchulMyungjo-Bold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulMyungjo-Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  font-family: "KimjungchulMyungjo-Bold";

  font-size: 3.1rem;
  font-weight: bold;
  color: black;
  // margin-bottom: 1rem;
`;

const SubText = styled.p`
  @font-face {
    font-family: "MapoPeacefull";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "MapoPeacefull";

  font-size: 1.5rem;
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

const ImageText = styled.div`
  @font-face {
    font-family: "KCCMurukmuruk";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCCMurukmuruk.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "MaplestoryOTFBold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "MaplestoryOTFBold";
  margin-top: 30px;
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: rgb(1, 88, 46);
  font-weight: bold;
  white-space: nowrap; // 줄바꿈 방지
  margin-left: 395px;
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
  margin-top: -40px;
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
  margin-top: 50px;
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
  ${({ direction }) => (direction === "left" ? "left: -10px" : "right: -10px")};
  transform: translateY(-50%);
  width: 32px;
  height: 32px;

  color: #66bb6a; // 연초록
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px); // 부드러운 유리 느낌
  transition: all 0.2s ease;
`;

const CenteredButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -17px;
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

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 25px;
  position: relative;
  margin-top: 70px;
  perspective: 1000px;
`;

const FlipSpan = styled.span`
  position: relative;
  padding: 15px;
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 50px; // 텍스트 수직 중앙 정렬
  text-align: center; // 텍스트 수평 중앙 정렬
  transition: 0.5s;
  color: ${(props) => (props.red ? "#fff" : "#3e8560")}; // 기본 텍스트 색상
  background: ${(props) => (props.red ? "#3e8560" : "#fff")}; // 기본 배경색
  margin-right: 2px;

  &:before,
  &:after {
    content: attr(data-attr);
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: 0.5s;
    backface-visibility: hidden;
    line-height: 50px;
  }

  &:before {
    color: ${(props) => (props.red ? "#3e8560" : "#fff")}; // 반전된 텍스트 색상
    background: ${(props) => (props.red ? "#fff" : "#3e8560")}; // 반전된 배경색
    transform-origin: ${(props) => (props.red ? "bottom" : "top")};
    transform: rotateX(90deg)
      translateY(${(props) => (props.red ? "50%" : "-50%")});
    z-index: 1;
  }

  &:after {
    color: ${(props) => (props.red ? "#fff" : "#3e8560")}; // 기본 텍스트 색상
    background: ${(props) => (props.red ? "#3e8560" : "#fff")}; // 기본 배경색
    transform-origin: ${(props) => (props.red ? "top" : "bottom")};
    transform: rotateX(0deg) translateY(0%);
    z-index: 2;
  }

  ${StyledLink}:hover &::before {
    transform: rotateX(0deg) translateY(0%);
  }

  ${StyledLink}:hover &::after {
    transform: rotateX(90deg)
      translateY(${(props) => (props.red ? "-50%" : "50%")});
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

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % repeatedThumbnails.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + repeatedThumbnails.length) % repeatedThumbnails.length
    );
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
          <ImageText>{texts[activeIndex]}</ImageText>
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
            totalWidth={repeatedThumbnails.length * THUMB_TOTAL}
            style={{
              transform: `translateX(-${currentSlide * THUMB_TOTAL}px)`,
            }}
          >
            {repeatedThumbnails.map((thumb, idx) => (
              <Thumbnail key={idx} src={thumb} alt={`썸네일 ${idx + 1}`} />
            ))}
          </SliderTrack>
          <ArrowButton direction="right" onClick={handleNext}>
            ❯
          </ArrowButton>
        </ThumbnailSlider>
        <CenteredButtonWrapper>
          <StyledLink to="/lecture">
            <FlipSpan data-attr="강의실">강의실</FlipSpan>
            <FlipSpan data-attr="입장" red>
              입장
            </FlipSpan>
          </StyledLink>
        </CenteredButtonWrapper>
      </RightWrapper>
    </SectionWrapper>
  );
};

export default SectionFour;
