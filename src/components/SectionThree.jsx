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
  gap: 10vw;
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
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  white-space: pre-line;
`;

const Description = styled.div`
  font-size: 1rem;
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
        <Title>수준 높은 강의 서비스</Title>
        <Description>
          파릇에서 제공하는 수준 높은 강의를 통해 새로운 도전과 배움을
          시작하세요
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
        <Title>{"같은 취미를 가진\n파릇과의 만남"}</Title>
        <Description>
          같은 취미를 가진 회원들과 모임을 통해 다양한 소통과 활동을 할 수 있는
          기회
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
        <Title>보류 장점</Title>
        <Description>
          이건 뭐 추가하면 좋을까나 시니어에게 필요한 소식을 가장 빨리 전달하는
          파릇?
        </Description>
      </ItemWrapper>
    </SectionWrapper>
  );
};

export default SectionThree;
