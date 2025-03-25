import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styled from "styled-components";

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: white; /* 배경 흰색 */
  overflow: hidden;
`;

const Sun = styled(motion.div)`
  position: absolute;
  bottom: -300px; /* 시작 위치 더 아래 */
  width: 50vw; /* 브라우저 절반 크기 */
  height: 50vw;
  max-width: 500px; /* 최대 크기 제한 */
  max-height: 500px;
  background-color: #ffdd57;
  border-radius: 50%;
`;

const Sprout = styled(motion.div)`
  position: absolute;
  bottom: -50px;
  width: 30vw;
  height: 40vh;
  max-width: 200px;
  max-height: 250px;
  background: url("/path_to_sprout_image.png") no-repeat center/contain;
  opacity: 0;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: black;
  font-weight: bold;
  position: absolute;
  top: 35%;
  opacity: 0;
`;

const SectionThree = () => {
  const controlsSun = useAnimation();
  const controlsSprout = useAnimation();
  const controlsText = useAnimation();
  const sectionRef = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (sectionRef) {
      animateElements();
    }
  }, [sectionRef]);

  const animateElements = () => {
    controlsSun.start({
      bottom: "15%", // 위로 올라오게
      scale: 1.5,
      transition: { duration: 2, ease: "easeOut" },
    });

    controlsSprout.start({
      bottom: "5%",
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, delay: 1 },
    });

    controlsText.start({
      opacity: 1,
      y: -30,
      transition: { duration: 1.2, delay: 2 },
    });
  };

  return (
    <SectionWrapper ref={sectionRef}>
      <Sun animate={controlsSun} />
      <Sprout animate={controlsSprout} />
      <Title animate={controlsText}>파릇이란?</Title>
    </SectionWrapper>
  );
};






export default SectionThree;
