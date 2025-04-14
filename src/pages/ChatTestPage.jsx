import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

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
  const { user, logout } = useAuth();
  // const API_USER_SESSION_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
  //   import.meta.env.VITE_API_PORT
  // }/api/usergroup/session`;
  const API_USER_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/user`;
  const API_CLUB_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/club`;
  const CHAT_ADDRESS = import.meta.env.VITE_CHAT_ADDRESS;

  const [userClubsData, setUserClubsData] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState({}); // { clubId: [messages] }
  const [socket, setSocket] = useState(null);

  // //@note - 유저 세션 체크하기
  // useEffect(() => {
  //   fetch(API_USER_SESSION_URL, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         if (response.status === 401) {
  //           console.log("로그인 세션이 없습니다.");
  //           setIsLoggedIn(false);
  //           navigate("/login");
  //         } else {
  //           console.error("회원 정보 불러오기 실패:", response.status);
  //         }
  //         return; // 에러 발생 시 더 이상 진행하지 않음
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("user 데이터 확인:", data);
  //       setUserData(data);
  //       setIsLoggedIn(true);
  //     })
  //     .catch((error) => console.error("회원 정보 불러오기 오류", error));
  // }, []);

  useEffect(() => {
    const userId = user?.uid;
    if (!userId) return;

    fetch(API_CLUB_URL + `/${user?.uid}/joined`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("가입한 클럽 정보 불러오기 실패:", response.status);
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log("가입한 클럽 데이터 확인:", data);
        setUserClubsData(data);
      })
      .catch((error) => console.error("가입한 클럽 정보 불러오기 오류", error));
  }, [API_CLUB_URL, user?.uid]);

  // 웹소켓 연결 및 관리
  useEffect(() => {
    if (selectedClubId && user) {
      const wsUrl = `wss://${
        import.meta.env.VITE_WEB_SOCKET_ADDRESS
      }.execute-api.ap-northeast-2.amazonaws.com/production/?channel=${selectedClubId}`;

      const newSocket = new WebSocket(wsUrl);
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log(`WebSocket connected to channel: ${selectedClubId}`);
        // 필요하다면 서버에 구독 메시지 등을 보낼 수 있습니다.
        // newSocket.send(JSON.stringify({ action: 'subscribe', channel: selectedClubId }));
      };

      newSocket.onmessage = (event) => {
        try {
          const messageData = JSON.parse(event.data);
          const { message, nickname, thumbnail } = messageData;
          if (message && nickname) {
            setMessages((prevMessages) => ({
              ...prevMessages,
              [selectedClubId]: [
                ...(prevMessages[selectedClubId] || []),
                {
                  id: Date.now(),
                  sender: nickname === user.nickname ? "me" : nickname,
                  senderName: nickname,
                  isMe: nickname === user.nickname,
                  content: message,
                  timestamp: new Date().toISOString(),
                  read: nickname === user.nickname, // 내가 보낸 메시지는 읽음 처리
                  senderProfile: thumbnail,
                },
              ],
            }));
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      newSocket.onclose = () => {
        console.log(`WebSocket disconnected from channel: ${selectedClubId}`);
        setSocket(null);
      };

      newSocket.onerror = (error) => {
        console.error(`WebSocket error on channel ${selectedClubId}:`, error);
        setSocket(null);
      };

      // 컴포넌트 언마운트 시 또는 selectedClubId 변경 시 소켓 연결 종료
      return () => {
        if (newSocket && newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    } else if (!selectedClubId && socket) {
      // 선택된 채팅방이 없으면 기존 소켓 연결 종료
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      setSocket(null);
    }
  }, [selectedClubId, user, CHAT_ADDRESS]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // 메시지 읽음 처리 로직 (더 이상 더미 데이터에 의존하지 않음)
  }, [messages, selectedClubId]);

  const handleSelectClub = (club) => {
    console.log("채팅방 선택됨:", club.club_id);
    setSelectedClubId(club.club_id);
    // 이미 연결된 소켓이 있으면 닫고 새로 연결 (useEffect에서 처리)
  };

  const handleSend = () => {
    if (
      !inputValue.trim() ||
      !socket ||
      socket.readyState !== WebSocket.OPEN ||
      !user ||
      !selectedClubId
    ) {
      console.log(
        "메시지 전송 불가: 입력값 없음, 소켓 연결 안됨, 사용자 정보 없음, 채팅방 선택 안됨"
      );
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: user.nickname, // 또는 "me"와 같이 자신을 나타내는 값
      senderName: user.nickname,
      isMe: true,
      content: inputValue,
      timestamp: new Date().toISOString(),
      read: true, // 내가 보낸 메시지는 읽음 처리
      thumbnail: user.thumbnail || "",
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedClubId]: [...(prevMessages[selectedClubId] || []), newMessage],
    }));

    const messagePayload = {
      action: "sendmessage",
      channelId: selectedClubId,
      message: inputValue,
      nickname: user.nickname,
      thumbnail: user.thumbnail || "", // 사용자 프로필 이미지 URL
    };

    socket.send(JSON.stringify(messagePayload));
    setInputValue("");
  };

  const renderChatRooms = () => {
    return userClubsData.map((club) => {
      // const messagesForClub = messages[club.club_id] || [];
      // const lastMessage = messagesForClub[messagesForClub.length - 1];
      // const unreadCount = messagesForClub.filter(
      //   (msg) => !msg.isMe && !msg.read
      // ).length;

      return (
        <ChatRoom
          key={club.club_id}
          active={selectedClubId === club.club_id}
          onClick={() => handleSelectClub(club)}
        >
          <ChatThumb src={club.club_thumbnail} alt="thumb" />
          <ChatInfo>
            <ChatTitle>{club.club_name}</ChatTitle>
          </ChatInfo>
        </ChatRoom>
      );
    });
  };

  const renderMessages = () => {
    const currentMessages = messages[selectedClubId] || [];

    if (!selectedClubId) {
      return <Placeholder>채팅방을 선택해주세요</Placeholder>;
    }

    if (currentMessages.length === 0) {
      return <Placeholder>아직 대화가 없습니다</Placeholder>;
    }

    let lastTime = "";

    return (
      <ChatMessages>
        {currentMessages.map((msg) => {
          const currentTime = msg.timestamp?.slice(11, 16);
          const showTime = currentTime !== lastTime;
          lastTime = currentTime;

          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                alignItems: msg.isMe ? "flex-end" : "flex-start",
                gap: "10px",
                marginBottom: "14px",
                flexDirection: msg.isMe ? "row-reverse" : "row",
              }}
            >
              {!msg.isMe && (
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
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.isMe ? "flex-end" : "flex-start",
                }}
              >
                {!msg.isMe && <ChatName>{msg.senderName}</ChatName>}
                <ChatBubble isMe={msg.isMe}>
                  <ChatText>{msg.content}</ChatText>
                </ChatBubble>
                {showTime && (
                  <ChatTimeSmall isMe={msg.isMe}>{currentTime}</ChatTimeSmall>
                )}
              </div>
              {msg.isMe && (
                <img
                  src={user.thumbnail}
                  alt="profile"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginTop: "4px",
                  }}
                />
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
