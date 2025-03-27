import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";

const LoginPage = () => {
  const API_USER_URL = `http://localhost:18090/api/user`;

  const [isModalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
            openModal();
          }}
        >
          로그인
        </button>
        <button onClick={() => {}}>회원가입</button>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        로그인 없어용.
        <br />
        <button onClick={closeModal}>닫기</button>
      </ReactModal>
    </>
  );
};

export default LoginPage;
