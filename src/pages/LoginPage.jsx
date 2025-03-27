import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";

const LoginPage = () => {
  const API_USER_URL = `http://localhost:18090/api/user`;

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "1000",
    },
    content: {
      width: "300px",
      height: "100px",
      margin: "0 auto",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      padding: "20px",
    },
  };

  return (
    <>
      <div>
        <h1>Login Page</h1>
        <button
          onClick={() => {
            openLoginModal();
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            openRegisterModal();
          }}
        >
          회원가입
        </button>
      </div>
      <ReactModal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        style={customStyles}
      >
        로그인 없어용.
        <br />
        <button onClick={closeLoginModal}>닫기</button>
      </ReactModal>
      <ReactModal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        style={customStyles}
      >
        <form>
          <label className="signup-profileImg-label" htmlFor="profileImg">
            이미지 업로드 테스트
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
          />
        </form>
        <br />
        <button onClick={closeRegisterModal}>닫기</button>
      </ReactModal>
    </>
  );
};

export default LoginPage;
