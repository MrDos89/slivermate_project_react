import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginGroupContainer,
  BackButton,
  UserList,
  UserButton,
  UserThumbnail,
} from "../js/LoginGroup.styles"; // 스타일 파일 불러오기
import styled from "styled-components";

const defaultThumbnail =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // 기본 실루엣 이미지

// 🔐 모달 스타일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const ModalInput = styled.input`
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  width: 100%;
`;

const ModalButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  background: #ff914d;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const LoginGroupPage = () => {
  const [userGroupData, setUserGroupData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const group_id = location.state?.group_id;

  useEffect(() => {
    const API_USER_GROUP_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
      import.meta.env.VITE_API_PORT
    }/api/usergroup`;

    if (group_id) {
      fetch(`${API_USER_GROUP_URL}/${group_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUserGroupData(data);
          } else {
            console.error("Invalid data format: Expected an array", data);
            setUserGroupData([]);
          }
        })
        .catch((error) => {
          console.error("그룹 로그인 정보 불러오기 오류", error);
          setUserGroupData([]);
        });
    }
  }, [group_id]);

  const openPinModal = (user) => {
    setSelectedUser(user);
    setPinInput("");
    setIsModalOpen(true);
  };

  const handlePinPasswordConfirm = () => {
    const API_USER_GROUP_LOGIN_URL = `http://${
      import.meta.env.VITE_API_ADDRESS
    }:${import.meta.env.VITE_API_PORT}/api/usergroup/login/${group_id}/${
      selectedUser.uid
    }`;

    fetch(API_USER_GROUP_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 세션 유지
      body: JSON.stringify({ pin_password: pinInput }), // 입력한 PIN 전달
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("로그인 실패");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("로그인 오류", error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <LoginGroupContainer>
      <BackButton onClick={() => navigate("/")}>뒤로가기</BackButton>
      <h1>사용자 선택</h1>
      <p>아래에서 로그인할 사용자를 선택하세요.</p>
      <UserList>
        {userGroupData.map((user, index) => (
          <UserButton
            key={user.user_id ?? `user-${index}`}
            onClick={() => openPinModal(user)}
          >
            <UserThumbnail
              src={user.thumbnail || defaultThumbnail}
              alt={`${user.user_name} 프로필`}
            />
            <h2>{user.user_name}</h2>
          </UserButton>
        ))}
      </UserList>

      {/* 🧾 PIN 입력 모달 */}
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <h2>{selectedUser?.user_name}님의 비밀번호</h2>
            <ModalInput
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN을 입력하세요"
            />
            <ModalButton onClick={handlePinPasswordConfirm}>확인</ModalButton>
            <ModalButton
              onClick={() => {
                setIsModalOpen(false);
                setPinInput("");
              }}
              style={{ background: "#aaa", marginLeft: "1rem" }}
            >
              취소
            </ModalButton>
          </ModalContainer>
        </ModalBackground>
      )}
    </LoginGroupContainer>
  );
};

export default LoginGroupPage;
