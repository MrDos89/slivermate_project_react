import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginGroupContainer,
  BackButton,
  UserList,
  UserButton,
  UserThumbnail,
} from "../js/loginGroup.styles"; // 스타일 파일 불러오기

const defaultThumbnail =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // 기본 실루엣 이미지

const LoginGroupPage = () => {
  const [userGroupData, setUserGroupData] = useState([]);
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
          console.log("Fetched user group data:", data);
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

  const handleUserSelect = (user) => {
    console.log("Selected user:", user);

    const API_USER_GROUP_LOGIN_URL = `http://${
      import.meta.env.VITE_API_ADDRESS
    }:${import.meta.env.VITE_API_PORT}/api/usergroup/login/${group_id}/${
      user.uid
    }`;

    console.log("API URL:", API_USER_GROUP_LOGIN_URL);
    // 로그인 요청

    fetch(API_USER_GROUP_LOGIN_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 세션 유지
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
            onClick={() => handleUserSelect(user)}
          >
            <UserThumbnail
              src={user.thumbnail || defaultThumbnail}
              alt={`${user.user_name} 프로필`}
            />
            <h2>{user.user_name}</h2>
          </UserButton>
        ))}
      </UserList>
    </LoginGroupContainer>
  );
};

export default LoginGroupPage;
