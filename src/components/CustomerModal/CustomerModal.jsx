import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  bottom: 160px;
  right: 0;
  transform: translateX(-22%);
  /* width: 420px;
  max-height: 650px; */
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

const BotMessage = styled.div`
  align-self: flex-start;
  background-color: #e8f5e9;
  color: #2e7d32;
  /* padding: 14px 18px; */
  padding: 18px 22px;
  border-radius: 20px 20px 20px 6px;
  max-width: 85%;
  /* font-size: 16px;
  line-height: 1.6; */
  font-size: 18px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background-color: #c8e6c9;
  color: #1b5e20;
  padding: 14px 18px;
  border-radius: 20px 20px 6px 20px;
  max-width: 85%;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const OptionButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  /* padding: 12px 16px; */
  padding: 16px 20px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 17px;
  font-weight: 500;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0f2f1;
  }

  span.emoji {
    font-size: 24px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const UserMessageInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #c8e6c9;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #66bb6a;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4caf50;
  }
`;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 14px;
//   right: 20px;
//   background: transparent;
//   border: none;
//   font-size: 22px;
//   color: #999;
//   cursor: pointer;
//   &:hover {
//     color: #2e7d32;
//   }
// `;

const BottomCloseButton = styled.button`
  margin-top: 12px;
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

const responseMap = {
  "이용 문의": `📖 자주 묻는 질문: 이용 관련 안내

Q. 회원가입 없이도 이용이 가능한가요?
A. 아쉽게도 모든 서비스는 회원가입 후 이용하실 수 있습니다. 간단한 인증 절차만 거치면 바로 사용 가능합니다.

Q. 강좌를 수강하려면 어떻게 해야 하나요?
A. 메인 화면 또는 상단 메뉴에서 원하는 강좌를 선택하신 뒤, '수강하기' 버튼을 눌러 시작할 수 있습니다.

Q. 모바일에서도 사용 가능한가요?
A. 네, 모바일 브라우저에서도 모든 기능이 지원되며, 곧 전용 앱도 출시될 예정입니다!`,

  "결제 문의": `💳 자주 묻는 질문: 결제 관련 안내

Q. 결제는 어떤 방법으로 가능한가요?
A. 신용카드, 계좌이체, 카카오페이, 토스 등 다양한 결제 수단을 지원하고 있습니다.

Q. 결제 영수증은 어디서 확인할 수 있나요?
A. 마이페이지 > 결제 내역에서 영수증 및 상세 정보를 확인하실 수 있어요.

Q. 결제했는데 수강이 안 돼요!
A. 결제가 정상적으로 완료되지 않았거나 네트워크 문제일 수 있습니다. 오류 메시지 또는 결제 시간 정보를 함께 알려주시면 빠르게 도와드리겠습니다.`,

  "기타 문의": `📩 자주 묻는 질문: 기타 일반 문의

Q. 회원 탈퇴는 어떻게 하나요?
A. 마이페이지 > 설정 > 회원 탈퇴에서 직접 진행하실 수 있습니다. 탈퇴 후 복구는 불가능하니 신중히 결정해 주세요.

Q. 이메일 주소나 비밀번호를 변경하고 싶어요.
A. 로그인 후 마이페이지 > 내 정보 수정에서 변경이 가능합니다.

Q. 알림이 너무 많이 와요.
A. 마이페이지 > 알림 설정에서 푸시, 이메일, 문자 수신 여부를 자유롭게 조절하실 수 있습니다.`,

  "상담사 연결": `🧑‍💼 상담사 연결 중...\n운영 시간은 평일 오전 9시 ~ 오후 6시입니다.\n주말 및 공휴일은 쉽니다.\n문의 내용을 입력해 주세요.`,
};

const emojiMap = {
  "이용 문의": "📖",
  "결제 문의": "💳",
  "기타 문의": "📩",
  "상담사 연결": "🧑‍💼",
};

function CustomerModal({ onClose }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: `안녕하세요, 파릇입니다.\n찾아주셔서 감사합니다.\n궁금하신 점을 선택해주시면 성심성의껏 답변 드리겠습니다.`,
    },
    {
      type: "buttons",
    },
  ]);
  const [isConsulting, setIsConsulting] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (userInput.trim() === "") return;

    const newMessages = [{ type: "user", text: userInput }];

    if (isConsulting) {
      newMessages.push(
        {
          type: "bot",
          text: "문의가 접수되었습니다. 순차적으로 답변이 진행될 예정입니다.",
        },
        {
          type: "bot",
          text: "처음 질문으로 돌아가시겠습니까?",
        },
        {
          type: "confirm",
        }
      );
      setIsConsulting(false); // 상담사 연결 상태 초기화
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setUserInput("");
  };

  // ✅ 여기 바로 밑에 붙여 넣으세요!
  const handleSelect = (label) => {
    if (label === "상담사 연결") {
      setIsConsulting(true);
      setMessages((prev) => [
        ...prev,
        { type: "user", text: label },
        { type: "bot", text: responseMap[label] },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { type: "user", text: label },
      { type: "bot", text: responseMap[label] },
      { type: "bot", text: "처음 질문으로 돌아가시겠습니까?" },
      { type: "confirm" },
    ]);
  };

  const handleConfirm = (answer) => {
    if (answer === "네") {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: "네" },
        { type: "buttons" },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: "아니요" },
        { type: "bot", text: "상담을 종료하겠습니다." },
      ]);
    }
  };

  return (
    <ModalWrapper>
      {/* <CloseButton onClick={onClose}>✖</CloseButton> */}

      <ChatBox ref={chatRef}>
        {messages.map((msg, idx) => {
          if (msg.type === "bot") {
            return <BotMessage key={idx}>{msg.text}</BotMessage>;
          } else if (msg.type === "user") {
            return <UserMessage key={idx}>{msg.text}</UserMessage>;
          } else if (msg.type === "buttons") {
            return (
              <OptionButtonList key={idx}>
                {Object.keys(responseMap).map((label) => (
                  <OptionButton key={label} onClick={() => handleSelect(label)}>
                    <span className="emoji">{emojiMap[label]}</span>
                    {label}
                  </OptionButton>
                ))}
              </OptionButtonList>
            );
          } else if (msg.type === "confirm") {
            return (
              <OptionButtonList key={idx}>
                {["네", "아니요"].map((ans) => (
                  <OptionButton key={ans} onClick={() => handleConfirm(ans)}>
                    {ans}
                  </OptionButton>
                ))}
              </OptionButtonList>
            );
          } else {
            return null;
          }
        })}
      </ChatBox>

      <InputContainer>
        <UserMessageInput
          placeholder="메시지를 입력하세요..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <SendButton onClick={handleSend}>보내기</SendButton>
      </InputContainer>
      <BottomCloseButton onClick={onClose}>닫기</BottomCloseButton>
    </ModalWrapper>
  );
}

export default CustomerModal;
