import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Input, Alert } from "reactstrap";

const LoginPage = () => {
  const API_USER_URL = `http://54.180.127.164:18090/api/user`;

  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 뒤로가기 버튼
  const onBack = () => {
    navigate("/");
  };

  // 로그인 처리
  const handleLogin = async () => {
    // e.preventDefault();

    try {
      const response = await fetch(API_USER_URL + `/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ 세션 유지
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("data", data);

      navigate("/grouplogin", { state: { group_id: data.group_id } });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <button onClick={onBack} className="login-back-button">
        {/* <MdOutlineBackspace /> */}
      </button>
      <h2>로그인</h2>
      <div className="login-logo-container">
        <h1>파릇</h1>
      </div>
      <form onSubmit={handleLogin}>
        <label>아이디:</label>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, user_id: e.target.value })
          }
        />
        <br />
        <label>비밀번호:</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* 로그인 오류메시지 출력 */}
        {error && <p className="error-message">{error}</p>}

        <div className="login-button-group">
          <button type="button" onClick={() => handleLogin()}>
            로그인
          </button>
          <button type="button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
