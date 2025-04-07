import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const Side = styled.div`
  width: 50%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s ease;
  transform: translateY(
    ${(props) => {
      if (props.inView) return "0";
      return props.direction === "up" ? "-400px" : "400px";
    }}
  );
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform-origin: ${(props) => (props.direction === "up" ? "top" : "bottom")};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  opacity: ${(props) => (props.show ? 0.95 : 0)};
  transition: opacity 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
`;

const SectionNine = () => {
  const navigate = useNavigate();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [leftInView, setLeftInView] = useState(false);
  const [rightInView, setRightInView] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const leftObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setLeftInView(entry.isIntersecting); // 진입 시 true, 벗어나면 false
      });
    }, observerOptions);

    const rightObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setRightInView(entry.isIntersecting); // 진입 시 true, 벗어나면 false
      });
    }, observerOptions);

    if (leftRef.current) leftObserver.observe(leftRef.current);
    if (rightRef.current) rightObserver.observe(rightRef.current);

    return () => {
      if (leftRef.current) leftObserver.unobserve(leftRef.current);
      if (rightRef.current) rightObserver.unobserve(rightRef.current);
    };
  }, []);

  return (
    <Container>
      {/* 좌면 */}
      <Side
        ref={leftRef}
        inView={leftInView}
        direction="up"
        onMouseEnter={() => setHoverLeft(true)}
        onMouseLeave={() => setHoverLeft(false)}
        onClick={() => navigate("/freeboard")}
        style={{
          backgroundImage: `url('https://watermark.lovepik.com/photo/20211130/large/lovepik-medium-aged-and-old-people-gathering-picture_501208545.jpg')`,
        }}
      >
        <Overlay show={hoverRight} bgColor="rgba(128, 128, 128, 0.95)">
          파릇을 위한, 시니어에게 꼭 필요한 정보와 이야기를 모았습니다.
          <br />
          파릇의 시니어 칼럼 보기
        </Overlay>
      </Side>

      {/* 우면 */}
      <Side
        ref={rightRef}
        inView={rightInView}
        direction="down"
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
        onClick={() => navigate("/senior-column")}
        style={{
          backgroundImage: `url('https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/jz1/image/l7OUjnJ92Uh2_Q3NUcm3OybaEfg.jpg')`,
        }}
      >
        <Overlay show={hoverLeft} bgColor="rgba(76, 175, 80, 0.95)">
          파릇을 위한, 파릇만의 자유게시판!
          <br />
          파릇 커뮤니티 입장하기
        </Overlay>
      </Side>
    </Container>
  );
};

export default SectionNine;
