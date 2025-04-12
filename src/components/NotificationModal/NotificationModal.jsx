import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 70px;
  right: 80px;
  width: 510px;
  max-height: 600px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  z-index: 2000;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2e7d32;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["active", "danger"].includes(prop),
})`
  background-color: ${({ active, danger }) =>
    active ? (danger ? "#f44336" : "#d0f3c8") : "#eeeeee"};
  color: ${({ active, danger }) => (active && danger ? "#fff" : "#333")};
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ danger }) => (danger ? "#d32f2f" : "#c2eabd")};
    color: ${({ danger }) => (danger ? "#fff" : "#000")};
  }
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding: 4px 4px 0 0;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
`;

const NotificationBubble = styled.div`
  align-self: flex-start;
  background-color: ${({ selected }) => (selected ? "#b7e4b4" : "#e8f5e9")};
  color: #2e7d32;
  padding: 22px 26px;
  border-radius: 20px 20px 20px 6px;
  max-width: 100%;
  font-size: 18px;
  line-height: 1.9;
  white-space: pre-wrap;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: ${({ selected }) => (selected ? "2px solid #4caf50" : "none")};
  cursor: ${({ selectable }) => (selectable ? "pointer" : "default")};
  position: relative;
`;

const Emoji = styled.span`
  font-size: 24px;
`;

const CheckMark = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 18px;
  color: #2e7d32;
`;

const BottomCloseButton = styled.button`
  margin-top: 16px;
  background-color: #eeeeee;
  color: #333;
  border: none;
  padding: 12px 16px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: rgb(159, 221, 151);
  }
`;

function NotificationModal({ onClose }) {
  const [notifications, setNotifications] = useState([
    "동산 동아리에 가입되었습니다",
    "결제가 완료되었습니다",
    "<청춘은바로지금> 동아리 정기 모임 날짜(8/20)까지 5일 남았습니다",
  ]);
  const [selected, setSelected] = useState([]);
  const [confirmAllDelete, setConfirmAllDelete] = useState(false);
  const [selectMode, setSelectMode] = useState(false); // ✅ 개별 삭제 모드
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [notifications]);

  const getEmoji = (text) => {
    if (text.includes("결제")) return "💳";
    if (text.includes("가입")) return "👥";
    if (text.includes("날짜") || text.includes("일 남았습니다")) return "🗓️";
    return "📢";
  };

  const handleSelect = (index) => {
    if (!selectMode) return;
    const newList = [...selected];
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1);
    } else {
      newList.push(index);
    }
    setSelected(newList);
  };

  const handleDeleteSelected = () => {
    if (!selectMode) {
      setSelectMode(true); // ✅ 선택 모드 ON
    } else {
      // 삭제 실행
      const newNotis = notifications.filter((_, i) => !selected.includes(i));
      setNotifications(newNotis);
      setSelected([]);
      setSelectMode(false); // ✅ 선택 모드 종료
    }
  };

  const handleDeleteAll = () => {
    if (!confirmAllDelete) {
      setSelected(notifications.map((_, i) => i));
      setConfirmAllDelete(true);
    } else {
      setNotifications([]);
      setSelected([]);
      setConfirmAllDelete(false);
    }
  };

  return (
    <ModalWrapper>
      <TitleRow>
        <Title>&lt;알람&gt;</Title>
        <ActionButtons>
          <ActionButton
            onClick={handleDeleteSelected}
            active={selectMode}
            danger
          >
            {selectMode ? "선택 삭제" : "개별 삭제"}
          </ActionButton>
          <ActionButton onClick={handleDeleteAll}>
            {confirmAllDelete ? "정말 전체 삭제하시겠습니까?" : "전체 삭제"}
          </ActionButton>
        </ActionButtons>
      </TitleRow>

      <ChatBox ref={chatRef}>
        {notifications.length === 0 ? (
          <NotificationBubble>
            <Emoji>📭</Emoji>알림이 없습니다.
          </NotificationBubble>
        ) : (
          notifications.map((msg, i) => (
            <NotificationBubble
              key={i}
              selectable={selectMode}
              selected={selected.includes(i)}
              onClick={() => handleSelect(i)}
            >
              {selected.includes(i) && <CheckMark>✔️</CheckMark>}
              <Emoji>{getEmoji(msg)}</Emoji>
              {msg}
            </NotificationBubble>
          ))
        )}
      </ChatBox>

      <BottomCloseButton onClick={onClose}>닫기</BottomCloseButton>
    </ModalWrapper>
  );
}

export default NotificationModal;
