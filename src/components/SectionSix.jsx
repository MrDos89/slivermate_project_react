import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styled from "styled-components";
import image1 from "../images/cnlal.jpg";
import image2 from "../images/cnlal2.jpg";
import image3 from "../images/cnlal3.jpg";

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

const SectionSix = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const controls = useAnimation();
  const text1Controls = useAnimation();
  const text2Controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        clipPath: "circle(150% at 50% 50%)",
        transition: { duration: 1.5, ease: "easeInOut" },
      });

      text1Controls.start({
        x: 0,
        opacity: 1,
        transition: { delay: 1.1, duration: 0.6 },
      });

      text2Controls.start({
        x: 0,
        opacity: 1,
        transition: { delay: 2.0, duration: 0.6 },
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
      </TextContainer>
    </SectionWrapper>
  );
};

export default SectionSix;
