import { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
// import backgroundImage from "../images/qrud.jpg";
import backgroundVideo from "../images/cnlal.mp4";

// 더미 데이터
const reviews = [
  {
    name: "김영희",
    gender: "여성",
    age: "65세",
    review:
      "파릇 덕분에 요가를 시작했어요! 다같이 모여 운동하는게 이렇게 재밌는 줄 몰랐네요. 건강도 챙기고 친구도 생기고 요즘 너무 즐거워요",
  },
  {
    name: "박철수",
    gender: "남성",
    age: "70세",
    review:
      "같은 취미를 가진 친구들이 생겨 좋습니다. 요즘 파릇 모임 나가는 재미에 사네요. 은퇴 후에 집에만 있다보니 많이 무기력해졌었는데, 파릇이 된 덕분에 스케줄이 꽉 찼어요. 아들이 요즘 제 표정이 아주 밝고 좋아보인다고 하네요",
  },
  {
    name: "이순자",
    gender: "여성",
    age: "68세",
    review:
      "딸 추천으로 시작했는데 푹 빠졌어요. 이제 딸보다 제가 더 친구가 많은 것 같네요ㅎㅎ 이 나이에 버스킹을 하게 될 줄 몰랐는데~ 너무 보람차고 즐겁네요",
  },
  {
    name: "장기호",
    gender: "남성",
    age: "72세",
    review:
      "파릇이 인생의 제2막을 파릇하게 열어줬습니다. 제가 이렇게 취미에 욕심 많은 사람인 줄 처음 알았네요",
  },
];

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`;

// 스타일
const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(255, 255, 255);
  // background: url($ {backgroundImage}) no-repeat center center;
  // background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedContainer = styled.div`
  position: absolute;
  top: 45%;
  right: 12.5%;
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: repeat(2, 320px);
  grid-template-rows: repeat(2, 320px);
  gap: 30px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #00aaff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid rgb(136, 255, 0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 12px;
  background: rgb(248, 255, 240);
  font-weight: bold;
`;

const NameLine = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const ReviewText = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-top: 20px;
`;

// 컴포넌트
const SectionSeven = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.4 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView]);

  return (
    <SectionWrapper ref={ref}>
      <BackgroundVideo src={backgroundVideo} autoPlay muted loop playsInline />

      <FeedContainer>
        {reviews.map((item, idx) => (
          <Card
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } },
              hidden: { opacity: 0, y: 30 },
            }}
          >
            <Profile>
              <ProfilePic></ProfilePic>
              <NameLine>
                {item.name} / {item.gender} / {item.age}
              </NameLine>
            </Profile>
            <ReviewText>"{item.review}"</ReviewText>
          </Card>
        ))}
      </FeedContainer>
    </SectionWrapper>
  );
};

export default SectionSeven;
