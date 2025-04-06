import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage/UploadImage";
import styled from "styled-components";
import skan01 from "../images/skan01.mp4";
import skan04 from "../images/skan04.mp4";
import skan09 from "../images/skan09.mp4";

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 어둡게 오버레이 */
  z-index: 0;
`;

const CenteredForm = styled.div`
  position: relative;
  z-index: 1;
  width: 700px;
  margin: 0 auto;
  margin-top: 140px;
  margin-bottom: 140px;
  // background: rgba(255, 255, 255, 0.85);
  padding: 40px 30px;
  border-radius: 20px;
  // box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  // background: rgba(255, 255, 255, 0.1); 
  // box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); 

  background: rgba(0, 0, 0, 0.4); 
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); 
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #304ffe;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40ff;
  }
`;

const StyledFormWrapper = styled.div`
  .join-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%; 
  padding: 0 40px;
  box-sizing: border-box; 
}


  .join-logo-container h1 {
    font-size: 36px;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .join-back-button {
    display: none;
  }

  .join-h2 {
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 30px;
  }

  .join-form {
    width: 100%;
    max-width: 1000px;
  }

  .join-form label {
    font-size: 14px;
    color: #ffffff;
    margin-top: 10px;
  }

  .join-form input[type="text"],
  .join-form input[type="password"],
  .join-form input[type="email"],
  .join-form input[type="pin_password"],
  .join-form select {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    padding: 10px 5px;
    margin-bottom: 16px;
    color: #ffffff;
    font-size: 16px;
    outline: none;
  }

  .join-form input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .join-form select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
  }

  .join-form button {
    padding: 12px;
    border-radius: 30px;
    background-color: #304ffe;
    color: white;
    font-size: 16px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
  }

  .join-form button:hover {
    background-color: #1e40ff;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 30px;
  }

  .join-form span {
    font-size: 12px;
    color: #ffffff;
  }
`;







const allRegions = [
  [1, "서울특별시"],
  [2, "부산광역시"],
  [3, "대구광역시"],
  [4, "인천광역시"],
  [5, "광주광역시"],
  [6, "대전광역시"],
  [7, "울산광역시"],
  [8, "세종특별자치시"],
  [9, "경기도"],
  [10, "강원도"],
  [11, "충청북도"],
  [12, "충청남도"],
  [13, "전라북도"],
  [14, "전라남도"],
  [15, "경상북도"],
  [16, "경상남도"],
  [17, "제주특별자치도"],
  [18, "울릉도"],
];

const userType = [
  [1, "엄마"],
  [2, "아빠"],
  [3, "아들"],
  [4, "딸"],
];

const SignUpPage = () => {
  const API_USER_URL = `http://54.180.127.164:18090/api/user`;
  const API_USER_GROUP_URL = `http://54.180.127.164:18090/api/usergroup`;

  const backgroundVideos = [skan01, skan04, skan09];
const getRandomVideo = () =>
  backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];

const [currentVideo, setCurrentVideo] = useState(getRandomVideo());

const handleChangeVideo = () => {
    let newVideo;
    do {
      newVideo = getRandomVideo();
    } while (newVideo === currentVideo);
    setCurrentVideo(newVideo);
  };
  

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentVideo(getRandomVideo());
  }, 20000); // 20초마다 자동 변경

  return () => clearInterval(timer);
}, []);


  const [userData, setUserData] = useState({
    name: "",
    group_id: 0,
    user_name: "",
    nickname: "",
    user_id: "",
    user_password: "",
    pin_password: "",
    tel_number: "",
    email: "",
    region_id: 1,
    thumbnail: "",
    register_date: "",
    user_type: 1,
    is_deleted: false,
    is_admin: false,
    upd_date: new Date().toISOString(),
  });

  const [checkPasswords, setCheckPasswords] = useState({
    confirmPassword: "",
    confirmPinPassword: "",
  });

  const [allUserData, setAllUserData] = useState([]);
  const [allUserGroupData, setAllUserGroupData] = useState([]);
  const [userGroupLength, setUserGroupLength] = useState(0);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [pinPasswordMatch, setPinPasswordMatch] = useState(null);
  const navigate = useNavigate();

  // 뒤로가기 버튼
  const onBack = () => {
    navigate("/");
  };

  //@note - 전체 유저 데이터 불러오기
  useEffect(() => {
    // 회원 정보 불러오기
    fetch(API_USER_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("user 데이터 확인:", data);
        setAllUserData(data);
      })
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, []);

  useEffect(() => {
    fetch(API_USER_GROUP_URL)
      .then((response) => response.json())
      .then((data) => {
        setUserGroupLength(data.length);
        setUserData({ group_id: data.length + 1 });
        setAllUserGroupData(data);

        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            group_id: data.length + 1,
          };
          console.log("userData 업데이트될 값:", updatedUserData);
          return updatedUserData;
        });
      })
      .catch((error) => console.error("유저 그룹 정보 불러오기 오류", error));
  }, []);

  useEffect(() => {
    console.log("userData 변경 확인:", userData);
  }, [userData]);

  //@note - 유저 아이디 가능 여부 확인
  const checkUserIdAvailability = () => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(userData.user_id)) {
      alert("아이디는 6자 이상 영문, 숫자 조합이어야 합니다.");
      return;
    }
    const isTaken = allUserData.some(
      (user) => user.user_id === userData.user_id
    );
    setIsUsernameAvailable(!isTaken);
  };

  //@note - 비밀번호 사용 가능한지 확인
  const handlePasswordAvailability = (e) => {
    const password = e.target.value;
    setUserData({ ...userData, user_password: password });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordStrength(
      passwordRegex.test(password)
        ? "보안성 : 강함"
        : "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  //@note - pin 비밀번호 사용 가능한지 확인
  const handlePinPasswordAvailability = (e) => {
    const pinPassword = e.target.value;
    setUserData({ ...userData, pin_password: pinPassword });
  };

  //@note - 비밀번호 확인 기능
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setCheckPasswords({ ...checkPasswords, confirmPassword });
    setPasswordMatch(userData.user_password === confirmPassword);
  };

  //@note - pin 비밀번호 확인 기능
  const handleConfirmPinPasswordChange = (e) => {
    const confirmPinPassword = e.target.value;
    setCheckPasswords({ ...checkPasswords, confirmPinPassword });
    setPinPasswordMatch(userData.pin_password === confirmPinPassword);
  };

  const handleUploadImage = (url) => {
    setUserData((prevUserData) => ({ ...prevUserData, thumbnail: url }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{11}$/;

    console.log("allUserData", allUserData);
    console.log("allUserGroupData", allUserGroupData);

    if (!userData.user_id) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!nicknameRegex.test(userData.nickname)) {
      alert("닉네임에는 특수문자를 사용할 수 없습니다.");
      return;
    }
    if (!userData.tel_number.match(phoneRegex)) {
      alert("전화번호는 11자리 숫자만 입력해야 합니다.");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailRegex.test(userData.email)) {
      alert("올바른 이메일 형식을 입력하세요. 예: example@domain.com");
      return;
    }
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (isUsernameAvailable === false) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }

    console.log(
      "group_id : " +
        userData.group_id +
        ", " +
        "name : " +
        userData.user_name +
        ", " +
        "nickname : " +
        userData.nickname +
        ", " +
        "user_id : " +
        userData.user_id +
        ", " +
        "password : " +
        userData.user_password +
        ", " +
        "pin_password : " +
        userData.pin_password +
        ", " +
        "tel_number : " +
        userData.tel_number +
        ", " +
        "email : " +
        userData.email +
        ", " +
        "regionId : " +
        userData.region_id +
        ", " +
        "thumbnail : " +
        userData.thumbnail +
        ", " +
        "register_date : " +
        userData.register_date +
        ", " +
        "user_type : " +
        userData.user_type +
        ", " +
        "is_deleted : " +
        userData.is_deleted +
        ", " +
        "is_admin : " +
        userData.is_admin +
        ", " +
        "upd_date : " +
        userData.upd_date
    );

    // 회원가입 처리
    fetch(API_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/login");
  };

  return (
    <>
  <BackgroundVideo autoPlay muted loop key={currentVideo}>
    <source src={currentVideo} type="video/mp4" />
  </BackgroundVideo>
  <Overlay onClick={handleChangeVideo} />


  <CenteredForm>
  <StyledFormWrapper>
    <div className="join-container">
      <button onClick={onBack} className="join-back-button">
        {/* <MdOutlineBackspace /> */}
      </button>
      <div className="join-logo-container">
        {/* <img src={logoImage} alt="호박고구마 로고" className="join-logo" /> */}
        <h1>파릇</h1>
      </div>
      <h2 className="join-h2">회원가입</h2>
      <UploadImage onUpload={handleUploadImage} />
      <form className="join-form" onSubmit={handleSignup}>
        <label>이름:</label>
        <input
          type="text"
          placeholder="성함"
          value={userData.user_name}
          onChange={(e) =>
            setUserData({ ...userData, user_name: e.target.value })
          }
        />
        <br />
        <label>닉네임:</label>
        <input
          type="text"
          placeholder="2~10자 특수문자 제외"
          value={userData.nickname}
          onChange={(e) =>
            setUserData({ ...userData, nickname: e.target.value })
          }
        />
        <br />
        <label>아이디:</label>
        <input
          type="text"
          placeholder="2~10자 특수문자 제외"
          value={userData.user_id}
          onChange={(e) =>
            setUserData({ ...userData, user_id: e.target.value })
          }
        />
        <button type="button" onClick={checkUserIdAvailability}>
          중복 확인
        </button>
        {isUsernameAvailable !== null && (
          <span>{isUsernameAvailable ? "사용 가능" : "사용 불가"}</span>
        )}
        <br />
        <label>비밀번호:</label>
        <input
          type="password"
          placeholder="8~20자 영문, 숫자, 특수문자 조합"
          value={userData.user_password}
          onChange={handlePasswordAvailability}
        />
        <span>{passwordStrength}</span>
        <br />
        <label>비밀번호 확인:</label>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={checkPasswords.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordMatch !== null && (
          <span style={{ color: passwordMatch ? "green" : "red" }}>
            {passwordMatch ? "비밀번호 일치" : "비밀번호 불일치"}
          </span>
        )}
        <br />
        <label>pin 비밀번호:</label>
        <input
          type="pin_password"
          placeholder="6자리 숫자"
          value={userData.pin_password}
          onChange={handlePinPasswordAvailability}
        />
        <span>{passwordStrength}</span>
        <br />
        <label>비밀번호 확인:</label>
        <input
          type="pin_password"
          placeholder="pin 비밀번호를 다시 입력하세요"
          value={checkPasswords.confirmPinPassword}
          onChange={handleConfirmPinPasswordChange}
        />
        {pinPasswordMatch !== null && (
          <span style={{ color: pinPasswordMatch ? "green" : "red" }}>
            {pinPasswordMatch ? "pin 비밀번호 일치" : "pin 비밀번호 불일치"}
          </span>
        )}
        <br />
        <label>전화번호:</label>
        <input
          type="text"
          placeholder="- 없이 숫자만 입력"
          value={userData.tel_number}
          onChange={(e) =>
            setUserData({ ...userData, tel_number: e.target.value })
          }
        />
        <br />
        <label>이메일:</label>
        <input
          type="email"
          placeholder="올바른 이메일 형식을 입력하세요"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <button type="button" onClick={() => setIsEmailVerified(true)}>
          이메일 인증
        </button>
        {isEmailVerified && <span>인증 완료</span>}
        <br />
        <label>가족 구성:</label>
        <select
          value={userData.user_type}
          onChange={(e) =>
            setUserData({ ...userData, user_type: e.target.value })
          }
        >
          {userType.map((type, index) => (
            <option key={index} value={type[0]}>
              {type[1]}
            </option>
          ))}
        </select>
        <br />
        <label>지역:</label>
        <select
          value={userData.region_id}
          onChange={(e) =>
            setUserData({ ...userData, region_id: e.target.value })
          }
        >
          {allRegions.map((region, index) => (
            <option key={index} value={region[0]}>
              {region[1]}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button type="submit" disabled={!userData.thumbnail}>
            가입
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
      </div>
      </StyledFormWrapper>
  </CenteredForm>
</>
  );
};

export default SignUpPage;


