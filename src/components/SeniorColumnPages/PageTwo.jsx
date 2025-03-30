import styled from "styled-components";
import image1 from "../../images/thumb3.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
`;

const ImageBlock = styled.div`
  width: 100%;
  height: 45vh; /* ✅ 브라우저 높이 기준으로 꽉 찬 느낌 */
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentSection = styled.div`
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 24px;
`;

const ParagraphWrapper = styled.div`
  column-count: 2;
  column-gap: 40px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.9;
  color: #333;
  margin-bottom: 20px;
`;

const PageTwo = () => {
  return (
    <Wrapper>
      <ImageBlock>
        <Image src={image1} alt="이승훈 이발소 내부" />
      </ImageBlock>

      <ContentSection>
        <Title>“이발소는 제 삶의 고향입니다”</Title>
        <Subtitle>— 사람을 닮은 공간에서, 사람을 위한 시간을 짓다</Subtitle>

        <ParagraphWrapper>
          <Paragraph>
            “손님이 아니라 가족이죠.”  
            이승훈 씨는 고개를 끄덕이며 그렇게 말했습니다.  
            마을 어르신들은 종종 머리를 깎지 않아도 들러 한참을 앉아 있다 갑니다.  
            말없이 앉아 있어도 불편함 없는 그 분위기. 그것이 이발소가 가진 힘입니다.
          </Paragraph>

          <Paragraph>
            그는 특별한 걸 하지 않습니다. 하지만 누구보다 따뜻한 사람입니다.  
            병원에 입원한 단골 어르신께 손편지를 써주고, 아이들에겐 머리 깎는 날 작은 스티커를 선물합니다.  
            그는 말합니다. “머리를 자르는 시간은, 그분의 하루를 함께 보내는 시간이기도 해요.”
          </Paragraph>
        </ParagraphWrapper>
      </ContentSection>
    </Wrapper>
  );
};

export default PageTwo;
