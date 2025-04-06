import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import styled, { createGlobalStyle } from "styled-components";
import image1 from "../images/qorud.png"; 

// ✅ 여기에 전체 스타일 컴포넌트 삽입 (className 기반으로 강제 적용)
const GlobalLoginStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .login-container {
  position: fixed; /* ✅ fixed로 고정 */
  top: 0;
  left: 0;
  width: 100%;      /* ✅ 100%로 교체 */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 0;
}

.login-container::before {
  content: "";
  position: fixed; /* ✅ 배경도 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url('https://www.ktsketch.co.kr/news/photo/202305/7545_38643_3453.jpg'); */
  // background-image: url('https://images.unsplash.com/photo-1597348253635-b627a7e0db14?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  // background-image: url('https://previews.123rf.com/images/popetornsookchai/popetornsookchai1803/popetornsookchai180300026/97488854-%EC%82%B0%EC%95%85-%ED%95%98%EB%8A%98-%EA%B5%AC%EB%A6%84%EA%B3%BC-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%ED%91%B8%EB%A5%B8-%EB%82%98%EB%AC%B4.jpg');
  // background-image: url('https://img.freepik.com/premium-photo/green-forest-with-tree-sun-shining-it_180198-904.jpg');
  background-image: url('https://cdn.crowdpic.net/detail-thumb/thumb_d_77D573AB72333058FA44027FB649FA4C.jpg');
  // background-color: #97ff97;
  background-size: cover;
  background-position: center center; /* 기본값으로도 충분할 것 */
  filter: blur(8px) brightness(0.7);
  z-index: 0;
}

// 오버레이이
.login-container::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(114, 255, 130, 0.196); 
  z-index: 1;
}


  /* ✅ 로그인 박스 전체 묶음 */
  .login-box {
    position: relative;
    z-index: 2;
    /* background: rgba(0, 0, 50, 0.5);
    backdrop-filter: blur(2px); */
    border-radius: 20px;
    padding: 30px;
    width: 350px;
    height: 600px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 95px;

    // 이거 지우고, 위에꺼 살리면 걍 검정 배경
    background-image: url(${image1});
    background-size: cover; 
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 50, 0.6); /* 이미지 위 반투명 배경 */
  // background-color: rgba(255, 255, 240, 0.94); /* 아이보리 느낌 */
  backdrop-filter: blur(2px); /* 배경 흐림 유지 */  
}

  .login-box h2 {
    //color: white;
    color: #222222;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 60px;
  }

  .login-logo-container {
    margin-bottom: 20px;
  }

  .login-logo-container h1 {
    font-family: 'Segoe UI', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    // color: white;
    color: #0ea144;
  }

  form {
    width: 100%;
  }

  label {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    // color: white;
    color: #222222;
    text-align: left;
  
  }

  input {
    width: 93%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    margin-bottom: 8px;
    // ackground: rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 14px;
  }

  input::placeholder {
    // color: rgba(255, 255, 255, 0.7);
    color: rgba(255, 255, 255, 0.8);
  }

  .error-message {
    color: #ffaaaa;
    font-size: 12px;
    margin: 6px 0;
  }

  .login-button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .login-button-group button {
    padding: 12px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  .login-button-group button:first-child {
    background-color: #8bc34a;
    color: white;
  }

  .login-button-group button:last-child {
    background-color: #3b5998;
    color: white;
  }

  .login-back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    z-index: 2;
    cursor: pointer;
  }
`;




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
    <>
    <GlobalLoginStyles />
    <div className="login-container">
      <button onClick={onBack} className="login-back-button">
        {/* <MdOutlineBackspace /> */}
      </button>
      <div className="login-box">
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
    </div>
    </>
  );
};

export default LoginPage;
