import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";

const LoginGroupPage = () => {
  const [userGroupData, setUserGroupData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 뒤로가기 버튼
  const onBack = () => {
    navigate("/");
  };

  // useLocation에서 state로 전달된 group_id 가져오기
  const group_id = location.state?.group_id;

  useEffect(() => {
    const API_USER_GROUP_URL = `http://54.180.127.164:18090/api/usergroup`;

    if (group_id) {
      fetch(`${API_USER_GROUP_URL}/${group_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user group data:", data); // 데이터 확인
          if (Array.isArray(data)) {
            setUserGroupData(data);
          } else {
            console.error("Invalid data format: Expected an array", data);
            setUserGroupData([]); // 에러 방지
          }
        })
        .catch((error) => {
          console.error("그룹 로그인 정보 불러오기 오류", error);
          setUserGroupData([]);
        });
    }
  }, [group_id]);

  return (
    <div className="login-group-container">
      <button onClick={() => navigate("/")} className="join-back-button">
        🔙 뒤로가기
      </button>
      <h1>사용자 선택</h1>
      <p>아래에서 로그인할 사용자를 선택하세요.</p>
      <div className="user-list">
        {userGroupData.map((user, index) => (
          <button
            key={user.user_id ?? `user-${index}`}
            className="user-button"
            onClick={() => handleUserSelect(user)}
          >
            <h2>{user.user_name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginGroupPage;
