import { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

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
  bottom: -200px;
  width: 600px;
  height: 300px;
  background-color: #fff44f;
  border-radius: 50% 50% 0 0;
  z-index: 1;
`;

const Sprout = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  width: 100px;
  height: 150px;
  background: transparent;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 45%;
    width: 10px;
    height: 50px;
    background: #6db56c;
    border-radius: 5px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle at center, #6db56c 60%, transparent 61%);
    clip-path: ellipse(50% 40% at 50% 50%);
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
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

  &.left {
    left: 10%;
  }

  &.right {
    right: 10%;
  }
`;

const SectionTwo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const sunControls = useAnimation();
  const sproutControls = useAnimation();
  const titleControls = useAnimation();
  const descControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      sunControls.start({ y: 0, transition: { duration: 1.2 } });
      sproutControls.start({ scaleY: 1, opacity: 1, transition: { delay: 1, duration: 1 } });
      titleControls.start({ y: 0, opacity: 1, transition: { delay: 1.5, duration: 1 } });
      descControls.start({ opacity: 1, y: 0, transition: { delay: 1.8, duration: 1 } });
    }
  }, [isInView]);

  return (
    <SectionWrapper ref={ref}>
      <Sun
        initial={{ y: 300 }}
        animate={sunControls}
      />
      <Sprout
        initial={{ scaleY: 0.2, opacity: 0 }}
        animate={sproutControls}
      />
      <Title
        initial={{ y: 50, opacity: 0 }}
        animate={titleControls}
      >
        파릇이란?
      </Title>
      <Description
        className="left"
        initial={{ y: 30, opacity: 0 }}
        animate={descControls}
      >
        (설명)
      </Description>
      <Description
        className="right"
        initial={{ y: 30, opacity: 0 }}
        animate={descControls}
      >
        (설명)
      </Description>
    </SectionWrapper>
  );
};

export default SectionTwo;
