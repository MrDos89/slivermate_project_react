import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  padding: 20px;
  overflow-y: auto;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #388e3c;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 35px);
  grid-template-rows: repeat(12, 35px);
  gap: 2px;
  margin-bottom: 40px;
`;

const CellWrapper = styled.div`
  position: relative;
`;

const Cell = styled.input`
  width: 35px;
  height: 35px;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  border: 1px solid #ccc;
  background-color: white;
`;

const BlankCell = styled.div`
  width: 35px;
  height: 35px;
  background-color: #1c1c1c;
`;

const Number = styled.span`
  position: absolute;
  top: 1px;
  left: 2px;
  font-size: 0.6rem;
  color: #333;
`;

const Clues = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
`;

const ClueGroup = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ClueTitle = styled.h4`
  font-size: 1.1rem;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const ClueList = styled.ul`
  font-size: 0.95rem;
  padding-left: 1.2rem;
  list-style-type: disc;
  max-height: 400px;
  overflow-y: auto;
`;

const PageFour = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [inputs, setInputs] = useState(Array(144).fill(""));

  const answers = [
    "", "", "", "", "", "", "", "", "", "", "", "",
    "", "1:정", "2:약", "", "", "", "3:문", "4:명", "", "", "", "",
    "", "", "5:시", "", "", "", "", "", "21:설", "22:명", "", "",
    "", "", "6:대", "", "", "", "", "", "", "", "", "",
    "", "", "", "7:그", "8:림", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "9:국", "10:가", "", "", "", "",
    "", "", "11:역", "12:사", "", "", "", "", "", "", "", "",
    "", "", "13:신", "14:분", "", "", "", "", "", "", "", "",
    "", "", "15:고", "16:전", "", "", "", "23:선", "24:조", "", "",
    "", "", "17:민", "18:속", "", "", "", "", "", "", "", "",
    "", "", "19:자", "20:연", "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "",
  ];

  const extractNumberAndChar = (val) => {
    if (val.includes(":")) {
      const [num, char] = val.split(":");
      return { num, char };
    }
    return { num: null, char: val };
  };

  const handleInputChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value.slice(-1).toUpperCase();
    setInputs(updated);
  };

  return (
    <Wrapper>
      <TitleRow>
        <Title>십자말풀이</Title>
        <Button onClick={() => setShowAnswers((prev) => !prev)}>
          {showAnswers ? "입력값으로 돌아가기" : "정답 보기"}
        </Button>
      </TitleRow>

      <Grid>
        {answers.map((cell, i) => {
          const { num, char } = extractNumberAndChar(cell);
          return (
            <CellWrapper key={i}>
              {char !== "" ? (
                <>
                  {num && <Number>{num}</Number>}
                  <Cell
                    maxLength={1}
                    value={showAnswers ? char : inputs[i] || ""}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                </>
              ) : (
                <BlankCell />
              )}
            </CellWrapper>
          );
        })}
      </Grid>

      <Clues>
        <ClueGroup>
          <ClueTitle>가로 열쇠</ClueTitle>
          <ClueList>
            <li>1. 조선 후기의 개혁 정치가</li>
            <li>3. 역사나 사실을 기록한 것</li>
            <li>4. 밝은 빛깔로 그린 형태</li>
            <li>7. 그림이나 도안</li>
            <li>9. 나라의 구성 단위</li>
            <li>15. 아주 오래된 시대</li>
            <li>17. 전통 문화의 한 갈래</li>
            <li>23. 옛 나라 이름</li>
          </ClueList>
        </ClueGroup>

        <ClueGroup>
          <ClueTitle>세로 열쇠</ClueTitle>
          <ClueList>
            <li>2. 약속이나 다짐</li>
            <li>5. 시대 구분 기준</li>
            <li>6. 크고 중요한</li>
            <li>11. 과거 사건</li>
            <li>13. 계층</li>
            <li>19. 환경의 요소</li>
            <li>21. 설명하다의 명사형</li>
          </ClueList>
        </ClueGroup>
      </Clues>
    </Wrapper>
  );
};

export default PageFour;
