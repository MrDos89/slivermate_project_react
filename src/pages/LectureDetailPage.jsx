import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const API_BASE = "http://43.201.50.194:18090";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const FixedTop = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  width: auto;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleArea = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2e7d32;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  color: #888;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 600px;
  background: #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const ThumbnailItem = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
`;

const DetailLayout = styled.div`
  display: flex;
  gap: 40px;
`;

const DescriptionBox = styled.div`
  flex: 1;
`;

const StampBox = styled.div`
  width: 200px;
  background-color: #7b4f2c;
  border-radius: 10px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StampCircleWrapper = styled.div`
  position: relative;
`;

const StampCircle = styled.div`
  width: 50px;
  height: 50px;
  background: #d2b48c;
  border-radius: 50%;
  position: relative;
  z-index: 1;
`;

const FancyGrass = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 50px;
  pointer-events: none;
  z-index: 2;

  .blade {
    position: absolute;
    bottom: 0;
    width: 3px;
    background: #27ae60;
    border-radius: 2px;
    transform-origin: bottom center;
    opacity: 0;
    transform: scaleY(0);
  }

  &.animate .blade {
    animation: growBlade 0.5s ease-out forwards;
  }

  ${[...Array(16)]
    .map(
      (_, i) => `
    &.animate .blade:nth-child(${i + 1}) {
      left: ${5 + i * 5}%;
      height: ${15 + (i % 5) * 3}px;
      animation-delay: ${i * 0.05}s;
    }
  `
    )
    .join("")}

  @keyframes growBlade {
    0% {
      transform: scaleY(0);
      opacity: 0;
    }
    80% {
      transform: scaleY(1.3);
      opacity: 1;
    }
    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

const LectureDetailPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [related, setRelated] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const stampRefs = useRef([]);
  const completedSteps = 2;

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/lesson/${id}`)
      .then((res) => setLesson(res.data))
      .catch((err) => console.error("상세 강의 로딩 실패", err));

    axios
      .get(`${API_BASE}/api/lesson/${id}/related`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error("관련 강의 로딩 실패", err));
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const step = parseInt(entry.target.dataset.step);
          if (entry.isIntersecting && !visibleSteps.includes(step)) {
            setVisibleSteps((prev) => [...prev, step]);
          }
        });
      },
      { threshold: 0.5 }
    );

    stampRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      stampRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [visibleSteps]);

  if (!lesson) {
    return (
      <Container>
        <FixedTop>
          <Inner>강의를 찾을 수 없습니다.</Inner>
        </FixedTop>
      </Container>
    );
  }

  return (
    <Container>
      <FixedTop>
        <Inner>
          <TitleArea>{lesson.lesson_name}</TitleArea>
          <SubTitle>{lesson.user_name}</SubTitle>
        </Inner>
      </FixedTop>

      <ScrollableContent>
        <VideoWrapper>
          <p>유튜브 영상 자리</p>
        </VideoWrapper>

        <SliderWrapper>
          <button>❮</button>
          <ThumbnailList>
            {related.map((lec) => (
              <ThumbnailItem key={lec.lesson_id} src={lec.lesson_thumbnail} />
            ))}
          </ThumbnailList>
          <button>❯</button>
        </SliderWrapper>

        <DetailLayout>
          <DescriptionBox>
            <h3>강의 소개</h3>
            <p>{lesson.lesson_desc}</p>
          </DescriptionBox>

          <StampBox>
            {[1, 2, 3, 4].map((step, idx) => (
              <StampCircleWrapper
                key={step}
                ref={(el) => (stampRefs.current[idx] = el)}
                data-step={step}
              >
                <StampCircle>
                  {step === 1 && step <= completedSteps && (
                    <FancyGrass
                      className={visibleSteps.includes(step) ? "animate" : ""}
                    >
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="blade" />
                      ))}
                    </FancyGrass>
                  )}
                </StampCircle>
              </StampCircleWrapper>
            ))}
          </StampBox>
        </DetailLayout>
      </ScrollableContent>
    </Container>
  );
};

export default LectureDetailPage;
