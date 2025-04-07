import React, { useState } from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const EditButton = styled.button`
  background-color: #e6f0ff;
  color: #0051a3;
  border: 1px solid #a6c9ff;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #d0e3ff;
  }
`;

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
  flex: 1;
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

const ContentTextarea = styled.textarea`
  width: 100%;
  font-size: 17px;
  color: #555;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  line-height: 1.6;
  resize: none;
  border: 1px solid #ccc;
`;

const ScheduleDetailModal = ({ schedule, onClose }) => {
  const [attendCount, setAttendCount] = useState(0);
  const [hasAttended, setHasAttended] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(schedule.content);

  const [editedTitle, setEditedTitle] = useState(schedule.title);
  const [editedTime, setEditedTime] = useState(schedule.time);
  const [editedLocation, setEditedLocation] = useState(schedule.location);
  const [editedFee, setEditedFee] = useState(schedule.fee);

  const toggleAttendance = () => {
    if (hasAttended) {
      setAttendCount((prev) => Math.max(prev - 1, 0));
    } else {
      setAttendCount((prev) => prev + 1);
    }
    setHasAttended((prev) => !prev);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Overlay>
      <ModalBox>
        <Header>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="제목"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "16px",
                flex: 1,
              }}
            />
          ) : (
            <Title>{`🧑‍🤝‍🧑 ${editedTitle}`}</Title>
          )}
          <EditButton onClick={handleEditToggle}>
            {isEditing ? "수정 완료" : "수정"}
          </EditButton>
        </Header>

        {/* <InfoLine>
          <span>🕒 {schedule.time}</span>
          <span>📍 {schedule.location || "미정"}</span>
        </InfoLine>
        <InfoLine>
          <span>💸 {schedule.fee || "없음"}</span>
        </InfoLine> */}

        {isEditing ? (
          <>
            <InfoLine>
              <input
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                placeholder="시간"
              />
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                placeholder="장소"
              />
            </InfoLine>
            <InfoLine>
              <input
                type="text"
                value={editedFee}
                onChange={(e) => setEditedFee(e.target.value)}
                placeholder="회비"
              />
            </InfoLine>
          </>
        ) : (
          <>
            <InfoLine>
              <span>🕒 {editedTime}</span>
              <span>📍 {editedLocation || "미정"}</span>
            </InfoLine>
            <InfoLine>
              <span>💸 {editedFee || "없음"}</span>
            </InfoLine>
          </>
        )}

        <AttendanceInfo>🙋‍♂️ 현재 참석 인원: {attendCount}명</AttendanceInfo>

        {isEditing ? (
          <ContentTextarea
            value={editedContent}
            onChange={handleContentChange}
            rows={6}
          />
        ) : (
          <ContentText>{editedContent}</ContentText>
        )}

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
