import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { dummyClubs } from "../data/clubData";
import { chatMessages } from "../data/chatDummyData";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 18px;
  }
`;

const ChatContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
`;

const ChatSidebar = styled.div`
  width: 520px;
  border-right: 1px solid #ccc;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatSidebarInner = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContent = styled.div`
  flex: 1;
  min-height: 0;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  padding: 16px 24px;
  border-top: 1px solid #ccc;
  background: #fafafa;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const SendButton = styled.button`
  margin-left: 12px;
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;

const ChatRoom = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  background-color: ${({ active }) => (active ? "#f0f0f0" : "white")};
  font-size: 18px;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ChatThumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 14px;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const ChatTitle = styled.div`
  font-weight: bold;
`;

const ChatLast = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 6px;
`;

const ChatMeta = styled.div`
  text-align: right;
`;

const ChatTime = styled.div`
  font-size: 14px;
  color: #888;
`;

const ChatUnread = styled.div`
  background-color: red;
  color: white;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 999px;
  margin-top: 6px;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ChatDate = styled.div`
  text-align: center;
  font-size: 15px;
  color: #999;
  margin: 14px 0;
`;

const ChatBubble = styled.div`
  max-width: 70%;
  padding: 12px 18px;
  border-radius: 14px;
  position: relative;
  font-size: 17px;
  background-color: ${({ isMe }) => (isMe ? "#d1e8ff" : "#f1f1f1")};
  align-self: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  border-bottom-left-radius: ${({ isMe }) => (isMe ? "14px" : "0")};
  border-bottom-right-radius: ${({ isMe }) => (isMe ? "0" : "14px")};

  &::after {
    content: "";
    position: absolute;
    top: 12px;
    ${({ isMe }) => (isMe ? "right: -10px;" : "left: -10px;")}
    width: 0;
    height: 0;
    border: 10px solid transparent;
    ${({ isMe }) =>
      isMe ? "border-left-color: #d1e8ff;" : "border-right-color: #f1f1f1;"}
  }
`;

const ChatName = styled.div`
  font-size: 15px;
  color: #333;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const ChatText = styled.div``;

const ChatTimeSmall = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
  padding: 0 6px;
  margin-left: ${({ isMe }) => (isMe ? "auto" : "0")};
  margin-right: ${({ isMe }) => (isMe ? "0" : "auto")};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #aaa;
  font-size: 20px;
  text-align: center;
  z-index: 2;
`;

const LeafContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const FallingLeaf = styled.div`
  position: absolute;
  top: ${({ startTop }) => startTop || "-40px"};
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;

  @keyframes fall {
    0% {
      transform: translateX(0px) translateY(0px) rotate(0deg);
      opacity: 0.9;
    }
    25% {
      transform: translateX(-80px) translateY(200px) rotate(90deg);
    }
    50% {
      transform: translateX(-160px) translateY(400px) rotate(180deg);
    }
    75% {
      transform: translateX(-240px) translateY(600px) rotate(270deg);
    }
    100% {
      transform: translateX(-320px) translateY(800px) rotate(360deg);
      opacity: 0;
    }
  }
`;

function ChatTestPage() {
  const navigate = useNavigate();
  const API_USER_SESSION_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/usergroup/session`;
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //@note - 유저 세션 체크하기
  useEffect(() => {
    fetch(API_USER_SESSION_URL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.log("로그인 세션이 없습니다.");
            setIsLoggedIn(false);
            navigate("/login");
          } else {
            console.error("회원 정보 불러오기 실패:", response.status);
          }
          return; // 에러 발생 시 더 이상 진행하지 않음
        }
        return response.json();
      })
      .then((data) => {
        console.log("user 데이터 확인:", data);
        setUserData(data);
        setIsLoggedIn(true);
      })
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, [API_USER_SESSION_URL, navigate]);

  const [selectedClubId, setSelectedClubId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const leafVariants = ["🍃", "🌿", "🍀", "🍃"];

  const generateRandomLeaves = (count) => {
    const leaves = [];
    const leafVariants = ["🍃", "🌿", "🍀", "🍃"];

    // 기존 랜덤 잎사귀
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 6 + Math.random() * 5;
      const rotate = Math.random() > 0.5 ? 360 : -360;
      const size = 21 + Math.random() * 18;
      const startTop = `-${Math.floor(60 + Math.random() * 140)}px`;
      const leaf =
        leafVariants[Math.floor(Math.random() * leafVariants.length)];

      leaves.push(
        <FallingLeaf
          key={`leaf-${i}`}
          startTop={startTop}
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize: `${size}px`,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {leaf}
        </FallingLeaf>
      );
    }

    // 🎯 왼쪽에서 떨어질 잎사귀 2개 추가
    for (let i = 0; i < 2; i++) {
      const fixedLeft = 10 + i * 10; // 10%, 20%
      const delay = Math.random() * 5;
      const duration = 7 + Math.random() * 4;
      const rotate = Math.random() > 0.5 ? 360 : -360;
      const size = 20 + Math.random() * 12;
      const startTop = `-${Math.floor(80 + Math.random() * 120)}px`;
      const leaf =
        leafVariants[Math.floor(Math.random() * leafVariants.length)];

      leaves.push(
        <FallingLeaf
          key={`extra-left-${i}`}
          startTop={startTop}
          style={{
            left: `${fixedLeft}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize: `${size}px`,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          {leaf}
        </FallingLeaf>
      );
    }

    return leaves;
  };

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(generateRandomLeaves(5 + Math.floor(Math.random() * 6)));
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (selectedClubId && chatMessages[selectedClubId]) {
      chatMessages[selectedClubId] = chatMessages[selectedClubId].map((msg) =>
        !msg.isMe && !msg.read ? { ...msg, read: true } : msg
      );
    }
  }, [selectedClubId, inputValue]);

  const handleSelectClub = (clubId) => {
    setSelectedClubId(clubId);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: "me",
      senderName: "나",
      isMe: true,
      content: inputValue,
      timestamp: new Date().toISOString(),
      read: false,
    };

    chatMessages[selectedClubId] = [
      ...(chatMessages[selectedClubId] || []),
      newMessage,
    ];
    setInputValue("");
  };

  const renderChatRooms = () => {
    const sortedClubs = [...dummyClubs].sort((a, b) => {
      const aUnread = (chatMessages[a.club_id] || []).some(
        (msg) => !msg.isMe && !msg.read
      );
      const bUnread = (chatMessages[b.club_id] || []).some(
        (msg) => !msg.isMe && !msg.read
      );
      if (aUnread === bUnread) return 0;
      return aUnread ? -1 : 1;
    });

    return sortedClubs.map((club) => {
      const messages = chatMessages[club.club_id] || [];
      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter(
        (msg) => !msg.isMe && !msg.read
      ).length;

      return (
        <ChatRoom
          key={club.club_id}
          active={selectedClubId === club.club_id}
          onClick={() => handleSelectClub(club.club_id)}
        >
          <ChatThumb src={club.club_thumbnail} alt="thumb" />
          <ChatInfo>
            <ChatTitle>{club.club_name}</ChatTitle>
            <ChatLast>{lastMessage?.content ?? "채팅 없음"}</ChatLast>
          </ChatInfo>
          <ChatMeta>
            <ChatTime>{lastMessage?.timestamp?.slice(11, 16)}</ChatTime>
            {unreadCount > 0 && <ChatUnread>{unreadCount}</ChatUnread>}
          </ChatMeta>
        </ChatRoom>
      );
    });
  };

  const renderMessages = () => {
    const messages = chatMessages[selectedClubId] || [];

    if (!selectedClubId) {
      return (
        <LeafContainer>
          {leaves}
          <Placeholder>채팅방을 선택해주세요</Placeholder>
        </LeafContainer>
      );
    }

    if (messages.length === 0) {
      return <Placeholder>아직 대화가 없습니다</Placeholder>;
    }

    let lastTime = "";

    return (
      <ChatMessages>
        {messages.map((msg) => {
          if (msg.type === "date") {
            return <ChatDate key={msg.id}>{msg.content}</ChatDate>;
          }

          const currentTime = msg.timestamp?.slice(11, 16);
          const showTime = currentTime !== lastTime;
          lastTime = currentTime;

          return !msg.isMe ? (
            <div
              key={msg.id}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <img
                src={msg.senderProfile}
                alt="profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "4px",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ChatName>{msg.senderName}</ChatName>
                <ChatBubble isMe={false}>
                  <ChatText>{msg.content}</ChatText>
                </ChatBubble>
                {showTime && (
                  <ChatTimeSmall isMe={false}>{currentTime}</ChatTimeSmall>
                )}
              </div>
            </div>
          ) : (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <ChatBubble isMe={true}>
                <ChatText>{msg.content}</ChatText>
              </ChatBubble>
              {showTime && (
                <ChatTimeSmall isMe={true}>
                  {currentTime} {msg.read ? "✔" : "안읽음"}
                </ChatTimeSmall>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </ChatMessages>
    );
  };

  return (
    <>
      <GlobalStyle />
      <ChatContainer>
        <ChatSidebar>
          <ChatSidebarInner>{renderChatRooms()}</ChatSidebarInner>
        </ChatSidebar>
        <ChatWindow>
          <ChatContentWrapper>
            <ChatContent>{renderMessages()}</ChatContent>
          </ChatContentWrapper>
          <InputArea>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                selectedClubId
                  ? "메시지를 입력하세요"
                  : "채팅방을 먼저 선택하세요"
              }
              disabled={!selectedClubId}
            />
            <SendButton onClick={handleSend} disabled={!selectedClubId}>
              전송
            </SendButton>
          </InputArea>
        </ChatWindow>
      </ChatContainer>
    </>
  );
}

export default ChatTestPage;
