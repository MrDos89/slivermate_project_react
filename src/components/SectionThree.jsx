import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styled, { keyframes } from "styled-components";
import image1 from "../images/vkfmt1.png";
import image2 from "../images/vkfmt2.png";
import image3 from "../images/vkfmt3.png";

const waveAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const WaveBackground = styled.div`
  position: absolute;
  top: -200px; // ✔ 화면 위에서부터 내려오게
  left: 0;
  width: 300%;
  height: 800px; // ✔ 충분히 크게 잡기
  background: url("https://svgshare.com/i/15nF.svg") repeat-x;
  background-size: cover;
  animation: ${waveAnimation} 10s linear infinite;
  opacity: 0.2;
  z-index: 0;
`;

const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 12vw;
  background: white;
  color: black;
  overflow: hidden;
  // z-index: 0;
  position: relative;
`;

const ItemWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 350px;
  scale: 1.1;
`;

const CircleImage = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 1.2rem;
  color: #00aaff;
`;

const Step = styled.div`
  @font-face {
    font-family: "MapoPeacefull";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "MapoPeacefull";
  color: rgb(11, 172, 35);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
`;

const Title = styled.div`
  @font-face {
    font-family: "ImcreSoojin";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.3/ImcreSoojin.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Binggrae-Two";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "Binggrae-Two";
  font-size: 1.9rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  white-space: pre-line;
`;

const Description = styled.div`
  @font-face {
    font-family: "SimKyungha";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/SimKyungha.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "SimKyungha";
  font-size: 25px;
  color: #333;
`;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const SectionThree = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.4 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <SectionWrapper
      as={motion.div}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <WaveBackground />
      <ItemWrapper variants={itemVariants}>
        <CircleImage
          style={{
            backgroundImage: `url(${image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Step>첫번째 파릇</Step>
        <Title>시니어 맞춤 강의 서비스</Title>
        <Description>
          파릇에서 제공하는 시니어 맞춤 강의로
          <br />
          새로운 도전과 배움을 시작하세요
        </Description>
      </ItemWrapper>

      <ItemWrapper variants={itemVariants}>
        <CircleImage
          style={{
            backgroundImage: `url(${image2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Step>두번째 파릇</Step>
        <Title>{"취미가 같은 파릇과의 만남"}</Title>
        <Description>
          같은 취미를 가진 파릇 회원들과 모임을 통해
          <br />
          다양한 소통과 활동을 할 수 있는 기회
        </Description>
      </ItemWrapper>

      <ItemWrapper variants={itemVariants}>
        <CircleImage
          style={{
            backgroundImage: `url(${image3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Step>세번째 파릇</Step>
        <Title>시니어만을 위한 소식지</Title>
        <Description>
          시니어에게 꼭 필요한 정보를
          <br />
          가장 빠르게 전달하는 파릇 칼럼 서비스
        </Description>
      </ItemWrapper>
    </SectionWrapper>
  );
};

export default SectionThree;
