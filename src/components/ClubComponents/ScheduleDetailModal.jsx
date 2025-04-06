import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 24px;
  width: 520px;
  padding: 48px;
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const Title = styled.h3`
  font-size: 26px;
  font-weight: bold;
  color: #00734f;
  margin-bottom: 24px;
  text-align: center;
`;

const InfoLine = styled.div`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 14px;

  span {
    margin-right: 16px;
  }
`;

const AttendanceInfo = styled.div`
  font-size: 18px;
  color: #222;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
  background-color: #f3f3f3;
  padding: 12px;
  border-radius: 12px;
`;

const ContentText = styled.p`
  font-size: 17px;
  color: #555;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &.attend {
    background-color: #e0f5e9;
    color: #00734f;
    border: 1px solid #cce8db;

    &:hover {
      background-color: #c4edd7;
    }
  }

  &.absent {
    background-color: #ffecec;
    color: #d34545;
    border: 1px solid #f5caca;

    &:hover {
      background-color: #fddcdc;
    }
  }

  &.close {
    background-color: #f2f2f2;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const ScheduleDetailModal = ({ schedule, onClose }) => {
  const [attendCount, setAttendCount] = useState(0);
  const [hasAttended, setHasAttended] = useState(false);

  const toggleAttendance = () => {
    if (hasAttended) {
      setAttendCount((prev) => Math.max(prev - 1, 0));
    } else {
      setAttendCount((prev) => prev + 1);
    }
    setHasAttended((prev) => !prev);
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>🧑‍🤝‍🧑 {schedule.title}</Title>

        <InfoLine>
          <span>🕒 {schedule.time}</span>
          <span>📍 {schedule.location || "미정"}</span>
        </InfoLine>
        <InfoLine>
          <span>💸 {schedule.fee || "없음"}</span>
        </InfoLine>

        <AttendanceInfo>🙋‍♂️ 현재 참석 인원: {attendCount}명</AttendanceInfo>

        <ContentText>{schedule.content}</ContentText>

        <ButtonGroup>
          <Button className="attend" onClick={toggleAttendance}>
            {hasAttended ? "참석 취소" : "참석"}
          </Button>
          <Button className="absent">불참</Button>
          <Button className="close" onClick={onClose}>
            닫기
          </Button>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
};

export default ScheduleDetailModal;
