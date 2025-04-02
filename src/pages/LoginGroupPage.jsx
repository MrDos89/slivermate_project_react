import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginGroupContainer,
  BackButton,
  UserList,
  UserButton,
} from "../js/loginGroup.styles"; // 스타일 임포트

const LoginGroupPage = () => {
  const [userGroupData, setUserGroupData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const group_id = location.state?.group_id;

  useEffect(() => {
    const API_USER_GROUP_URL = `http://54.180.127.164:18090/api/usergroup`;

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
    // navigate(`/dashboard`, { state: { user_id: user.user_id } });
  };

  return (
    <LoginGroupContainer>
      <BackButton onClick={() => navigate("/")}>🔙 뒤로가기</BackButton>
      <h1>사용자 선택</h1>
      <p>아래에서 로그인할 사용자를 선택하세요.</p>
      <UserList>
        {userGroupData.map((user, index) => (
          <UserButton
            key={user.user_id ?? `user-${index}`}
            onClick={() => handleUserSelect(user)}
          >
            <h2>{user.user_name}</h2>
          </UserButton>
        ))}
      </UserList>
    </LoginGroupContainer>
  );
};

export default LoginGroupPage;
