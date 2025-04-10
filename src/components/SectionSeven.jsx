import { useEffect, useRef, useState } from "react";
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
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "박철수",
    gender: "남성",
    age: "70세",
    review:
      "같은 취미를 가진 친구들이 생겨 좋습니다. 요즘 파릇 모임 나가는 재미에 사네요. 은퇴 후에 집에만 있다보니 많이 무기력해졌었는데, 파릇이 된 덕분에 스케줄이 꽉 찼어요. 아들이 요즘 제 표정이 아주 밝고 좋아보인다고 하네요",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "이순자",
    gender: "여성",
    age: "68세",
    review:
      "딸 추천으로 시작했는데 푹 빠졌어요. 이제 딸보다 제가 더 친구가 많은 것 같네요ㅎㅎ 이 나이에 버스킹을 하게 될 줄 몰랐는데~ 너무 보람차고 즐겁네요",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "장기호",
    gender: "남성",
    age: "72세",
    review:
      "파릇이 인생의 제2막을 파릇하게 열어줬습니다. 제가 이렇게 취미에 욕심 많은 사람인 줄 처음 알았네요",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "이명자",
    gender: "여성",
    age: "63세",
    review: "매주 기다려지는 시간이 생겼어요. 삶의 리듬이 생겼달까!",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "조상현",
    gender: "남성",
    age: "69세",
    review:
      "파릇 이름처럼 제 삶이 파릇파릇해지는 거 같아요. 제 2의 인생이 이런건가봅니다. 덕분에 새로운 꿈이 생겼습니다.",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "홍말순",
    gender: "여성",
    age: "67세",
    review:
      "모델의 꿈을 이렇게 이루게 될 줄 몰랐어요. 제가 런웨이를 설 수 있을거라 생각도 못했는데, 파릇 덕분에 용기 내서 시작했고 지금은 매일 연습 중입니다.",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
  },
  {
    name: "강정호",
    gender: "남성",
    age: "71세",
    review: "사람들과 소통하면서 건강해졌습니다. 감사해요 파릇!",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
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

// const FeedContainer = styled.div`
//   position: absolute;
//   top: 45%;
//   right: 12.5%;
//   transform: translateY(-50%);
//   display: grid;
//   grid-template-columns: repeat(2, 320px);
//   grid-template-rows: repeat(2, 320px);
//   gap: 30px;
// `;

const SliderContainer = styled.div`
  width: 400px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
`;

const SlidesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(${(props) => props.translateY}px);
  transition: none;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 3px;
  // padding: 24px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  // box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  margin-bottom: 5px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TopImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px 0 16px;
`;

// const ProfilePic = styled.div`
//   width: 60px;
//   height: 60px;
//   border: 2px solid rgb(136, 255, 0);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
//   margin-right: 12px;
//   background: rgb(248, 255, 240);
//   font-weight: bold;
// `;

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
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
  //margin-top: 20px;
  padding: 12px 16px 16px 16px;
`;

// 컴포넌트
const SectionSeven = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.4 });
  const controls = useAnimation();

  const sliderRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const speed = 0.4;
    let animationFrame;

    const move = () => {
      setTranslateY((prev) => {
        const scrollHeight = sliderRef.current.scrollHeight / 2;
        if (prev <= -scrollHeight) return 0;
        return prev - speed;
      });

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <SectionWrapper ref={ref}>
      <BackgroundVideo src={backgroundVideo} autoPlay muted loop playsInline />

      <SliderContainer>
        <SlidesWrapper ref={sliderRef} translateY={translateY}>
          {[...reviews, ...reviews].map((item, idx) => (
            <Card key={idx}>
              <TopImage src={item.image} alt={`${item.name} 후기 이미지`} />
              <Profile>
                <ProfilePic src={item.profile} alt={`${item.name} 프로필`} />
                <NameLine>
                  {item.name} / {item.gender} / {item.age}
                </NameLine>
              </Profile>
              <ReviewText>"{item.review}"</ReviewText>
            </Card>
          ))}
        </SlidesWrapper>
      </SliderContainer>
    </SectionWrapper>
  );
};

export default SectionSeven;
