import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const LoginPage = () => {
  const API_USER_URL = `http://54.180.127.164:18090/api/user`;

  const ACCESS_KEY = `${import.meta.env.VITE_ACCESS_KEY}`;
  const SECRET_ACCESS_KEY = `${import.meta.env.VITE_SECRET_ACCESS_KEY}`;
  const REGION = `${import.meta.env.VITE_AWS_REGION}`;
  const S3_BUCKET = `${import.meta.env.VITE_S3_BUCKET_NAME}`;

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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

  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
    computeChecksums: false, // ✅ 체크섬 강제 해제
    useAccelerateEndpoint: false, // ✅ 가속화 엔드포인트 비활성화
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    if (file.type !== "image/jpeg" || fileExt !== "jpg") {
      alert("jpg 파일만 Upload 가능합니다.");
      return;
    }

    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: S3_BUCKET,
        Key: `upload/${file.name}`,
        Body: file, // Blob 사용
      },
      tags: [], // 태그 추가 가능
      queueSize: 4, // 병렬 업로드 수
      partSize: 1024 * 1024 * 5, // 5MB씩 업로드
      leavePartsOnError: false, // ✅ 업로드 실패 시 자동 정리
    });

    upload.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      }
    });

    try {
      await upload.done();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setSelectedFile(null);
        setProgress(0); // 완료 후 초기화
      }, 3000);
    } catch (err) {
      console.error("S3 업로드 오류:", err);
    }
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
    // <>
    //   <div>
    //     <h1>Login Page</h1>
    //     <button
    //       onClick={() => {
    //         openLoginModal();
    //       }}
    //     >
    //       로그인
    //     </button>
    //     <button
    //       onClick={() => {
    //         openRegisterModal();
    //       }}
    //     >
    //       회원가입
    //     </button>
    //   </div>
    //   <ReactModal
    //     isOpen={isLoginModalOpen}
    //     onRequestClose={closeLoginModal}
    //     style={customStyles}
    //   >
    //     로그인 없어용.
    //     <br />
    //     <button onClick={closeLoginModal}>닫기</button>
    //   </ReactModal>
    //   <ReactModal
    //     isOpen={isRegisterModalOpen}
    //     onRequestClose={closeRegisterModal}
    //     style={customStyles}
    //   >
    //     <form>
    //       <label className="signup-profileImg-label" htmlFor="profileImg">
    //         이미지 업로드 테스트
    //       </label>
    //       {showAlert ? (
    //         <Alert color="primary">업로드 진행률 : {progress}%</Alert>
    //       ) : (
    //         <Alert color="primary">파일을 선택해 주세요.</Alert>
    //       )}
    //       <Input color="primary" type="file" onChange={handleFileInput} />
    //       {selectedFile ? (
    //         <Button color="primary" onClick={() => uploadFile(selectedFile)}>
    //           {" "}
    //           Upload to S3
    //         </Button>
    //       ) : null}
    //     </form>
    //     <br />
    //     <button onClick={closeRegisterModal}>닫기</button>
    //   </ReactModal>
    // </>

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
