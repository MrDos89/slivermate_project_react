import styled from "styled-components";
import image1 from "../../images/thumb3.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 60px;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  gap: 40px;
`;

const TopArticle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const Image = styled.img`
  width: 42%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  font-size: 0.95rem;
  color: #1abc9c;
  font-weight: 600;
  margin-bottom: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #222;
`;

const IconButton = styled.button`
  font-size: 1.3rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #1abc9c;
  margin-left: 12px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const Paragraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: #444;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 10px;
`;

const BottomArticle = styled.div`
  column-count: 2;
  column-gap: 36px;
`;

const PageThree = () => {
  const handlePopup = () => {
    alert("해당 기사는 준비 중입니다.");
  };

  return (
    <Wrapper>
      {/* 기사 1 */}
      <TopArticle>
        <Image src={image1} alt="걷기 운동" />
        <Content>
          <Category>시니어 건강</Category>
          <TitleRow>
            <Title>매일 30분, 걷기 운동의 기적</Title>
            <IconButton onClick={handlePopup}>🔍</IconButton>
          </TitleRow>
          <Paragraph>
            하루 30분, 가볍게 걷는 습관만으로도 삶이 바뀝니다. 무릎에 부담이
            적고, 심장 건강을 돕고, 우울감도 완화시켜주는 걷기 운동은 시니어에게
            최적화된 건강법입니다. 주변 공원을 천천히 거닐며 자연을 느껴보세요.
            뇌 활동과 면역력도 높아지고 삶의 활력도 되찾을 수 있습니다.
          </Paragraph>
        </Content>
      </TopArticle>

      {/* 기사 2 */}
      <BottomSection>
        <Category>시니어 재테크</Category>
        <TitleRow>
          <Title>지혜롭게 돈을 굴리는 은퇴 이후의 전략</Title>
          <IconButton onClick={handlePopup}>🔍</IconButton>
        </TitleRow>
        <BottomArticle>
          <Paragraph>
            은퇴 후에도 금융 지식은 필수입니다. 불안정한 투자보다는 안정적인
            자산 운용이 중심이 되어야 하며, 소소한 수입이라도 지속적인 관리가
            중요합니다.
          </Paragraph>
          <Paragraph>
            예금, 채권, ETF 등 다양한 상품을 비교 분석하고, 무리하지 않는 선에서
            분산 투자하는 습관을 들이세요. 노후의 경제적 안정감은 생활의 질을
            높이는 첫걸음입니다.
          </Paragraph>
        </BottomArticle>
      </BottomSection>
    </Wrapper>
  );
};

export default PageThree;
