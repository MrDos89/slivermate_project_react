import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styled from "styled-components";
import image1 from "../images/cnlal.jpg";
import image2 from "../images/cnlal2.jpg";
import image3 from "../images/cnlal3.jpg";
import { useNavigate } from "react-router-dom";

// 섹션 전체 컨테이너
const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  background-color: white;
`;

// 애니메이션용 wrapper (clip-path 적용)
const RevealWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  clip-path: circle(10% at 50% 50%);
  position: absolute;
  top: 0;
  left: 0;
`;

// 각 이미지 박스
const SectionBox = styled.div`
  flex: 1;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* 오버레이 */
    z-index: 1;
  }
`;

// 텍스트 박스
const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedText = styled(motion.div)`
  font-size: 50px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const ViewMoreButton = styled(motion.button)`
  margin-top: 30px;
  padding: 12px 24px;
  background-color: transparent;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
  z-index: 10;
  position: relative;
  overflow: visible;

  &::before,
  &::after,
  span::before,
  span::after {
    content: "";
    position: absolute;
    width: 0.5em;
    height: 0.5em;
    transform: rotate(45deg);
    opacity: 0;
  }

  &::before,
  span::before {
    top: calc(50% - 0.3em);
    left: -0.25em;
    border-right: 0.15em solid rgba(255, 255, 255, 0.4);
    border-top: 0.15em solid rgba(255, 255, 255, 0.4);
  }

  &::after,
  span::after {
    bottom: calc(50% - 0.35em);
    right: -0.25em;
    border-left: 0.15em solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.15em solid rgba(255, 255, 255, 0.4);
  }

  &::before {
    animation: arrowInFromLeft 1.6s ease-in-out infinite;
    animation-delay: 0s;
  }

  &::after {
    animation: arrowInFromRight 1.6s ease-in-out infinite;
    animation-delay: 0.4s;
  }

  span::before {
    animation: arrowInFromLeft 1.6s ease-in-out infinite;
    animation-delay: 0.8s;
  }

  span::after {
    animation: arrowInFromRight 1.6s ease-in-out infinite;
    animation-delay: 1.2s;
  }

  @keyframes arrowInFromLeft {
    0% {
      transform: translateX(-1em) rotate(45deg);
      opacity: 0;
    }
    50% {
      transform: translateX(0) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate(45deg);
      opacity: 0;
    }
  }

  @keyframes arrowInFromRight {
    0% {
      transform: translateX(1em) rotate(45deg);
      opacity: 0;
    }
    50% {
      transform: translateX(0) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate(45deg);
      opacity: 0;
    }
  }
`;

const SectionSix = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const controls = useAnimation();
  const text1Controls = useAnimation();
  const text2Controls = useAnimation();

  const navigate = useNavigate(); //  라우터 훅

  useEffect(() => {
    if (inView) {
      controls.start({
        clipPath: "circle(150% at 50% 50%)",
        transition: { duration: 1.5, ease: "easeInOut" },
      });

      text1Controls.start({
        x: 0,
        opacity: 1,
        transition: { delay: 0.7, duration: 0.6, ease: "easeOut" },
      });

      text2Controls.start({
        x: 0,
        opacity: 1,
        transition: { delay: 0.9, duration: 0.6, ease: "easeOut" },
      });
    } else {
      controls.set({ clipPath: "circle(10% at 50% 50%)" });
      text1Controls.set({ x: 200, opacity: 0 });
      text2Controls.set({ x: -200, opacity: 0 });
    }
  }, [inView]);

  return (
    <SectionWrapper ref={ref}>
      {/* 이미지 애니메이션 */}
      <RevealWrapper
        animate={controls}
        initial={{ clipPath: "circle(10% at 50% 50%)" }}
      >
        <SectionBox bg={image1} />
        <SectionBox bg={image2} />
        <SectionBox bg={image3} />
      </RevealWrapper>

      {/* 텍스트 애니메이션 */}
      <TextContainer>
        <AnimatedText initial={{ x: 200, opacity: 0 }} animate={text1Controls}>
          파릇 시니어를 위한 다양한 취미
        </AnimatedText>
        <AnimatedText initial={{ x: -200, opacity: 0 }} animate={text2Controls}>
          세상은 넓고 취미는 많다!
        </AnimatedText>
        <ViewMoreButton
          initial={{ x: -200, opacity: 0 }} // ✅ 세상은 넓고~ 텍스트랑 함께 등장
          animate={text2Controls}
          onClick={() => navigate("/club")}
        >
          <span>자세히 보기</span>
        </ViewMoreButton>
      </TextContainer>
    </SectionWrapper>
  );
};

export default SectionSix;
