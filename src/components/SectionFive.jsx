import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import image1 from "../images/ghtmxm2.jpg";
import { useNavigate } from "react-router-dom";

const expandCircle = keyframes`
  from {
    clip-path: circle(10% at 50% 0%);
  }
  to {
    clip-path: circle(150% at 50% 0%);
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${image1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  clip-path: circle(10% at 50% 0%);
  z-index: 1;

  ${(props) =>
    props.animate &&
    css`
      animation: ${expandCircle} 2s ease-out forwards;
    `}
`;

const GradientOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 30%, white 80%);
  z-index: 2;
  pointer-events: none;
`;

const WhiteBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 0;
`;

const SectionWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  z-index: 3;
  color: #333;
  text-align: right;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
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
  margin-bottom: 2rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-direction: row;
  gap: 20px;
`;

const InfoText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const Divider = styled.span`
  font-size: 1.5rem;
  color: #ccc;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Counter = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #32a852; // 녹색
  margin-left: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  margin-left: 5px;
  margin-bottom: 15px;
  text-shadow: 0 -2px 0 #5f9f79, 0 1px 1px #bce5cf;
  box-sizing: border-box;
  font-size: 2em;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: #6fa884;
  height: 65px;
  line-height: 65px;
  padding: 0 32.5px;
  display: inline-block;
  width: auto;
  background: linear-gradient(to bottom, #c3e7d2 0%, #a1d1b3 26%, #7fbb98 100%);
  border-radius: 5px;
  border-top: 1px solid #e4f5ec;
  border-bottom: 1px solid #c0e3d1;
  top: 0;
  position: relative;
  transition: all 0.06s ease-out;
  box-shadow: 0 4px 0 #5f9f79;

  &:hover {
    background: linear-gradient(
      to bottom,
      #d3efe0 0%,
      #aed7c0 26%,
      #89c4a2 100%
    );
    color: white;
  }

  &:active {
    top: 4px;
    box-shadow: none;
    background: linear-gradient(
      to bottom,
      #b0d8be 0%,
      #8cc3a2 26%,
      #6fa884 100%
    );
    color: #3a5f4a;
  }

  &:visited {
    color: #6fa884;
  }
`;

const SectionFive = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef(null);

  const [hostCount, setHostCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/host-info"); // 이동
  };

  const startCounting = () => {
    let host = 54; // 목표 숫자
    let views = 11175; // 목표 숫자
    let duration = 1500;
    let steps = 60; // 60번 증가할 거야 (프레임 레이트 개념)
    let stepTime = duration / steps; // 한 번 증가할 때 걸리는 시간

    let hostIncrement = Math.ceil(host / steps); // 60번 나눠서 증가량 계산
    let viewsIncrement = Math.ceil(views / steps);

    let intervalHost = setInterval(() => {
      setHostCount((prev) => {
        if (prev + hostIncrement >= host) {
          clearInterval(intervalHost);
          return host;
        }
        return prev + hostIncrement;
      });
    }, stepTime);

    let intervalViews = setInterval(() => {
      setViewCount((prev) => {
        if (prev + viewsIncrement >= views) {
          clearInterval(intervalViews);
          return views;
        }
        return prev + viewsIncrement;
      });
    }, stepTime);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          setContentVisible(true);
          startCounting();
        }
      },
      { threshold: 0.1 } // ✅ 10%만 보여도 실행되도록 수정
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <SectionWrapper ref={sectionRef}>
      <WhiteBackground />
      <BackgroundImage animate={animate} />
      <GradientOverlay />
      <ContentWrapper visible={contentVisible}>
        <InnerContent>
          <MainText>배우는 기쁨에서 가르치는 보람까지</MainText>
          <SubText>
            파릇에선 경험과 지혜를 나누며 새로운 도전을 시작할 기회를 제공합니다
          </SubText>
          <InfoWrapper>
            <InfoText>
              호스트 신청자
              <Counter>{hostCount}</Counter>
            </InfoText>
            <Divider>|</Divider>
            <InfoText>
              총 시청 뷰수
              <Counter>{viewCount}</Counter>
            </InfoText>
          </InfoWrapper>
          <Button onClick={handleButtonClick}>호스트 신청하기</Button>
        </InnerContent>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default SectionFive;
