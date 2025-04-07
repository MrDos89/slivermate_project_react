import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 360px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  font-family: "Noto Sans KR", sans-serif;
  text-align: center; /* 전체 내용 중앙 정렬 */
`;

const DateTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;

  label {
    font-weight: 600;
    font-size: 15px;
  }

  input {
    accent-color: rgb(0, 133, 82);
    margin-right: 6px;
  }
`;

const Label = styled.label`
  display: block;
  margin: 14px 0 6px;
  font-size: 15px;
  font-weight: 500;
  text-align: left; /* 라벨은 왼쪽 정렬 유지 */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  outline: none;
  text-align: left;

  &:focus {
    border-color: rgb(0, 133, 82);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px 12px;
  font-size: 15px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  outline: none;
  text-align: left;

  &:focus {
    border-color: rgb(0, 133, 82);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬로 변경 */
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #fff;
  border: 1px solid #333;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

// 최신 공지
const LatestNoticeBox = styled.div`
  margin-bottom: 40px;
  background: #f4f4f4; /* 🎨 여기서 색상 변경 가능 */
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
`;

const LatestNoticeTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const LatestNoticeMain = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const LatestNoticeContent = styled.div`
  font-size: 14px;
  color: #666;
`;

const ViewAllButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function ClubScheduleModal({ date, onClose, onAdd }) {
  const [type, setType] = useState("공지");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [hour, setHour] = useState("18");
  const [minute, setMinute] = useState("00");

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("일정 이름을 입력해주세요.");
      return;
    }

    const newSchedule = {
      type,
      title,
      time: `${hour}:${minute}`,
      content,
      location,
      fee,
    };

    onAdd(newSchedule);
    onClose();
  };

  const handleFeeChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, ""); // 숫자만 남김
    const number = parseInt(raw || "0", 10);
    const formatted = number.toLocaleString(); // 천 단위 콤마
    setFee(formatted);
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <DateTitle>{date.toDateString()}</DateTitle>

        <RadioWrapper>
          <label>
            <input
              type="radio"
              value="모임"
              checked={type === "모임"}
              onChange={() => setType("모임")}
            />
            모임
          </label>
          <label>
            <input
              type="radio"
              value="공지"
              checked={type === "공지"}
              onChange={() => setType("공지")}
            />
            공지
          </label>
        </RadioWrapper>

        <Label>일정이름</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        {type === "공지" ? (
          <>
            <Label>내용</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <Label>시간 / 일자</Label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select value={hour} onChange={(e) => setHour(e.target.value)}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              :
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <Label>내용</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Label>장소</Label>
            <Input
              placeholder="장소를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Label>회비</Label>
            <div style={{ position: "relative", width: "80%" }}>
              {" "}
              {/* ✅ 입력칸 너비 조정 */}
              <Input
                value={fee}
                onChange={handleFeeChange}
                style={{
                  paddingRight: "36px", // 단위 텍스트용 오른쪽 여백
                  width: "100%", // 부모(div)의 80% 기준
                  boxSizing: "border-box", // 패딩 포함
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "15px",
                  color: "#666",
                }}
              >
                원
              </span>
            </div>
          </>
        )}

        <ButtonRow>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={handleSubmit}>추가하기</Button>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}

export default ClubScheduleModal;
