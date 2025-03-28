import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import image1 from "../images/backg.jpg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const LeftSide = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const RightSide = styled.div`
  width: 350px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${image1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: 0;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 57px;
  z-index: 1;
`;

const ActionButton = styled.button`
  padding: 12px 16px;
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &:hover {
    background-color: rgba(68, 115, 146, 0.8);
    color: white;
  }
`;

const FixedTop = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 40px 80px;
  background-color: #f6fdf8;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MentWrapper = styled.div`
  text-align: center;
  margin-top: 80px;
  padding: 0 20px;
  animation: ${fadeDown} 1.5s ease-out forwards;
  opacity: 0;
`;

const MentText = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.6;
  color: #1b5e20;
`;

const SubMentText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #4e6853;
  margin-top: 20px;
  line-height: 1.5;
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 100px;
  animation: ${fadeDown} 1.5s ease-out 0.7s forwards;
  opacity: 0;
`;

const CounterBox = styled.div`
  background-color: white;
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 150px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CounterLabel = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
  font-weight: 500;
`;

const CounterValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #2e7d32;
`;

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AdvantageSection = styled.div`
  margin-top: 120px;
  text-align: center;
  animation: ${fadeUp} 1.5s ease-out 1.5s forwards; // 카운터에 이어서 나옴
  opacity: 0;
`;

const AdvantageTitle = styled.h2`
  font-size: 1.8rem;
  color: #1b5e20;
  font-weight: 700;
  margin-bottom: 40px;
`;

const AdvantageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const AdvantageCard = styled.div`
  width: 220px;
  padding: 25px 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

const AdvantageHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 12px;
`;

const AdvantageSub = styled.div`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
`;

const HostInfoPage = () => {
  const [hostCount, setHostCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const host = 54;
    const views = 11175;
    const lectures = 128;
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;

    const hostIncrement = Math.ceil(host / steps);
    const viewsIncrement = Math.ceil(views / steps);
    const lectureIncrement = Math.ceil(lectures / steps);

    const intervalHost = setInterval(() => {
      setHostCount((prev) => {
        if (prev + hostIncrement >= host) {
          clearInterval(intervalHost);
          return host;
        }
        return prev + hostIncrement;
      });
    }, stepTime);

    const intervalViews = setInterval(() => {
      setViewCount((prev) => {
        if (prev + viewsIncrement >= views) {
          clearInterval(intervalViews);
          return views;
        }
        return prev + viewsIncrement;
      });
    }, stepTime);

    const intervalLecture = setInterval(() => {
      setLectureCount((prev) => {
        if (prev + lectureIncrement >= lectures) {
          clearInterval(intervalLecture);
          return lectures;
        }
        return prev + lectureIncrement;
      });
    }, stepTime);

    return () => {
      clearInterval(intervalHost);
      clearInterval(intervalViews);
      clearInterval(intervalLecture);
    };
  }, []);

  return (
    <Container>
      <LeftSide>
        <FixedTop>
          <Inner>{/* <Title>파릇 쌤이 되어주세요</Title> */}</Inner>
        </FixedTop>

        <ScrollableContent>
          <MentWrapper>
            <MentText>
              나의 재능이 수입이 되는 파릇
              <br />
              파릇과 함께, 호스트로 성장해보세요 🌿
            </MentText>
            <SubMentText>
              시니어 취미소셜 플랫폼 파릇에서
              <br />
              열정 넘치는 회원들과 콘텐츠로 만나보세요(오이 발췌)
            </SubMentText>
          </MentWrapper>

          <CounterWrapper>
            <CounterBox>
              <CounterLabel>호스트 신청자</CounterLabel>
              <CounterValue>{hostCount}</CounterValue>
            </CounterBox>
            <CounterBox>
              <CounterLabel>총 시청 뷰수</CounterLabel>
              <CounterValue>{viewCount}</CounterValue>
            </CounterBox>
            <CounterBox>
              <CounterLabel>누적 강의 수</CounterLabel>
              <CounterValue>{lectureCount}</CounterValue>
            </CounterBox>
          </CounterWrapper>

          <AdvantageSection>
            <AdvantageTitle>파릇의 호스트가 되면 좋은 점</AdvantageTitle>
            <AdvantageGrid>
              <AdvantageCard>
                <AdvantageHeader>[1] 합리적인 수수료</AdvantageHeader>
                <AdvantageSub>
                  수익의 대부분을 호스트에게 돌려드립니다
                </AdvantageSub>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageHeader>[2] 깔쌈한 월 정산</AdvantageHeader>
                <AdvantageSub>매달 정해진 날짜에 자동 정산됩니다</AdvantageSub>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageHeader>[3] 콘텐츠에 최적화된 포맷</AdvantageHeader>
                <AdvantageSub>
                  영상, 글, 사진 등 다양한 방식으로 업로드 가능
                </AdvantageSub>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageHeader>[4] 마케팅 활성화</AdvantageHeader>
                <AdvantageSub>
                  노출부터 광고까지, 파릇이 함께합니다
                </AdvantageSub>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageHeader>[5] 호스트 적극 지원</AdvantageHeader>
                <AdvantageSub>
                  기획부터 운영까지 든든한 지원 시스템
                </AdvantageSub>
              </AdvantageCard>
            </AdvantageGrid>
          </AdvantageSection>
        </ScrollableContent>
      </LeftSide>

      <RightSide>
        <BackgroundOverlay />
        <ButtonBox>
          <ActionButton onClick={() => navigate("/host-apply")}>
            호스트 신청하기
          </ActionButton>

          <ActionButton>문의하기</ActionButton>
        </ButtonBox>
      </RightSide>
    </Container>
  );
};

export default HostInfoPage;
