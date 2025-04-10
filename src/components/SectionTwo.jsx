import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
import sproutImage from "../images/vkfmt.png";

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
  width: 1200px;
  height: 650px;
  background-color: #fff44f;
  border-radius: 100vw 100vw 0 0;
  z-index: 1;
`;

// const Sprout = styled(motion.div)`
//   position: absolute;
//   bottom: 60px;
//   width: 195px;
//   height: 540px;
//   background: transparent;
//   z-index: 10;

//   /* 줄기 */
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 20px;
//     height: 500px;
//     background: #6db56c;
//     border-radius: 5px;
//   }

//   /* 왼쪽 반원 */
//   &::before {
//     content: "";
//     position: absolute;
//     top: -35px;
//     left: 50%;
//     transform: translateX(
//       -150%
//     ); /* 왼쪽 반원의 넓은 면을 정확히 맞추기 위해 -150%로 조정 */
//     width: 200px;
//     height: 100px;
//     background: #6db56c;
//     border-radius: 100px 100px 0 0;
//   }

//   /* 오른쪽 반원 */
//   & .leaf-right {
//     content: "";
//     position: absolute;
//     top: -35px;
//     left: 50%;
//     transform: translateX(
//       50%
//     ); /* 오른쪽 반원의 넓은 면을 정확히 맞추기 위해 50%로 조정 */
//     width: 200px;
//     height: 100px;
//     background: #6db56c;
//     border-radius: 100px 100px 0 0;
//   }

//   /* 대칭된 왼쪽 반원 */
//   & .leaf-left-mirror {
//     content: "";
//     position: absolute;
//     top: -35px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 200px;
//     height: 100px;
//     background: #6db56c;
//     border-radius: 100px 100px 0 0;
//     transform: rotate(180deg);
//   }

//   /* 대칭된 오른쪽 반원 */
//   & .leaf-right-mirror {
//     content: "";
//     position: absolute;
//     top: -35px;
//     left: 50%;
//     transform: translateX(50%);
//     width: 200px;
//     height: 100px;
//     background: #6db56c;
//     border-radius: 100px 100px 0 0;
//     transform: rotate(180deg);
//   }
// `;

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
// const Title = styled(motion.h1)`
//   font-size: 2.8rem;
//   font-weight: bold;
//   z-index: 3;
//   margin-bottom: 20px;
// `;

const Title = styled(motion.h1)`
  font-size: 66px;
  font-weight: bold;
  position: absolute;
  bottom: 660px;
  margin-left: 10px;
  z-index: 5;
  color: #000;
  font-family: "KCC-Ganpan";
  color: #2bc541;

  @font-face {
    font-family: "KCC-Ganpan";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;

const Description = styled(motion.p)`
  @font-face {
    font-family: "GangwonEdu_OTFBoldA";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "GangwonEdu_OTFBoldA";
  position: absolute;
  bottom: 38%;
  font-size: 27px;
  //color: #333;
  color: rgb(15, 110, 29);
  width: 410px;
  opacity: 0;

  &.left {
    left: 9%;
    bottom: 38%;
  }

  &.right {
    right: 10%;
    bottom: 34%;
  }
`;

const SproutImage = styled(motion.img)`
  position: absolute;
  bottom: -200px;
  width: 200px;
  height: auto;
  z-index: 10;
  transform-origin: bottom center; /* ⬅️ 아래 고정 기준으로 확장 */
`;

const SectionTwo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  const sunControls = useAnimation();
  const sproutControls = useAnimation();
  const textControls = useAnimation();

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      sunControls.start({ y: 0, transition: { duration: 1.2 } });
      sproutControls.start({
        scaleY: 1,
        opacity: 1,
        transition: { delay: 1, duration: 1 },
      });

      textControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1.2 },
      });

      if (!textVisible) {
        setTextVisible(true);
      }
    } else {
      sunControls.set({ y: 300 });
      sproutControls.set({ scaleY: 0.2, opacity: 0 });
      textControls.set({ y: 100, opacity: 0 });
    }
  }, [isInView]);

  return (
    <SectionWrapper ref={ref}>
      <Sun initial={{ y: 300 }} animate={sunControls} />
      {/* <Sprout initial={{ scaleY: 0.2, opacity: 0 }} animate={sproutControls}>
        <div className="leaf-right" />
        <div className="leaf-left-mirror" /> {/* 추가된 반원 *
        <div className="leaf-right-mirror" /> {/* 추가된 반원 *
      </Sprout> */}
      <SproutImage
        src={sproutImage}
        alt="sprout"
        initial={{ scale: 0.2, opacity: 0, y: 100 }}
        animate={{
          y: 0,
          scale: 3.0, // ⬅️ 크기 확대 (비율 유지)
          opacity: 1,
          transition: { delay: 1, duration: 1 },
        }}
      />

      {/* 텍스트 애니메이션은 첫 등장 시에만 */}
      {/* <Title
        variants={textVariants}
        initial="hidden"
        animate={textVisible ? "visible" : "hidden"}
        transition={{ delay: 1.5, duration: 1 }}
      >
        파릇이란?
      </Title> */}
      <Title initial={{ y: 100, opacity: 0 }} animate={textControls}>
        파릇이란?
      </Title>

      <Description
        className="left"
        initial={{ y: 30, opacity: 0 }}
        animate={textVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        시니어만을 위한
        <br />
        맞춤 강의와 취미 매칭 서비스
        <br />
        {/* 취미 매칭 서비스를 제공하는
        <br /> */}
        모든 시니어가 파릇하게 피어나는 놀이터
      </Description>
      <Description
        className="right"
        initial={{ y: 30, opacity: 0 }}
        animate={textVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      >
        단순한 취미를 넘어,
        <br />
        사회적 연결과 활력을 찾는 공간.
        <br />
        <br />
        파릇은 여러분의
        <br />
        제2의 인생을 응원합니다.
      </Description>
    </SectionWrapper>
  );
};

export default SectionTwo;
