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
      "https://cms.eroum.co.kr/wp-content/uploads/2023/11/%EB%8F%88_%EC%95%88%EB%93%A4%EB%A9%B4%EC%84%9C_%ED%8F%89%EC%83%9D%ED%95%A0_%EC%88%98_%EC%9E%88%EB%8A%94_%EC%96%B4%EB%A5%B4%EC%8B%A0_%EC%B7%A8%EB%AF%B8%EC%83%9D%ED%99%9C_%EB%82%98%EC%9D%B4%EB%8C%80%EB%B3%84_%EC%B6%94%EC%B2%9C_5._%EC%9A%94%EA%B0%80-scaled.jpg",
    profile: "https://newsimg.sedaily.com/2023/03/23/29N503JX22_3.jpg",
  },
  {
    name: "박철수",
    gender: "남성",
    age: "70세",
    review:
      "같은 취미를 가진 친구들이 생겨 좋습니다. 요즘 파릇 모임 나가는 재미에 사네요. 은퇴 후에 집에만 있다보니 많이 무기력해졌었는데, 파릇이 된 덕분에 스케줄이 꽉 찼어요. 아들이 요즘 제 표정이 아주 밝고 좋아보인다고 하네요",
    image:
      "https://cdn.news.hidoc.co.kr/news/photo/201712/16154_38241_0653.jpg",
    profile:
      "https://img.khan.co.kr/news/2024/03/09/l_2024030801000097900020261.jpg",
  },
  {
    name: "이순자",
    gender: "여성",
    age: "68세",
    review:
      "딸 추천으로 시작했는데 푹 빠졌어요. 이제 딸보다 제가 더 친구가 많은 것 같네요ㅎㅎ 이 나이에 버스킹을 하게 될 줄 몰랐는데~ 너무 보람차고 즐겁네요",
    image:
      "https://file2.nocutnews.co.kr/newsroom/image/2019/07/18/20190718141403827950_0_650_350.jpg",
    profile:
      "https://cdn.fortunekorea.co.kr/news/photo/201902/10910_1795_1354.png",
  },
  {
    name: "장기호",
    gender: "남성",
    age: "72세",
    review:
      "파릇이 인생의 제2막을 파릇하게 열어줬습니다. 제가 이렇게 취미에 욕심 많은 사람인 줄 처음 알았네요",
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAyMzA4MDlfNSAg/MDAxNjkxNTY3ODYwMjY3.X25EDViDguhSNpl6QieGIQ-NHavBdFBPtj9Rjapgs50g.hYPRjR_O2p3OgbfSCzdo0oxgDViBOMIf9vgKGnHBRGAg.PNG.koco_andrew/oi4852_Two_handsome_45-year-old_men_and_two_pretty_45-year-old__b70f2992-09c.png?type=w800",
    profile: "https://newsroom.posco.com/kr/wp-content/uploads/2017/09/171.png",
  },
  {
    name: "이명자",
    gender: "여성",
    age: "63세",
    review: "매주 기다려지는 시간이 생겼어요. 삶의 리듬이 생겼달까!",
    image:
      "https://img.etoday.co.kr/pto_db/2016/07/20160727111320_911201_992_661.JPG",
    profile:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjJfNzcg/MDAxNTkwMTAyNTgyNTYy.LdUfeSISpwjHWe5qhCXV3PT1aEVTIf0JnPcCUepov_0g.-W6Mhdua_tlhoZ8upKGmeD9AYpkZghugdadAOBYICCIg.JPEG.agimazi/1590102582346.jpg?type=w800",
  },
  {
    name: "조상현",
    gender: "남성",
    age: "69세",
    review:
      "파릇 이름처럼 제 삶이 파릇파릇해지는 거 같아요. 제 2의 인생이 이런건가봅니다. 덕분에 새로운 꿈이 생겼습니다.",
    image:
      "https://www.gangnam.go.kr/gangnamlife/2024/images/vol342/sub/sub02_06_img4.png",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXwICqjLJsduiHqXAQiBXq6TES6zcTzG9jdSvXSkBEWsX4_XOrPVLBM3T1eA67Db4z7OE&usqp=CAU",
  },
  {
    name: "홍말순",
    gender: "여성",
    age: "67세",
    review:
      "모델의 꿈을 이렇게 이루게 될 줄 몰랐어요. 제가 런웨이를 설 수 있을거라 생각도 못했는데, 파릇 덕분에 용기 내서 시작했고 지금은 매일 연습 중입니다.",
    image:
      "https://cdn.welfarenews.net/news/photo/201304/37752_164881_4522.jpg",
    profile: "https://cdn.sisanews.kr/news/photo/201905/38670_28883_75.jpg",
  },
  {
    name: "강정호",
    gender: "남성",
    age: "71세",
    review: "사람들과 소통하면서 건강해졌습니다. 감사해요 파릇!",
    image:
      "https://www.dongguswc.or.kr/data/theme/tp_dongguswc/editor/2310/thumb-7d1c8256eda2ec1a28e2db3c0dcf4794_1696463063_5501_980x553.jpg",
    profile:
      "https://www.dongguswc.or.kr/data/theme/tp_dongguswc/editor/2105/thumb-c76f2db49c4fcf89fdce03b590292547_1622191609_64_980x735.jpg",
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
  width: 370px;
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
  const sliderRef1 = useRef(null); // 첫 번째 슬라이더를 위한 ref
  const sliderRef2 = useRef(null); // 두 번째 슬라이더를 위한 ref

  const [translateY1, setTranslateY1] = useState(0); // 첫 번째 슬라이더 상태
  const [translateY2, setTranslateY2] = useState(0); // 두 번째 슬라이더 상태

  useEffect(() => {
    const speed = 100;
    let animationFrame;

    const move = () => {
      // 첫 번째 슬라이더의 애니메이션 처리
      setTranslateY1((prev) => {
        const scrollHeight = sliderRef1.current.scrollHeight / 2;
        if (prev <= -scrollHeight) return 0;
        return prev - speed;
      });

      // 두 번째 슬라이더의 애니메이션 처리
      setTranslateY2((prev) => {
        const scrollHeight = sliderRef2.current.scrollHeight / 2;
        if (prev <= -scrollHeight) return 0;
        return prev - speed;
      });

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, []); // 속도 변경이 없으므로 빈 배열을 의존성으로 설정

  return (
    <SectionWrapper ref={ref}>
      <BackgroundVideo src={backgroundVideo} autoPlay muted loop playsInline />

      {/* 첫 번째 슬라이더 */}
      <SliderContainer style={{ right: "29%" }}>
        <SlidesWrapper ref={sliderRef1} translateY={translateY1}>
          {reviews.slice(0, reviews.length / 2).map((item, idx) => (
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

      {/* 두 번째 슬라이더 */}
      <SliderContainer style={{ right: "5%" }}>
        <SlidesWrapper ref={sliderRef2} translateY={translateY2}>
          {reviews.slice(reviews.length / 2).map((item, idx) => (
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
