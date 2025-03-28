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
`;

const InfoText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Counter = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #32a852; // 녹색
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #32a852; // 녹색
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #28a745;
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
        <MainText>배우는 기쁨에서 가르치는 보람까지</MainText>
        <SubText>
          파릇에선 경험과 지혜를 나누며 새로운 도전을 시작할 기회를 제공합니다
        </SubText>
        <InfoWrapper>
          <InfoText>
            호스트 신청자
            <Counter>{hostCount}</Counter>
          </InfoText>
          <InfoText>
            총 시청 뷰수
            <Counter>{viewCount}</Counter>
          </InfoText>
        </InfoWrapper>
        <Button onClick={handleButtonClick}>자세히 보기</Button>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default SectionFive;
