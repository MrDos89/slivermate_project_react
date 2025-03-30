import styled from "styled-components";
import stampImage from "../../images/thumb3.png"; // 엽서 느낌 이미지

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-family: 'Noto Serif KR', serif;
  // background-color: #fffdf5;
  // background-color: #ffffff;
`;

const LeftSection = styled.div`
  flex: 0.6;
  position: relative;
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightSection = styled.div`
  flex: 0.4;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //background-color: #fffef9;
  // background-color: #ffffff;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #2c2c2c;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  font-size: 1.3rem;
  color: #6a6a6a;
  font-weight: 400;
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  white-space: pre-line;
`;

const Stamp = styled.img`
  position: absolute;
  width: 100px;
  opacity: 0.25;
  bottom: 40px;
  right: 40px;
  transform: rotate(-10deg);
`;

const PageOne = () => {
  return (
    <Wrapper>
      <LeftSection>
        <Photo src={stampImage} alt="시니어 이미지" />
      </LeftSection>
      <RightSection>
        <Title>행복을 나르는 <br />나눔의 이야기</Title>
        <SubTitle>“가슴이 따뜻하다” – <br />이승훈 씨 인터뷰</SubTitle>
        <Paragraph>
          마을 어귀의 작은 이발소에서 시작된 따뜻한 인연.{"\n"}
          청춘을 깎아내며 살아온 삶 속에서, 그는 늘 웃음을 잃지 않았습니다.{"\n\n"}
          이제는 마을의 이야기꾼이 되어, 지나온 시간을 전하고 있는 이승훈 씨.{"\n"}
          시니어의 삶엔 단지 나이만이 아니라, 
          <br />사람 냄새 나는 진심이 있습니다.
        </Paragraph>
        <Stamp src={stampImage} alt="stamp effect" />
      </RightSection>
    </Wrapper>
  );
};

export default PageOne;
