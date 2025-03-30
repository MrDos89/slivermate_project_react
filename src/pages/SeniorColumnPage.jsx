import HTMLFlipBook from "react-pageflip";
import styled from "styled-components";
import { useEffect, useState } from "react";

// 개별 페이지 컴포넌트들
import PageOne from "../components/SeniorColumnPages/PageOne";
import PageTwo from "../components/SeniorColumnPages/PageTwo";
import PageThree from "../components/SeniorColumnPages/PageThree";
import PageFour from "../components/SeniorColumnPages/PageFour";
import backgroundImage from "../images/qorud.jpg";
console.log("✅ backgroundImage 경로 확인:", backgroundImage);

const BookWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background-color: #fefcf6;
  // background-color: #ffffff;
  background: url(${backgroundImage}) no-repeat center center;
background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px;
  box-sizing: border-box;
  // background: #fffdf5;
  // background-color: #ffffff;
  background: url(${backgroundImage}) no-repeat center center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.isLeft
      ? "inset -15px 0 30px rgba(0,0,0,0.07)"
      : "inset 15px 0 30px rgba(0,0,0,0.07)"};
`;

const SeniorColumnPage = () => {
  const [bookSize, setBookSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setBookSize({
        width: window.innerWidth / 2,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pages = [<PageOne />, <PageTwo />, <PageThree />, <PageFour />];

  return (
    <BookWrapper>
      {bookSize.width > 0 && (
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          size="stretch"
          minWidth={300}
          minHeight={400}
          maxShadowOpacity={0.5}
          showCover={false}
          drawShadow={true}
          flippingTime={800}
          useMouseEvents={true}
          usePortrait={false}
          style={{ width: "100vw", height: "100vh" }}
        >
          {pages.map((Component, i) => (
            <StyledPage key={i} isLeft={i % 2 === 0}>
              {Component}
            </StyledPage>
          ))}
        </HTMLFlipBook>
      )}
    </BookWrapper>
  );
};

export default SeniorColumnPage;
