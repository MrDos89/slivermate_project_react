import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  flex-direction: column;
`;

const Sun = styled(motion.div)`
  position: absolute;
  bottom: -180px;
  width: 700px;
  height: 350px;
  background-color: #fff44f;
  border-radius: 350px 350px 0 0;
  z-index: 1;
`;

const Sprout = styled(motion.div)`
  position: absolute;
  bottom: 60px;
  width: 100px;
  height: 150px;
  background: transparent;
  z-index: 2;

  /* 줄기 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 45%;
    width: 10px;
    height: 50px;
    background: #6db56c;
    border-radius: 5px;
  }

  /* 왼쪽 잎 */
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -40px;
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at center, #6db56c 60%, transparent 61%);
    clip-path: ellipse(50% 40% at 50% 50%);
    transform: rotate(-20deg);
  }

  /* 오른쪽 잎 */
  & .leaf-right {
    position: absolute;
    top: -20px;
    left: 40px;
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at center, #6db56c 60%, transparent 61%);
    clip-path: ellipse(50% 40% at 50% 50%);
    transform: rotate(20deg);
    content: "";
  }
`;

const textVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};
const Title = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: bold;
  z-index: 3;
  margin-bottom: 20px;
`;

const Description = styled(motion.p)`
  position: absolute;
  bottom: 20%;
  font-size: 1.2rem;
  color: #333;
  width: 200px;
  opacity: 0;

  &.left {
    left: 10%;
  }

  &.right {
    right: 10%;
  }
`;

const SectionTwo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  const sunControls = useAnimation();
  const sproutControls = useAnimation();

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      // ✅ 배경 요소는 매번 다시 실행
      sunControls.start({ y: 0, transition: { duration: 1.2 } });
      sproutControls.start({
        scaleY: 1,
        opacity: 1,
        transition: { delay: 1, duration: 1 },
      });

      // ✅ 텍스트는 한 번만 실행
      if (!textVisible) {
        setTextVisible(true);
      }
    } else {
      // 배경 초기화
      sunControls.set({ y: 300 });
      sproutControls.set({ scaleY: 0.2, opacity: 0 });
    }
  }, [isInView]);

  return (
    <SectionWrapper ref={ref}>
      <Sun initial={{ y: 300 }} animate={sunControls} />
      <Sprout initial={{ scaleY: 0.2, opacity: 0 }} animate={sproutControls}>
        <div className="leaf-right" />
      </Sprout>

      {/* 텍스트 애니메이션은 첫 등장 시에만 */}
      {/* <Title
        variants={textVariants}
        initial="hidden"
        animate={textVisible ? "visible" : "hidden"}
        transition={{ delay: 1.5, duration: 1 }}
      >
        파릇이란?
      </Title> */}
      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          fontSize: "2.8rem",
          fontWeight: "bold",
          zIndex: 9999,
          marginBottom: "20px",
          position: "relative",
          color: "#000",
        }}
      >
        파릇이란?
      </motion.h1>

      <Description
        className="left"
        initial={{ y: 30, opacity: 0 }}
        animate={textVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
      >
        (설명)
      </Description>
      <Description
        className="right"
        initial={{ y: 30, opacity: 0 }}
        animate={textVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
      >
        (설명)
      </Description>
    </SectionWrapper>
  );
};

export default SectionTwo;
